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
    Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router";
import Searchbar from "../../../components/Searchbar";
import EditListingModal from "./EditListingModal";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';


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
        if (value === 1) {
            tabData = listingsData.filter((order) => order.status === "Live");
        }
        if (value === 2) {
            tabData = listingsData.filter((order) => order.status === "Sold out");
        }
        if (value === 3) {
            tabData = listingsData.filter((order) => order.status === "Violation");
        }
        if (value === 4) {
            tabData = listingsData.filter((order) => order.status === "Delisted");
        }
        setData(tabData);
    };

    const columns = [
        { field: 'id', headerName: 'SKU', width: 100 },
        { field: 'name', headerName: 'Product Name', width: 170 },
        { field: 'status', headerName: 'Status', width: 130 },
        { field: 'variation', headerName: 'Variation', width: 150 },
        { field: 'price', headerName: 'Price', width: 70 },
        { field: 'stock', headerName: 'Stock', width: 70 },
        { field: 'sales', headerName: 'Sales', width: 70 },
    ];

    const handleSearch = (value) => {
        findListing(value);
    }

    const findListing = (criteria) => {
        //checkStatus();
        const lowercasedCriteria = criteria.toLowerCase().trim();
        if (lowercasedCriteria === '') updateData(value);
        else {
            const filteredListing = data.filter((filterList) => {
                return Object.keys(filterList).some((key) =>
                    filterList[key].toString().toLowerCase().includes(lowercasedCriteria)
                )
            })
            setData(filteredListing)
        }
    };

    const handleDelist = (event, item) => {
        item.status = 'Delisted';
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

                <Searchbar
                    placeholder="Search Listing..."
                    onChange={(event) => handleSearch(event.target.value)}
                />
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
                    <Grid container sx={{padding: "12px"}}>
                        <Grid item xs={3}>
                            Product Details
                        </Grid>
                        <Grid item xs={2}>
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
                        <Grid item xs={12}>
                            {data.map((item) => (
                                <Card key={item.id}
                                    sx={{
                                        marginTop: '10px',
                                        marginBottom: '10px',
                                        border: 1,
                                    }}>
                                    <Grid container sx={{padding: "4px"}}>
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
                                        <Grid item xs={2}>
                                            S${item.price}
                                        </Grid>
                                        <Grid item xs={2}>
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
                                            <Button
                                                variant="contained"
                                                startIcon={<PlaylistRemoveIcon />}
                                                style={{
                                                    width: '150px',
                                                    marginTop: "12px"
                                                }}
                                                onClick={e => {
                                                    handleDelist(e, item);
                                                }}
                                            >
                                                Delist Listing
                                            </Button>
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