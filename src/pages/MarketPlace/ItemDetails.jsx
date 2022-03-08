import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ChatIcon from "@mui/icons-material/Chat";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Alert,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Fab,
  Grid,
  ImageListItem,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import jack from "../../assets/images/jack.jpg";
import { getListingDetails } from "../../services/Listings";
import { useStores } from "../../stores/RootStore";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//This is the listing page
/* 
Expansion of item details for this Done
Link of profile To be edited
URL Sharing Done
Add to cart Done
Styling 
Conditional display for the share add to cart and message - remove if not login Done
Add in a back button Done
Add in filter by category
*/
export const ItemDetails = () => {
  const { cartStore } = useStores();

  const { userStore } = useStores();
  const param = useParams();
  const [item, setItems] = useState([]);

  const notify = () => toast("adding to cart!");

  useEffect(() => {
    getListingDetails(param.itemId)
      .then((response) => {
        setItems(JSON.parse(JSON.stringify(response.data))[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [cartState, setCartState] = useState({
    cartOpen: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;
  const { cartOpen } = cartState;
  const navigate = useNavigate();

  const handleClick = (newState) => () => {
    console.log("Share URL link has fired");
    navigator.clipboard.writeText(window.location.toString());
    setState({ open: true, ...newState });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  const handleCartClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCartState({ ...cartState, cartOpen: false });
  };

  const isDesign = (item) => {
    if (item === "Design") {
      return false;
    }
    return true;
  };

  const isService = (item) => {
    if (item === "Service") {
      return;
    }
    return true;
  };

  const handleAddCart = (item, newState) => {
    notify();
    cartStore.addItems(item);
    console.log("Add to cart handle has fired");
    setCartState({ cartOpen: true, ...newState });
  };

  const isLogin = (user) => {
    if (user.isLoggedIn === true) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Card>
        <CardContent key={item.id}>
          <ArrowCircleLeftIcon
            fontSize="large"
            onClick={() => navigate(-1)}
            color="primary"
          />
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <CardMedia width="auto" align="center">
                <img
                  height="auto"
                  width="100%"
                  src={item.image}
                  srcSet={item.image}
                  alt={item.name}
                  title={item.name}
                />
              </CardMedia>
              <ImageListItem
                key={item.image}
                sx={{
                  boxShadow: 5,
                  margin: 2,
                  padding: 0,
                  width: 75,
                  height: 75,
                }}
              >
                <img
                  src={`${item.image}?w=188&h=188&fit=crop&auto=format`}
                  srcSet={`${item.image}?w=188&h=188&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  height="auto"
                  width="50%"
                />
              </ImageListItem>
            </Grid>
            <Grid item md={6} xs={12}>
              <CardContent>
                <CardHeader
                  avatar={
                    <Link
                      to={`/SellerProfile`}
                      style={{ textDecoration: "none" }}
                    >
                      <Avatar
                        src={jack}
                        alt="profile-image"
                        variant="rounded"
                        shadow="sm"
                        sx={{ height: "70px", width: "70px" }}
                      />
                    </Link>
                  }
                  title={
                    <b>
                      <h1>{item.author}</h1>
                    </b>
                  }
                  sx={{ p: 0 }}
                />
                <br />
                <Divider />
                <br />
                <Typography
                  variant="h3"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  {item.name}
                </Typography>

                <Typography
                  variant="h3"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  {/* {isDesign(item.type) ? (
                    <>listingprice: ${item.listingprice.toFixed(2)}</>
                  ) : (
                    <></>
                  )} */}
                </Typography>
                <br />
                <Divider />
                <br />
                <Typography
                  variant="h3"
                  sx={{
                    color: "text.secondary",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Rating:
                  <br />
                </Typography>
                <Rating name="read-only" value={4.5} readOnly precision={0.5} />
                <br />
                <ListItem sx={{ p: 0 }}>
                  <ListItemAvatar>
                    <Avatar>
                      <LocalShippingIcon sx={{ color: "primary" }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Shipping Provider"
                    secondary={item.shippingprovider}
                  />
                </ListItem>
                <br />
                <Divider />
                <br />
                <Typography variant="h3" color={item.variations}>
                  <Typography variant="h3" color="text.secondary">
                    {isDesign(item.type) && isService(item.type) ? (
                      <>Variation:</>
                    ) : (
                      "Chat for more information."
                    )}
                  </Typography>
                  {isDesign(item.type) && isService(item.type) ? (
                    <>{item.variations}</>
                  ) : (
                    ""
                  )}
                </Typography>
                <br />
                <Divider />
                <br />
                <Typography variant="h3" color="text.secondary">
                  Details:
                </Typography>

                <Grid container spacing={2} column={8}>
                  <Grid item xs={4}>
                    <Typography variant="overline" color="text.secondary">
                      Categories:
                    </Typography>
                    <br />
                    <Typography variant="overline" color="text.secondary">
                      Brand:
                    </Typography>
                    <br />
                    <Typography variant="overline" color="text.secondary">
                      Warranty:
                    </Typography>
                    <br />
                    {isDesign(item.type) && isService(item.type) ? (
                      <>
                        <Typography variant="overline" color="text.secondary">
                          Parcel Size:
                        </Typography>
                        <br />
                        <Typography variant="overline" color="text.secondary">
                          Weight:
                        </Typography>
                        <br />
                        <Typography variant="overline" color="text.secondary">
                          Stock Available:
                        </Typography>
                        <br />
                        <Typography variant="overline" color="text.secondary">
                          Dimension:
                        </Typography>
                        <br />
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="overline" color="text.secondary">
                      {item.category}
                    </Typography>
                    <br />
                    <Typography variant="overline" color="text.secondary">
                      {item.brand}
                    </Typography>
                    <br />
                    <Typography variant="overline" color="text.secondary">
                      {item.warrantyinfo}
                    </Typography>
                    <br />
                    {isDesign(item.type) && isService(item.type) ? (
                      <>
                        <Typography variant="overline" color="text.secondary">
                          {item.parcelsize}
                        </Typography>
                        <br />
                        <Typography variant="overline" color="text.secondary">
                          {item.weight}
                        </Typography>
                        <br />
                        <Typography variant="overline" color="text.secondary">
                          {item.stockavailable}
                        </Typography>
                        <br />
                        <Typography variant="overline" color="text.secondary">
                          {item.dimensions}
                        </Typography>
                        <br />
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
                <br />
                <Typography
                  variant="h3"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  Description
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <Stack direction="row" spacing={2}>
                {isLogin(userStore) ? (
                  <>
                    {isDesign(item.type) ? (
                      <>
                        <Fab size="small" color="secondary">
                          <ShareIcon
                            onClick={handleClick({
                              vertical: "top",
                              horizontal: "center",
                            })}
                            color="primary"
                          />
                          <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            onClose={handleClose}
                            autoHideDuration={1500}
                            key={vertical + horizontal}
                          >
                            <Alert
                              onClose={handleClose}
                              variant="filled"
                              severity="success"
                              sx={{ width: "auto" }}
                            >
                              Copied to Clipboard!
                            </Alert>
                          </Snackbar>
                        </Fab>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            
                            handleAddCart(item, {
                              vertical: "top",
                              horizontal: "center",
                            });
                          }}
                          startIcon={<ShoppingCartIcon />}
                        >
                          Add to cart
                        </Button>
                        <Snackbar
                          anchorOrigin={{ vertical, horizontal }}
                          open={cartOpen}
                          onClose={handleCartClose}
                          autoHideDuration={1500}
                          key={vertical + horizontal}
                        >
                          <Alert
                            onClose={handleCartClose}
                            variant="filled"
                            severity="success"
                            sx={{ width: "auto" }}
                          >
                            Added to Cart!
                          </Alert>
                        </Snackbar>
                        <ToastContainer />
                        <Button
                          variant="outlined"
                          startIcon={<ChatIcon />}
                          disableElevation
                          href="http://localhost:3000/chat"
                        >
                          Chat
                        </Button>
                      </>
                    ) : (
                      <>
                        <Fab size="small" color="secondary">
                          <ShareIcon
                            onClick={handleClick({
                              vertical: "top",
                              horizontal: "center",
                            })}
                            color="primary"
                          />
                          <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            onClose={handleClose}
                            autoHideDuration={1500}
                            key={vertical + horizontal}
                          >
                            <Alert
                              onClose={handleClose}
                              variant="filled"
                              severity="success"
                              sx={{ width: "auto" }}
                            >
                              Copied to Clipboard!
                            </Alert>
                          </Snackbar>
                        </Fab>
                        <Button
                          variant="outlined"
                          startIcon={<ChatIcon />}
                          disableElevation
                          href="http://localhost:3000/chat"
                        >
                          Chat
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {isDesign(item.type) ? (
                      <>
                        <Fab size="small" color="secondary">
                          <ShareIcon
                            onClick={handleClick({
                              vertical: "top",
                              horizontal: "center",
                            })}
                            color="primary"
                          />
                          <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            onClose={handleClose}
                            autoHideDuration={1500}
                            key={vertical + horizontal}
                          >
                            <Alert
                              onClose={handleClose}
                              variant="filled"
                              severity="success"
                              sx={{ width: "auto" }}
                            >
                              Copied to Clipboard!
                            </Alert>
                          </Snackbar>
                        </Fab>
                        <Button
                          variant="outlined"
                          disabled
                          startIcon={<ShoppingCartIcon />}
                        >
                          Add to cart
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<ChatIcon />}
                          disabled
                          disableElevation
                          href="http://localhost:3000/chat"
                        >
                          Chat
                        </Button>
                      </>
                    ) : (
                      <>
                        <Fab size="small" color="secondary">
                          <ShareIcon
                            onClick={handleClick({
                              vertical: "top",
                              horizontal: "center",
                            })}
                            color="primary"
                          />
                          <ToastContainer />
                          <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            onClose={handleClose}
                            autoHideDuration={1500}
                            key={vertical + horizontal}
                          >
                            <Alert
                              onClose={handleClose}
                              variant="filled"
                              severity="success"
                              sx={{ width: "auto" }}
                            >
                              Copied to Clipboard!
                            </Alert>
                          </Snackbar>
                        </Fab>
                        <Button
                          variant="outlined"
                          disabled
                          startIcon={<ChatIcon />}
                          disableElevation
                          href="http://localhost:3000/chat"
                        >
                          Chat
                        </Button>
                      </>
                    )}
                  </>
                )}
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
