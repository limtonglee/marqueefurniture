import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import { useStores } from "../../stores/RootStore";
import * as socket from "../../services/socket";
import * as designEngagementAPI from "../../services/DesignEngagement";

const QuotationModal = ({
  open,
  closeQuotationModal,
  createToast,
  designOrderStatus,
  isEditing,
  quotation,
  setQuotation,
  buyerId,
  sellerId,
  refreshDesignOrderStatus,
}) => {
  const { userStore } = useStores();

  const modalStyles = {
    wrapper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      minWidth: 350,
      borderRadius: 2,
    },
    contents: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px",
      marginBottom: "15px",
      justifyContent: "flex-start",
    },
    buttons: {
      display: "flex",
      justifyContent: "end",
    },
  };

  // const [quotation, setQuotation] = useState("");
  const [quotationError, setQuotationError] = useState(false);
  const [quotationHelperText, setQuotationHelperText] = useState("");

  const handleQuotation = (event) => {
    setQuotation(event.target.value);
  };

  const displayQuotationError = () => {
    setQuotationError(true);
    setQuotationHelperText("Please fill in the quotation");
  };

  const prepareToUpdate = () => {
    setQuotation(`${designOrderStatus.consultquotation}`);
    setQuotation(`${designOrderStatus.packagequotation}`);
  };

  const prepareToCreate = () => {
    setQuotation("");
  };

  const prepareTextFields = () => {
    isEditing ? prepareToUpdate() : prepareToCreate();
    setQuotationError(false);
    setQuotationHelperText("");
  };

  useEffect(() => {
    prepareTextFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    prepareTextFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designOrderStatus]);

  const updateConsultationQuotationAPI = async (consultQuotation) => {
    console.log("QM108 designOrderStatus.id", designOrderStatus.id);
    try {
      const res = await designEngagementAPI.updateConsultationQuotation(
        designOrderStatus.id,
        consultQuotation
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log("updateConsultationQuotationAPI data", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatePackageQuotationAPI = async (packageQuotation) => {
    console.log("QM123 designOrderStatus.id", designOrderStatus.id);
    try {
      const res = await designEngagementAPI.updatePackageQuotation(
        designOrderStatus.id,
        packageQuotation
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log("updatePackageQuotationAPI data", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const createDesignLogAPI = async (dateTime, description, role, orderId) => {
    try {
      const res = await designEngagementAPI.createDesignLog(
        dateTime,
        description,
        role,
        orderId
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateDesignOrderStatusAPI = async (newStatus) => {
    try {
      const res = await designEngagementAPI.updateDesignOrderStatus(
        buyerId,
        sellerId,
        newStatus
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const createQuotation = async () => {
    // console.log("createMoodboard");

    if (quotation.length === 0) {
      displayQuotationError();
    } else {
      const timestamp = new Date();
      if (designOrderStatus.design_order_status === "Requested") {
        await updateConsultationQuotationAPI(quotation);
        await updateDesignOrderStatusAPI("ConsultQuoted");
        await createDesignLogAPI(
          timestamp,
          "Issued consultation quotation",
          "Designer",
          designOrderStatus.id
        );
      } else {
        await updatePackageQuotationAPI(quotation);
        await updateDesignOrderStatusAPI("PackageQuoted");
        await createDesignLogAPI(
          timestamp,
          "Issued package quotation",
          "Designer",
          designOrderStatus.id
        );
      }

      socket.bumpDesignOrderStatusRefresh(buyerId);

      prepareTextFields();
      closeQuotationModal();
      createToast("Created quotation");
      refreshDesignOrderStatus();
    }
  };

  const updateQuotation = async () => {
    if (quotation.length === 0) {
      displayQuotationError();
    } else {
      // todo: pay updatequotation -> change designOrderStatus
      // todo: logs

      const timestamp = new Date();
      if (designOrderStatus.design_order_status === "ConsultQuoted") {
        await updateConsultationQuotationAPI(quotation);
        await updateDesignOrderStatusAPI("ConsultQuoted");
        await createDesignLogAPI(
          timestamp,
          "Updated consultation quotation",
          "Designer",
          designOrderStatus.id
        );
      } else {
        await updatePackageQuotationAPI(quotation);
        await updateDesignOrderStatusAPI("PackageQuoted");
        await createDesignLogAPI(
          timestamp,
          "Updated package quotation",
          "Designer",
          designOrderStatus.id
        );
      }

      socket.bumpDesignOrderStatusRefresh(buyerId);

      prepareTextFields();
      closeQuotationModal();
      createToast("Updated quotation");
      refreshDesignOrderStatus();
    }
  };

  const payQuotation = async () => {
    // todo: pay quotation -> change designOrderStatus
    // todo: logs
    const timestamp = new Date();
    if (designOrderStatus.design_order_status === "ConsultQuoted") {
      await updateDesignOrderStatusAPI("Paid");
      await createDesignLogAPI(
        timestamp,
        "Paid for consultation quotation",
        "Customer",
        designOrderStatus.id
      );
    } else {
      await updateDesignOrderStatusAPI("Designing");
      await createDesignLogAPI(
        timestamp,
        "Paid for package quotation",
        "Customer",
        designOrderStatus.id
      );
    }

    socket.bumpDesignOrderStatusRefresh(sellerId);

    prepareTextFields();
    closeQuotationModal();
    createToast("Paid quotation");
    refreshDesignOrderStatus();
  };

  const quotationDict = {
    Requested: "consultation",
    ConsultQuoted: "consultation",
    Paid: "design package",
    PackageQuoted: "design package",
  };

  return (
    <>
      {userStore.isDesigner ? (
        <Modal
          open={open}
          onClose={() => {
            prepareTextFields();
            closeQuotationModal();
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyles.wrapper}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {isEditing ? (
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit quotation
                </Typography>
              ) : (
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Issue quotation
                </Typography>
              )}

              <IconButton aria-label="delete" onClick={closeQuotationModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Box>
                <Typography variant="subtitle1" gutterBottom component="div">
                  Quotation for{" "}
                  {quotationDict[designOrderStatus.design_order_status]}
                </Typography>
                <TextField
                  id="outlined--static"
                  placeholder="Enter quotation..."
                  value={quotation}
                  onChange={handleQuotation}
                  sx={{ width: "100%" }}
                  size="small"
                  required
                  error={quotationError}
                  helperText={quotationHelperText}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Stack>
            <Box>
              {isEditing ? (
                <Button
                  size="small"
                  variant="contained"
                  sx={{ width: "100%", mt: 3 }}
                  onClick={updateQuotation}
                >
                  Update
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  sx={{ width: "100%", mt: 3 }}
                  onClick={createQuotation}
                >
                  Create
                </Button>
              )}
            </Box>
          </Box>
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={() => {
            prepareTextFields();
            closeQuotationModal();
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyles.wrapper}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Review Quotation
              </Typography>
              <IconButton aria-label="delete" onClick={closeQuotationModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Box>
                <Typography variant="subtitle1" gutterBottom component="div">
                  Quotation for{" "}
                  {quotationDict[designOrderStatus.design_order_status]}
                </Typography>
                <TextField
                  id="outlined--static"
                  placeholder="Enter quotation..."
                  value={quotation}
                  onChange={handleQuotation}
                  sx={{ width: "100%" }}
                  size="small"
                  required
                  error={quotationError}
                  helperText={quotationHelperText}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  disabled
                />
              </Box>
            </Stack>
            <Box>
              <Button
                size="small"
                variant="contained"
                sx={{ width: "100%", mt: 3 }}
                onClick={payQuotation}
              >
                Pay
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default QuotationModal;
