import Button from "@mui/material/Button";
import * as React from "react";
import { Avatar, CardContent, CardHeader, CardMedia, Container, Fab, ImageList, Stack } from "@mui/material";
import { ImageListItem } from "@mui/material";
import { ImageListItemBar } from "@mui/material";
import { itemData } from "../../data/itemData";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useParams } from "react-router-dom";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { CardActions } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

//This is the listing page 
/* 
Expansion of item details for this Done
Link of profile Done
URL Sharing Done
Add to cart 
*/
export const ItemDetails = () => {
  const param = useParams();
  const item = itemData[param.itemId];

  const [open, setOpen] = React.useState(false);

  const handleSnack = () => {
    setOpen(true)
  }

  const handleSnackClose = (event, reason) => {
    if(reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const isDesign = (item) => {
    if(item === "Design") {
      return
    }
      return true
  }

  return (
    <>
    <Card>
      <CardContent key={item.key}>
        <CardHeader
          avatar = {
            <Link to={`/profile`} underline= "none"> 
              <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                R
              </Avatar>
            </Link>}
          title = {item.author}
          />
        <CardMedia width = 'auto' align = 'center'>
          <img
            height= 'auto'
            width= '100%'
            src= {item.img}
            srcSet={item.img}
            alt={item.title}
            title= {item.title}
          />
        </CardMedia>
        <CardContent>
          <Typography variant="h1" color="text.secondary" fontWeight="bold">
            {item.title}
          </Typography>
          
          <Typography variant= "h3" color="text.secondary" fontWeight="bold" >
              {isDesign(item.listingType) ? <>Price: {item.price}</> : 'Chat with designer for more information.'}
          </Typography>
          
          <Typography variant= "button" color="text.secondary" fontWeight="bold" >
            "put in place the rating and stars"
          </Typography>
          
          <Typography variant= "h3" color="text.secondary" fontWeight="bold" >
            Shipping Provider: {item.shippingProvider}
          </Typography>

          <Typography variant="h3" color="text.secondary" >
            Product Details:
          </Typography>
          
          <Typography variant="overline" color="blue" fontWeight="bold">
            <div>
              Category: {item.category}
              <br/>
              Brand: {item.brand}
              <br/>
              Warranty Type: {item.warrantyType}
              <br/>
              Parcel Size: {item.parcelSize}
              <br/>
              Weight: {item.weight}
              <br/>
              Stock Available: {item.stockAvailable}
              <br/>
              Variation: {item.variation}
              <br/>
              Dimension: {item.dimension}
            </div>
          </Typography>

          <Typography variant= "overline" color="text.secondary">
            {item.description}
          </Typography>


        </CardContent>
            <Fab size="small" sx={{ color: "secondary" , margin: 1}}>
              <ShareIcon onClick = {() => {
                handleSnack();
                navigator.clipboard.writeText(window.location.toString())
                }
              } />
              <Snackbar open ={open} autoHideDuration={2000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="success" sx= {{ width:'auto'}}>
                  Copied to Clipboard!
                </Alert>
                </Snackbar>
            </Fab>
            <Fab marginRight>
              <ShoppingCartIcon />
            </Fab>
            <Fab>
              <Link underline = "none" to = {`/chat`}>
                <ChatBubbleIcon />
              </Link>
            </Fab>         
        </CardContent>
      </Card>
      </>
  );
};
