import Button from "@mui/material/Button";
import { Container, ImageList } from "@mui/material";
import { ImageListItem } from "@mui/material";
import { ImageListItemBar } from "@mui/material";
import { itemData } from "../../data/itemData";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useParams } from "react-router-dom";

//This is the listing page 
/* 
Expansion of item details for this
*/
export const ItemDetails = () => {
  const param = useParams();
  const item = itemData[param.itemId];

  return (
    <>
    <Container>
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
      </Container>
    </>
  );
};
