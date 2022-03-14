import ArchitectureIcon from "@mui/icons-material/Architecture";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import SearchIcon from "@mui/icons-material/Search";
import WeekendIcon from "@mui/icons-material/Weekend";
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
import { useStores } from "../../stores/RootStore";
import { getListings } from "../../services/Listings";
import { likedListing } from "../../services/Listings";
import { unlikeListing } from "../../services/Listings";

//This is the main marketplace page
/*Things to do:
Inclusion of the bar to separate the different listings: "Furniture / Design / Services" Done
Linking bar up with the difference in the listings Done
Sharing of URL to the exact listing Done
Add search bar Done
Updating of the page to show only furniture, initial loading shows all the listing Done
Liking and unliking a post Done
Showcasing that the item has been liked before
Add filtering 
Formatting of the listings
*/
export const Listings = () => {
  const { username, likedPosts, moodboards } = user;
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const { userStore } = useStores();

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

  //use effect to check if the listings are updated
  useEffect(() => {
    // console.log("updating data effect: " + value);
    updateData(value);
  }, [listings]);

  const handleSnack = () => {
    setOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    updateData(newValue);
  };

  const handleLikeChange = (event, likedItem) => {
    console.log("Like has been clicked");
    console.log(userStore.id);
    if (likedItem.likes.includes(username)) {
      likedItem.likes = likedItem.likes.filter((user) => user !== username);
    } else {
      likedItem.likes.push(username);
    }
  };

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
        filterList.description.toLowerCase().includes(lowercasedCriteria)
      );
      setData(filteredListing);
    }
  };

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
                    onChange={(e) => {
                      handleSnack();
                      handleLikeChange(e, item);
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
                    Liked!
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
