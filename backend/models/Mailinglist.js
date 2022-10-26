const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mailinglistSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    emails: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mailinglist", mailinglistSchema);
