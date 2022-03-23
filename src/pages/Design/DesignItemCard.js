import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const DesignItemCard = ({ completed, hideButton }) => {
  let navigate = useNavigate();

  const handleViewDesign = () => {
    console.log("handleViewDesign");
    navigate("/designOrder/design");
  };

  return (
    <>
      <Card
        sx={{
          p: 3,
          mb: 3,
          "&:hover": {
            cursor: hideButton ? "default" : "pointer",
          },
        }}
        onClick={!hideButton && handleViewDesign}
      >
        <Grid container spacing={2}>
          <Grid item xs={2} md={2}>
            <Avatar
              alt={`Picture`}
              src={
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/posters-in-cozy-apartment-interior-royalty-free-image-943910360-1534189931.jpg"
              }
              sx={{
                borderRadius: "10%",
                width: 70,
                height: 70,
              }}
            />
          </Grid>
          <Grid item xs={5} md={5}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Revised
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "normal",
                  color: "grey.600",
                }}
              >
                10 pictures
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "normal",
                  color: "grey.600",
                }}
              >
                11 products
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={5} md={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Stack spacing={1.5} sx={{ textAlign: "right" }}>
                {!hideButton &&
                  (completed ? (
                    <Button
                      variant="outlined"
                      sx={{
                        width: 160,
                        ml: 1,
                        "&.MuiButtonBase-root:hover": {
                          bgcolor: "transparent",
                          border: "1px solid rgba(46, 107, 117, 0.5)",
                        },
                      }}
                      disableElevation
                      disableRipple
                    >
                      Completed
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      disableElevation
                      disableRipple
                      sx={{
                        width: 160,
                        ml: 1,
                        "&.MuiButtonBase-root:hover": {
                          bgcolor: "primary.main",
                        },
                      }}
                    >
                      Pending Review
                    </Button>
                  ))}
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "normal",
                    color: "grey.600",
                  }}
                >
                  7 Jan 2022 4:30pm
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default DesignItemCard;
