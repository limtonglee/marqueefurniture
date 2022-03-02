import Button from "@mui/material/Button";
import ChatIcon from '@mui/icons-material/Chat';
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Alert, Avatar, Card, CardContent,
  CardHeader, Fab, Modal, Snackbar, Typography, CardMedia, Stack
} from "@mui/material";
import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate
} from "react-router-dom";
import { itemData } from "../../data/itemData";
import { useStores } from "../../stores/RootStore";
import { Grid } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

//This is the listing page
/* 
Expansion of item details for this Done
Link of profile To be edited
URL Sharing Done
Add to cart Done
Styling 
Conditional display for the share add to cart and message - remove if not login
Add in a back button Done
Add in filter by category
*/
export const ItemDetails = () => {

  const { cartStore } = useStores();

  const { userStore } = useStores();

  const param = useParams();
  const item = itemData[param.itemId];
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const [cartState, setCartState] = React.useState({
    cartOpen: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;
  const { cartOpen } = cartState;
  const navigate = useNavigate();

  const handleClick = (newState) => () => {
    console.log("Share URL link has fired")
    navigator.clipboard.writeText(window.location.toString())
    setState({ open: true, ...newState });
  };

  const handleClose = (event, reason) => {
    if(reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  const handleCartClose = (event, reason) => {
    if(reason === "clickaway") {
      return;
    }
    setCartState({ ...cartState, cartOpen: false });
  };

  const isDesign = (item) => {
    if (item === "Design") {
      return;
    }
    return true;
  };

  const handleAddCart = (item, newState) => {
    console.log(userStore);
    cartStore.addItems(item);
    console.log("Add to cart handle has fired")
    setCartState({ cartOpen: true, ...newState });
  };

  const isLogin = (user) => {
    console.log(user)
    if (user.isLoggedIn === true) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Card>
        <CardContent key={item.key}>
            <ArrowCircleLeftIcon fontSize= "large" onClick={() => navigate(-1)} color= "primary"/>
          <Grid container spacing = {2}>
            <Grid item md = {6} xs={12} >
              <CardMedia width='auto' align='center'>
                <img
                  height='auto'
                  width='100%'
                  src={item.img}
                  srcSet={item.img}
                  alt={item.title}
                  title={item.title}
                />
              </CardMedia>
            </Grid>
            <Grid item md = {6} xs = {12} >
              <CardContent>
                <CardHeader
                avatar={
                  <Link to={`/sellerProfile`} style={{ textDecoration: 'none' }}>
                    <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                      R
                    </Avatar>
                  </Link>
                }
                title={item.author}
                sx = {{p: 0}}
                />
                <Typography variant="h1" color="text.secondary" fontWeight="bold">
                  {item.title}
                </Typography>

                <Typography variant="h3" color="text.secondary" fontWeight="bold" >
                  {isDesign(item.listingType) ? <>Price: ${item.price.toFixed(2)}</> : 'Chat with designer for more information.'}
                </Typography>

                <Typography variant="button" color="text.secondary" fontWeight="bold" >
                  "put in place the rating and stars"
                </Typography>
                <br />



                <Typography variant="h3" color="text.secondary" fontWeight="bold">
                  <LocalShippingIcon margin />
                  Shipping Provider: {item.shippingProvider}
                </Typography>

                <Typography variant="h3" color="text.secondary">
                  {item.variation}
                </Typography>

                <Typography variant="h3" color="text.secondary">
                  Product Details:
                </Typography>

                <Typography variant="overline" color="blue" fontWeight="bold">
                  <div>
                    Category: {item.category}
                    <br />
                    Brand: {item.brand}
                    <br />
                    Warranty Type: {item.warrantyType}
                    <br />
                    Parcel Size: {item.parcelSize}
                    <br />
                    Weight: {item.weight}
                    <br />
                    Stock Available: {item.stockAvailable}
                    <br />
                    Dimension: {item.dimension}
                  </div>
                </Typography>

                <Typography variant="overline" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <Stack direction="row" spacing={2}>
                {isLogin(userStore) ? <>
                  {isDesign(item.listingType) ? 
                  <>
                    <Fab size= "small" color="secondary">
                      <ShareIcon
                        onClick={handleClick({
                            vertical: 'top',
                            horizontal: 'center',
                          })
                        }
                        color= "primary"
                        />
                      <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={handleClose} 
                        autoHideDuration={1500} 
                        key={vertical + horizontal}>
                        <Alert 
                          onClose={handleClose}
                          variant= "filled"
                          severity="success"
                          sx={{ width: 'auto' }}
                        >
                          Copied to Clipboard!
                        </Alert>
                      </Snackbar>
                    </Fab>
                    <Button 
                      variant="outlined"
                      onClick={() => {
                        handleAddCart(item, {vertical: 'top',
                        horizontal: 'center'})}}
                      startIcon={<ShoppingCartIcon/>}
                    >
                      Add to cart
                    </Button>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={cartOpen}
                        onClose={handleCartClose} 
                        autoHideDuration={1500} 
                        key={vertical + horizontal}>
                        <Alert 
                          onClose={handleCartClose}
                          variant= "filled"
                          severity="success"
                          sx={{ width: 'auto' }}
                        >
                          Added to Cart!
                        </Alert>
                    </Snackbar>
                    <Button 
                      variant="outlined"
                      startIcon={<ChatIcon/>}
                      disableElevation
                      href="http://localhost:3000/chat"
                    > 
                      Chat
                    </Button>
                    </> : <>
                      <Fab size= "small" color="secondary">
                        <ShareIcon
                          onClick={handleClick({
                              vertical: 'top',
                              horizontal: 'center',
                            })
                          }
                          color= "primary"
                          />
                        <Snackbar
                          anchorOrigin={{ vertical, horizontal }}
                          open={open}
                          onClose={handleClose} 
                          autoHideDuration={1500} 
                          key={vertical + horizontal}>
                          <Alert 
                            onClose={handleClose}
                            variant= "filled"
                            severity="success"
                            sx={{ width: 'auto' }}
                          >
                            Copied to Clipboard!
                          </Alert>
                        </Snackbar>
                      </Fab>
                      <Button 
                        variant="outlined"
                        startIcon={<ChatIcon/>}
                        disableElevation
                        href="http://localhost:3000/chat"
                      > 
                        Chat
                      </Button>
                    </>
                  }
                  </> : <>
                  {isDesign(item.listingType) ? 
                  <>
                    <Fab size= "small" color="secondary">
                      <ShareIcon
                        onClick={handleClick({
                            vertical: 'top',
                            horizontal: 'center',
                          })
                        }
                        color= "primary"
                        />
                      <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={handleClose} 
                        autoHideDuration={1500} 
                        key={vertical + horizontal}>
                        <Alert 
                          onClose={handleClose}
                          variant= "filled"
                          severity="success"
                          sx={{ width: 'auto' }}
                        >
                          Copied to Clipboard!
                        </Alert>
                      </Snackbar>
                    </Fab>
                    <Button 
                      variant="outlined"
                      disabled
                      startIcon={<ShoppingCartIcon/>}
                    >
                      Add to cart
                    </Button>
                    <Button 
                      variant="outlined"
                      startIcon={<ChatIcon/>}
                      disabled
                      disableElevation
                      href="http://localhost:3000/chat"
                    > 
                      Chat
                    </Button>
                    </> : <>
                      <Fab size= "small" color="secondary">
                        <ShareIcon
                          onClick={handleClick({
                              vertical: 'top',
                              horizontal: 'center',
                            })
                          }
                          color= "primary"
                          />
                        <Snackbar
                          anchorOrigin={{ vertical, horizontal }}
                          open={open}
                          onClose={handleClose} 
                          autoHideDuration={1500} 
                          key={vertical + horizontal}>
                          <Alert 
                            onClose={handleClose}
                            variant= "filled"
                            severity="success"
                            sx={{ width: 'auto' }}
                          >
                            Copied to Clipboard!
                          </Alert>
                        </Snackbar>
                      </Fab>
                      <Button 
                        variant="outlined"
                        disabled
                        startIcon={<ChatIcon/>}
                        disableElevation
                        href="http://localhost:3000/chat"
                      > 
                        Chat
                      </Button>
                    </>
                  }
                  </>
                } 
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
