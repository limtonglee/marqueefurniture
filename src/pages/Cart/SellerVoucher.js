import {
  Box,
  Button,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import MenuPopover from "../../components/MenuPopover";
// utils
// components
import Scrollbar from "../../components/Scrollbar";
import { getVouchers } from "../../services/SellerCenter";

export const SellerVoucher = ({
  shopId,
  selectedVouchers,
  setSelectedVouchers,
  cartItem,
}) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [shopVouchers, setShopVouchers] = useState([]);
  const [voucherName, setVoucherName] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, item) => {
    setSelectedIndex(item.id);
    setVoucherName(item.name);
    // if (containsVoucher(selectedVouchers, item.id)) {}
    var filteredArray = selectedVouchers.filter(
      (x) => x.itemId !== cartItem.id
    );
    let appliedVoucher = { ...item, itemId: cartItem.id };
    // console.log(appliedVoucher);
    setSelectedVouchers([...filteredArray, appliedVoucher]);
  };

  useEffect(() => {
    const getSellerVouchers = async (shopId) => {
      const response = await getVouchers(shopId);
      // console.log("use effect called");

      // console.log(response.data);
      setShopVouchers(JSON.parse(JSON.stringify(response.data)));
    };
    getSellerVouchers(shopId);
  }, []);

  return (
    <>
      <Grid container spacing={2} direction="row">
        <Grid item>
          <Typography variant="body2" gutterBottom>
            Voucher Applied:
          </Typography>
        </Grid>
        {selectedIndex !== 0 && (
          <Grid item>
            <Typography variant="body2" gutterBottom>
              {voucherName}
            </Typography>
          </Grid>
        )}

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
                Select voucher
              </ListSubheader>
            }
          >
            {shopVouchers
              .filter(
                (x) =>
                  x.status === "Ongoing" && x.minspend <= cartItem.listingprice
              )
              .map((item) => (
                <ListItemButton
                  selected={selectedIndex === item.id}
                  onClick={(event) => handleListItemClick(event, item)}
                  key={item.id}
                >
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Min. spend: ${item.minspend}
                        </Typography>
                        {`  — " valid till ${format(
                          Date.parse(item.enddate),
                          "dd/MM/yyyy"
                        )}"`}
                      </>
                    }
                  />
                </ListItemButton>
              ))}
          </List>
        </Scrollbar>
      </MenuPopover>
    </>
  );
};
