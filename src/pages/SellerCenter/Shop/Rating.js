import React, { useState, useEffect } from "react";
import { Layout } from "../Layout";
// material
import {
    Card,
    Stack,
    Typography,
    Tabs,
    Tab,
    Box,
    styled,
    Grid,
    ButtonBase,
    Avatar,
} from "@mui/material";
import * as SellerCenterAPI from "../../../services/SellerCenter";
import { useStores } from "../../../stores/RootStore";

const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
});

export const ShopRating = () => {
    const [data, setData] = useState([]);
    const [ratings, setRatings] = useState([]);
    const { userStore } = useStores();

    const getRatings = async () => {
        try {
            const res = await SellerCenterAPI.getShopRatings(userStore.id);
            setData(JSON.parse(JSON.stringify(res.data)));
            setRatings(JSON.parse(JSON.stringify(res.data)));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRatings();
    }, []);

    const refreshData = () => {
        getRatings();
    };

    let tabData = ratings;
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);

    const handleTab1 = (event, newValue) => {
        setValue1(newValue);
        updateData();
    };
    const handleTab2 = (event, newValue) => {
        setValue2(newValue);
        updateData();
    };
    const updateData = () => {
        console.log('ZZZ', value1);
        console.log('ZZZ', value2);
        if (value1 === 1) {
            tabData = ratings.filter((ratings) => ratings.sellerreply === '');
        } else if (value1 === 2) {
            tabData = ratings.filter((ratings) => ratings.sellerreply !== '');
        } else {
            tabData = ratings;
        }
        console.log('ZZZ1', tabData);
        if (value2 === 1) {
            tabData = tabData.filter((ratings) => ratings.rating === 5);
        } else if (value2 === 2) {
            tabData = tabData.filter((ratings) => ratings.rating === 4);
        } else if (value2 === 3) {
            tabData = tabData.filter((ratings) => ratings.rating === 3);
        } else if (value2 === 4) {
            tabData = tabData.filter((ratings) => ratings.rating === 2);
        } else if (value2 === 5) {
            tabData = tabData.filter((ratings) => ratings.rating === 1);
        }
        console.log('ZZZ2', tabData);
        setData(tabData);
    };


    const [average, setAverage] = useState(0);
    const calculateAverage = () => {
        var sum = 0;
        for (var i = 0; i < ratings.length; i++) {
            sum += ratings[i].rating;
        }
        setAverage((sum / ratings.length).toFixed(1));
    };
    useEffect(() => {
        calculateAverage();
    }, []);



    return (
        <>
            <Layout>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Shop Rating
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        {average}/5
                    </Typography>
                </Stack>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value1}
                        onChange={handleTab1}
                    >
                        <Tab label="All" />
                        <Tab label="To Reply" />
                        <Tab label="Replied" />
                    </Tabs>
                </Box>
                <Box sx={{ border: 1, borderColor: 'divider', margin: '10px' }}>
                    <Tabs
                        value={value2}
                        onChange={handleTab2}
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
                    <Grid key={item.id} container spacing={2}
                        sx={{ marginTop: '4px', marginBottom: '4px' }}
                    >
                        <Grid item xs={4}>
                            <Card sx={{ height: '100%' }}>
                                <Grid container spacing={2} p={2}>
                                    <Grid item>
                                        <ButtonBase sx={{ width: 128, height: 128 }}>
                                            <Img
                                                src={`/api/image/${item.image}`}
                                                alt="complex"
                                            />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1" component="div">
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    Variation: {item.variations}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    ID: {item.listingid}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" component="div">
                                                ${item.listingprice}
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
                                                    alt="avatar"
                                                    src={`/api/image/${item.profilepic}`}
                                                    sx={{ width: 50, height: 50 }}
                                                />
                                                <Typography gutterBottom variant="subtitle1" component="div">
                                                    {item.username}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    {item.description}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    Rating: {item.rating}/5
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" component="div">
                                                {/* Date: {item.datetime} */}
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
                                                    alt="avatar"
                                                    src="https://i.pinimg.com/originals/34/60/3c/34603ce8a80b1ce9a768cad7ebf63c56.jpg"
                                                    sx={{ width: 50, height: 50 }}
                                                />
                                                <Typography gutterBottom variant="subtitle1" component="div">
                                                    {/* ABC Furniture Shop */}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    {item.sellerreply}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" component="div">
                                                {/* Date: 27/2/2022 */}
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
