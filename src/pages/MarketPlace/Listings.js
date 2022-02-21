import ArchitectureIcon from '@mui/icons-material/Architecture';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ShareIcon from "@mui/icons-material/Share";
import WeekendIcon from '@mui/icons-material/Weekend';
import { Alert, Box, Container, Fab, ImageList, ImageListItem, ImageListItemBar, Snackbar, Tab, Tabs } from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import { Link } from "react-router-dom";
import Searchbar from "../../components/Searchbar";
import { itemData } from "../../data/itemData";

//This is the main marketplace page
/*Things to do:
Inclusion of the bar to separate the different listings: "Furniture / Design / Services" Done
Linking bar up with the difference in the listings Done
Sharing of URL to the exact listing Done
Add search bar Done
Add filtering 
Updating of the page to show only furniture, initial loading shows all the listing 
*/
export const Listings = () => {

  let tabData = itemData.filter((item) => item.listingType === "Furniture");

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

  const handleSearch = (value) => {
    findListing(value);
  }

  /*const checkStatus = () => {
    console.log(value + "here");
    updateData();
  }*/

  const findListing = (criteria) => {
    //checkStatus();
    const lowercasedCriteria = criteria.toLowerCase().trim();
    if (lowercasedCriteria === '') updateData(value);
    else {
      const filteredListing = data.filter((filterList) => {
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
              actionIcon={
                <Fab size="small" sx={{ color: "secondary" }}>
                  <ShareIcon onClick = {() => {
                    handleSnack();
                    navigator.clipboard.writeText(window.location.toString() + '/' + item.id)
                    }
                  } />
                  <Snackbar open ={open} autoHideDuration={2000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity="success" sx= {{ width:'auto'}}>
                      Copied to Clipboard!
                    </Alert>
                   </Snackbar>
                </Fab>
              }
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};
