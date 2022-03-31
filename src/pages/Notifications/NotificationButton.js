import React, { useState, useEffect, useRef } from "react";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";

import { useStores } from "../../stores/RootStore";
import { io } from "socket.io-client";

import * as socialMediaAPI from "../../services/SocialMedia";
import * as notificationAPI from "../../services/Notification";

import NotificationItem from "./NotificationItem";

const NotificationButton = () => {
  const { userStore } = useStores();
  const [notificationData, setNotificationData] = useState([]);
  const socket = useRef();
  const [arrivalNotification, setArrivalNotification] = useState(null);

  const getUsernameById = async (userId) => {
    try {
      const res = await socialMediaAPI.getUsernameById(userId);
      let data = JSON.parse(JSON.stringify(res)).data[0].username;
      // setAuthorUsername(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getUserNotifications = async (userId) => {
    try {
      const res = await notificationAPI.getUserNotifications(userStore.id);
      let data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getCompleteNotificationData = async () => {
    const allNotifications = await getUserNotifications();

    var promises = allNotifications.map(async (noti) => {
      if (noti.triggeruserid) {
        const triggerUsername = await getUsernameById(noti.triggeruserid);
        const completeNoti = {
          ...noti,
          triggerUsername: triggerUsername,
        };
        console.log("completeNoti", completeNoti);
        return completeNoti;
      } else {
        return noti;
      }
    });

    await promises.reduce((m, o) => m.then(() => o), Promise.resolve());

    Promise.all(promises).then((values) => {
      console.log("cleaned noti data", values);
      setNotificationData(values);
      return values;
    });
  };

  useEffect(() => {
    getCompleteNotificationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    socket.current = io("ws://localhost:8900");
    socket.current.on("likePost", (data) => {
      setArrivalNotification({
        id: data.id,
        description: data.description,
        isunread: data.isunread,
        link: data.link,
        timestamp: data.timestamp,
        triggeruserid: data.triggeruserid,
        triggerUsername: data.triggerUsername,
        userid: data.userid,
      });
      console.log("notification button setArrivalNoti");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    arrivalNotification &&
      userStore.id === arrivalNotification.userid &&
      setNotificationData((prev) => [...notificationData, arrivalNotification]);

    console.log("[...notificationData, arrivalNotification]", [
      ...notificationData,
      arrivalNotification,
    ]);

    // setNotificationData(async (prev) => {
    //   const triggerusername = await getUsernameById(
    //     arrivalNotification.triggeruserid
    //   );
    //   const completeNoti = {
    //     ...arrivalNotification,
    //     triggerusername: triggerusername,
    //   };

    //   const newNotificationData = [...notificationData];
    //   newNotificationData.pop();
    //   newNotificationData.push(completeNoti);
    //   return newNotificationData;
    // });

    // arrivalNotification && getCompleteNotificationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivalNotification]);

  useEffect(() => {
    socket.current.emit("addUser", userStore.id);
    socket.current.on("getUsers", (users) => {
      console.log("getUsers", users);
    });
  }, [userStore]);

  const markAllNotificationsAsRead = async () => {
    try {
      const res = await notificationAPI.markAllNotificationsAsRead(
        userStore.id
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log(data);
      refreshData();
    } catch (error) {
      console.error(error);
    }
  };

  const refreshData = () => {
    getCompleteNotificationData();
  };

  // const notificationsData = [
  //   {
  //     id: 1,
  //     description: "has created an order",
  //     button: "view",
  //     link: "",
  //     type: "createdorder",
  //     userId: 1,
  //     isUnread: true,
  //     date: "22 Jan 2022",
  //     triggerUserId: 2,
  //     triggerUsername: "jerrick",
  //   },
  //   {
  //     id: 2,
  //     description: "has shipped your order",
  //     button: "view",
  //     link: "",
  //     type: "createdorder",
  //     userId: 1,
  //     isUnread: true,
  //     date: "22 Jan 2022",
  //     triggerUserId: 2,
  //     triggerUsername: "jerrick",
  //   },
  //   {
  //     id: 3,
  //     description: "Your order has been delivered",
  //     button: "view",
  //     link: "",
  //     type: "createdorder",
  //     userId: 1,
  //     isUnread: true,
  //     date: "22 Jan 2022",
  //     triggerUserId: 2,
  //     triggerUsername: null,
  //   },
  //   {
  //     id: 4,
  //     description: "marked item as received",
  //     button: "view",
  //     link: "",
  //     type: "like",
  //     userId: 1,
  //     isUnread: true,
  //     date: "22 Jan 2022",
  //     triggerUserId: 3,
  //     triggerUsername: "henry",
  //   },
  //   {
  //     id: 5,
  //     description: "raised a dispute",
  //     button: "view",
  //     link: "",
  //     type: "like",
  //     userId: 1,
  //     isUnread: true,
  //     date: "22 Jan 2022",
  //     triggerUserId: 3,
  //     triggerUsername: "henry",
  //   },
  //   {
  //     id: 6,
  //     description: "marked dispute as resolved",
  //     button: "view",
  //     link: "",
  //     type: "like",
  //     userId: 1,
  //     isUnread: true,
  //     date: "22 Jan 2022",
  //     triggerUserId: 4,
  //     triggerUsername: "mf",
  //   },
  //   {
  //     id: 7,
  //     description: "has liked your post",
  //     button: "view",
  //     link: "",
  //     type: "like",
  //     userId: 1,
  //     isUnread: true,
  //     date: "22 Jan 2022",
  //     triggerUserId: 5,
  //     triggerUsername: "alice",
  //   },
  //   {
  //     id: 8,
  //     description: "added your post to her moodboard",
  //     button: "view",
  //     link: "",
  //     type: "like",
  //     userId: 1,
  //     isUnread: true,
  //     date: "22 Jan 2022",
  //     triggerUserId: 6,
  //     triggerUsername: "cynthia",
  //   },
  //   {
  //     id: 9,
  //     description: "liked your listing",
  //     button: "view",
  //     link: "",
  //     type: "like",
  //     userId: 1,
  //     isUnread: true,
  //     date: "22 Jan 2022",
  //     triggerUserId: 7,
  //     triggerUsername: "george",
  //   },
  // ];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton
        aria-label="delete"
        sx={{ color: "common.white" }}
        onClick={handleClick}
      >
        {notificationData.filter((noti) => noti.isunread === "1").length ===
        0 ? (
          <NotificationsNoneIcon />
        ) : (
          <Badge
            badgeContent={
              notificationData.filter((noti) => noti.isunread === "1").length
            }
            color="error"
          >
            <NotificationsNoneIcon />
          </Badge>
        )}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            // height: 400,
            // width: 450,
            backgroundColor: "common.white",
          }}
        >
          <Box
            sx={{
              minWidth: 450,
              p: 3,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <Stack>
                  <Typography variant="h4" component="div">
                    Notifications
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ fontWeight: "normal" }}
                  >
                    You have{" "}
                    {
                      notificationData.filter((noti) => noti.isunread === "1")
                        .length
                    }{" "}
                    unread notifications
                  </Typography>
                </Stack>
              </Grid>
              {notificationData.filter((noti) => noti.isunread === "1").length >
                0 && (
                <Grid item xs={12} md={5}>
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={markAllNotificationsAsRead}
                    >
                      Mark all as read
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
          <Divider />

          <List
            sx={{
              overflowY: "scroll",
              height: 400,
              width: "100%",
            }}
          >
            {notificationData.filter((noti) => noti.isunread === "1").length ===
              0 && (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    sx={{ fontWeight: "normal", fontStyle: "italic" }}
                  >
                    No unread notifications
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained">View past notifications</Button>
                  </Box>
                </Box>
              </Box>
            )}
            {notificationData.map((notification) => (
              <NotificationItem
                notification={notification}
                refreshData={refreshData}
                key={notification.id}
              />
            ))}
          </List>
          <Divider />
          {notificationData.filter((noti) => noti.isunread === "1").length >
            0 && (
            <Box
              sx={{
                minWidth: 450,
                px: 3,
                py: 1,
              }}
            >
              <Button sx={{ width: "100%" }}>View all</Button>
            </Box>
          )}
          {/* <Box
            sx={{
              minWidth: 450,
              px: 3,
              py: 1,
            }}
          >
            <Button sx={{ width: "100%" }}>View all</Button>
          </Box> */}
        </Box>
      </Popover>
    </>
  );
};

export default NotificationButton;
