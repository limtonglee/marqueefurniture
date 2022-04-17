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
    Avatar,
} from '@mui/material';
import UpdateOrderModal from './UpdateOrderModal';
import OrderDetailsModal from './OrderDetailsModal';
import * as SellerCenterAPI from "../../../services/SellerCenter";
import { useStores } from "../../../stores/RootStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            value: 'username',
            label: 'Buyer Name',
        },
        {
            value: 'name',
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

    const notifyUpdate = () => {
        toast("Order status updated successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
        });
    }

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
                <Card style={{ overflow: 'visible' }}>
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
                            <Grid container p={2}>
                                <Grid item xs={4}>
                                    Product Details
                                </Grid>
                                <Grid item xs={1}>

                                </Grid>
                                <Grid item xs={2}>
                                    Price
                                </Grid>
                                <Grid item xs={3}>
                                    Status
                                </Grid>
                                <Grid item xs={2}>
                                    Actions
                                </Grid>
                                <Grid item xs={12}>
                                    {data.map((item) => (
                                        <Card key={item.id}
                                            sx={{
                                                flexDirection: 'row',
                                                marginTop: '12px',
                                                marginBottom: '12px',
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
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                }}>
                                                    <Avatar
                                                        alt="avatar"
                                                        src={`/api/image/${item.profilepic}`}
                                                        sx={{ width: 30, height: 30 }}
                                                    />
                                                    <div>
                                                        &nbsp; &nbsp;{item.username}
                                                    </div>
                                                </div>
                                                <div>
                                                    Order ID: {item.id}
                                                </div>
                                            </div>
                                            <Grid container p={2}>
                                                <Grid item xs={4}>
                                                    <img src={`/api/image/${item.image}`} />
                                                    <div>{item.name}</div>
                                                    <div>Variation: {item.variations}</div>
                                                </Grid>
                                                <Grid item xs={1}>

                                                </Grid>
                                                <Grid item xs={2}>
                                                    ${item.price}
                                                </Grid>
                                                <Grid item xs={3}>
                                                    {item.order_status}
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <UpdateOrderModal
                                                        refreshData={refreshData}
                                                        notifyUpdate={notifyUpdate}
                                                    >
                                                        {item}
                                                    </UpdateOrderModal>
                                                    
                                                    <OrderDetailsModal>{item}</OrderDetailsModal>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    ))}
                                </Grid>
                                <ToastContainer />
                            </Grid>
                        </Box>
                    </div>
                </Card>
            </Layout>
        </>
    );
}
