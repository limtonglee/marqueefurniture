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
import { rateOrder } from "../../../services/Orders";
import { useStores } from "../../../stores/RootStore";
import { createNotification } from "../../../services/Notification";


export const ReviewDialog = ({ start, setStart, currentData, setShowReview }) => {
  //this part is for the start selling form
  const [value, setValue] = useState(5);

  const { userStore } = useStores();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const response =  await rateOrder(
      userStore.id,
      currentData.id,
      value,
      data.get("comments")
    );

    if(response.status === 200) {
      console.log(response);
      setShowReview();
      await createNotification(
        "has rated the order",
        "1",
        "/sellercenter",
        userStore.id,
        currentData.sellerid
      );
    }

    handleStop();
  };

  const handleStop = () => {
    setStart(false);
  };

  return (
    <Box component="form" noValidate>
      <Card sx={{ height: "100%" }}>
        <Dialog open={start} onClose={handleStop} sx={{ mt: 15 }}>
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
                  Rate Product
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Typography variant="h6" mt={5}>
                      Rating
                    </Typography>
                    <Grid item xs={12}>
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                    </Grid>
                    <Typography variant="h6" mt={5}>
                      Comments
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
