import ArchitectureIcon from '@mui/icons-material/Architecture';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ShareIcon from "@mui/icons-material/Share";
import WeekendIcon from '@mui/icons-material/Weekend';
import { Alert, Box, Checkbox, Container, Fab, ImageList, ImageListItem, ImageListItemBar, Snackbar, Tab, Tabs } from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import { Link } from "react-router-dom";
import Searchbar from "../../components/Searchbar";
import { itemData } from "../../data/itemData";
import { Grid } from '@mui/material';
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { user } from "../../data/currentUserData";

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
*/
export const Listings = () => {

  let tabData = itemData.filter((item) => item.listingType === "Furniture");

  const {username, likedPosts, moodboards } = user;
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState(tabData);
  // const [searchResults, setSearchResults] = React.useState(tabData);
  const [open, setOpen] = React.useState(false);

  const handleSnack = () => {
    setOpen(true)
  }

  const handleSnackClose = (event, reason) => {
    if(reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    updateData(newValue);
  };

  const handleLikeChange = (event, likedItem) => {
    console.log("Like has been clicked");
    console.log(likedItem.likes)
    if(likedItem.likes.includes(username)) {
      likedItem.likes = likedItem.likes.filter((user) => user !== username);
    } else {
      likedItem.likes.push(username);
    }
  }

  const handleSearch = (value) => {
    findListing(value);
  }

  const findListing = (criteria) => {
    const lowercasedCriteria = criteria.toLowerCase().trim();
    if (lowercasedCriteria === '') updateData(value);
    else {
      console.log(value)
      updateData(value)
      const filteredListing = tabData.filter((filterList) => {
        return Object.keys(filterList).some((key) => 
        filterList[key].toString().toLowerCase().includes(lowercasedCriteria)
        )
      })
      setData(filteredListing)
    }
  }

  const updateData = (value) => {
    console.log(value)
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
      <Searchbar 
        placeholder = "Search by Username or Listing"
        onChange= { (event) => handleSearch(event.target.value)}
      />
      <Box sx={{ width: "auto", bgcolor: "background" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          variant="fullWidth"
        >
          <Tab icon= { <WeekendIcon /> } label="Furniture" />
          <Tab icon= { <HomeRepairServiceIcon /> } label="Service" />
          <Tab icon= { <ArchitectureIcon /> } label="Design" />
        </Tabs>
      </Box>

      <ImageList sx={{ width: "auto", height: "auto" }} align= "center" >
        {data.map((item) => (
          <ImageListItem key={item.img}>
            <Link to={`/marketplace/${item.id}`}>
              <Button variant="outlined">
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </Button>
            </Link>
            <ImageListItemBar
              sx={{ backgroundColor: "primary", fontWeight: "bold" }}
              title={item.title}
              subtitle={item.author}
              position="below"
            />
            <Grid container spacing = {2}> 
              <Grid item xs = {7}>
              {item.price}
              </Grid>
              <Grid item xs = {5}>
                <Checkbox 
                  size="small" 
                  sx={{ color: "secondary" }}
                  icon = {<FavoriteBorder fontSize='small' />}
                  checkedIcon = {<Favorite fontSize="small" />}
                  value={item}
                  onChange = {e => {
                    handleSnack()
                    handleLikeChange(e, item)}}
                   />
                <Snackbar open ={open} autoHideDuration={2000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="success" sx= {{ width:'auto'}}>
                  Liked!
                </Alert>
              </Snackbar>
              </Grid>
           </Grid>
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};
