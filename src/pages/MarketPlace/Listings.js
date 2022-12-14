import ArchitectureIcon from "@mui/icons-material/Architecture";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import SearchIcon from "@mui/icons-material/Search";
import WeekendIcon from "@mui/icons-material/Weekend";
import Divider from "@mui/material/Divider";
import {
  Alert,
  Box,
  Checkbox,
  Container,
  Grid,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  Tab,
  Tabs,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { user } from "../../data/currentUserData";
import user from "../../data/currentUserData2";
import { getLikedListing, getListings } from "../../services/Listings";
import { likedListing } from "../../services/Listings";
import { unlikedListing } from "../../services/Listings";
import { useStores } from "../../stores/RootStore";

//This is the main marketplace page

export const Listings = () => {
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const { userStore } = useStores();
  const [likedList, setLikedList] = useState([]);

  //first use effect only called once
  useEffect(() => {
    getListings()
      .then((response) => {
        setListings(JSON.parse(JSON.stringify(response.data)));
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getLikedListing(userStore.id)
      .then((response) => {
        setLikedList(JSON.parse(JSON.stringify(response.data)));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //use effect to check if the listings are updated
  useEffect(() => {
    // console.log("updating data effect: " + value);
    updateData(value);
  }, [listings]);

  //To get the list of Liked List after every update
  const getLikedList = () => {
    getLikedListing(userStore.id)
      .then((response) => {
        setLikedList(JSON.parse(JSON.stringify(response.data)));
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  //When user decides to change filter (Furniture, Service & Design)
  const handleChange = (event, newValue) => {
    setValue(newValue);
    updateData(newValue);
  };

  //This method will be called to check whether users has initially liked the listing
  const checkInitialLike = (listingId) => {
    for (let i in likedList) {
      if (likedList[i].listingid == listingId) {
        return true;
      }
    }
    return false;
  };

  //API call to BE to update database for user liking a listing
  const likeListing = async (listingId, userId) => {
    try {
      const res = await likedListing(listingId, userId);
      const data = JSON.parse(JSON.stringify(res)).data;
    } catch (error) {
      console.error(error);
    }
  };

  //API call to BE to update database for user unliking a listing
  const unlikeListing = async (listingId, userId) => {
    try {
      const res = await unlikedListing(listingId, userId);
      const data = JSON.parse(JSON.stringify(res)).data;
    } catch (error) {
      console.error(error);
    }
  };

  //Method call when user wants to like or unlike a listing
  const handleLikeChange = (event, likedItem) => {
    console.log("Like has been clicked");
    if (checkInitialLike(likedItem.id)) {
      console.log("This will be unliked");
      unlikeListing(likedItem.id, userStore.id);
    } else {
      console.log("This will be liked");
      likeListing(likedItem.id, userStore.id);
    }
  };

  //Handling of search
  const handleSearch = (value) => {
    findListing(value);
  };

  //search listing by listing description
  const findListing = (criteria) => {
    const lowercasedCriteria = criteria.toLowerCase().trim();
    //if no criteria reset to original data
    if (lowercasedCriteria === "") {
      updateData(value);
    } else {
      updateData(value);
      const filteredListing = data.filter((filterList) =>
        filterList.name.toLowerCase().includes(lowercasedCriteria)
      );
      setData(filteredListing);
    }
  };

  //Update the tabData when user filter through the different categories
  const updateData = (value) => {
    // console.log("updating data: " + value);
    let tabData = [];
    if (value === 0) {
      tabData = listings.filter((item) => item.type === "Furniture");
    }
    if (value === 1) {
      tabData = listings.filter((item) => item.type === "Service");
    }
    if (value === 2) {
      tabData = listings.filter((item) => item.type === "Design");
    }
    setData(tabData);
  };

  return (
    <>
      <Box sx={{ maxWidth: 400 }}>
        <OutlinedInput
          onChange={(event) => handleSearch(event.target.value)}
          placeholder=" search for your item"
          fullWidth
          startAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          variant="outlined"
        />
      </Box>

      <Box sx={{ width: "auto", bgcolor: "background" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          variant="fullWidth"
        >
          <Tab icon={<WeekendIcon />} label="Furniture" />
          <Tab icon={<HomeRepairServiceIcon />} label="Service" />
          <Tab icon={<ArchitectureIcon />} label="Design" />
        </Tabs>
        <Divider />
      </Box>

      <Box sx={{ maxWidth: 1500 }}>
        {data.map((item) => (
          <ImageListItem
            key={item.id}
            sx={{ boxShadow: 1, margin: 2.5, padding: 2 }}
          >
            <Link to={`/marketplace/${item.id}`}>
              <Button>
                <img
                  src={`/api/image/${item.image}`}
                  alt={item.name}
                  loading="lazy"
                  width="188"
                  height="188"
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
                      getLikedList();
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
  );
};
