import { Box, Card, Typography, Divider, Avatar, Grid } from "@mui/material";
import * as React from "react";
import tabitha from "../../assets/images/tabitha.jpg";

const SellerProfile = () => {
  return (
    <Card sx={{ height: "100%" }}>
        <Grid sx={{p: "16px"}}>
            <Grid item xs = {4}>
                <Avatar
                src={tabitha}
                alt="profile-image"
                variant="rounded"
                shadow="sm"
                />
            </Grid>
            <Grid item xs = {4}>       
                <Typography color="text" fontWeight="bold">
                    Cosyrosie
                </Typography> 
            </Grid>
        </Grid>
        <Box p={2}>
            
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