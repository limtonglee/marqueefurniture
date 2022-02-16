import Button from "@mui/material/Button";
import { ImageList } from "@mui/material";
import { ImageListItem } from "@mui/material";
import { ImageListItemBar } from "@mui/material";
import { itemData } from "../../data/itemData";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useParams } from "react-router-dom";

export const ItemDetails = () => {
  const param = useParams();
  const item = itemData[param.itemId];

  return (
    <>
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
    </>
  );
};
