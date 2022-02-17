import * as React from 'react';
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

//This is the main marketplace page
/*Things to do:
Inclusion of the bar to separate the different listings: "Furniture / Design / Services"
*/
export const Listings = () => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
  setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: 'auto', bgcolor: 'background' }}>
        <Tabs 
          value={value}  
          onChange={handleChange} 
          centered
          variant='fullWidth'>
          <Tab label="Furniture" />
          <Tab label="Service" />
          <Tab label="Design" />
       </Tabs>
      </Box>
    <ImageList sx={{ width: "auto", height: "auto" }}>
      {itemData.map((item) => (
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
