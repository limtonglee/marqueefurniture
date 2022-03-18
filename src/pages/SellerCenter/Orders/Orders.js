import React from 'react';
import { useEffect, useState } from "react";
import { Layout } from '../Layout';
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
import * as SellerCenterAPI from "../../../services/SellerCenter";

export const Orders = () => {
    const [value, setValue] = useState(0);
    const [data, setData] = useState([]);
    const [order, setOrder] = useState([]);

    const getOrders = async () => {
        try {
            const res = await SellerCenterAPI.getOrders(1);
            setData(JSON.parse(JSON.stringify(res.data)));
            setOrder(JSON.parse(JSON.stringify(res.data)));

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    let tabData = order;
    const handleChange = (event, newValue) => {
        setValue(newValue);
        updateData(newValue);
    };
    
    const updateData = (value) => {
        if (value === 1) {
            tabData = order.filter((order) => order.order_status === "UNPAID");
        }else if (value === 2) {
            tabData = order.filter((order) => order.order_status === "PAID");
        }else if (value === 3) {
            tabData = order.filter((order) => order.order_status === "SHIPPING");
        }else if (value === 4) {
            tabData = order.filter((order) => order.order_status === "DELIVERED");
        }else if (value === 5) {
            tabData = order.filter((order) => order.order_status === "CANCELLED");
        }else if (value === 6) {
            tabData = order.filter((order) => order.order_status === "RETURN/REFUND");
        }
        setData(tabData);
    };
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
                        My Orders
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
                                <Tab label="Paid" />
                                <Tab label="Shipping" />
                                <Tab label="Completed" />
                                <Tab label="Cancellation" />
                                <Tab label="Return/Refund" />
                            </Tabs>
                            {data.map((item) => (
                                <Card key={item.id}
                                    sx={{
                                        flexDirection: 'row',
                                        margin: '20px',
                                        border: 1,
                                        borderColor: '#C4CDD5',
                                        padding: '5px'
                                    }}>

                                    <div className='header' style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        borderBottom: '1px solid',
                                        borderColor: '#C4CDD5',
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
                                                src={`${item.image}?w=124&fit=crop&auto=format`}
                                                srcSet={`${item.image}?w=124&fit=crop&auto=format&dpr=2 2x`}
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
