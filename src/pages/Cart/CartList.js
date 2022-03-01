import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Container, ImageList } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { Observer } from "mobx-react";

import { cartData } from "../../data/cartData";
import { Link } from "react-router-dom";
import { useStores } from "../../stores/RootStore";
import { toJS } from "mobx";

import { useState } from "react";

let cartItems = cartData;

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Cart() {
  const { cartStore } = useStores();
  const [items, setItems] = useState(toJS(cartStore.getItems()));

  console.log("cartstore items : " + items);
  console.log(items);

  const handleDeleteAll = () => {
    cartStore.clearAllItems();
    setItems([]);
  };

  const handleDeleteOneItem = (itemId) => {
    console.log("removing itemID " + itemId);

    cartStore.clearOneItem(itemId);
    setItems(toJS(cartStore.getItems()));
  };

  const handleDeleteAllItems = (itemId) => {};

  return (
      <Container>
        <Typography variant="h1" fontWeight="bold">
          My Cart
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
          <Button
            align="right"
            onClick={handleDeleteAll}
            endIcon={<DeleteOutlineIcon />}
          >
            Remove all
          </Button>
          <ImageList cols={1} gap={15}>
            {items.map((cartItem) => (
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
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {cartItem.author}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Item: {cartItem.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Brand: {cartItem.brand}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        align="right"
                        onClick={() => handleDeleteOneItem(cartItem.id)}
                        endIcon={<DeleteOutlineIcon />}
                      >
                        Remove item
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                      {cartItem.price}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </ImageList>
        </Paper>
      </Container>
  );
}
