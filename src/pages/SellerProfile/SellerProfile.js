import { Box, 
        Card, 
        Typography, 
        Divider, 
        Avatar, 
        Grid, 
        Tab, 
        Tabs,
        ImageList,
        ImageListItem,
        ImageListItemBar,
        Button } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import tabitha from "../../assets/images/tabitha.jpg";
import { itemData } from "../../data/itemData";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import mark from "../../assets/images/mark.jpeg";


const SellerProfile = () => {

    const[value, setValue] = React.useState(0);
    const[data, setData] = React.useState(itemData);

    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
    }
    return (
        <Card sx={{ height: "100%" }}>
            <Grid sx={{p: "16px"}}>
                <Grid item xs = {4}>
                    <Avatar
                    src={mark}
                    alt="profile-image"
                    variant="rounded"
                    shadow="sm"
                    sx={{height: '70px', width:'70px'}}
                    />
                </Grid>
                <br/>
                <Grid item xs = {4}>       
                    <Typography variant="h2" color="text" fontWeight="bold">
                        Mark Zuckerburg
                    </Typography> 
                </Grid>
            </Grid>
            <Box sx={{ width: "auto", bgcolor: "background" }}>
                <Tabs
                value={value}
                onChange={handleChange}
                centered
                variant="fullWidth"
                >
                <Tab label="Listings" icon={<Inventory2Icon />} />
                <Tab label="Mood Boards" icon={<AccountBoxIcon />} />
                <Tab label="Posts" icon={<MessageIcon />} />
                <Tab label="About" icon={<SettingsIcon />}/>
            </Tabs>
            </Box>
            {value === 0 ?  
            <>
                <Box p={2}>   
                    <Box opacity={0.3}>
                        <Divider />
                    </Box>
                    <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
                        Welcome to my Listing!
                    </Typography>
                    <Grid container spacing ={0} direction="column" alignItems="center" justifyContent="center">
                        <Box sx={{ maxWidth: 1500 }}  >
                        {data.map((item) => (
                            <ImageListItem
                                key={item.img}
                                sx={{ boxShadow: 1, margin: 2.5, padding: 2 }}
                            >
                                <Link to={`/marketplace/${item.id}`}>
                                <Button>
                                    <img
                                    src={`${item.img}?w=188&h=188&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=188&h=188&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                    />
                                </Button>
                                </Link>
                                <ImageListItemBar
                                sx={{
                                    backgroundColor: "primary",
                                    fontWeight: "bold",
                                    "& .MuiImageListItemBar-subtitle": {
                                    overflow: "visible",
                                    },
                                }}
                                title={item.title}
                                subtitle={item.author}
                                position="below"
                                />
                                <Grid container spacing={2}>
                                {item.price ? (
                                    <Grid
                                    item
                                    xs={4}
                                    sx={{
                                        fontWeight: "bold",
                                        fontSize: 12,
                                        color: "primary.main",
                                        mt: 2,
                                    }}
                                    >
                                    ${item.price.toFixed(2)}
                                    </Grid>
                                ) : (
                                    <Grid
                                    item
                                    xs={4}
                                    sx={{
                                        fontWeight: "bold",
                                        fontSize: 12,
                                        color: "primary.main",
                                    }}
                                    ></Grid>
                                )}
                                </Grid>
                            </ImageListItem>
                            ))}
                        </Box>
                    </Grid>
                </Box>
            </> : <>
                    {value === 1 ? 
                    <>
                        <Box p={2}>   
                            <Box opacity={0.3}>
                                <Divider />
                            </Box>
                            <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
                                This is Mood Boards
                            </Typography>
                        </Box>
                    </> : <>
                            {value === 2 ?
                            <>
                                <Box p={2}>   
                                    <Box opacity={0.3}>
                                        <Divider />
                                    </Box>
                                    <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
                                        This is Posts
                                    </Typography>
                                </Box>
                            </> : <>
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
                                    </>
                            }
                            </>
                    }           
                    </>
            }    
        </Card>
        
        )
    }

export default SellerProfile