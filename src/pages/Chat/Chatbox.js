import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import ReportIcon from "@mui/icons-material/Report";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import ChatMessage from "./ChatMessage";
import ChatAnnouncement from "./ChatAnnouncement";

import { useNavigate } from "react-router-dom";

import * as chatAPI from "../../services/Chat";
import * as accountsAPI from "../../services/Accounts";

import * as socket from "../../services/socket";

import DesignAction from "./DesignAction";
import DesignAnnouncement from "./DesignAnnouncement";
import { DesignOrderDict } from "../../data/designOrderDict";

import { useStores } from "../../stores/RootStore";

const Chatbox = ({ currentChat, refreshCurrentChat }) => {
  // console.log("currentChat", currentChat);

  const { userStore } = useStores();

  const [message, setMessage] = useState("");
  const [userType, setUserType] = useState("");

  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    const receiverId =
      currentChat.firstuserid === userStore.id
        ? currentChat.seconduserid
        : currentChat.firstuserid;

    const timestamp = new Date();

    // socket.current.emit("sendMessage", {
    //   senderId: userStore.id,
    //   receiverId: receiverId,
    //   text: message,
    //   type: "Message",
    //   timestamp: timestamp,
    // });

    socket.sendMessage({
      senderId: userStore.id,
      receiverId: receiverId,
      text: message,
      type: "Message",
      timestamp: timestamp,
    });

    try {
      const res = await chatAPI.createMessage(
        currentChat.id,
        userStore.id,
        "Message",
        message
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log(data);
      setMessage("");
      refreshCurrentChat();
    } catch (error) {
      console.error(error);
    }
  };

  // const designOrderDict = {
  //   Nothing: {
  //     user: {
  //       action: "Request for consultation",
  //       statusbarText: "",
  //     },
  //     designer: {
  //       action: "",
  //       statusbarText: "",
  //     },
  //   },
  //   Requested: {
  //     user: {
  //       action: "Consultation request has been submitted",
  //       statusbarText: "",
  //     },
  //     designer: {
  //       action: "Issue quotation",
  //       statusbarText: "Customer has submitted consultation request",
  //     },
  //   },
  //   ConsultedQuoted: {
  //     user: {
  //       action: "Review and pay",
  //       statusbarText: "Quotation has been issued",
  //     },
  //     designer: {
  //       action: "",
  //       statusbarText: "Quotation has been issued, pending customer payment",
  //     },
  //   },
  //   Paid: {
  //     user: {
  //       action: "",
  //       statusbarText: "Consultation confirmed",
  //     },
  //     designer: {
  //       action: "Issue quotation for design package",
  //       statusbarText: "Consultation confirmed",
  //     },
  //   },
  //   PackageQuoted: {
  //     user: {
  //       action: "Review and pay",
  //       statusbarText: "Seller has issued quotation for design package",
  //     },
  //     designer: {
  //       action: "Edit quotation",
  //       statusbarText:
  //         "Quotation for design package issued, pending customer payment",
  //     },
  //   },
  //   Designing: {
  //     user: {
  //       action: "",
  //       statusbarText: "Design package confirmed, Pending design",
  //     },
  //     designer: {
  //       action: "Add design package",
  //       statusbarText: "Design package confirmed",
  //     },
  //   },
  //   InReview: {
  //     user: {
  //       action: "Review design",
  //       statusbarText: "New design submmited, Pending your review",
  //     },
  //     designer: {
  //       action: "",
  //       statusbarText: "Design submitted, pending customer review",
  //     },
  //   },
  //   Rejected: {
  //     user: {
  //       action: "",
  //       statusbarText: "Review submitted, Pending next design",
  //     },
  //     designer: {
  //       action: "Add design package",
  //       statusbarText: "Design rejected, Pending your design edits",
  //     },
  //   },
  //   Completed: {
  //     user: {
  //       action: "",
  //       statusbarText: "Design engagement completed",
  //     },
  //     designer: {
  //       action: "",
  //       statusbarText: "Design engagement completed",
  //     },
  //   },
  // };

  const getCurrUserType = () => {
    console.log(userStore.isDesigner);
    if (userStore.isDesigner) {
      return "designer";
    } else {
      return "user";
    }
  };

  const [isDesignCustomerRs, setIsDesignCustomerRs] = useState(false);
  // const [designOrderStatus, setDesignOrderStatus] = useState("Nothing");
  const [designOrderStatus, setDesignOrderStatus] = useState({
    status: "Nothing",
    consultQuotation: null,
    packageQuotation: null,
    designItems: [
      {
        id: 1,
        timestamp: "2022-03-19 02:58:55.425662",
        title: "First draft",
        designImages: [
          "d5905def5a6366ae4a3b3cadced8cbd2",
          "dd1f03dcab86c065cc069e07a1931d98",
          "c7befb8cdc6dc9623673a57ee78e6447",
        ],
        taggedProducts: [2, 3, 4],
        isCompleted: "1",
        customerReview: {
          pictureComments: [
            "d5905def5a6366ae4a3b3cadced8cbd2",
            "dd1f03dcab86c065cc069e07a1931d98",
            "c7befb8cdc6dc9623673a57ee78e6447",
          ],
          otherComments: "other comments hereee",
        },
      },
    ],
  });
  const currUserType = getCurrUserType(); // status of this current user

  console.log(DesignOrderDict["Completed"]);

  const getUserType = async () => {
    try {
      console.log(currentChat);
      const res = await accountsAPI.getUserType(
        currentChat.firstuserid === userStore.id
          ? currentChat.seconduserid
          : currentChat.firstuserid
      );
      const data = JSON.parse(JSON.stringify(res)).data[0]["type"];
      console.log("data from getuserType", data);
      setUserType(data);

      if (
        (currUserType === "user" && data === "Designer") ||
        (currUserType === "designer" && data === "Customer")
      ) {
        console.log(`currUserType data ${currUserType} ${data}`);
        setIsDesignCustomerRs(true);
        // todo: call API to check if there's engagement going on
        // todo: update below accordingly
        setDesignOrderStatus({
          status: "InReview",
          consultQuotation: 1,
          packageQuotation: 2,
          designItems: [
            {
              id: 1,
              timestamp: "2022-03-19 02:58:55.425662",
              title: "First draft",
              designImages: [
                "d5905def5a6366ae4a3b3cadced8cbd2",
                "dd1f03dcab86c065cc069e07a1931d98",
                "c7befb8cdc6dc9623673a57ee78e6447",
              ],
              taggedProducts: [2, 3, 4],
              isCompleted: "1",
              customerReview: {
                pictureComments: [
                  "d5905def5a6366ae4a3b3cadced8cbd2",
                  "dd1f03dcab86c065cc069e07a1931d98",
                  "c7befb8cdc6dc9623673a57ee78e6447",
                ],
                otherComments: "other comments hereee",
              },
            },
            {
              id: 2,
              timestamp: "2022-03-19 02:58:55.425662",
              title: "Second draft",
              designImages: [
                "c7befb8cdc6dc9623673a57ee78e6447",
                "dd1f03dcab86c065cc069e07a1931d98",
              ],
              taggedProducts: [5, 7, 9],
              isCompleted: "0",
              customerReview: {
                pictureComments: [],
                otherComments: "",
              },
            },
          ],
        });
      } else {
        setIsDesignCustomerRs(false);
      }

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat]);

  const [openMoreMenu, setOpenMoreMenu] = React.useState(false); // eslint-disable-line no-unused-vars
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const popoverId = openMoreMenu ? "simple-popover" : undefined;

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [currentChat]);

  let navigate = useNavigate();

  const handleRequestForConsultation = () => {
    console.log("handleRequestForConsultation");
    navigate("/designConsultation");
  };

  const handleViewDesignOrderProgress = () => {
    console.log("handleViewDesignOrderProgress");
    navigate("/designOrderProgress");
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "#f2f2f2",
          height: "100%",
          border: "1px solid lightgrey",
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box
            sx={{
              p: 3,
              backgroundColor: "white",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="User"
                // src="https://images.generated.photos/nSW_I6izlbs1PZri0EwntItqrnybtGrDKTz9RNnnDHk/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LmNvbmQvMzlkNTg3/MjMtODFhYi00Y2Zh/LTlkMjQtNTU0Njdl/NjU1MmU2LmpwZw.jpg"
                // src={currentChat.recipientProfilePic}
                src={`/api/image/${currentChat.recipientProfilePic}`}
                sx={{ height: 60, width: 60 }}
              />
              <Box>
                <Typography variant="h4">
                  {currentChat.recipientUsername}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: "normal" }}>
                  {userType}
                </Typography>
              </Box>
            </Stack>
            <Box>
              <IconButton onClick={handleClickPopover}>
                <MoreHorizIcon />
              </IconButton>
              <Popover
                id={popoverId}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    sx={{ width: "100%" }}
                    startIcon={<ReportIcon />}
                    color="error"
                  >
                    Report Seller
                  </Button>
                </Box>
              </Popover>
            </Box>
          </Box>
          <Divider />
          {/* <Box sx={{ px: 3, py: 3, backgroundColor: "grey.100" }}>
            <Stack direction="row" spacing={3}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "grey.200",
                  },
                }}
                onClick={handleRequestForConsultation}
              >
                Request for consultation
              </Button>
            </Stack>
          </Box>
          <Divider />
          <Box
            sx={{
              px: 3,
              py: 2,
              backgroundColor: "secondary.lighter",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={handleViewDesignOrderProgress}
          >
            <Box>
              <Typography variant="h6" component="div">
                Consultation request submitted
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "normal" }}
              >
                Pending designer's acceptance
              </Typography>
            </Box>
            <ArrowForwardIosIcon size="small" />
          </Box>
          <Divider /> */}
          {isDesignCustomerRs && (
            <>
              <DesignAction
                designOrderStatus={designOrderStatus}
                currUserType={currUserType}
              />
              <DesignAnnouncement
                designOrderStatus={designOrderStatus}
                currUserType={currUserType}
              />
            </>
          )}
        </Box>
        <Box
          sx={{
            height: "100%",
            backgroundColor: "white",
            overflowY: "scroll",
          }}
        >
          {currentChat.chatMessages.length === 0 ? (
            <>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  sx={{ fontWeight: "normal", fontStyle: "italic" }}
                >
                  No messages yet
                </Typography>
              </Box>
            </>
          ) : (
            // currentChat.chatMessages.map((message) => {
            //   if (message.type === "Message") {
            //     return (
            //       <ChatMessage
            //         message={message}
            //         recipientProfilePic={currentChat.recipientProfilePic}
            //         own={message.userid === userStore.id}
            //       />
            //     );
            //   } else if (message.type === "Announcement") {
            //     return <ChatAnnouncement message={message} hasButton={false} />;
            //   } else {
            //     return <ChatAnnouncement message={message} hasButton={true} />;
            //   }
            // })

            currentChat.chatMessages.map((message) => (
              <div ref={scrollRef} key={message.id}>
                {message.type === "Message" && (
                  <ChatMessage
                    message={message}
                    // recipientProfilePic={currentChat.recipientProfilePic}
                    recipientProfilePic={`/api/image/${currentChat.recipientProfilePic}`}
                    own={message.userid === userStore.id}
                  />
                )}
                {message.type === "Announcement" && (
                  <ChatAnnouncement message={message} hasButton={false} />
                )}
                {message.type === "CTA Announcement" && (
                  <ChatAnnouncement message={message} hasButton={true} />
                )}
              </div>
            ))
          )}
        </Box>
        <Divider />
        <Box sx={{ p: 3, backgroundColor: "white" }}>
          <form autoComplete="off">
            <Stack direction="row" spacing={2}>
              <Box>
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
              </Box>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                placeholder="Type something..."
                sx={{ width: "100%", mr: 1 }}
                onChange={updateMessage}
                value={message}
                autoComplete="off"
              />
              {message.length === 0 ? (
                <Box>
                  <IconButton disabled>
                    <SendIcon />
                  </IconButton>
                </Box>
              ) : (
                <Box>
                  <IconButton onClick={sendMessage}>
                    <SendIcon />
                  </IconButton>
                </Box>
              )}
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Chatbox;
