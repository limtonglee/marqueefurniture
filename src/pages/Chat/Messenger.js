import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Chatbox from "./Chatbox";
import ChatMenu from "./ChatMenu";

const Messenger = () => {
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <>
      {isMobile ? (
        <Box sx={{ height: "80vh" }}>
          <ChatMenu />
        </Box>
      ) : (
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={4} md={4}>
              <Box sx={{ height: "80vh" }}>
                <ChatMenu />
              </Box>
            </Grid>
            <Grid item xs={8} md={8}>
              <Box sx={{ height: "80vh" }}>
                <Chatbox />
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Messenger;
