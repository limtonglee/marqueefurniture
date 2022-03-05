import { Button, Container, Divider, Grid, ImageList } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { toJS } from "mobx";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
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
  const { cartStore } = useStores();
  const [items, setItems] = useState(toJS(cartStore.getItems()));

  const handleDeleteOneItem = (itemId) => {
    console.log("removing itemID " + itemId);

    cartStore.removeItems(itemId);
    setItems(toJS(cartStore.getItems()));
  };

  const handleRemoveOneItem = (itemId) => {
    cartStore.clearOneItem(itemId);
    setItems(toJS(cartStore.getItems()));
  };

  const handleAddOneItem = (itemId) => {
    cartStore.addItemCount(itemId);
    setItems(toJS(cartStore.getItems()));
  };

  const isDesign = (item) => {
    if (item === "Design") {
      return;
    }
    return true;
  };

  return (
    <Container>
      <Typography variant="h3" fontWeight="bold">
        Shopping Cart
      </Typography>

      {/* <Button
        align="right"
        onClick={handleDeleteAll}
        endIcon={<DeleteOutlineIcon />}
      >
        Remove all items
      </Button> */}
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
                      <Img src={cartItem.img} alt={cartItem.title} />
                    </ButtonBase>
                  </Link>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="body1" component="div">
                        Seller: {cartItem.author}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Item name: {cartItem.title}
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
                        {isDesign(cartItem.listingType) ? (
                          <>${cartItem.price.toFixed(2)}</>
                        ) : (
                          "Chat with designer for more information."
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
                      {cartItem.itemQuantity}
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
                        {isDesign(cartItem.listingType) ? (
                          <>
                            $
                            {getTotalPrice(
                              cartItem.price,
                              cartItem.itemQuantity
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
                      onClick={() => handleDeleteOneItem(cartItem.id)}
                    >
                      Delete
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
