import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const LogItem = ({ completed }) => {
  return (
    <>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={3} md={2}>
          <Typography variant="h6" gutterBottom component="div">
            6 Jan 2022
          </Typography>
        </Grid>
        <Grid item xs={5} md={5}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "normal" }}>
              Issued quotation
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "normal",
                color: "primary.light",
              }}
            >
              Designer
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4} md={5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {completed ? (
              <Button disabled variant="outlined" sx={{ width: 160 }}>
                Completed
              </Button>
            ) : (
              <Button variant="contained" sx={{ width: 160 }}>
                Pay Now
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LogItem;
