import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const ChatMessage = ({ own }) => {
  return (
    <>
      {own ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            m: 2,
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <Stack
              direction="column"
              spacing={0.3}
              sx={{ alignItems: "flex-end" }}
            >
              <Box
                sx={{
                  backgroundColor: "primary.lighter",
                  width: "fit-content",
                  maxWidth: 400,
                  py: 1.5,
                  px: 2,
                  borderRadius: 2,
                }}
              >
                Lorem ipsum dolot sit me
              </Box>
              <Typography
                variant="body2"
                display="block"
                sx={{ fontWeight: "normal" }}
              >
                11:32 pm
              </Typography>
            </Stack>
            <Avatar
              alt="Seller"
              src="https://images.generated.photos/VVtQpKLyaZOHYCz0ayJAbVgNQt7rAytRVuWQuJWEMAE/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LmNvbmQvNzdhOGNl/NzAtMjBhZC00NWQ2/LWJhMGUtYTY1MDQ5/YmQwMDA5LmpwZw.jpg"
            />
          </Stack>
        </Box>
      ) : (
        <Box sx={{ m: 2 }}>
          <Stack direction="row" spacing={1.5}>
            <Avatar
              alt="Seller"
              src="https://images.generated.photos/nSW_I6izlbs1PZri0EwntItqrnybtGrDKTz9RNnnDHk/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LmNvbmQvMzlkNTg3/MjMtODFhYi00Y2Zh/LTlkMjQtNTU0Njdl/NjU1MmU2LmpwZw.jpg"
            />
            <Stack direction="column" spacing={0.3}>
              <Box
                sx={{
                  backgroundColor: "grey.200",
                  width: "fit-content",
                  maxWidth: 400,
                  py: 1.5,
                  px: 2,
                  borderRadius: 2,
                }}
              >
                Lorem ipsum dolot sit
              </Box>
              <Typography
                variant="body2"
                display="block"
                sx={{ fontWeight: "normal" }}
              >
                11:32 pm
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default ChatMessage;
