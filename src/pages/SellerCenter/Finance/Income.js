import * as React from 'react';
import { Layout } from '../Layout';
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
import { incomeDetailsData } from "../../../data/incomeDetailsData";


export const Income = () => {
    const [value, setValue] = React.useState(0);
    const [data, setData] = React.useState(incomeDetailsData);
    let tabData = incomeDetailsData;

    const handleChange = (event, newValue) => {
        setValue(newValue);
        updateData(newValue);
    };
    const updateData = (value) => {
        if (value === 1) {
            tabData = incomeDetailsData.filter((item) => item.status === "To Release");
        }
        if (value === 2) {
            tabData = incomeDetailsData.filter((item) => item.status === "Released");
        }
        setData(tabData);
    };

    return (
        <Layout>
            <Card sx={{ padding: "12px" }}>
                <Typography variant="h5" gutterBottom>
                    Income Overview
                </Typography>
                <Grid container p={2}>
                    <Grid item xs={3} sx={{ marginRight: "24px" }}>
                        <Card sx={{ padding: "12px" }}>
                            <Typography variant="h5" gutterBottom>
                                Balance
                            </Typography>
                            <Typography variant="h7" gutterBottom>
                                Total
                            </Typography>
                            <Typography variant="h3" gutterBottom>
                                $ 0.0
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Card>

            <Card sx={{ padding: "12px", marginTop: "24px" }}>
                <Typography variant="h5" gutterBottom>
                    Income Details
                </Typography>
                <Tabs
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label="All" />
                    <Tab label="To Release" />
                    <Tab label="Released" />
                </Tabs>
                <Grid container p={2}>
                    <Grid item xs={3}>
                        Order
                    </Grid>
                    <Grid item xs={3}>
                        Estimated Release Date
                    </Grid>
                    <Grid item xs={3}>
                        Status
                    </Grid>
                    <Grid item xs={3}>
                        Payout Amount
                    </Grid>
                    <Grid item xs={12} >
                        {data.map((item) => (
                            <Card 
                                sx={{
                                    marginTop: '10px',
                                    marginBottom: '10px',
                                    border: 1,
                                    borderColor: '#C4CDD5',
                                }}>
                                <Grid container p={2}>
                                    <Grid item xs={3}>
                                        {item.order}
                                    </Grid>
                                    <Grid item xs={3}>
                                        {item.releaseDate}
                                    </Grid>
                                    <Grid item xs={3}>
                                        {item.status}
                                    </Grid>
                                    <Grid item xs={3}>
                                        {item.payoutAmount}
                                    </Grid>
                                </Grid>
                            </Card>
                        ))}
                    </Grid>
                </Grid>
            </Card>
        </Layout>
    );
}