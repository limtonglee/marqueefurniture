import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

const LikedListing = () => {
  return (
    <>
        <Box>
            <Typography fontWeight = "bold">
                My Likes
            </Typography>
        </Box>
        <br/>
        <Divider/>
        
    </>
  )
}

export default LikedListing