import Button from "@mui/material/Button";
import * as React from "react";
import { Avatar, CardContent, CardHeader, CardMedia, Container, Fab, ImageList } from "@mui/material";
import { ImageListItem } from "@mui/material";
import { ImageListItemBar } from "@mui/material";
import { itemData } from "../../data/itemData";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useParams } from "react-router-dom";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { CardActions } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

//This is the listing page 
/* 
Expansion of item details for this
*/
export const ItemDetails = () => {
  const param = useParams();
  const item = itemData[param.itemId];

  const [open, setOpen] = React.useState(false);

  const handleSnack = () => {
    setOpen(true)
  }

  const handleSnackClose = (event, reason) => {
    if(reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const isDesign = (item) => {
    if(item === "Design") {
      return
    }
      return true
  }

  return (
    <>
    <Card>
      <CardContent key={item.key}>
        <CardHeader
          avatar = {<Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            R
          </Avatar>}
          title = {item.author}
          />
        <CardMedia width = 'auto' align = 'center'>
          <img
            height= '600'
            src= {item.img}
            srcSet={item.img}
            alt={item.title}
            title= {item.title}
          />
        </CardMedia>
        <CardContent>
          <Typography variant="h1" color="text.secondary" fontWeight="bold">
            {item.title}
          </Typography>
          
          <Typography variant= "h2" color="text.secondary" fontWeight="bold" >
              {isDesign(item.listingType) ? <>Price: {item.price}</> : 'Chat with designer for more information.'}
          </Typography>

          <Typography variant= "body1" color="text.secondary">
            {item.description}
          </Typography>


        </CardContent>

        <CardActions disableSpacing>
          <Fab size="small" sx={{ color: "secondary"}}>
            <FavoriteIcon />
          </Fab>
          <Fab size="small" sx={{ color: "secondary" ,margin: 1}}>
            <ShareIcon onClick = {() => {
              handleSnack();
              navigator.clipboard.writeText(window.location.toString())
              }
            } />
            <Snackbar open ={open} autoHideDuration={2000} onClose={handleSnackClose}>
              <Alert onClose={handleSnackClose} severity="success" sx= {{ width:'auto'}}>
                Copied to Clipboard!
              </Alert>
              </Snackbar>
            </Fab>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};
