import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ChatIcon from "@mui/icons-material/Chat";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Avatar,
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
  Stack,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addToCart,
  getListingDetails,
  getSellerInfo,
} from "../../services/Listings";
import { useStores } from "../../stores/RootStore";

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
  const { userStore } = useStores();
  const param = useParams();
  const [item, setItems] = useState([]);
  const [shopName, setShopName] = useState("");
  const [images, setImages] = useState("");

  const notifyCart = () =>
    toast("Item added to cart!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
    });
  const notifyLink = () =>
    toast("Copied link to clipboard", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
    });

  useEffect(() => {
    const getSellerData = async (listingId) => {
      const response = await getSellerInfo(listingId);
      setShopName(response.data[0].shopname);
      setImages(response.data[0].images);
    };

    getListingDetails(param.itemId)
      .then((response) => {
        setItems(JSON.parse(JSON.stringify(response.data))[0]);

        getSellerData(param.itemId);
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const handleClick = (newState) => () => {
    notifyLink();
    navigator.clipboard.writeText(window.location.toString());
  };

  const handleAddCart = (item, newState) => {
    notifyCart();

    const addItemToCart = async () => {
      const response = await addToCart(userStore.id, item.id);
      const result = await response.data;
      console.log(result);
    };

    addItemToCart();
  };

  const HeadingTypoStyle = {
    color: "text.secondary",
    fontWeight: "500",
    fontSize: 20,
  };

  return (
    <>
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
              alt={item.name}
              height="auto"
              width="50%"
            />
          </ImageListItem>
        </Grid>
        <Grid item md={6} xs={12}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold">
              {item.name}
            </Typography>
            <Divider />
            {item.type !== "Design" && (
              <>
                {item.listingprice && (
                  <Typography
                    variant="h3"
                    color="primary.main"
                    fontWeight="bold"
                  >
                    ${item.listingprice.toFixed(2)}
                  </Typography>
                )}

                <Typography variant="h3" sx={HeadingTypoStyle}>
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
                <Divider />
                <Typography variant="h3" color={item.variations}>
                  <Typography variant="h3" sx={HeadingTypoStyle}>
                    Variation:
                  </Typography>
                  {item.variations}
                </Typography>
                <Divider />
              </>
            )}
            <Typography variant="h3" sx={HeadingTypoStyle}>
              Product Specifications:
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
                {item.type !== "Design" && item.type !== "Service" && (
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
                {item.type !== "Design" && item.type !== "Service" && (
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
                )}
              </Grid>
            </Grid>
            <br />
            <Divider />
            <Typography variant="h3" sx={HeadingTypoStyle}>
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {item.description}
            </Typography>
            <Divider />

            <Stack direction="row" spacing={1} mt={2}>
              {!!userStore.isLoggedIn ? (
                <>
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
                <Button
                  variant="outlined"
                  disabled
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
              )}
              <Fab size="small" color="secondary">
                <ShareIcon
                  onClick={handleClick({
                    vertical: "top",
                    horizontal: "center",
                  })}
                  color="primary"
                />
              </Fab>
            </Stack>
          </CardContent>
        </Grid>
      </Grid>
      <Divider></Divider>

      <CardHeader
        avatar={
          <Link to={`/SellerProfile`} style={{ textDecoration: "none" }}>
            <Avatar
              src={images}
              alt="profile-image"
              variant="rounded"
              shadow="sm"
              sx={{ height: "70px", width: "70px" }}
            />
          </Link>
        }
        sx={{ p: 0 }}
      />
      <Typography variant="h3">{shopName}</Typography>
    </>
  );
};
