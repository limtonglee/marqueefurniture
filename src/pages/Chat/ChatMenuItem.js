import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const ChatMenuItem = ({ chat, isCurrent, setCurrentChat }) => {
  // console.log("chat at chatmenuitem", chat);

  const getLastMessagePreview = () => {
    if (chat.chatMessages.length === 0) {
      return "No messages";
    } else {
      const lastMessage = chat.chatMessages[chat.chatMessages.length - 1].text;
      if (lastMessage.length < 50) {
        return lastMessage;
      } else {
        return `${lastMessage.slice(0, 50)}...`;
      }
    }
  };

  const isCurrentChatStyles = {
    backgroundColor: "primary.lighter",
  };

  const notCurrentChatStyles = {
    "&:hover": {
      backgroundColor: "grey.200",
      cursor: "pointer",
    },
  };

  const handleSelectChat = () => {
    setCurrentChat(chat);
  };

  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={isCurrent ? isCurrentChatStyles : notCurrentChatStyles}
        onClick={handleSelectChat}
      >
        <ListItemAvatar>
          <Avatar
            alt="Seller"
            // src="https://images.generated.photos/nSW_I6izlbs1PZri0EwntItqrnybtGrDKTz9RNnnDHk/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LmNvbmQvMzlkNTg3/MjMtODFhYi00Y2Zh/LTlkMjQtNTU0Njdl/NjU1MmU2LmpwZw.jpg"
            src={chat.recipientProfilePic}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="h6"
                color="text.primary"
              >
                {chat.recipientUsername}
              </Typography>
            </>
          }
          secondary={getLastMessagePreview()}
        />
        {/* <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            /> */}
      </ListItem>
      <Divider variant="middle" component="li" />
    </>
  );
};

export default ChatMenuItem;