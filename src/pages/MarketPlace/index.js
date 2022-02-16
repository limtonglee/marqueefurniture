import Button from "@mui/material/Button";
import { ImageList } from '@mui/material'
import { ImageListItem } from '@mui/material'
import { ImageListItemBar } from '@mui/material'
import { itemData } from "../../data/itemData";
import { IconButton } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';

const MarketPlace = () => {
  return (
    
    <ImageList sx={{ width: 'auto', height: 'auto' }}>
      {itemData.map((item) => (
          
        <ImageListItem key={item.img}>
          <Button variant="outlined">
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          </Button>
           <ImageListItemBar
           sx={{ backgroundColor: 'primary', fontWeight: 'bold'}}
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton sx={{ color: 'secondary' }}>
                  <ShareIcon />
                </IconButton>
              }
            position= 'below'
            />
        </ImageListItem>
        
      ))}
      
    </ImageList>
    
  );
}

export default MarketPlace;