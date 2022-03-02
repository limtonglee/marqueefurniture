// react-routers components
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import Avatar from "@mui/material/Avatar";
// Soft UI Dashboard PRO React components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// @mui material components
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from "@mui/material/Divider";
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
// prop-types is library for typechecking of props
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStores } from "../../../stores/RootStore";
// Soft UI Dashboard PRO React base styles
import typography from "../../../theme/typography";



import startselling from "../../../services/StartSelling";
// import editprofile from "../../../services/EditProfile";


function ProfileInfoCard({ title, description, website, info, social, action }) {
 
  const [showEdit, setShowEdit] = useState(false);
  const [showUser, setShowUser] = useState(true);
 
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
  

  //handleSubmit functionality placed inside here for now
  const handleSnack = () => {

     if (username === '') {
      setUsernameError(true)
    }
    if (bio === '') {
      setBioError(true)
    }
      if (link === '') {
      setLinkError(true)
    }

    if (username !=='' && bio !== '' && link !== '') {

      setOpen(true)
    setTimeout(()=> setOpen(false), 500)
  
    setUsernameError(false)
    setBioError(false)
    setLinkError(false)
  
    userStore.setUserName(username);
    userStore.setDescription(bio);
    userStore.setUserWebLink(link);
    console.log(username, bio, link)
    setShowEdit(!showEdit)
    setShowUser(!showUser)

    }
    
  }

  //hardcoded values to return to default when clicking Cancel button
  const handleCancel = () => {
    if (username === '') {
      setUsername("cosyrosie")
    }
    if (bio === '') {
      setBio("Hi, I’m Rosie. Decisions: If You Can’t Decide, The Answer Is No. If Two Equally Difficult Paths, Choose The One More Painful In The Short Term (Pain Avoidance Is Creating An Illusion Of Equality")
    }
      if (link === '') {
      setLink("Www.Example.Com")
    }
    setShowEdit(!showEdit)
        setShowUser(!showUser)
  }

  const handleSnackClose = () => setOpen(false);

  //handleSubmit not being called
  const handleSubmit = (event) => {

  // commented out the service part below for now to be used later
    // const data = new FormData(event.currentTarget);
    //  // eslint-disable-next-line no-console
    // console.log(data);
    // editprofile(
    //   data.get(username),
    //   data.get(bio),
    //   data.get(link),
    // )
    //   .then(
    //     console.log("edit profile successful")
    //     )
    //   .catch((error) => {
    //     console.log("edit profile failed");
    //     return Promise.reject(error);
    //   })
    // commented out the service part above 

    event.preventDefault();
    setUsernameError(false)
    setBioError(false)
    setLinkError(false)

    
    if (username === '') {
      setUsernameError(true)
    }
    if (bio === '') {
      setBioError(true)
    }
      if (link === '') {
      setLinkError(true)
    }
  
    userStore.setUserName(username);
    userStore.setDescription(bio);
    userStore.setUserWebLink(link);
    console.log(username, bio, link)
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

    // commented out the service part below to be used later 

    // const data = new FormData(event.currentTarget);
    //  // eslint-disable-next-line no-console
    // console.log(data);
    // startselling(
    //   data.get(shopname),
    //   data.get(web),
    //   data.get(extract),
    // )
    //   .then(
    //     console.log("sign up as seller successful")
    //     )
    //   .catch((error) => {
    //     console.log("sign up as seller failed");
    //     return Promise.reject(error);
    //   })

    // commented out the service part above 

    setShopnameError(false)
    setWebError(false)
    setExtractError(false)
    
    if (shopname === '') {
      setShopnameError(true)
    }
    if (web === '') {
      setWebError(true)
    }
      if (extract === '') {
      setExtractError(true)
    }

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
    
    <>
    
    {/* start of edit profile */}
   {showEdit && <Box
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
      
          defaultValue= {username} 
        
          onChange={(e) => setUsername(e.target.value)}
          required
          error={usernameError}
          helperText={username === "" ? 'Username required' : ' '}
        
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

        defaultValue= {bio} 
      
        onChange={(e) => setBio(e.target.value)}
        required
        error={bioError}
        helperText={bio === "" ? 'Bio required' : ' '}
    
       >
          
        </TextField>
          
        </Box>

      <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
          {website}
        </Typography>

         <Box mb={2} lineHeight={1}>

            <TextField 
            variant="outlined"       

            defaultValue= {link} 
         
            onChange={(e) => setLink(e.target.value)}
            required
             error={linkError}
             helperText={link === "" ? 'Website required' : ' '}
      
           >
          
        </TextField>
  
        </Box>


        <Box>
          {renderItems}
          <Box display="flex" py={1} pr={2}>

           
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
  
              onClick={handleSnack}
            >
              Save
            </Button>

            <Button
              
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleCancel}> 
              Cancel Changes
            </Button>


        {/* using snackbar for showing changes saved */}
      <Snackbar open ={open} autoHideDuration={2000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="success" sx= {{ width:'auto'}}>
                  Changes Saved
                </Alert>
              </Snackbar>

     

        </Box>

      </Card>
      </Box>}
      {/* end of show edit form */}


{/* start of show user profile */}
      {showUser &&  <Box
            component="form"
            noValidate
  
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
          
          <Typography variant="button" color="text" fontWeight="regular">
      
            {username}
          </Typography> 
          
        </Box>
        <Box opacity={0.3}>
          <Divider />
        </Box>


        <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
          {description}
        </Typography>

      <Box mb={2} lineHeight={1}>

        
         <Typography variant="button" color="text" fontWeight="regular">
         
            {bio}
          </Typography>  
        </Box>

      <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
          {website}
        </Typography>

         <Box mb={2} lineHeight={1}>

          
        <Typography variant="button" color="text" fontWeight="regular">

            {link}
          </Typography> 
  
        </Box>


        <Box>
          {renderItems}
          <Box display="flex" py={1} pr={2}>

          
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
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
          setShowEdit(!showEdit)
          setShowUser(!showUser)
        }
        }>
              Edit Profile
            </Button>
           

        {/* snackbar for showing changes saved*/}
      <Snackbar open ={open} autoHideDuration={2000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="success" sx= {{ width:'auto'}}>
                  Changes Saved
                </Alert>
              </Snackbar>

      {/* button for start selling */}
      <Button
             
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleStart}
              
            >
              Start Selling
            </Button>
          <Dialog open={start} onClose={handleStop}>
       
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
               
                  id="description"
                  autoComplete="description"
                  error={extractError}
                  helperText={extractError && "Shop description required"}
                  
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
      </Box>}



      
      </>
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