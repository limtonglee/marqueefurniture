import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Container, ImageList } from '@mui/material';
import { cartData } from "../../data/cartData";
import { Link } from "react-router-dom";
import { useStores } from "../../stores/RootStore";
import { toJS } from 'mobx';

let cartItems = cartData

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function Cart() {

  const { cartStore } = useStores();

  const items = toJS(cartStore.getItems());
  console.log("cartstore items : " + items);
  console.log(items);


  return (
    <Container>"
      <Typography variant="h1" fontWeight="bold">
        My Cart
      </Typography>
      <br />
      <Paper sx={{
        p: 2,
        margin: 'auto',
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}>
        <ImageList cols = {1} gap ={15}>
          {items.map((cartItem) => (
          <Grid container spacing={2}>
            <Grid item>
              <Link to={`/marketplace/${cartItem.id}`}>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img src= {cartItem.img} alt={cartItem.title} />
                </ButtonBase>
              </Link>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
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
                  <Typography sx={{ cursor: 'pointer' }} variant="body2">
                    Remove
                  </Typography>
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