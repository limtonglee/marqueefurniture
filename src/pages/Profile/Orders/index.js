import {
  Button,
  Container,
  Divider,
  Grid,
  ImageList,
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getOrders } from "../../../services/Orders";
import { useStores } from "../../../stores/RootStore";
import { getListingDetails } from "../../../services/Listings";
import { SellerData } from "../../Cart/SellerData";
import { updateOrderStatus } from "../../../services/SellerCenter";
import { format } from "date-fns";


const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Orders() {
  const navigate = useNavigate();

  const { userStore } = useStores();
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const getListingDetail = async (listingId) => {
      const response = await getListingDetails(listingId);
      const result = await response.data[0];
      // console.log(result);

      setItems((items) => [...items, result]);
    };

    const fetchOrderData = async () => {
      const response = await getOrders(userStore.id);
      const orderResult = await response.data;
      orderResult.forEach((x) => {
        getListingDetail(x.listingid);
      });
      setOrders(orderResult);
      setData(orderResult);
    };

    fetchOrderData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getItem = (listingId) => {
    const orderItem = items.find((item) => item.id === listingId);
    if (orderItem !== undefined) {
      return orderItem;
    } else {
      return {};
    }
  };

  let tabData = orders;

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    updateData(newValue);
  };

  const updateData = (value) => {
    let newData = [];
    if (value === 0) {
      newData = orders;
    } else if (value === 1) {
      newData = orders.filter((order) => order.order_status === "UNPAID");
    } else if (value === 2) {
      newData = orders.filter((order) => order.order_status === "PAID");
    } else if (value === 3) {
      newData = orders.filter((order) => order.order_status === "SHIPPING");
    } else if (value === 4) {
      newData = orders.filter((order) => order.order_status === "DELIVERED");
    } else if (value === 5) {
      newData = orders.filter((order) => order.order_status === "CANCELLED");
    } else if (value === 6) {
      newData = orders.filter(
        (order) => order.order_status === "RETURN/REFUND"
      );
    }
    setData(newData);
  };

  const handleConfirmDelivery = async (orderId) => {
    console.log(orderId);
    const response = await updateOrderStatus("DELIVERED", orderId);
    if (response.status === 200) {
      const response = await getOrders(userStore.id);
      const orderResult = await response.data;
      setOrders(orderResult);
      setData(orderResult);
    }
  };

  const handleRefund = async (orderId) => {
    console.log(orderId);
    const response = await updateOrderStatus("RETURN/REFUND", orderId);
    if (response.status === 200) {
      const response = await getOrders(userStore.id);
      const orderResult = await response.data;
      setOrders(orderResult);
      setData(orderResult);
    }
  };

  const handleCancelRefund = async (orderId) => {
    console.log(orderId);
    const response = await updateOrderStatus("PAID", orderId);
    if (response.status === 200) {
      const response = await getOrders(userStore.id);
      const orderResult = await response.data;
      setOrders(orderResult);
      setData(orderResult);
    }
  };


  return (
    <Container>
      <Typography variant="h3" fontWeight="bold">
        My Orders
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
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab label="All" />
          <Tab label="Unpaid" />
          <Tab label="Paid" />
          <Tab label="Shipping" />
          <Tab label="Delivered" />
          <Tab label="Cancelled" />
          <Tab label="Return/Refund" />
        </Tabs>
        <Divider />
        <br />
        <ImageList cols={1} gap={15}>
          {data
            .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
            .map((orderItem) => (
              <div key={orderItem.id}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Link
                      to={`/marketplace/${getItem(orderItem.listingid).id}`}
                    >
                      <ButtonBase sx={{ width: 128, height: 128 }}>
                        {getItem(orderItem.listingid).image !== undefined && (
                          <Img
                            src={`/api/image/${
                              getItem(orderItem.listingid).image
                            }`}
                            alt={getItem(orderItem.listingid).name}
                          />
                        )}
                      </ButtonBase>
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        {items.length > 0 &&
                          orderItem.listingid !== undefined && (
                            <SellerData
                              listingId={getItem(orderItem.listingid).id}
                            />
                          )}

                        <Typography variant="body2" gutterBottom>
                          {getItem(orderItem.listingid).name}
                        </Typography>
                        <Typography variant="body2">
                          Brand: {getItem(orderItem.listingid).brand}
                        </Typography>
                        <Typography variant="body2">
                          Order Status: {orderItem.order_status}
                        </Typography>
                        <Typography variant="body2">
                          Order time: {format(Date.parse(orderItem.datetime), "dd/MM/yyyy HH:MM")}
                        </Typography>
                        <Grid
                          item
                          xs={12}
                          container
                          spacing={1}
                          direction="row-reverse"
                          sx={{ marginTop: "5px" }}
                        >
                          {orderItem.order_status === "SHIPPING" && (
                            <>
                              <Grid item>
                                <Button
                                  variant="contained"
                                  sx={{ width: "150px" }}
                                  onClick={() =>
                                    handleConfirmDelivery(orderItem.id)
                                  }
                                >
                                  Confirm Delivery
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  variant="outlined"
                                  sx={{ width: "150px" }}
                                  onClick={() =>
                                    handleRefund(orderItem.id)
                                  }
                                >
                                  Refund
                                </Button>
                              </Grid>
                            </>
                          )}
                          {orderItem.order_status === "DELIVERED" && (
                            <>
                              <Grid item>
                                <Button
                                  variant="contained"
                                  sx={{ width: "150px" }}
                                >
                                  Rate
                                </Button>
                              </Grid>
                            </>
                          )}
                          {orderItem.order_status === "CANCELLED" && (
                            <>
                              <Grid item>
                                <Button
                                  variant="contained"
                                  sx={{ width: "150px" }}
                                >
                                  Cancelled details
                                </Button>
                              </Grid>
                            </>
                          )}
                              {orderItem.order_status === "RETURN/REFUND" && (
                            <>
                              <Grid item>
                                <Button
                                  variant="outlined"
                                  sx={{ width: "150px" }}
                                  onClick={() =>
                                    handleCancelRefund(orderItem.id)
                                  }
                                >
                                  Undo
                                </Button>
                              </Grid>
                            </>
                          )}
                          <Grid item>
                            <Button variant="outlined" sx={{ width: "150px" }}>
                              Contact Seller
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} direction="row">
                          <Grid item>
                            <Typography
                              variant="body2"
                              gutterBottom
                            ></Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={2} >
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
                          {orderItem.quantity}
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
                          {orderItem.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider variant="middle" />
              </div>
            ))}
        </ImageList>
      </Paper>
    </Container>
  );
}
