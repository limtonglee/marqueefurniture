import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Divider from "@mui/material/Divider";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DesignOrderDict } from "../../data/designOrderDict";

const DesignAnnouncement = ({ designOrderStatus, currUserType }) => {
  return (
    <>
      {DesignOrderDict[designOrderStatus][currUserType]["statusbarTitleText"]
        .length > 0 && (
        <Link
          to="/designOrderProgress"
          state={{ designOrderStatus: designOrderStatus }}
        >
          <Box
            sx={{
              px: 3,
              py: 2,
              color: "grey.900",
              backgroundColor: "secondary.lighter",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h6" component="div">
                {
                  DesignOrderDict[designOrderStatus][currUserType][
                    "statusbarTitleText"
                  ]
                }
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "normal" }}
              >
                {
                  DesignOrderDict[designOrderStatus][currUserType][
                    "statusbarSubText"
                  ]
                }
              </Typography>
            </Box>
            <ArrowForwardIosIcon size="small" />
          </Box>
          <Divider />
        </Link>
      )}
    </>
  );
};

export default DesignAnnouncement;
