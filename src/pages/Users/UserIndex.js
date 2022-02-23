import Button from "@mui/material/Button";
import { ImageList } from "@mui/material";
import { ImageListItem } from "@mui/material";
import { ImageListItemBar } from "@mui/material";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import { userData } from "../../data/userData";

export const UserIndex = () => {
  return (
    <>
      <ImageList sx={{ width: "auto", height: "auto" }}>
        {userData.map((user) => (
          <ImageListItem key={user.photo}>
            <Link to={`/users/${user.id}`}>
              <Button variant="outlined">
                <img
                  src={`${user.photo}?w=248&fit=crop&auto=format`}
                  srcSet={`${user.photo}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={user.login}
                  loading="lazy"
                />
              </Button>
            </Link>
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
        ))}
      </ImageList>
    </>
  );
};

