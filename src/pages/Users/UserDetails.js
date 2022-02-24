import Button from "@mui/material/Button";
import { ImageList } from "@mui/material";
import { ImageListItem } from "@mui/material";
import { ImageListItemBar } from "@mui/material";
import { userData } from "../../data/userData";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useParams } from "react-router-dom";

export const UserDetails = () => {
  const param = useParams();
  const user = userData[param.userId];

  return (
    <>
      <ImageListItem key={user.photo}>
        <Button variant="outlined">
          <img
            src={`${user.photo}?w=248&fit=crop&auto=format`}
            srcSet={`${user.photo}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={user.login}
            loading="lazy"
          />
        </Button>
        <ImageListItemBar
          sx={{ backgroundColor: "primary", fontWeight: "bold" }}
          title={user.username}
          subtitle={user.bio}
          subtitle={user.url}
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


