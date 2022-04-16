import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DesignOrderDict } from "../../data/designOrderDict";
import QuotationModal from "./QuotationModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DesignAction = ({
  designOrderStatus,
  currUserType,
  buyerId,
  sellerId,
  refreshDesignOrderStatus,
}) => {
  console.log("designOrderStatus", designOrderStatus);
  console.log(
    "designOrderStatus.design_order_status",
    designOrderStatus.design_order_status
  );
  console.log("DesignAction buyerId", buyerId);
  console.log("DesignAction sellerId", sellerId);

  useEffect(() => {
    "useEffect";
    console.log(designOrderStatus);
  }, [designOrderStatus]);

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
    if (designOrderStatus.design_order_status === "Nothing") {
      navigate("/designConsultation");
    } else if (designOrderStatus.design_order_status === "Requested") {
      console.log("todo: handle issue quotation");
      setOpenQuotationModal(true);
    } else if (designOrderStatus.design_order_status === "ConsultQuoted") {
      console.log("todo: handle update quotation");
      if (designOrderStatus.consultquotation) {
        setQuotationIsEditing(true);
        setQuotation(`${designOrderStatus.consultquotation}`);
      }
      setOpenQuotationModal(true);
    } else if (designOrderStatus.design_order_status === "Paid") {
      console.log("todo: handle issue quotation for design package");
      setOpenQuotationModal(true);
    } else if (designOrderStatus.design_order_status === "PackageQuoted") {
      console.log("todo: handle edit quotation");
      if (designOrderStatus.packagequotation) {
        setQuotationIsEditing(true);
        setQuotation(`${designOrderStatus.packagequotation}`);
      }
      setOpenQuotationModal(true);
    }
  };

  // console.log("designOrderStatus", designOrderStatus);
  // console.log("designOrderStatus.designItems", designOrderStatus.designItems);

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
        buyerId={buyerId}
        sellerId={sellerId}
        refreshDesignOrderStatus={refreshDesignOrderStatus}
      />
      {DesignOrderDict[designOrderStatus.design_order_status][currUserType][
        "action"
      ].length > 0 && (
        <>
          <Box sx={{ px: 3, py: 3, backgroundColor: "grey.100" }}>
            <Stack direction="row" spacing={3}>
              {designOrderStatus.design_order_status === "Nothing" && (
                <Link
                  to="/designConsultation"
                  state={{
                    sellerId: sellerId,
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
                      DesignOrderDict[designOrderStatus.design_order_status][
                        currUserType
                      ]["action"]
                    }
                  </Button>
                </Link>
              )}
              {designOrderStatus.design_order_status === "Designing" && (
                <Link
                  to="/designOrder/newDesign"
                  state={{
                    designOrderStatus: designOrderStatus, //todo: update
                    buyerId: buyerId,
                    sellerId: sellerId,
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
                      DesignOrderDict[designOrderStatus.design_order_status][
                        currUserType
                      ]["action"]
                    }
                  </Button>
                </Link>
              )}
              {designOrderStatus.design_order_status === "InReview" && (
                <Link
                  to="/designOrder/design"
                  state={{
                    design:
                      designOrderStatus.designItems[
                        designOrderStatus.designItems.length - 1
                      ],
                    designOrderStatus: designOrderStatus,
                    onlyNavigateBackOne: true,
                    buyerId: buyerId,
                    sellerId: sellerId,
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
                      DesignOrderDict[designOrderStatus.design_order_status][
                        currUserType
                      ]["action"]
                    }
                  </Button>
                </Link>
              )}
              {designOrderStatus.design_order_status === "Rejected" && (
                <Link
                  to="/designOrder/newDesign"
                  state={{
                    designOrderStatus: designOrderStatus, //todo: update
                    buyerId: buyerId,
                    sellerId: sellerId,
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
                      DesignOrderDict[designOrderStatus.design_order_status][
                        currUserType
                      ]["action"]
                    }
                  </Button>
                </Link>
              )}
              {designOrderStatus.design_order_status !== "Nothing" &&
                designOrderStatus.design_order_status !== "Designing" &&
                designOrderStatus.design_order_status !== "InReview" &&
                designOrderStatus.design_order_status !== "Rejected" && (
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
                      DesignOrderDict[designOrderStatus.design_order_status][
                        currUserType
                      ]["action"]
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
