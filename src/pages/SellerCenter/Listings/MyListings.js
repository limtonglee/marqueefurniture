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

    const CardStyle = styled('div')({
        marginLeft: '10px',
        marginRight: '20px',
    });

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
                <Card style={{ overflow: 'visible', height: 700 }}>
                    <div className='page' style={{ height: '100%' }}>
                        <Box sx={{ width: '100%' }}>
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
                            {data.map((item) => (
                                <Card key={item.id}
                                    sx={{
                                        marginTop: '10px',
                                        marginBottom: '10px',
                                        border: 1,
                                    }}>
                                    <div className='item' style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        padding: '10px',
                                    }}>
                                        <div className='image'>
                                            <img
                                                src={`${item.img}?w=124&fit=crop&auto=format`}
                                                srcSet={`${item.img}?w=124&fit=crop&auto=format&dpr=2 2x`}
                                                alt={item.title}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className='itemDetails' style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginLeft: '5px',
                                            marginRight: '10px'
                                        }}>
                                            <div>{item.productName}</div>
                                            <div>Variation: {item.variation}</div>
                                        </div>
                                        <CardStyle>Price: S${item.price}</CardStyle>
                                        <CardStyle>Status: {item.status}</CardStyle>
                                        <CardStyle>Stock: {item.stock}</CardStyle>
                                        <CardStyle>Sales: {item.sales}</CardStyle>
                                        <EditListingModal>{item}</EditListingModal>
                                        <Button
                                            variant="contained"
                                            startIcon={<PlaylistRemoveIcon />}
                                            style={{
                                                height: '50px',
                                                marginLeft: '5px',
                                            }}
                                            onClick={e => {
                                                handleDelist(e, item);
                                            }}
                                        >
                                            Delist Listing
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </Box>
                    </div>
                </Card>
            </Layout>
        </>
    );
}