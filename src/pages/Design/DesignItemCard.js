import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { Link, useNavigate, useParams } from "react-router-dom";

const DesignItemCard = ({ design, hideButton }) => {
  console.log("design", design);
  let navigate = useNavigate();

  const handleViewDesign = () => {
    console.log("handleViewDesign");
    navigate("/designOrder/design");
  };

  const numPictures = () => {
    if (design.designimages1) {
      if (design.designimages2) {
        if (design.designimages3) {
          return 3;
        }
        return 2;
      }
      return 1;
    }
  };

  return (
    <>
      <Link
        to="/designOrder/design"
        onClick={(e) => (hideButton ? e.preventDefault() : undefined)}
        disabled={hideButton}
        state={{ design: design }}
      >
        <Card
          sx={{
            p: 3,
            mb: 3,
            "&:hover": {
              cursor: hideButton ? "default" : "pointer",
            },
          }}
          onClick={!hideButton ? handleViewDesign : undefined}
        >
          <Grid container spacing={2}>
            <Grid item xs={2} md={2}>
              <Avatar
                alt={`Picture`}
                // src={
                //   "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/posters-in-cozy-apartment-interior-royalty-free-image-943910360-1534189931.jpg"
                // }
                // src={
                //   design.designImages[0]
                //     ? `/api/image/${design.designImages[0]}`
                //     : null
                // }
                src={`/api/image/${design.designimages1}`}
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
                  {design.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "normal",
                    color: "grey.600",
                  }}
                >
                  {numPictures()} pictures
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "normal",
                    color: "grey.600",
                  }}
                >
                  {design.taggedProducts.length} products
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
                  {!hideButton && (
                    <>
                      {design.isCompleted === "1" ? (
                        <Button
                          variant="outlined"
                          sx={{
                            width: 160,
                            ml: 1,
                            "&.MuiButtonBase-root:hover": {
                              bgcolor: "transparent",
                              border: "1px solid rgba(46, 107, 117, 0.5)",
                            },
                            "&:hover": {
                              cursor:
                                design.isCompleted === "1"
                                  ? "default"
                                  : "pointer",
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
                      )}{" "}
                    </>
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "normal",
                      color: "grey.600",
                    }}
                  >
                    {format(Date.parse(design.datetime), "dd MMM yy hh:mm a")}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Link>
    </>
  );
};

export default DesignItemCard;
