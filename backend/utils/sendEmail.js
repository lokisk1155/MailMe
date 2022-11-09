const nodemailer = require("nodemailer")
var cron = require('node-cron');

const sendEmail = async (subject, message, to, from, time) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.HOST_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const options = {
        from: from,
        to: to,
        subject: subject,
        html: message,
        attachments: [{
            filename: 'temp.png',
            path: __dirname + '/emailAttachments/temp.png',
            cid: 'logo' 
        }],
    }
    cron.schedule(`${time}`, () => {
        transporter.sendMail(options, function(err, info) {
            err
             ? console.log(err) : console.log(info)
        })
    })
}

module.exports = sendEmail