import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import * as notificationAPI from "../../services/Notification";

const NotificationItem = ({ notification, refreshData }) => {
  const markNotificationAsRead = async () => {
    try {
      const res = await notificationAPI.markNotificationAsRead(notification.id);
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log(data);
      refreshData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {notification.isunread === "1" && (
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="#simple-list"
            sx={{
              width: "100%",
              p: 3,
              textDecoration: "none",
              "& .MuiTouchRipple-root span": {
                backgroundColor: "lightgray!important",
                opacity: 0.3,
              },
            }}
            key={notification.id}
            onClick={markNotificationAsRead}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={11} md={11}>
                <Box>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ display: "inline", color: "common.black" }}
                  >
                    {notification.triggerUsername}
                  </Typography>
                  &nbsp;
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      display: "inline",
                      fontWeight: "normal",
                      color: "common.black",
                    }}
                  >
                    {notification.description}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={1} md={1}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    backgroundColor: "warning.main",
                    borderRadius: "50%",
                  }}
                ></Box>
              </Grid>
            </Grid>
          </ListItemButton>
        </ListItem>
      )}
    </>
  );
};

export default NotificationItem;
