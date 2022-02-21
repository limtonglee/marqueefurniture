import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Layout } from './Layout';
import Card from '@mui/material/Card';
import { orderData } from "../../data/orderData";
import { DataGrid } from '@mui/x-data-grid';

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
        { field: 'name', headerName: 'Product Name', width: 170 },
        { field: 'status', headerName: 'Status', width: 130 },
        { field: 'variation', headerName: 'Variation', width: 150 },
        { field: 'price', headerName: 'Price', width: 70 },
    ];

    return (
        <>
            <Layout>
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
                        </Box>
                        <DataGrid sx={{ overflow: 'hidden' }}
                            rows={data}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </div>
                </Card>
            </Layout>
        </>
    );
}
