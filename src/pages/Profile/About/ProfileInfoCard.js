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
import { Link } from "react-router-dom";
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

function ProfileInfoCard({ title, description, website, info, social, action }) {
  const labels = [];
  const values = [];
  const { size } = typography;

  const { userStore } = useStores();

  const [start, setStart] = useState(true);

   const handleStart = () => {
    setStart(true);
    console.log("hello there!!!")
  };

  const handleStop = () => {
    setStart(false);
  };

  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [link, setLink] = useState('')

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    userStore.setUserName(username);
    userStore.setDescription(bio);
    userStore.setUserWebLink(link);
  }

   

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

const buttonStyle = {
  // position: 'relative',
// height: 500,
// alignItems: 'center',
justifyContent: 'center',
}

  // useEffect(() => {
  //   setUsername(userStore.name)
  //   // setBio(userStore.description)
  //   // setLink(userStore.userWebLink)
  // },[username])

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


        {/* <Typography component={Link} to={action.route} variant="body2" color="secondary">
          <Tooltip title={action.tooltip} placement="top">
            <EditIcon/>
          </Tooltip>
        </Typography> */}

      </Box>

      <Box p={2}>
        <Box mb={2} lineHeight={1}>      
          <TextField 
          variant="outlined" 
          defaultValue= {userStore.name} 
          label= {userStore.name} 
          onChange={(e) => setUsername(e.target.value)}>

          {/* <Typography variant="button" color="text" fontWeight="regular">
            {userStore.name}
          </Typography> */}

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
        label= {userStore.description}
        
        onChange={(e) => setBio(e.target.value)}
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
            label= {userStore.userWebLink}
            onChange={(e) => setLink(e.target.value)}>
          
        </TextField>
          {/* <Typography variant="button" color="text" fontWeight="regular">
            {userStore.userWebLink}
          </Typography> */}
        </Box>


        <Box>
          {renderItems}
          <Box display="flex" py={1} pr={2}>
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
              onClick={handleOpen}
            >
              Save
            </Button>

            {/* modal being used */}
            <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography 
          id="modal-modal-title" 
          variant="h6" 
          component="h2" 
          align="center">
            Changes Saved
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Typography align='center'>
          <Button onClick={handleClose} 
          sx={buttonStyle}
          >
            Close
            </Button>

          </Typography>
          
        </Box>
      </Modal>

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
          <Dialog start={start} onClose={handleStop}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStop}>Cancel</Button>
          <Button onClick={handleStop}>Subscribe</Button>
        </DialogActions>
      </Dialog>




          {/* <Button
              type="submit"
              // fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              href="/profile/sell"
            >
              Start Selling
            </Button> */}

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