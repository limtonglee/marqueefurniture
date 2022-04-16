import BlockIcon from "@mui/icons-material/Block";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveIcon from "@mui/icons-material/Remove";
// material
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRef, useState } from "react";
import { banUser, unbanUser } from "../../../services/Admin";
// ----------------------------------------------------------------------

export default function UserMoreMenu({
  userId,
  status,
  customers,
  setFetchUsers,
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // console.log(status)

  const handleBan = async () => {
    // console.log("clicked");
    const response = await banUser(userId);
    if (response.status === 200) {
      setFetchUsers(true);
      setIsOpen(false);
    }
  };

  const handleUnban = async () => {
    const response = await unbanUser(userId);
    if (response.status === 200) {
      setFetchUsers(true);
      setIsOpen(false);
    }
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVertIcon width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem sx={{ color: "text.secondary" }}>
          <ListItemIcon>
            <RemoveIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        {status === "1" ? (
          <MenuItem
            sx={{ color: "primary.main" }}
            onClick={() => handleUnban()}
          >
            <ListItemIcon>
              <BlockIcon width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Unban"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        ) : (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={() => handleBan()}
          >
            <ListItemIcon>
              <BlockIcon width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Ban"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
