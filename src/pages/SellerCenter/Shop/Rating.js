import React, { useState, useEffect } from "react";
import { Layout } from "../Layout";
import user from "../../../data/currentUserData2";
// material
import {
    Card,
    Stack,
    Button,
    Typography,
    Tabs,
    Tab,
    Box,
    styled,
    Grid,
    ButtonBase,
    Avatar,
    Link,
    TextField,
} from "@mui/material";
import * as SellerCenterAPI from "../../../services/SellerCenter";

const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
});



export const ShopRating = () => {
    const [value, setValue] = useState(0);
    const [data, setData] = useState([]);
    const [ratings, setRatings] = useState([]);

    const getRatings = async () => {
        try {
            const res = await SellerCenterAPI.getShopRatings(1);
            setData(JSON.parse(JSON.stringify(res.data)));
            setRatings(JSON.parse(JSON.stringify(res.data)));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRatings();
    }, []);

    let tabData = ratings;
    const handleChange = (event, newValue) => {
        setValue(newValue);
        updateData(newValue);
    };

    const refreshData = () => {
        getRatings();
    };

    const updateData = (value) => {
        if (value === 1) {
            tabData = ratings.filter((ratings) => ratings.rating === 5);
        } else if (value === 2) {
            tabData = ratings.filter((ratings) => ratings.rating === 4);
        } else if (value === 3) {
            tabData = ratings.filter((ratings) => ratings.rating === 3);
        } else if (value === 4) {
            tabData = ratings.filter((ratings) => ratings.rating === 2);
        } else if (value === 5) {
            tabData = ratings.filter((ratings) => ratings.rating === 1);
        }
        setData(tabData);
    };


    return (
        <>
            <Layout>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Shop Rating
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        4.5/5
                    </Typography>
                </Stack>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs>
                        <Tab label="All" />
                        <Tab label="To Reply" />
                        <Tab label="Replied" />
                    </Tabs>
                </Box>
                <Box sx={{ border: 1, borderColor: 'divider', margin: '10px' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab label="All" />
                        <Tab label="5 Star" />
                        <Tab label="4 Star" />
                        <Tab label="3 Star" />
                        <Tab label="2 Star" />
                        <Tab label="1 Star" />
                    </Tabs>
                </Box>
                <Grid container spacing={2} >
                    <Grid item xs={4}>
                        Product Information
                    </Grid>
                    <Grid item xs={4}>
                        Buyers' Review
                    </Grid>
                    <Grid item xs={4}>
                        Your Reply
                    </Grid>
                </Grid>
                {data.map((item) => (
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Card sx={{ height: '100%' }}>
                                <Grid container spacing={2} p={2}>
                                    <Grid item>
                                        <ButtonBase sx={{ width: 128, height: 128 }}>
                                            <Img alt="complex" src="https://images.unsplash.com/photo-1540574163026-643ea20ade25" />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1" component="div">
                                                    Sofa
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    Variation: Brown
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    ID: 0
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                                    Link to listing
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" component="div">
                                                $298.99
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ height: '100%' }}>
                                <Grid container spacing={2} p={2}>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                                                    sx={{ width: 50, height: 50 }}
                                                />
                                                <Typography gutterBottom variant="subtitle1" component="div">
                                                    Remy Sharp
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    Good item, fast delivery
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    Rating: 5/5
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" component="div">
                                                Date: 27/2/2022
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ height: '100%' }}>
                                <Grid container spacing={2} p={2}>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src="https://i.pinimg.com/originals/34/60/3c/34603ce8a80b1ce9a768cad7ebf63c56.jpg"
                                                    sx={{ width: 50, height: 50 }}
                                                />
                                                <Typography gutterBottom variant="subtitle1" component="div">
                                                    ABC Furniture Shop
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    Thank you for your review!
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" component="div">
                                                Date: 27/2/2022
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                ))}
            </Layout>
        </>
    );
}
