import React from 'react';
import { Layout } from './Layout';
import { orderData } from "../../data/orderData";
import {
    Card,
    Stack,
    Typography,
    Tabs,
    Tab,
    Box,
    TextField,
    MenuItem,
} from '@mui/material';
import Searchbar from "../../components/Searchbar";

export const Orders = () => {
    const [value, setValue] = React.useState(0);
    const [data, setData] = React.useState(orderData);
    let tabData = orderData;

    const handleChange = (event, newValue) => {
        setValue(newValue);
        updateData(newValue);
    };
    const updateData = (value) => {
        if (value === 1) {
            tabData = orderData.filter((order) => order.status === "Unpaid");
        }
        if (value === 2) {
            tabData = orderData.filter((order) => order.status === "To ship");
        }
        if (value === 3) {
            tabData = orderData.filter((order) => order.status === "Shipping");
        }
        if (value === 4) {
            tabData = orderData.filter((order) => order.status === "Completed");
        }
        if (value === 5) {
            tabData = orderData.filter((order) => order.status === "Cancellation");
        }
        if (value === 6) {
            tabData = orderData.filter((order) => order.status === "Return/Refund");
        }
        setData(tabData);
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'productName', headerName: 'Product Name', width: 170 },
        { field: 'status', headerName: 'Status', width: 130 },
        { field: 'variation', headerName: 'Variation', width: 150 },
        { field: 'price', headerName: 'Price', width: 70 },
        { field: 'buyerName', headerName: 'Buyer Name', width: 170 },
    ];
    const searchType = [
        {
            value: 'id',
            label: 'Order ID',
        },
        {
            value: 'buyerName',
            label: 'Buyer Name',
        },
        {
            value: 'productName',
            label: 'Product Name',
        },

    ];
    let [type, setType] = React.useState('id');
    let handleSearchDropdown = (event) => {
        setType(event.target.value);
    };

    let handleSearch = (value) => {
        findOrder(value);
    }

    let findOrder = (criteria) => {
        const lowercasedCriteria = criteria.toLowerCase().trim();
        if (lowercasedCriteria === '') updateData(value);
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
                        Orders
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
                    <Searchbar
                        placeholder="Search Order..."
                        onChange={(event) => handleSearch(event.target.value)}
                    />
                </Stack>
                <Card style={{ overflow: 'visible', height: 700 }}>
                    <div className='page' style={{ height: '100%' }}>
                        <Box sx={{ width: '100%' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                            >
                                <Tab label="All" />
                                <Tab label="Unpaid" />
                                <Tab label="To ship" />
                                <Tab label="Shipping" />
                                <Tab label="Completed" />
                                <Tab label="Cancellation" />
                                <Tab label="Return/Refund" />
                            </Tabs>
                            {data.map((item) => (
                                <Card key={item.id}
                                    sx={{
                                        flexDirection: 'row',
                                        marginTop: '10px',
                                        marginBottom: '10px',
                                        border: 1,
                                    }}>

                                    <div className='header' style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        borderBottom: '1px solid',
                                        padding: '10px',
                                    }}>
                                        <div className='buyerName'>
                                            {item.buyerName}
                                        </div>
                                        <div className='orderID'>
                                            Order ID {item.id}
                                        </div>
                                    </div>
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
                                        <div className='price' style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginLeft: '10px',
                                            marginRight: '20px',
                                        }}>
                                            <div>S${item.price}</div>
                                            <div>Credit/Debit Card</div>
                                        </div>
                                        <div>{item.status}</div>
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
