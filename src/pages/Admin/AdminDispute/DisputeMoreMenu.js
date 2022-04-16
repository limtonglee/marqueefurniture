import BlockIcon from "@mui/icons-material/Block";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveIcon from "@mui/icons-material/Remove";
import ChatIcon from "@mui/icons-material/Chat";
// material
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRef, useState } from "react";
import { reportOpen, reportClose } from "../../../services/Admin";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

export default function DisputeMoreMenu({
  userId,
  reportedId,
  reportId,
  setFetchDispute,
  status,
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // console.log(status)

  const handleOpen = async () => {
    // console.log("clicked");
    const response = await reportOpen(reportId);
    if (response.status === 200) {
      setFetchDispute(true);
      setIsOpen(false);
    }
  };

  const handleClose = async () => {
    const response = await reportClose(reportId);
    if (response.status === 200) {
      setFetchDispute(true);
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
          <MenuItem sx={{ color: "primary.main" }} onClick={() => handleOpen()}>
            <ListItemIcon>
              <BlockIcon width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Open"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        ) : (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={() => handleClose()}
          >
            <ListItemIcon>
              <BlockIcon width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Close"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}
        <Link to="/Chat" state={{ sellerId: userId }}>
          <MenuItem sx={{ color: "text.secondary" }}>
            <ListItemIcon>
              <ChatIcon width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Chat with reporter"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        </Link>
        <Link to="/Chat" state={{ sellerId: reportedId }}>
          <MenuItem sx={{ color: "text.secondary" }}>
            <ListItemIcon>
              <ChatIcon width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Chat with Reported"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
}
