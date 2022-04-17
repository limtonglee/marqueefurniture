import React from 'react';
import { useEffect, useState } from "react";
import { Layout } from '../Layout';
// material
import {
    Card,
    Stack,
    Button,
    Typography,
    Tabs,
    Tab,
    Grid,
    TextField,
    MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router";
import EditListingModal from "./EditListingModal";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import * as SellerCenterAPI from "../../../services/SellerCenter";
import { useStores } from "../../../stores/RootStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MyListings = () => {
    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);
    const [data, setData] = useState([]);
    const [listings, setListings] = useState([]);
    const { userStore } = useStores();

    const getListings = async () => {
        try {
            const res = await SellerCenterAPI.getListings(userStore.id);
            setData(JSON.parse(JSON.stringify(res.data)));
            setListings(JSON.parse(JSON.stringify(res.data)));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getListings();
    }, []);

    const refreshData = () => {
        getListings();
    };

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

    const handleDelist = async (item) => {
        const status = item.status === 'DELISTED' ? 'LIVE' : 'DELISTED';
        try {
            const response = await SellerCenterAPI.updateListingStatus(status, item.id);
            if (response.data === "listing status updated") {
                notifyDelist(status);
                refreshData();
            }
        } catch (error) {
            console.error(error);
        }
        refreshData();
    }

    const notifyUpdate = () => {
        toast("Listing updated successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
        });
    }

    const notifyDelist = (status) => {
        if (status === 'DELISTED') {
            toast("Listing delisted successfully!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        } else if (status === 'LIVE') {
            toast("Listing relisted successfully!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        }
    }

    return (
        <>
            <Layout>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        My Listings
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

                        </Grid>
                        <Grid item xs={1}>
                            Price
                        </Grid>
                        <Grid item xs={2}>
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
                                                src={`/api/image/${item.image}`}
                                                alt={item.title}
                                            />
                                            <div>{item.name}</div>
                                            <div>Variation: {item.variations}</div>
                                        </Grid>
                                        <Grid item xs={1}>

                                        </Grid>
                                        <Grid item xs={1}>
                                            S${item.listingprice}

                                        </Grid>
                                        <Grid item xs={2}>
                                            {item.status}
                                        </Grid>
                                        <Grid item xs={1}>
                                            {item.stockavailable}
                                        </Grid>
                                        <Grid item xs={1}>
                                            {item.sales}
                                        </Grid>
                                        <Grid item xs={3}>
                                            <EditListingModal
                                                refreshData={refreshData}
                                                notifyUpdate={notifyUpdate}
                                            >
                                                {item}
                                            </EditListingModal>
                                            {item.status === "DELISTED" ? (
                                                <Button
                                                    variant="contained"
                                                    startIcon={<PlaylistAddIcon />}
                                                    style={{
                                                        width: '100px',
                                                        marginTop: "12px"
                                                    }}
                                                    onClick={e => {
                                                        handleDelist(item);
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
                                                        handleDelist(item);
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
                <ToastContainer />
            </Layout>
        </>
    );
}