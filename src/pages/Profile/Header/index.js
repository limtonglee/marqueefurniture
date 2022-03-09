//material ui icons
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
//sui box
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link } from "react-router-dom";
// Images
import jack from "../../../assets/images/jack.jpg";
import { useStores } from "../../../stores/RootStore";

function Header({ name, shopName }) {
  const { userStore } = useStores();
  const [active, setActive] = useState(true);

  return (
    <Box position="relative">
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Grid item mt={1} ml={1} p={1} xs={6}>
          <Grid container alignItems="center">
            <Grid item spacing={1} p={1}>
              <Avatar
                src={jack}
                alt="profile-image"
                variant="rounded"
                size="xl"
                shadow="sm"
              />
            </Grid>
            <Grid item>
              <Box height="100%" mt={0.5} lineHeight={1}>
                <Typography
                  variant="h5"
                  fontWeight="medium"
                  color={"primary.main"}
                >
                  {name}
                </Typography>
                <Link to="/sellerCenter" style={{ textDecoration: 'none' }}>
                  <Typography  color="common.black" fontWeight="medium">
                    {!!userStore.isSeller && shopName}
                  </Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Box
            height="100%"
            mt={0.5}
            lineHeight={1}
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              disabled={!!active}
              onClick={() => setActive(!active)}
              sx={[
                {
                  "&.MuiButton-root": {
                    color: "primary.lighter",
                  },
                  "&.Mui-disabled": {
                    color: "primary.main",
                  },
                },
              ]}
            >
              Profile
            </Button>
            <Button
              disabled={!active}
              onClick={() => setActive(!active)}
              sx={[
                {
                  "&.MuiButton-root": {
                    color: "primary.lighter",
                  },
                  "&.Mui-disabled": {
                    color: "primary.main",
                  },
                },
              ]}
            >
              Orders
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;
