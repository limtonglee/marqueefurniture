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
import * as React from "react";
import { Link } from "react-router-dom";
import { user } from "../../data/currentUserData";
import { itemData } from "../../data/itemData";

import { getListings } from "../../services/Listings";

import { useEffect } from "react";

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
  let tabData = itemData.filter((item) => item.listingType === "Furniture");

  const { username, likedPosts, moodboards } = user;
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState(tabData);
  // const [searchResults, setSearchResults] = React.useState(tabData);
  const [open, setOpen] = React.useState(false);

  const [listings, setListings] = React.useState("");
  useEffect(() => {
    getListings().then(response => {
      setListings(response.data)
    });
  }, []);

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
    console.log(likedItem.likes);
    if (likedItem.likes.includes(username)) {
      likedItem.likes = likedItem.likes.filter((user) => user !== username);
    } else {
      likedItem.likes.push(username);
    }
  };

  const handleSearch = (value) => {
    findListing(value);
  };

  const findListing = (criteria) => {
    const lowercasedCriteria = criteria.toLowerCase().trim();
    if (lowercasedCriteria === "") updateData(value);
    else {
      console.log(value);
      updateData(value);
      const filteredListing = tabData.filter((filterList) => {
        return Object.keys(filterList).some((key) =>
          filterList[key].toString().toLowerCase().includes(lowercasedCriteria)
        );
      });
      setData(filteredListing);
    }
  };

  const updateData = (value) => {
    console.log(value);
    if (value === 0) {
      tabData = itemData.filter((item) => item.listingType === "Furniture");
    }
    if (value === 1) {
      tabData = itemData.filter((item) => item.listingType === "Service");
    }
    if (value === 2) {
      tabData = itemData.filter((item) => item.listingType === "Design");
    }
    setData(tabData);
  };

  return (
    <Container>
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
            key={item.img}
            sx={{ boxShadow: 1, margin: 2.5, padding: 2 }}
          >
            <Link to={`/marketplace/${item.id}`}>
              <Button>
                <img
                  src={`${item.img}?w=188&h=188&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=188&h=188&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
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
              title={item.title}
              subtitle={item.author}
              position="below"
            />
            <Grid container spacing={2}>
              {item.price ? (
                <Grid
                  item
                  xs={4}
                  sx={{
                    fontWeight: "bold",
                    fontSize: 12,
                    color: "primary.main",
                    mt: 2,
                  }}
                >
                  ${item.price.toFixed(2)}
                </Grid>
              ) : (
                <Grid
                  item
                  xs={4}
                  sx={{
                    fontWeight: "bold",
                    fontSize: 12,
                    color: "primary.main",
                  }}
                ></Grid>
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
    </Container>
  );
};
