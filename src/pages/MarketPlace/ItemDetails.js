import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Alert, Avatar, Card, CardContent,
  CardHeader,
  CardMedia, Fab, Snackbar, Typography
} from "@mui/material";
import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { itemData } from "../../data/itemData";
import { useStores } from "../../stores/RootStore";

//This is the listing page
/* 
Expansion of item details for this Done
Link of profile To be edited
URL Sharing Done
Add to cart 
*/
export const ItemDetails = () => {

  const { cartStore } = useStores();

  const param = useParams();
  const item = itemData[param.itemId];

  const [open, setOpen] = React.useState(false);

  const handleSnack = () => {
    setOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const isDesign = (item) => {
    if (item === "Design") {
      return;
    }
    return true;
  };

  const handleAddCart = (item) => {

    cartStore.addItems(item);
   // console.log(item);
  };

  return (
    <>
      <Card>
        <CardContent key={item.key}>
          <CardHeader
            avatar={
              <Link to={`/profile`} underline="none">
                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                  R
                </Avatar>
              </Link>
            }
            title={item.author}
          />
          <CardMedia width="auto" align="center">
            <img
              height="auto"
              width="100%"
              src={item.img}
              srcSet={item.img}
              alt={item.title}
              title={item.title}
            />
          </CardMedia>
          <CardContent>
            <Typography variant="h1" color="text.secondary" fontWeight="bold">
              {item.title}
            </Typography>

            <Typography variant="h3" color="text.secondary" fontWeight="bold">
              {isDesign(item.listingType) ? (
                <>Price: {item.price}</>
              ) : (
                "Chat with designer for more information."
              )}
            </Typography>

            <Typography
              variant="button"
              color="text.secondary"
              fontWeight="bold"
            >
              "put in place the rating and stars"
            </Typography>

            <Typography variant="h3" color="text.secondary" fontWeight="bold">
              Shipping Provider: {item.shippingProvider}
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
                Variation: {item.variation}
                <br />
                Dimension: {item.dimension}
              </div>
            </Typography>

            <Typography variant="overline" color="text.secondary">
              {item.description}
            </Typography>
          </CardContent>
          <Fab size="small" sx={{ color: "secondary", margin: 1 }}>
            <ShareIcon
              onClick={() => {
                handleSnack();
                navigator.clipboard.writeText(window.location.toString());
              }}
            />
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={handleSnackClose}
            >
              <Alert
                onClose={handleSnackClose}
                severity="success"
                sx={{ width: "auto" }}
              >
                Copied to Clipboard!
              </Alert>
            </Snackbar>
          </Fab>
          <Fab marginRight>
            <ShoppingCartIcon onClick={() => handleAddCart(item)}/>
          </Fab>
          <Fab>
            <Link underline="none" to={`/chat`}>
              <ChatBubbleIcon />
            </Link>
          </Fab>
        </CardContent>
      </Card>
    </>
  );
};
