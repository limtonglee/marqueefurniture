import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Button, Container, Divider, Grid, ImageList } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCartTotal } from "../../utils/getCartTotal";
import { getTotalPrice } from "../../utils/getTotalPrice";
import { inSelectedIndex } from "../../utils/inSelectedIndex";
import { isVoucherPresent } from "../../utils/isVoucherPresent";
import { SellerData } from "../Cart/SellerData";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const items = location.state.items;
  const count = location.state.count;
  const selectedItemsId = location.state.selectedItemsId;
  const selectedVouchers = location.state.selectedVouchers;

  const handleConfirm = () => {};

  const VoucherName = ({ cartItemId }) => {
    let voucherName = "";
    selectedVouchers.forEach((voucher) => {
      if (voucher.itemId === cartItemId) {
        voucherName = voucher.name;
      }
    });
    return <>{voucherName}</>;
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
                            <VoucherName cartItemId={cartItem.id} />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <Grid item>
                      <Typography
                        variant="body2"
                        component="div"
                        align="right"
                      >
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
