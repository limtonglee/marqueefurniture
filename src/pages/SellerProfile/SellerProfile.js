import { Box, Card, Typography, Divider } from "@mui/material";
import * as React from "react";

const SellerProfile = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
          Username
        </Typography>
      </Box>
      <Box p={2}>
        <Box mb={2} lineHeight={1}>        
          <Typography variant="button" color="text" fontWeight="regular">
            cosyrosie
          </Typography> 
          
        </Box>
        <Box opacity={0.3}>
          <Divider />
        </Box>
        <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
          This is a description
        </Typography>

        <Box mb={2} lineHeight={1}>
            <Typography variant="button" color="text" fontWeight="regular">
            Testing the bio
            </Typography>  
        </Box>
        <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
          This is a website
        </Typography>
        <Box mb={2} lineHeight={1}>  
            <Typography variant="button" color="text" fontWeight="regular">
                This is the link
            </Typography> 
        </Box>
        </Box>
    </Card>
  )
}

export default SellerProfile