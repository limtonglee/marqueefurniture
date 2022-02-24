import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// component
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveIcon from "@mui/icons-material/Remove";
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";

// ----------------------------------------------------------------------

export default function UserMoreMenu({status}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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
        {status === "banned" ? (
          <>
            <MenuItem
              component={RouterLink}
              to="#"
              sx={{ color: "text.secondary" }}
            >
              <ListItemIcon>
                <BlockIcon width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary="Unban"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              component={RouterLink}
              to="#"
              sx={{ color: "text.secondary" }}
            >
              <ListItemIcon>
                <BlockIcon width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary="Ban"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
}
