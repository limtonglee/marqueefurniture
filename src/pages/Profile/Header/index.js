//material ui icons

import Avatar from "@mui/material/Avatar";
//sui box
import Box from "@mui/material/Box";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

// Images
import jack from "../../../assets/images/jack.jpg";

import { useStores } from "../../../stores/RootStore";

function Header( ) {

  const { userStore } = useStores();

  

  return (
    <Box position="relative">
      <Card>
        <Grid container spacing={3} alignItems="center">
          <Grid item mt={1} ml={1}>
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
              <Typography variant="h5" 
              fontWeight="medium">
                {/* {name} */}
                {userStore.name}
              </Typography>
              <Typography variant="button" color="text" fontWeight="medium">
                {userStore.isSeller ? 
                (userStore.setShop("ABC Furniture Shop")) 
                : (userStore.setShop(""))
                }
                {userStore.shop}
              </Typography>
            </Box>
          </Grid>
          
          
        </Grid>
      </Card>
    </Box>
  );
}

export default Header;
