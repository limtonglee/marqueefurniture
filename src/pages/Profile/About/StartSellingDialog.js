// react-routers components
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
// Soft UI Dashboard PRO React components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// @mui material components
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useStores } from "../../../stores/RootStore";


export const StartSellingDialog = ({ start, setStart ,setShopName }) => {
  //this part is for the start selling form

  const { userStore } = useStores();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // setShopName(data.get("shopname"))
    // userStore.setShop(data.get("shopname"));
    // userStore.setIsSeller();
    // userStore.setUserWebLink(data.get("website"));
    handleStop();
  };

  const handleStop = () => {
    setStart(false);
  };

  return (
    <Box component="form" noValidate sx={{ mt: 3 }}>
      <Card sx={{ height: "100%" }}>
        <Dialog open={start} onClose={handleStop}>
          <DialogContent>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Create Shop Profile
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 10 }}
                >
                  <Grid container spacing={2}>
                    <Typography variant="h6">Shop Name</Typography>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="shopname"
                        label="Shop Name"
                        name="shopname"
                        autoComplete="shopname"
                      />
                    </Grid>
                    <Typography variant="h6" mt={5}>
                      Shop Website
                    </Typography>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="web"
                        label="Shop Website"
                        name="web"
                        autoComplete="website"
                      />
                    </Grid>
                    <Typography variant="h6" mt={5}>
                      Shop Description
                    </Typography>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        multiline
                        rows={4}
                        name="description"
                        label="Shop Description"
                        id="description"
                        autoComplete="description"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 5, mb: 8 }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </Box>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleStop}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Box>
  );
};
