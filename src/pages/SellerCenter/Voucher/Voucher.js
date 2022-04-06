import React from 'react';
import { useEffect, useState } from "react";
import { Layout } from '../Layout';
import {
    Card,
    Stack,
    Button,
    Typography,
    Tabs,
    Tab,
    Grid,
} from '@mui/material';
import AddVoucherModal from './AddVoucherModal';
import EditVoucherModal from "./EditVoucherModal";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import * as SellerCenterAPI from "../../../services/SellerCenter";
import { useStores } from "../../../stores/RootStore";

export const Voucher = () => {
    const [value, setValue] = React.useState(0);
    const [data, setData] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const { userStore } = useStores();

    const getVouchers = async () => {
        try {
            console.log('ZZZ', userStore.shop);
            const res = await SellerCenterAPI.getVouchers(userStore.shop);
            
            setData(JSON.parse(JSON.stringify(res.data)));
            setVouchers(JSON.parse(JSON.stringify(res.data)));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getVouchers();
    }, []);

    let tabData = vouchers;
    const handleChange = (event, newValue) => {
        setValue(newValue);
        updateData(newValue);
    };

    const updateData = (value) => {
        if (value === 1) {
            tabData = vouchers.filter((voucher) => voucher.status === "Ongoing");
        } else if (value === 2) {
            tabData = vouchers.filter((voucher) => voucher.status === "Upcoming");
        } else if (value === 3) {
            tabData = vouchers.filter((voucher) => voucher.status === "Expired");
        }
        setData(tabData);
    };

    const handleDelete = async (voucherId) => {
        try {
            await SellerCenterAPI.deleteVoucher(voucherId);
            refreshData();
        } catch (error) {
            console.error(error);
        }
    };

    const refreshData = () => {
        getVouchers();
    };

    return (
        
            <Layout>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Vouchers
                    </Typography>
                    <AddVoucherModal refreshData={refreshData}>{userStore.id}</AddVoucherModal>
                </Stack>
                <Card style={{ overflow: 'visible' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab label="All" />
                        <Tab label="Ongoing" />
                        <Tab label="Upcoming" />
                        <Tab label="Expired" />
                    </Tabs>
                    <Grid container p={2}>
                        <Grid item xs={2}>
                            Voucher Name
                        </Grid>
                        <Grid item xs={2}>
                            ID
                        </Grid>
                        <Grid item xs={3}>
                            Usage Limit
                        </Grid>
                        <Grid item xs={2}>
                            Status
                        </Grid>
                        <Grid item xs={3}>
                            Actions
                        </Grid>
                        <Grid item xs={12} >
                            {data.map((item) => (
                                <Card key={item.id}
                                    sx={{
                                        marginTop: '10px',
                                        marginBottom: '10px',
                                        border: 1,
                                        borderColor: '#C4CDD5',
                                    }}>
                                    <Grid container p={2}>
                                        <Grid item xs={2}>
                                            {item.name}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {item.id}
                                        </Grid>
                                        <Grid item xs={3}>
                                            Min.Spend S${item.minspend}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {item.status}
                                        </Grid>
                                        <Grid item xs={3}>
                                            <EditVoucherModal refreshData={refreshData}>{item}</EditVoucherModal>
                                            <Button
                                                variant="contained"
                                                startIcon={<PlaylistRemoveIcon />}
                                                style={{
                                                    width: '100px',
                                                    marginTop: "12px"
                                                }}
                                                onClick={e => {
                                                    handleDelete(item.id);
                                                }}
                                            >
                                                Delete
                                            </Button>
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