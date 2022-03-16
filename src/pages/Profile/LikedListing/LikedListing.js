import { Box, Divider, Typography, Tab, Tabs, ImageListItem, Button, ImageListItemBar, Grid, Checkbox, Snackbar, Alert } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from "react";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import { useStores } from '../../../stores/RootStore';
import { getLikedListing, getListings } from "../../../services/Listings";
import { getListingDetails } from "../../../services/Listings";
import { likedListing } from "../../../services/Listings";
import { unlikedListing } from "../../../services/Listings";
import { update } from '../../../services/api';

const LikedListing = () => {

  const [value, setValue] = useState(0);
  const {userStore} = useStores();
  const [likedList, setLikedList] = useState([]);
  const [open, setOpen] = useState(false);


  const testing = () => {
    let likedIdList = [];
    getLikedListing(userStore.id).then((response) => {
      likedIdList = JSON.parse(JSON.stringify(response.data));
      let updateList = [];
      for(let i in likedIdList){
        console.log("hh");
        getListingDetails(likedIdList[i].listingid).then((response) => {
        let temp = JSON.parse(JSON.stringify(response.data));
        updateList.push(temp[0]);
        }).catch((error) => {
          console.log(error);
        });
      }
      console.log("updateList", updateList);
      setLikedList(updateList);
      console.log("likedList", likedList);
    }).catch((error) => {
      console.log(error);
    }); 
  };

  const refreshPage = () => {
    window.location.reload(false);
  }

  useEffect(() => {
    testing();
  }, []);

  /*useEffect(() => {
    let likedIdList = [];
    getLikedListing(userStore.id).then((response) => {
      likedIdList = JSON.parse(JSON.stringify(response.data));
      let updateList = [];
      for(let i in likedIdList){
        console.log("hh");
        getListingDetails(likedIdList[i].listingid).then((response) => {
        let temp = JSON.parse(JSON.stringify(response.data));
        updateList.push(temp[0]);
        }).catch((error) => {
          console.log(error);
        });
      }
      console.log("updateList", updateList);
      setLikedList(updateList);
      console.log("likedList", likedList);
    }).catch((error) => {
      console.log(error);
    }); 
  }, []);*/

  

  //Handling of snackbar to appear
  const handleSnack = () => {
    setOpen(true);
  };

  //When snackbar closes
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const checkInitialLike = (listingId) => {
    for (let i in likedList){
      if(likedList[i].id == listingId){
        console.log("Came here");
        return true;
      }
    }
    return false;
  }

  //API call to BE to update database for user unliking a listing
  const unlikeListing = async (listingId, userId) => {
    try {
      const res = await unlikedListing(listingId, userId);
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  //Method call when user wants to like or unlike a listing
  const handleLikeChange = (event, likedItem) => {
    console.log("This will be unliked");
    unlikeListing(likedItem.id, userStore.id);
  };



  return (
    <>
      <Box>
          <Typography fontWeight = "bold">
              My Likes
          </Typography>
      </Box>
      <br/>
      <Divider/>
      <Box sx={{ width: "auto", bgcolor: "background" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        variant="fullWidth"
      >
        <Tab label="My Liked Listing" />
        <Tab label="My Liked Post" />
      </Tabs>
      </Box>
      <Box sx = {{maxWidth: 1500}}>
        {likedList.map((item) => (
          <ImageListItem
            key={item.id}
            sx={{ boxShadow: 1, margin: 2.5, padding: 2 }}
          >
            <Link to={`/marketplace/${item.id}`}>
              <Button>
                <img
                  src={`${item.image}?w=188&h=188&fit=crop&auto=format`}
                  srcSet={`${item.image}?w=188&h=188&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  loading="lazy"
                />
              </Button>
            </Link>
            <ImageListItemBar
              sx={{
                backgroundColor: "primary",
                fontWeight: "bold",
                "& .MuiImageListItemBar-subtitle": {
                  overflow: "visible",
                },
              }}
              title={item.name}
              subtitle={item.author}
              position="below"
            />
            <Grid container spacing={2}>
              {item.listingprice && (
                <Grid
                  item
                  xs={4}
                  sx={{
                    fontWeight: "bold",
                    fontSize: 18,
                    color: "primary.main",
                    mt: 2,
                  }}
                >
                  ${item.listingprice.toFixed(2)}
                </Grid>
              )}

              <Grid item xs={8}>
                <Box display="flex" justifyContent="flex-end">
                  
                  <Checkbox
                    size="small"
                    sx={{ color: "secondary" }}
                    icon={<FavoriteBorder fontSize="small" />}
                    checkedIcon={<Favorite fontSize="small" />}
                    value={item}
                    checked={checkInitialLike(item.id)}
                    onChange={(e) => {
                      handleSnack();
                      handleLikeChange(e, item);
                      refreshPage();
                      //getLikedList();
                    }}
                  />
                </Box>
                <Snackbar
                  open={open}
                  autoHideDuration={2000}
                  onClose={handleSnackClose}
                >
                  <Alert
                    onClose={handleSnackClose}
                    severity="success"
                    sx={{ width: "auto" }}
                  >
                    Updated Successfully!
                  </Alert>
                </Snackbar>
              </Grid>
            </Grid>
          </ImageListItem>
        ))}
      </Box>
    </>
  )
}

export default LikedListing