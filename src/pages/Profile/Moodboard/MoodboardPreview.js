import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const MoodboardPreview = ({ moodboard }) => {
  return (
    <>
      <Card sx={{ boxShadow: 0 }}>
        {moodboard.moodboardItems.length > 0 ? (
          <Grid container spacing={0.5}>
            <Grid item xs={6}>
              <CardMedia
                component="img"
                height="130"
                image={moodboard.moodboardItems[0].image}
                alt={moodboard.boardName}
                sx={{
                  borderRadius: "0 !important",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={0.5}>
                {moodboard.moodboardItems.length > 1 ? (
                  <CardMedia
                    component="img"
                    height="63"
                    image={moodboard.moodboardItems[1].image}
                    alt={moodboard.boardName}
                    sx={{
                      borderRadius: "0 !important",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 63,
                      backgroundColor: "primary.lighter",
                    }}
                  />
                )}
                {moodboard.moodboardItems.length > 2 ? (
                  <CardMedia
                    component="img"
                    height="63"
                    image={moodboard.moodboardItems[2].image}
                    alt={moodboard.boardName}
                    sx={{
                      borderRadius: "0 !important",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 63,
                      backgroundColor: "primary.lighter",
                    }}
                  />
                )}
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <Box
            sx={{
              height: 130,
              backgroundColor: "primary.lighter",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                // fontWeight: "normal",
                // fontStyle: "italic",
                color: "primary.light",
              }}
              component="div"
            >
              No pins
            </Typography>
          </Box>
        )}
      </Card>
    </>
  );
};

export default MoodboardPreview;
