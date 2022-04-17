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
    Rating,
    TextField,
    MenuItem,
} from "@mui/material";
import * as SellerCenterAPI from "../../../services/SellerCenter";
import { useStores } from "../../../stores/RootStore";
import ReplyReviewModal from './ReplyReviewModal';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            if (res !== null) {
                calculateAverage();
            }
        } catch (error) {
            console.error(error);
        }
    };

    let average = 3.7;
    const calculateAverage = () => {
        var sum = 0;
        for (var i = 0; i < ratings.length; i++) {
            sum += ratings[i].rating;
        }
        average = (sum / ratings.length).toFixed(1);
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

    const handleTab1 = (event, newValue1) => {
        setValue1(newValue1);
        updateData(newValue1, value2);
    };
    const handleTab2 = (event, newValue2) => {
        setValue2(newValue2);
        updateData(value1, newValue2);
    };
    const updateData = (value1, value2) => {
        if (value1 === 1) {
            tabData = ratings.filter((ratings) => !ratings.sellerreply);
        } else if (value1 === 2) {
            tabData = ratings.filter((ratings) => ratings.sellerreply !== '');
        }

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

        setData(tabData);
    };

    const notifyReply = () => {
        toast("Reply posted successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
        });
    }

    const searchType = [
        {
            value: 'username',
            label: 'Buyer Name',
        },
        {
            value: 'name',
            label: 'Product Name',
        },
    ];
    let [type, setType] = React.useState('username');
    let handleSearchDropdown = (event) => {
        setType(event.target.value);
    };

    let handleSearch = (value) => {
        findOrder(value);
    }

    let findOrder = (criteria) => {
        const lowercasedCriteria = criteria.toLowerCase().trim();
        if (lowercasedCriteria === '') updateData();
        else {
            const filteredListing = data.filter((order) => {
                return order[type].toString().toLowerCase().includes(lowercasedCriteria)
            })
            setData(filteredListing);
        }
    };

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
                <Stack direction="row" >
                    <TextField
                        id="outlined-select-search-type"
                        select
                        value={type}
                        onChange={handleSearchDropdown}
                    >
                        {searchType.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        placeholder="Search Rating..."
                        onChange={(event) => handleSearch(event.target.value)}
                    />
                </Stack>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value1}
                        onChange={handleTab1}
                    >
                        <Tab label="All" />
                        <Tab label="To Reply"/>
                        <Tab label="Replied"/>
                    </Tabs>
                </Box>
                <Box sx={{ border: 1, borderColor: 'divider', margin: '10px' }}>
                    <Tabs 
                        value={value2}
                        onChange={handleTab2}
                    >
                        <Tab label="All"/>
                        <Tab label="5 Star"/>
                        <Tab label="4 Star"/>
                        <Tab label="3 Star"/>
                        <Tab label="2 Star"/>
                        <Tab label="1 Star"/>
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
                                                    Listing ID: {item.listingid}
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
                                                    <Rating name="read-only" value={item.rating} readOnly />
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    {item.description}
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
                                                {!item.sellerreply ? (
                                                    <ReplyReviewModal
                                                        reviewId={item.id}
                                                        refreshData={refreshData}
                                                        notifyReply={notifyReply}
                                                    />
                                                ) : (
                                                    <Typography variant="body2" gutterBottom>
                                                        {item.sellerreply}
                                                    </Typography>
                                                )}
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
                <ToastContainer />
            </Layout>
        </>
    );
}
