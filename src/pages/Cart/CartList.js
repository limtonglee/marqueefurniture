import { Button, Container, Divider, Grid, ImageList } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCartItem, deleteCartItems, getCart } from "../../services/Cart";
import { addToCart, getListingDetails } from "../../services/Listings";
import { useStores } from "../../stores/RootStore";
import { getCartTotal } from "../../utils/getCartTotal";
import { getTotalPrice } from "../../utils/getTotalPrice";


const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Cart() {
  const { userStore } = useStores();
  const [items, setItems] = useState([]);
  const [count, setCount] = useState({});

  useEffect(() => {
    const updateListing = (result) => {
      const counts = {};
      result.forEach((x) => {
        counts[x.listingid] = (counts[x.listingid] || 0) + 1;
      });
      console.log(counts);
      setCount(counts);
      for (let [key, value] of Object.entries(counts)) {
        console.log(key, value);
        getListingDetail(key);
      }
    };

    const getListingDetail = async (listingId) => {
      console.log("called");
      const response = await getListingDetails(listingId);
      const result = await response.data[0];

      setItems((items) => [...items, result]);
    };

    const fetchCartData = async () => {
      const response = await getCart(userStore.id);
      const result = await response.data;

      updateListing(result);
    };

    fetchCartData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //deleting all items from database
  const handleDeleteItem = (itemId) => {
    const removeItems = async () => {
      const response = await deleteCartItems(userStore.id, itemId);
      const result = await response.data;
      console.log(result);
    };

    removeItems();

    let newCount = {};
    for (let [key, value] of Object.entries(count)) {
      if (parseInt(key) === itemId) {
        const newItems = items.filter((item) => item.id !== itemId);
        setItems(newItems);
      } else {
        newCount[parseInt(key)] = parseInt(value);
      }
    }
    setCount(newCount);
  };

  //delete one item from database
  const handleRemoveOneItem = (itemId) => {
    const removeItem = async () => {
      const response = await deleteCartItem(userStore.id, itemId);
      const result = await response.data;
      console.log(result);
    };

    removeItem();

    let newCount = {};
    for (let [key, value] of Object.entries(count)) {
      if (parseInt(key) === itemId) {
        const newValue = parseInt(value) - 1;
        if (newValue === 0) {
          const newItems = items.filter((item) => item.id !== itemId);
          setItems(newItems);
        } else {
          newCount[parseInt(key)] = newValue;
        }
      } else {
        newCount[parseInt(key)] = parseInt(value);
      }
    }
    setCount(newCount);
  };

  const handleAddOneItem = (itemId) => {
    let newCount = {};
    for (let [key, value] of Object.entries(count)) {
      if (parseInt(key) === itemId) {
        const newValue = parseInt(value) + 1;
        newCount[parseInt(key)] = newValue;
      } else {
        newCount[parseInt(key)] = parseInt(value);
      }
    }

    const addItemToCart = async () => {
      const response = await addToCart(userStore.id, itemId);
      const result = await response.data;
      console.log(result);
    };

    addItemToCart();

    setCount(newCount);
  };

  return (
    <Container>
      <Typography variant="h3" fontWeight="bold">
        Shopping Cart
      </Typography>

      <br />
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <ImageList cols={1} gap={15}>
          {items.map((cartItem) => (
            <>
              <Grid container spacing={2}>
                <Grid item>
                  <Link to={`/marketplace/${cartItem.id}`}>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img src={cartItem.image} alt={cartItem.name} />
                    </ButtonBase>
                  </Link>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      {/* <Typography gutterBottom variant="body1" component="div">
                        Seller: {cartItem.author}
                      </Typography> */}
                      <Typography variant="body2" gutterBottom>
                        Item name: {cartItem.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Brand: {cartItem.brand}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid item>
                      <Typography variant="body2" component="div">
                        Unit Price:
                      </Typography>
                      <Typography
                        align="center"
                        variant="body2"
                        component="div"
                      >
                        {cartItem.type !== "Design" && (
                          <>${cartItem.listingprice.toFixed(2)}</>
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid item>
                      <Button
                        size="small"
                        onClick={() => handleRemoveOneItem(cartItem.id)}
                      >
                        -
                      </Button>
                      {count[cartItem.id]}
                      <Button
                        size="small"
                        onClick={() => handleAddOneItem(cartItem.id)}
                      >
                        +
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid item>
                      <Typography variant="body2" component="div">
                        Item Total:
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        align="center"
                        component="div"
                      >
                        {cartItem.type !== "Design" ? (
                          <>
                            $
                            {getTotalPrice(
                              cartItem.listingprice,
                              count[cartItem.id]
                            )}
                          </>
                        ) : (
                          "Chat with designer for more information."
                        )}
                      </Typography>
                    </Grid>
                    <Button
                      size="small"
                      align="right"
                      onClick={() => handleDeleteItem(cartItem.id)}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Divider variant="middle" />
            </>
          ))}
        </ImageList>
        <Grid container spacing={2} direction="row-reverse">
          <Grid item xs={2}>
            <Typography variant="body2" component="div">
              Cart Total: ${getCartTotal(items)}
            </Typography>
            <Typography variant="subtitle1" component="div"></Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
