import { Container, Divider, Grid, ImageList } from "@mui/material";
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
import { SellerData} from "../../Cart/SellerData";


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

  useEffect(() => {
    const getListingDetail = async (listingId) => {
      const response = await getListingDetails(listingId);
      const result = await response.data[0];
      console.log(result)

      setItems((items) => [...items, result]);
    };

    const fetchCartData = async () => {
      const response = await getOrders(userStore.id);
      const result = await response.data;
      result.forEach((x) => {
        getListingDetail(x.listingid);
      });
      setOrders(result);
    };

    fetchCartData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Divider />
        <br />
        <ImageList cols={1} gap={15}>
          {items.map((cartItem) => (
            <div key={cartItem.name}>
              <Grid container spacing={2}>
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
