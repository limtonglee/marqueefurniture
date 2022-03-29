import {
  Button,
  Container,
  Divider,
  Grid,
  ImageList,
  Checkbox,
} from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCartItem, deleteCartItems, getCart } from "../../services/Cart";
import {
  addToCart,
  getListingDetails,
  getSellerInfo,
} from "../../services/Listings";
import { useStores } from "../../stores/RootStore";
import { getCartTotal } from "../../utils/getCartTotal";
import { getTotalPrice } from "../../utils/getTotalPrice";
import { SellerData } from "./SellerData";

import {SellerVoucher } from "./SellerVoucher";

import { useNavigate } from 'react-router-dom';


const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Cart() {
  const navigate = useNavigate();

  const { userStore } = useStores();
  const [items, setItems] = useState([]);
  const [count, setCount] = useState({});
  const [selectedItemsId, setSelectedItemsId] = useState([]);
  const [selectedVouchers, setSelectedVouchers] = useState([]);

  useEffect(() => {
    const updateListing = (result) => {
      const counts = {};
      result.forEach((x) => {
        counts[x.listingid] = (counts[x.listingid] || 0) + 1;
      });
      setCount(counts);
      for (let [key, value] of Object.entries(counts)) {
        getListingDetail(key);
      }
    };

    const getListingDetail = async (listingId) => {
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
    };

    addItemToCart();

    setCount(newCount);
  };

  const handleSelectAll = (event) => {
    let newSelectedItemsId;

    if (event.target.checked) {
      newSelectedItemsId = items.map((item) => item.id);
    } else {
      newSelectedItemsId = [];
    }

    setSelectedItemsId(newSelectedItemsId);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedItemsId.indexOf(id);
    let newSelectedItemsId = [];

    if (selectedIndex === -1) {
      newSelectedItemsId = newSelectedItemsId.concat(selectedItemsId, id);
    } else if (selectedIndex === 0) {
      newSelectedItemsId = newSelectedItemsId.concat(selectedItemsId.slice(1));
    } else if (selectedIndex === selectedItemsId.length - 1) {
      newSelectedItemsId = newSelectedItemsId.concat(
        selectedItemsId.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedItemsId = newSelectedItemsId.concat(
        selectedItemsId.slice(0, selectedIndex),
        selectedItemsId.slice(selectedIndex + 1)
      );
    }
    setSelectedItemsId(newSelectedItemsId);
    // console.log(selectedItemsId);
  };

  const handleCheckout = () => {

    const inSelectedIndex = (item) => {
      let match = false;
      selectedItemsId.forEach((element) => {
        if(element === item.id) {
          match = true;
        }
      })
      return match;
    }

    const checkoutItems = items.filter(item => inSelectedIndex(item));
    navigate('/checkout', { state: { items:checkoutItems , count:count, selectedItemsId: selectedItemsId, selectedVouchers:selectedVouchers  }})
  }

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
        <Grid container spacing={2}>
          <Grid item>
            <Checkbox
              checked={selectedItemsId.length === items.length}
              color="primary"
              indeterminate={
                selectedItemsId.length > 0 &&
                selectedItemsId.length < items.length
              }
              onChange={handleSelectAll}
            />
          </Grid>
          <Grid item>
            <Typography variant="body2" component="div">
              Products
            </Typography>
          </Grid>
        </Grid>

        <Divider />
        <br />
        <ImageList cols={1} gap={15} >
          
          {items.map((cartItem) => (
            <div key={cartItem.name}>
              <Grid container spacing={2}>
                <Grid item>
                  <Checkbox
                    checked={selectedItemsId.indexOf(cartItem.id) !== -1}
                    onChange={(event) => handleSelectOne(event, cartItem.id)}
                    value="true"
                  />
                </Grid>

                <Grid item>
                  <Link to={`/marketplace/${cartItem.id}`}>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img src={`/api/image/${cartItem.image}`} alt={cartItem.name} />
                    </ButtonBase>
                  </Link>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <SellerData listingId={cartItem.id} />

                      <Typography variant="body2" gutterBottom>
                        {cartItem.name}
                      </Typography>
                      <Typography variant="body2" >
                        Brand: {cartItem.brand}
                      </Typography>
                      <Divider sx={{marginBottom:"5px"}}/>
                      <SellerVoucher shopId={cartItem.shopid} selectedVouchers={selectedVouchers} setSelectedVouchers={setSelectedVouchers} cartItem={cartItem}  />
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
                        {!!cartItem.listingprice && (
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
                        {!!cartItem.listingprice ? (
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
            </div>
          ))}
        </ImageList>
        <Grid container mt={1} spacing={1} direction="row-reverse">
          <Grid item xs={1} m={1}>
            <Button
              size="small"
              align="right"
              variant="contained"
              onClick ={() => handleCheckout()}
            >
              Checkout
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body2" component="div">
              Cart Total: ${getCartTotal(items, count)}
            </Typography>
            <Typography variant="subtitle1" component="div"></Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
