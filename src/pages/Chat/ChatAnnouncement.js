import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const ChatAnnouncement = ({ hasButton }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          m: 2,
        }}
      >
        <Stack direction="column" spacing={1}>
          <Box
            sx={{
              backgroundColor: "primary.main",
              maxWidth: 300,
              borderRadius: 3,
              p: 1.8,
              color: "primary.contrastText",
              textAlign: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                fontWeight: "normal",
              }}
              component="div"
            >
              Consultation request has been submitted.
            </Typography>
            {hasButton && <Button variant="outlined">Add to Cart</Button>}
          </Box>
          <Typography
            variant="body2"
            display="block"
            sx={{ fontWeight: "normal" }}
          >
            11:32 pm
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default ChatAnnouncement;
