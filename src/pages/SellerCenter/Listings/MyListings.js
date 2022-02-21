import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Layout } from '../Layout';
import Card from '@mui/material/Card';
import { listingsData } from "../../../data/listingsData";
import { DataGrid } from '@mui/x-data-grid';


export const MyListings = () => {
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
                                <Tab  label="All" />
                                <Tab  label="Live" />
                                <Tab  label="Sold Out" />
                                <Tab  label="Violation" />
                                <Tab  label="Delisted" />
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