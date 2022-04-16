import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DesignOrderDict } from "../../data/designOrderDict";
import QuotationModal from "./QuotationModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DesignAction = ({ designOrderStatus, currUserType }) => {
  let navigate = useNavigate();

  const [openQuotationModal, setOpenQuotationModal] = React.useState(false);
  const [quotationIsEditing, setQuotationIsEditing] = React.useState(false);
  const [quotation, setQuotation] = React.useState("");

  const closeQuotationModal = () => {
    setQuotationIsEditing(false);
    setOpenQuotationModal(false);
  };

  const createToast = (message) => {
    // todo
    toast(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  const handleActionClick = () => {
    if (designOrderStatus.status === "Nothing") {
      navigate("/designConsultation");
    } else if (designOrderStatus.status === "Requested") {
      console.log("todo: handle issue quotation");
      setOpenQuotationModal(true);
    } else if (designOrderStatus.status === "ConsultQuoted") {
      console.log("todo: handle update quotation");
      if (designOrderStatus.consultQuotation) {
        setQuotationIsEditing(true);
        setQuotation(`${designOrderStatus.consultQuotation}`);
      }
      setOpenQuotationModal(true);
    } else if (designOrderStatus.status === "Paid") {
      console.log("todo: handle issue quotation for design package");
      setOpenQuotationModal(true);
    } else if (designOrderStatus.status === "PackageQuoted") {
      console.log("todo: handle edit quotation");
      if (designOrderStatus.packageQuotation) {
        setQuotationIsEditing(true);
        setQuotation(`${designOrderStatus.packageQuotation}`);
      }
      setOpenQuotationModal(true);
    }
  };

  console.log("designOrderStatus", designOrderStatus);
  console.log("designOrderStatus.designItems", designOrderStatus.designItems);

  return (
    <>
      <ToastContainer />
      <QuotationModal
        open={openQuotationModal}
        closeQuotationModal={closeQuotationModal}
        createToast={createToast}
        designOrderStatus={designOrderStatus}
        isEditing={quotationIsEditing}
        quotation={quotation}
        setQuotation={setQuotation}
      />
      {DesignOrderDict[designOrderStatus.status][currUserType]["action"]
        .length > 0 && (
        <>
          <Box sx={{ px: 3, py: 3, backgroundColor: "grey.100" }}>
            <Stack direction="row" spacing={3}>
              {designOrderStatus.status === "Designing" && (
                <Link
                  to="/designOrder/newDesign"
                  state={{
                    designOrderStatus: designOrderStatus, //todo: update
                    // onlyNavigateBackOne: true,
                  }}
                >
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
                    {
                      DesignOrderDict[designOrderStatus.status][currUserType][
                        "action"
                      ]
                    }
                  </Button>
                </Link>
              )}
              {designOrderStatus.status === "InReview" && (
                <Link
                  to="/designOrder/design"
                  state={{
                    design:
                      designOrderStatus.designItems[
                        designOrderStatus.designItems.length - 1
                      ],
                    onlyNavigateBackOne: true,
                  }}
                >
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
                    {
                      DesignOrderDict[designOrderStatus.status][currUserType][
                        "action"
                      ]
                    }
                  </Button>
                </Link>
              )}
              {designOrderStatus.status !== "Designing" &&
                designOrderStatus.status !== "InReview" && (
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
                    {
                      DesignOrderDict[designOrderStatus.status][currUserType][
                        "action"
                      ]
                    }
                  </Button>
                )}
            </Stack>
          </Box>
          <Divider />
        </>
      )}
    </>
  );
};

export default DesignAction;
