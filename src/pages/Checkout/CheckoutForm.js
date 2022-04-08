import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Container, Divider, Grid, ImageList } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteCartItems } from "../../services/Cart";
import { checkout, payment } from "../../services/Checkout";
import { getSellerInfo } from "../../services/Listings";
import { useStores } from "../../stores/RootStore";
import { getCartTotal } from "../../utils/getCartTotal";
import { getTotalPrice } from "../../utils/getTotalPrice";
import { inSelectedIndex } from "../../utils/inSelectedIndex";
import { getVoucherId, isVoucherPresent } from "../../utils/isVoucherPresent";
import { SellerData } from "../Cart/SellerData";
import { CARD_OPTIONS } from "./CardOptions";

const notifyCheckout = () =>
  toast("SUCCESS! Redirecting to orders page...", {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Checkout({
  items,
  count,
  selectedItemsId,
  selectedVouchers,
}) {
  const navigate = useNavigate();
  const { userStore } = useStores();
  // const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("no message");
  const [editAddress, setEditAddress] = useState(false);
  const [address, setAddress] = useState(userStore.address);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleConfirm = async () => {
    console.log("items");

    // console.log(items);
    if (paymentMethod === "COD") {
      items.forEach(async (item) => {
        await performCheckout(item);
      });
      notifyCheckout();
    }
    if (paymentMethod === "CC") {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (!error) {
        try {
          const { id } = paymentMethod;

          const amount = getCartTotal(
            items.filter((item) => inSelectedIndex(item, selectedItemsId)),
            count,
            selectedVouchers
          );

          const response = await payment(amount, id);

          let result = "";

          if (response.data.success) {
            console.log("Successful payment");
            items.forEach(async (item) => {
              result = await performCheckout(item);
            });
            notifyCheckout();
          }
          console.log("Result: " + result);
        } catch (error) {
          console.log("Error", error);
        }
      } else {
        console.log(error.message);
      }
    }

    setTimeout(() => {
      navigate("/profile/orders", { state: { redirect: "cart" } });
    }, 4000);
  };

  const performCheckout = async (item) => {
    const price = getTotalPrice(
      item.listingprice - isVoucherPresent(item.id, selectedVouchers),
      count[item.id]
    );
    const voucherId = getVoucherId(item.id, selectedVouchers);
    const sellerResponse = await getSellerInfo(item.id);
    const sellerId = sellerResponse.data[0].userid;
    const response = await checkout(
      address,
      message,
      price,
      sellerId,
      userStore.id,
      item.id,
      voucherId,
      count[item.id],
      paymentMethod
    );
    if (response.status === 200) {
      const deleteItem = await deleteCartItems(userStore.id, item.id);
      console.log(deleteItem);
    }
  };

  const VoucherName = ({ cartItemId }) => {
    let voucherName = "";
    selectedVouchers.forEach((voucher) => {
      if (voucher.itemId === cartItemId) {
        voucherName = voucher.name;
      }
    });
    return <>{voucherName}</>;
  };

  const handleChange = (event, newValue) => {
    setPaymentMethod(newValue);
  };

  const handleAddressChange = (event) => {
    // console.log(event.target.value);
    setAddress(event.target.value);
  };
  const handleMessageChange = (event) => {
    // console.log(event.target.value);
    setMessage(event.target.value);
  };

  return (
    <Container>
      <Typography variant="h3" fontWeight="bold">
        Checkout
      </Typography>
      <br />

      <ArrowCircleLeftIcon
        fontSize="large"
        onClick={() => navigate(-1)}
        color="primary"
      />
      <Grid container mt={1} spacing={1} direction="row" alignItems="center">
        {!editAddress ? (
          <>
            <Grid item m={1}>
              <Typography variant="h5" component="div">
                Delivery address: {address}
              </Typography>
            </Grid>
            <Grid item xs={1} m={1}>
              <EditIcon
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  setEditAddress(true);
                }}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item m={1}>
              <Typography variant="h5" component="div">
                Delivery address:
              </Typography>
            </Grid>
            <Grid item xs={4} m={1}>
              <TextField
                variant="standard"
                id="address"
                name="address"
                defaultValue={address}
                onChange={handleAddressChange}
                fullWidth
                required
              ></TextField>
            </Grid>
            <Grid item xs={1} m={1}>
              <EditIcon
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  setEditAddress(false);
                }}
              />
            </Grid>
          </>
        )}
      </Grid>

      <Paper
        sx={{
          p: 2,
          margin: "auto",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="body2" component="div">
              Products
            </Typography>
          </Grid>
        </Grid>

        <Divider />
        <br />
        <ImageList cols={1} gap={15}>
          {items.map((cartItem) => (
            <div key={cartItem.name}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Link to={`/marketplace/${cartItem.id}`}>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img
                        src={`/api/image/${cartItem.image}`}
                        alt={cartItem.name}
                      />
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
                      <Typography variant="body2">
                        Brand: {cartItem.brand}
                      </Typography>
                      <Divider sx={{ marginBottom: "5px" }} />
                      <Grid container spacing={2} direction="row">
                        <Grid item>
                          <Typography variant="body2" gutterBottom>
                            Voucher Applied:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" gutterBottom>
                            <VoucherName cartItemId={cartItem.id} />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <Grid item>
                      <Typography variant="body2" component="div" align="right">
                        Unit Price:
                      </Typography>
                      {isVoucherPresent(cartItem.id, selectedVouchers) === 0 ? (
                        <Typography
                          align="right"
                          variant="body2"
                          component="div"
                        >
                          {!!cartItem.listingprice && (
                            <>${cartItem.listingprice.toFixed(2)}</>
                          )}
                        </Typography>
                      ) : (
                        <>
                          <Typography
                            align="right"
                            variant="body2"
                            component="div"
                            sx={{ textDecoration: "line-through" }}
                          >
                            {!!cartItem.listingprice && (
                              <>${cartItem.listingprice.toFixed(2)}</>
                            )}
                          </Typography>

                          <Typography
                            align="right"
                            variant="body2"
                            component="div"
                          >
                            {!!cartItem.listingprice && (
                              <>
                                $
                                {(
                                  cartItem.listingprice -
                                  isVoucherPresent(
                                    cartItem.id,
                                    selectedVouchers
                                  )
                                ).toFixed(2)}
                              </>
                            )}
                          </Typography>
                        </>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <Grid item>
                      <Typography
                        variant="body2"
                        component="div"
                        align="center"
                      >
                        Quantity:
                      </Typography>
                      <Typography
                        align="center"
                        variant="body2"
                        component="div"
                      >
                        {count[cartItem.id]}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={1}>
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
                              cartItem.listingprice -
                                isVoucherPresent(cartItem.id, selectedVouchers),
                              count[cartItem.id]
                            )}
                          </>
                        ) : (
                          "Chat with designer for more information."
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider variant="middle" />
            </div>
          ))}
        </ImageList>
        <Grid container mt={1} spacing={1} alignItems="center" direction="row">
          <Grid item xs={1} m={1}>
            <Typography variant="subtitle2" component="div">
              Payment methods:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <ToggleButtonGroup
              value={paymentMethod}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="COD">Cash on Delivery</ToggleButton>
              <ToggleButton value="CC">Credit card</ToggleButton>
              {/* <ToggleButton value="MFCoins">MF coins</ToggleButton> */}
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        {!!(paymentMethod === "CC") && (
          <Grid
            container
            mt={1}
            spacing={1}
            alignItems="center"
            direction="row"
          >
            <Grid item xs={1} m={1}>
              <Typography variant="subtitle2" component="div">
                C.C. Info:
              </Typography>
            </Grid>
            <Grid item xs={6} m={1}>
              <CardElement options={CARD_OPTIONS} />
            </Grid>
          </Grid>
        )}
        <Grid container mt={1} spacing={1} alignItems="center" direction="row">
          <Grid item xs={1} m={1}>
            <Typography variant="subtitle2" component="div">
              Message:
            </Typography>
          </Grid>
          <Grid item xs={4} m={1}>
            <TextField
              variant="standard"
              id="message"
              name="message"
              onChange={handleMessageChange}
              fullWidth
              required
            ></TextField>
          </Grid>
        </Grid>

        <Grid container mt={1} spacing={1} direction="row-reverse">
          <Grid item xs={1} m={1}>
            <Button
              size="small"
              align="right"
              variant="contained"
              onClick={() => handleConfirm()}
            >
              Confirm
            </Button>
            <ToastContainer />
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body2" component="div">
              Order Total: $
              {getCartTotal(
                items.filter((item) => inSelectedIndex(item, selectedItemsId)),
                count,
                selectedVouchers
              )}
            </Typography>
            <Typography variant="subtitle1" component="div"></Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
