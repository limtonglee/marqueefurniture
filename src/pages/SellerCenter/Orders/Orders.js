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
    Grid,
    Button,
} from '@mui/material';
import { Link } from "react-router-dom";
import UpdateOrderModal from './UpdateOrderModal';
import * as SellerCenterAPI from "../../../services/SellerCenter";
import { useStores } from "../../../stores/RootStore";

export const Orders = () => {
    const [value, setValue] = useState(0);
    const [data, setData] = useState([]);
    const [order, setOrder] = useState([]);
    const { userStore } = useStores();

    const getOrders = async () => {
        try {
            const res = await SellerCenterAPI.getOrders(userStore.id);
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

    const refreshData = () => {
        getOrders();
    };

    const updateData = (value) => {
        if (value === 1) {
            tabData = order.filter((order) => order.order_status === "UNPAID");
        } else if (value === 2) {
            tabData = order.filter((order) => order.order_status === "PAID");
        } else if (value === 3) {
            tabData = order.filter((order) => order.order_status === "SHIPPING");
        } else if (value === 4) {
            tabData = order.filter((order) => order.order_status === "DELIVERED");
        } else if (value === 5) {
            tabData = order.filter((order) => order.order_status === "CANCELLED");
        } else if (value === 6) {
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
                <Card style={{ overflow: 'visible', padding: '12px' }}>
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
                                <Tab label="Delivered" />
                                <Tab label="Cancelled" />
                                <Tab label="Return/Refund" />
                            </Tabs>
                            {data.map((item) => (
                                <Card key={item.id}
                                    sx={{
                                        flexDirection: 'row',
                                        margin: '12px',
                                        border: 1,
                                        borderColor: '#C4CDD5',
                                        padding: '5px',
                                    }}>

                                    <div className='header' style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        borderBottom: '1px solid',
                                        borderColor: '#C4CDD5',
                                        padding: '10px',
                                    }}>
                                        <div>
                                            {item.username}
                                        </div>
                                        <div>
                                            Order ID {item.id}
                                        </div>
                                    </div>
                                    <Grid container p={2}>
                                        <Grid item xs={2}>
                                            <img
                                                src={`/api/image/${item.image}`}
                                                alt='image'
                                            />
                                            {item.name}
                                        </Grid>
                                        <Grid item xs={3}>
                                            Variation: {item.variations}
                                        </Grid>
                                        <Grid item xs={2}>
                                            ${item.price}
                                        </Grid>
                                        <Grid item xs={3}>
                                            {item.order_status}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {/* <Link to={`/sellercenter/orders/${item.id}`}>
                                                <Button>
                                                    View Order Details
                                                </Button>
                                            </Link> */}
                                            <UpdateOrderModal refreshData={refreshData}>{item}</UpdateOrderModal>
                                        </Grid>
                                    </Grid>
                                </Card>
                            ))}
                        </Box>
                    </div>
                </Card>
            </Layout>
        </>
    );
}
