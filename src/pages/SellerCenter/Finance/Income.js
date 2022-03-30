import React from 'react';
import { useEffect, useState } from "react";
import { Layout } from '../Layout';
import {
    Card,
    Typography,
    Grid,
} from '@mui/material';
import * as SellerCenterAPI from "../../../services/SellerCenter";
import { useStores } from "../../../stores/RootStore";

export const Income = () => {
    const [data, setData] = useState([]);
    const [income, setIncome] = useState([]);
    const [balance, setBalance] = useState([]);
    const { userStore } = useStores();

    const getIncome = async () => {
        try {
            const res = await SellerCenterAPI.getIncome(userStore.id);
            setData(JSON.parse(JSON.stringify(res.data)));
            setIncome(JSON.parse(JSON.stringify(res.data)));
        } catch (error) {
            console.error(error);
        }
    };

    const getBalance = async () => {
        try {
            const res = await SellerCenterAPI.getBalance(userStore.id);
            setBalance(JSON.parse(JSON.stringify(res.data))[0]);
        } catch (error) {
            console.error(error);
        }
    };

    const initialLoad = () => {
        getIncome();
        getBalance();
    }

    useEffect(() => {
        initialLoad();
    }, []);

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
                                $ {balance.balance}
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Card>

            <Card sx={{ padding: "12px", marginTop: "24px" }}>
                <Typography variant="h5" gutterBottom>
                    Income Details
                </Typography>
                <Grid container p={2}>
                    <Grid item xs={3}>
                        Order
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
                                        {item.id}
                                    </Grid>
                                    <Grid item xs={3}>
                                        {item.order_status}
                                    </Grid>
                                    <Grid item xs={3}>
                                        {item.price}
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