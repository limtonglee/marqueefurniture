import Button from "@mui/material/Button";
import ChatIcon from '@mui/icons-material/Chat';
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Alert, Avatar, Card, CardContent,
  CardHeader, Fab, Modal, Snackbar, Typography, CardMedia, Stack, Divider, ListItem, ListItemAvatar, ListItemText, Rating, Accordion, AccordionSummary, ImageListItem, Box
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
Conditional display for the share add to cart and message - remove if not login Done
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

  const isService = (item) => {
    if (item === "Service") {
      return;
    }
    return true;
  };

  const handleAddCart = (item, newState) => {
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
                <ImageListItem
                  key={item.img}
                  sx={{ boxShadow: 5, margin: 2, padding: 0, width: 75, height: 75 }}
                  >
                    <img
                    src={`${item.img}?w=188&h=188&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=188&h=188&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title} 
                    height = 'auto'
                    width = '50%'/>
                </ImageListItem>
            </Grid>
            <Grid item md = {6} xs = {12} >
              <CardContent>
                <CardHeader
                avatar={
                  <Link to={`/SellerProfile`} style={{ textDecoration: 'none' }}>
                    <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                      R
                    </Avatar>
                  </Link>
                }
                title={item.author}
                sx = {{p: 0}}
                />
                <br/>
                <Divider/>
                <br/>
                <Typography variant="h1" color="text.secondary" fontWeight="bold">
                  {item.title}
                </Typography>

                <Typography variant="h3" color="text.secondary" fontWeight="bold" >
                  {isDesign(item.listingType) ? <>Price: ${item.price.toFixed(2)}</> : <></>}
                </Typography>
                <br/>
                <Divider/>
                <br/>
                <Typography variant="button" sx= {{color: "text.secondary", fontWeight: "bold", fontSize: 20}}  >
                  Rating:
                  <br/>
                  <Rating name="read-only" value="4.5" readOnly precision={0.5}/>
                </Typography>
                <br/>
                <ListItem sx={{p: 0}}>
                  <ListItemAvatar>
                    <Avatar>
                      <LocalShippingIcon sx={{color: "primary"}}/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Shipping Provider" secondary= {item.shippingProvider} />
                </ListItem>
                <br/>
                <Divider />
                <br/>
                  <Typography variant="h3" color={item.variation.toString()}>
                    {isDesign(item.listingType) && isService(item.listingType) ? <>Variation: {item.variation.toString().toUpperCase()}</> : 'Chat for more information.'}                    
                  </Typography>
                <br/>
                <Divider />
                <br/>
                <Typography variant="h3" color="text.secondary">
                  Details:
                </Typography>

                <Grid container spacing={2} column={8}>
                  <Grid item xs={4}>
                    <Typography variant="overline" color="text.secondary">
                      Categories:
                    </Typography>
                    <br/>
                    <Typography variant="overline" color="text.secondary">
                      Brand:
                    </Typography>
                    <br/>
                    <Typography variant="overline" color="text.secondary">
                      Warranty:
                    </Typography>
                    <br/>
                    {isDesign(item.listingType) && isService(item.listingType) ? <>
                      <Typography variant="overline" color="text.secondary">
                        Parcel Size:
                      </Typography>
                      <br/>
                      <Typography variant="overline" color="text.secondary">
                        Weight:
                      </Typography>
                      <br/>
                      <Typography variant="overline" color="text.secondary">
                        Stock Available:
                      </Typography>
                      <br/>
                      <Typography variant="overline" color="text.secondary">
                        Dimension:
                      </Typography>
                      <br/>
                      </> : <></>}  
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="overline" color="text.secondary" >
                      {item.category}
                    </Typography>
                    <br/>
                    <Typography variant="overline" color="text.secondary" >
                      {item.brand}
                    </Typography>
                    <br/>
                    <Typography variant="overline" color="text.secondary" >
                      {item.warrantyInfo}
                    </Typography>
                    <br/>
                    {isDesign(item.listingType) && isService(item.listingType) ? <>
                      <Typography variant="overline" color="text.secondary" >
                        {item.parcelSize}
                      </Typography>
                      <br/>
                      <Typography variant="overline" color="text.secondary" >
                        {item.weight}
                      </Typography>
                      <br/>
                      <Typography variant="overline" color="text.secondary" >
                        {item.stockAvailable}
                      </Typography>
                      <br/>
                      <Typography variant="overline" color="text.secondary" >
                        {item.dimension}
                      </Typography>
                      <br/>
                      </> : <></>}
                  </Grid>
                </Grid>
                <br/>
                <Typography variant="h3" color="text.secondary" fontWeight="bold">
                  Description
                </Typography>
                <Typography variant="body1" color="text.secondary">
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
