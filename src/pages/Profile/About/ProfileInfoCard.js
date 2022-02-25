// react-routers components
import { Typography } from "@mui/material";
// Soft UI Dashboard PRO React components
import Box from "@mui/material/Box";
// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import EditIcon from '@mui/icons-material/Edit';import Tooltip from "@mui/material/Tooltip";
// prop-types is library for typechecking of props
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
// Soft UI Dashboard PRO React base styles
import typography from "../../../theme/typography";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import { useStores } from "../../../stores/RootStore";
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from "react";
import { BikeScooterTwoTone } from "@mui/icons-material";
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { ThemeProvider, createTheme } from '@mui/system';
import { Fade } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';


function ProfileInfoCard({ title, description, website, info, social, action }) {
  const labels = [];
  const values = [];
  const { size } = typography;

  const { userStore } = useStores();

  let navigate = useNavigate();

  const [start, setStart] = useState(false);

   const handleStart = () => {
    setStart(true);
  };

  const handleStop = () => {
    setStart(false);
  };

  const [username, setUsername] = useState(userStore.name)
  const [bio, setBio] = useState(userStore.description)
  const [link, setLink] = useState(userStore.userWebLink)
  const [usernameError, setUsernameError] = useState(false)
  const [bioError, setBioError] = useState(false)
  const [linkError, setLinkError] = useState(false)

  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleOpen = (() => {
  //   setOpen(true)
  //   setTimeout(()=> setOpen(false), 500)
  // });

  // const handleClose = () => setOpen(false);

  const handleSnack = () => {
    setOpen(true)
    setTimeout(()=> setOpen(false), 500)
  }

  const handleSnackClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsernameError(false)
    setBioError(false)
    setLinkError(false)
    
    if (username == '') {
      setUsernameError(true)
    }
    if (bio == '') {
      setBioError(true)
    }
      if (link == '') {
      setLinkError(true)
    }
  
    userStore.setUserName(username);
    userStore.setDescription(bio);
    userStore.setUserWebLink(link);
  }

  //this part is for the start selling form
  const [shopname, setShopname] = useState('')
  const [web, setWeb] = useState('')
  const [extract, setExtract] = useState('')
  const [shopnameError, setShopnameError] = useState(false)
  const [webError, setWebError] = useState(false)
  const [extractError, setExtractError] = useState(false)

    const handleSubmits = (event) => {
    event.preventDefault();
    setShopnameError(false)
    setWebError(false)
    setExtractError(false)
    
    if (shopname == '') {
      setShopnameError(true)
    }
    if (web == '') {
      setWebError(true)
    }
      if (extract == '') {
      setExtractError(true)
    }


    //  if (shopname && web && extract) {
    //   fetch('http://localhost:8000/sellers', {
    //     method: 'POST',
    //     headers: {"Content-type": "application/json"},
    //     body: JSON.stringify({ shopname, website, description })
    //   }).then(() => navigate("/sellercenter"))
     if (shopname && web && extract) {
       console.log(shopname, web, extract)
        navigate("/sellercenter")
      
    } 
  };


  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

//styling for the pop-up modal after saving changes to profile
 const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'lightgreen',
  opacity: 0.5,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  // position: 'relative',
// height: 500,
// alignItems: 'center',
justifyContent: 'center',
}

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <Box key={label} display="flex" py={1} pr={2}>
      <Typography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </Typography>
      <Typography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </Typography>
    </Box>
  ));

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }) => (
    <Box
      key={color}
      component="a"
      href={link}
      fontSize={size.lg}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </Box>
  ));

  return (
    
    <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
    
    <Card sx={{ height: "100%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </Typography>

      </Box>

      <Box p={2}>
        <Box mb={2} lineHeight={1}>      
          <TextField 
          variant="outlined" 
          defaultValue= {userStore.name} 
          // label= {userStore.name === "" ? 'Error' : ' '}
          // label= {userStore.name} 
          onChange={(e) => setUsername(e.target.value)}
          required
          error={usernameError}
          helperText={userStore.name === "" ? 'Username required' : ' '}
          // label= {userStore.name === "" ? 'Error' : ' '}
          >

          </TextField>
          
        </Box>
        <Box opacity={0.3}>
          <Divider />
        </Box>


        <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
          {description}
        </Typography>

      <Box mb={2} lineHeight={1}>

        <TextField 
        variant="outlined" 
        multiline
        rows={4}
        fullWidth
        defaultValue= {userStore.description} 
        // label= {userStore.description}
        onChange={(e) => setBio(e.target.value)}
        required
        error={bioError}
        helperText={userStore.description === "" ? 'Bio required' : ' '}
        // label= {userStore.description === "" ? 'Error' : ' '}
       >
          
        </TextField>
          
        </Box>

      <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
          {website}
        </Typography>

         <Box mb={2} lineHeight={1}>

            <TextField 
            variant="outlined"       
            defaultValue= {userStore.userWebLink}
            // label= {userStore.userWebLink}
            onChange={(e) => setLink(e.target.value)}
            required
             error={linkError}
             helperText={userStore.userWebLink === "" ? 'Website required' : ' '}
          //  label= {userStore.userWebLink === "" ? 'Error' : ' '}
           >
          
        </TextField>
  
        </Box>


        <Box>
          {renderItems}
          <Box display="flex" py={1} pr={2}>

            {/* commented out social media part */}
            {/* <Typography variant="button" fontWeight="bold" textTransform="capitalize">
              social: &nbsp;
            </Typography> */}
            {/* {renderSocial} */}
          </Box>
        </Box>
      </Box>
      
       <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >       
          <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={handleOpen}
              onClick={handleSnack}
            >
              Save
            </Button>

            {/* modal being used */}
            {/* <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      
      >
        <Box sx={modalStyle}>
          <Typography 
          id="modal-modal-title" 
          variant="h6" 
          component="h2" 
          align="center">
            Changes Saved
          </Typography> */}
          {/* in case we want the close button */}
          {/* <Typography align='center'>
          <Button onClick={handleClose} 
          sx={buttonStyle}
          >
            Close
            </Button>
          </Typography> */}
        {/* </Box>
      </Modal> */}

        {/* trying out snackbar */}
      <Snackbar open ={open} autoHideDuration={2000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="success" sx= {{ width:'auto'}}>
                  Changes Saved
                </Alert>
              </Snackbar>

      {/* button for start selling */}
      <Button
              // type="submit"
              // fullWidth
              variant="contained"
              sx={{ mt: 10, mb: 10 }}
              onClick={handleStart}
              // href="/profile/sell"
            >
              Start Selling
            </Button>
          <Dialog open={start} onClose={handleStop}>
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <DialogContent>
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
            Create Shop Profile
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmits}
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
                  onChange={(e) => 
                    setShopname(e.target.value)                     
                  }
                  id="shopname"
                  label="Shop Name"
                  name="shopname"
                  autoComplete="shopname"
                  error={shopnameError}
                  helperText={shopnameError && "Shop name required"}
                  // helperText={shopname === "" ? 'Shop name required!' : ' '}
                />
              </Grid>
              <Typography variant="h6" mt={5}>
            Shop Website
          </Typography>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={(e) => setWeb(e.target.value)}
                  id="website"
                  label="Shop Website"
                  name="website"
                  autoComplete="website"
                  error={webError}
                  helperText={webError && "Shop website required"}
                  // helperText={web === "" ? 'Website required!' : ' '}
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
                  onChange={(e) => setExtract(e.target.value)}
                  name="description"
                  label="Shop Description"
                  // type="description"
                  id="description"
                  autoComplete="description"
                  error={extractError}
                  helperText={extractError && "Shop description required"}
                  // helperText={extract === "" ? 'Description required!' : ' '}
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
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStop}>Cancel</Button>
         
        </DialogActions>
      </Dialog>


        </Box>

      </Card>
      </Box>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileInfoCard;