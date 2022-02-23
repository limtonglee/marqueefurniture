import * as React from "react";
import { useState } from 'react'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from 'react-router-dom'

export default function StartSelling() {

  const [shopname, setShopname] = useState('')
  const [website, setWebsite] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
     if (shopname && website && description) {
      fetch('http://localhost:8000/sellers', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ shopname, website, description })
      }).then(() => window.history.back())
      //issues with this...
      // then(() => window.history.push('/profile'))
    } 
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Shop Profile
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 10 }}
          >
            <Grid container spacing={2}>
              <Typography variant="h6">
            Shop Name
          </Typography>
         <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={(e) => setShopname(e.target.value)}
                  id="shopname"
                  label="Shop Name"
                  name="shopname"
                  autoComplete="shopname"
                />
              </Grid>
              <Typography variant="h6" mt={5}>
            Shop Website
          </Typography>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={(e) => setWebsite(e.target.value)}
                  id="website"
                  label="Shop Website"
                  name="website"
                  autoComplete="website"
                />
              </Grid>
              <Typography variant="h6" mt={5}>
            Shop Description
          </Typography>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  label="Shop Description"
                  // type="description"
                  id="description"
                  autoComplete="description"
                />
              </Grid>
            
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 8 }}
            >
              Sign Up
            </Button>
            
          </Box>
        </Box>
      </Container>
  );
}

