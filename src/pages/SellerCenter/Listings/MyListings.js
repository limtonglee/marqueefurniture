import React from 'react';
import { useEffect, useState } from "react";
import { Layout } from '../Layout';
import { listingsData } from "../../../data/listingsData";
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
    TextField,
    MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router";
import Searchbar from "../../../components/Searchbar";
import EditListingModal from "./EditListingModal";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import * as SellerCenterAPI from "../../../services/SellerCenter";

export const MyListings = () => {
    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);
    const [data, setData] = useState([]);
    const [listings, setListings] = useState([]);

    const getListings = async () => {
        try {
            const res = await SellerCenterAPI.getListings(1);
            setData(JSON.parse(JSON.stringify(res.data)));
            setListings(JSON.parse(JSON.stringify(res.data)));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getListings();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        updateData(newValue);
    };

    let tabData = listings;
    const updateData = (value) => {
        if (value === 1) {
            tabData = listings.filter((listings) => listings.status === "LIVE");
        } else if (value === 2) {
            tabData = listings.filter((listings) => listings.status === "SOLD OUT");
        } else if (value === 3) {
            tabData = listings.filter((listings) => listings.status === "DELISTED");
        } else {
            tabData = listings;
        }
        setData(tabData);
    };
    const searchType = [
        {
            value: 'productName',
            label: 'Product Name',
        },
        {
            value: 'id',
            label: 'SKU code',
        },
    ];
    let [type, setType] = React.useState('productName');
    let handleSearchDropdown = (event) => {
        setType(event.target.value);
    };

    const handleSearch = (value) => {
        findListing(value);
    }

    const findListing = (criteria) => {
        const lowercasedCriteria = criteria.toLowerCase().trim();
        if (lowercasedCriteria === '') updateData(value);
        else {
            const filteredListing = data.filter((order) => {
                return order[type].toString().toLowerCase().includes(lowercasedCriteria)
            })
            setData(filteredListing);
        }
    };

    const handleDelist = (event, item, value) => {
        if (item.status !== 'Delisted') {
            item.status = 'Delisted';
        } else if (item.status === 'Delisted') {
            item.status = 'Live';
        }
        handleChange();
    }

    return (
        <>
            <Layout>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Listings
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            navigate('/sellercenter/listings/addNewListing')
                        }}
                    >
                        New Listing
                    </Button>
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
                        placeholder="Search Listing..."
                        onChange={(event) => handleSearch(event.target.value)}
                    />
                </Stack>
                <Card style={{ overflow: 'visible' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab label="All" />
                        <Tab label="Live" />
                        <Tab label="Sold Out" />
                        <Tab label="Delisted" />
                    </Tabs>
                    <Grid container p={2}>
                        <Grid item xs={3}>
                            Product Details
                        </Grid>
                        <Grid item xs={1}>
                            SKU
                        </Grid>
                        <Grid item xs={2}>
                            Price
                        </Grid>
                        <Grid item xs={1}>
                            Status
                        </Grid>
                        <Grid item xs={1}>
                            Stock
                        </Grid>
                        <Grid item xs={1}>
                            Sales
                        </Grid>
                        <Grid item xs={3}>
                            Actions
                        </Grid>
                        <Grid item xs={12} >
                            {data.map((item) => (
                                <Card key={item.id}
                                    sx={{
                                        marginTop: '10px',
                                        marginBottom: '10px',
                                        border: 1,
                                        borderColor: '#C4CDD5',
                                    }}>
                                    <Grid container p={2}>
                                        <Grid item xs={3}>
                                            <img
                                                src={`/api/image/${item.image}?w=124&fit=crop&auto=format`}
                                                alt={item.title}
                                                
                                            />
                                            <div>{item.name}</div>
                                            <div>Variation: {item.variations}</div>
                                        </Grid>
                                        <Grid item xs={1}>
                                            {item.id}
                                        </Grid>
                                        <Grid item xs={2}>
                                            S${item.listingprice}

                                        </Grid>
                                        <Grid item xs={1}>
                                            {item.status}
                                        </Grid>
                                        <Grid item xs={1}>
                                            {item.stockavailable}
                                        </Grid>
                                        <Grid item xs={1}>
                                            {item.sales}
                                        </Grid>
                                        <Grid item xs={3}>
                                            <EditListingModal>{item}</EditListingModal>
                                            {item.status === "Delisted" ? (
                                                <Button
                                                    variant="contained"
                                                    startIcon={<PlaylistAddIcon />}
                                                    style={{
                                                        width: '100px',
                                                        marginTop: "12px"
                                                    }}
                                                    onClick={e => {
                                                        handleDelist(e, item, value);
                                                    }}
                                                >
                                                    Relist
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    startIcon={<PlaylistRemoveIcon />}
                                                    style={{
                                                        width: '100px',
                                                        marginTop: "12px"
                                                    }}
                                                    onClick={e => {
                                                        handleDelist(e, item, value);
                                                    }}
                                                >
                                                    Delist
                                                </Button>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Card>
                            ))}
                        </Grid>
                    </Grid>
                </Card>
            </Layout>
        </>
    );
}