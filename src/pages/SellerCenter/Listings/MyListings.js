import * as React from 'react';
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


export const MyListings = () => {
    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);
    const [data, setData] = React.useState(listingsData);
    let tabData = listingsData;
    const handleChange = (event, newValue) => {
        setValue(newValue);
        updateData(newValue);
    };

    const updateData = (value) => {
        console.log(value);
        if (value === 1) {
            tabData = listingsData.filter((order) => order.status === "Live");
        } else if (value === 2) {
            tabData = listingsData.filter((order) => order.status === "Sold out");
        } else if (value === 3) {
            tabData = listingsData.filter((order) => order.status === "Violation");
        } else if (value === 4) {
            tabData = listingsData.filter((order) => order.status === "Delisted");
        } else {
            tabData = listingsData;
            console.log("999999");
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
                        <Tab label="Violation" />
                        <Tab label="Delisted" />
                    </Tabs>
                    <Grid container sx={{ padding: "12px" }}>
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
                        <Grid item xs={12}>
                            {data.map((item) => (
                                <Card key={item.id}
                                    sx={{
                                        marginTop: '10px',
                                        marginBottom: '10px',
                                        border: 1,
                                        borderColor: '#C4CDD5',
                                    }}>
                                    <Grid container sx={{ padding: "4px" }}>
                                        <Grid item xs={3}>
                                            <img
                                                src={`${item.img}?w=124&fit=crop&auto=format`}
                                                srcSet={`${item.img}?w=124&fit=crop&auto=format&dpr=2 2x`}
                                                alt={item.title}
                                                loading="lazy"
                                            />
                                            <div>{item.productName}</div>
                                            <div>Variation: {item.variation}</div>
                                        </Grid>
                                        <Grid item xs={1}>
                                            {item.id}
                                        </Grid>
                                        <Grid item xs={2}>
                                            S${item.price}
                                        </Grid>
                                        <Grid item xs={1}>
                                            {item.status}
                                        </Grid>
                                        <Grid item xs={1}>
                                            {item.stock}
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
                                                        width: '150px',
                                                        marginTop: "12px"
                                                    }}
                                                    onClick={e => {
                                                        handleDelist(e, item, value);
                                                    }}
                                                >
                                                    Relist Listing
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    startIcon={<PlaylistRemoveIcon />}
                                                    style={{
                                                        width: '150px',
                                                        marginTop: "12px"
                                                    }}
                                                    onClick={e => {
                                                        handleDelist(e, item, value);
                                                    }}
                                                >
                                                    Delist Listing
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