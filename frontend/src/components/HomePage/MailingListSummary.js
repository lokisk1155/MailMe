import {
  Box,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Button,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { emptyCurrList } from "../../store/mailinglist";
import { removeMailingList } from "../../store/mailinglist";
import ConfirmMailingListDelete from "./ConfirmMailingListDelete";
import "./HomePage.css";

import { Steps } from "intro.js-react";

import introJs from "intro.js";
import "intro.js/introjs.css";
import { useState } from "react";

const MailingListSummary = ({ mailingLists }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const steps = [
    {
      element: ".list-name",
      intro: "This is the mailing list name",
    },
    {
      element: ".list-number-emails",
      intro: "This is number of emails/subscribers in the mailing list",
    },
    {
      element: ".number-of-emails-sent-out",
      intro: "This is number of emails sent out",
    },
  ];
  const onExit = () => {
    localStorage.setItem("show", false);
    localStorage.setItem("show3", true);
  };
  useEffect(() => {
    // if (localStorage.getItem("show") === "true") {
    //   introJs()
    //     .setOptions({
    //       steps: [
    //         {
    //           element: document.querySelector(".list-name"),
    //           intro: "This is the mailing list name",
    //         },
    //         {
    //           element: document.querySelector(".list-number-emails"),
    //           intro: "This is number of emails/subscribers in the mailing list",
    //         },
    //         {
    //           element: document.querySelector(".number-of-emails-sent-out"),
    //           intro: "This is number of emails sent out",
    //         },
    //       ],
    //     })
    //     .start();
    //   // introJs().goToStep(1).start();
    //   localStorage.setItem("show", false);
    //   localStorage.setItem("show2", true);
    // }

    // dispatch(emptyCurrList());
    // introJs().addHints();
    dispatch({
      type: "mailinglist/EMPTY_CURR_LIST",
    });
  }, []);

  return (
    <>
      <Heading m={4} textAlign="left">
        All Mailing Lists
      </Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          {/* <TableCaption>Isaac</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Mailing List Name</Th>
              <Th isNumeric># of Emails</Th>
              {location.pathname === "/" ? (
                <Th isNumeric>Emails sent out</Th>
              ) : null}
            </Tr>
          </Thead>
          <Tbody>
            {mailingLists.length > 0 &&
              mailingLists.map((list) => {
                return (
                  <Tr
                    onClick={() => {
                      history.push(`/mailingList/${list._id}`);
                    }}
                    _hover={{
                      cursor: "pointer",
                    }}
                    border={
                      location.pathname.includes(list._id)
                        ? "3px solid black"
                        : null
                    }
                  >
                    <Td>
                      <Box
                        // as={Link}
                        // to={`/mailingList/${list._id}`}
                        className="list-name"
                        _hover={{
                          color: "red",
                        }}
                        fontWeight={
                          location.pathname.includes(list._id) ? 700 : 400
                        }
                        fontSize="20px"
                      >
                        {list.name}
                      </Box>
                    </Td>
                    <Td
                      className="list-number-emails"
                      fontWeight={
                        location.pathname.includes(list._id) ? 700 : 400
                      }
                      fontSize="20px"
                      isNumeric
                    >
                      {list.emails.length}
                    </Td>

                    {location.pathname === "/" ? (
                      <Td className="number-of-emails-sent-out" isNumeric>
                        {list.emails.length}
                      </Td>
                    ) : null}
                    {/* <Td>10</Td> */}

                    {location.pathname === "/" ? (
                      <Td isNumeric>
                        {/* is numeric makes it text align right */}

                        <ConfirmMailingListDelete list={list} />
                      </Td>
                    ) : null}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      {localStorage.getItem("show") === "true" ? (
        <Steps enabled={true} steps={steps} initialStep={0} onExit={onExit} />
      ) : (
        <div></div>
      )}
    </>
  );
};
export default MailingListSummary;
