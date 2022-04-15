import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DesignOrderDict } from "../../data/designOrderDict";

const DesignAction = ({ designOrderStatus, currUserType }) => {
  let navigate = useNavigate();

  const handleActionClick = () => {
    if (designOrderStatus === "Nothing") {
      navigate("/designConsultation");
    } else if (designOrderStatus === "Requested") {
      console.log("todo: handle issue quotation");
    } else if (designOrderStatus === "Paid") {
      console.log("todo: handle issue quotation for design package");
    } else if (designOrderStatus === "PackageQuoted") {
      console.log("todo: handle edit quotation");
    } else if (designOrderStatus === "Designing") {
      console.log("todo: handle add design package");
    }
  };

  return (
    <>
      {DesignOrderDict[designOrderStatus][currUserType]["action"].length >
        0 && (
        <>
          <Box sx={{ px: 3, py: 3, backgroundColor: "grey.100" }}>
            <Stack direction="row" spacing={3}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "grey.200",
                  },
                }}
                onClick={handleActionClick}
              >
                {DesignOrderDict[designOrderStatus][currUserType]["action"]}
              </Button>
            </Stack>
          </Box>
          <Divider />
        </>
      )}
    </>
  );
};

export default DesignAction;
