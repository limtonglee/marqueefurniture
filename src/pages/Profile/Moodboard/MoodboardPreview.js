import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const MoodboardPreview = ({ moodboard }) => {
  return (
    <>
      <Card>
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
          <h1>no pins yet</h1>
        )}
      </Card>
    </>
  );
};

export default MoodboardPreview;
