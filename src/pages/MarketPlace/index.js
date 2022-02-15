import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { ImageList } from '@mui/material'
import { ImageListItem } from '@mui/material'
import { ImageListItemBar } from '@mui/material'
import { itemData } from "../../data/itemData";

const MarketPlace = () => {
  return (
    
    <ImageList sx={{ width: 'auto', height: 'auto' }}>
      {itemData.map((item) => (
          <Button>
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={<span>by: {item.author}</span>}
            position="below"
          />
        </ImageListItem>
        </Button>
      ))}
    </ImageList>
  );
}

export default MarketPlace;