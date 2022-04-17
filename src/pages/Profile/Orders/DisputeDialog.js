// react-routers components
import { Typography } from "@mui/material";
// Soft UI Dashboard PRO React components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// @mui material components
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { createNotification } from "../../../services/Notification";
import { raiseDispute } from "../../../services/Orders";
import { useStores } from "../../../stores/RootStore";

export const DisputeDialog = ({
  disputeDialog,
  setDisputeDialog,
  currentData,
  setShowDialog,
}) => {
  //this part is for the start selling form
  const [value, setValue] = useState(5);

  const { userStore } = useStores();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const response = await raiseDispute(
      userStore.id,
      currentData.sellerid,
      currentData.id,
      data.get("comments")
    );

    if (response.status === 200) {
      console.log(response);
      setShowDialog();
      await createNotification(
        "has raised a dispute",
        "1",
        "/sellercenter",
        userStore.id,
        currentData.id
      );
    }

    handleStop();
  };

  const handleStop = () => {
    setDisputeDialog(false);
  };

  return (
    <Box component="form" noValidate>
      <Card sx={{ height: "100%" }}>
        <Dialog open={disputeDialog} onClose={handleStop} sx={{ mt: 15 }}>
          <DialogContent>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Dispute Report
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Typography variant="h6" mt={5}>
                      Report details
                    </Typography>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="comments"
                        // label="comments"
                        name="comments"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 5, mb: 2 }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Container>
          </DialogContent>
        </Dialog>
      </Card>
    </Box>
  );
};
