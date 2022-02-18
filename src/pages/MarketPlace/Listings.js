import * as React from "react";
import Button from "@mui/material/Button";
import { Container, ImageList } from "@mui/material";
import { ImageListItem } from "@mui/material";
import { ImageListItemBar } from "@mui/material";
import { itemData } from "../../data/itemData";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import { Box } from "@mui/material";
import WeekendIcon from '@mui/icons-material/Weekend';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import Searchbar from "../../components/Searchbar";

//This is the main marketplace page
/*Things to do:
Inclusion of the bar to separate the different listings: "Furniture / Design / Services" Done
Linking bar up with the difference in the listings Done
Updating of the page to show only furniture, initial loading shows all the listing 
Add search bar and filtering 
*/
export const Listings = () => {

  let tabData = itemData;

  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState(itemData);
  const [searchResults, setSearchResults] = React.useState(tabData);

  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    updateData(newValue);
  };

  const handleSearch = (target) => {
    findListing(target);
  }

  const findListing = (criteria) => {
    const lowercasedCriteria = criteria.toLowerCase().trim();
    //To see the value of Tab for TabData
    console.log(value)
    if (lowercasedCriteria === '') setData(searchResults);
    else {
      const filteredListing = searchResults.filter((filterList) => {
        return Object.keys(filterList).some((key) => 
        filterList[key].toString().toLowerCase().includes(lowercasedCriteria)
        )
      })
      setData(filteredListing)
    }
  }

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

      <ImageList sx={{ width: "auto", height: "auto" }}>
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
                <IconButton sx={{ color: "secondary" }}>
                  <ShareIcon />
                </IconButton>
              }
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};
