import * as React from "react";
import { getSellerInfo } from "../../services/Listings";
import { getVouchers } from "../../services/SellerCenter";

import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
  Grid,
} from "@mui/material";
// material
import { alpha } from "@mui/material/styles";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import MenuPopover from "../../components/MenuPopover";
// utils
// components
import Scrollbar from "../../components/Scrollbar";

export const SellerVoucher = ({ shopId }) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [shopVouchers, setShopVouchers] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getSellerVouchers = async (shopId) => {
      const response = await getVouchers(shopId);
      console.log(response.data);
      setShopVouchers(JSON.parse(JSON.stringify(response.data)));
    };
    getSellerVouchers(shopId);
  }, []);

  return (
    <>
      <Grid container spacing={2} direction="row">
        <Grid item xs={4}>
          <Typography variant="body2" gutterBottom>
            Voucher Applied:
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Tooltip title="Show vouchers">
            <Button ref={anchorRef} size="small" onClick={handleOpen}>
              More Vouchers
            </Button>
          </Tooltip>
        </Grid>
      </Grid>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          Vouchers
        </Box>

        <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                New
              </ListSubheader>
            }
          >
            {console.log(shopVouchers)}
            {/* {shopVouchers.map((item) => (
                      ))

            } */}
          </List>
        </Scrollbar>
      </MenuPopover>
    </>
  );
};
