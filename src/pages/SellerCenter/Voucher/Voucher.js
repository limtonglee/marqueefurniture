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
import AddVoucherModal from './AddVoucherModal';
import { voucherData } from "../../../data/voucherData";
import EditVoucherModal from "./EditVoucherModal";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

export const Voucher = () => {
    const [value, setValue] = React.useState(0);
    const [data, setData] = React.useState(voucherData);
    let tabData = voucherData;

    const handleChange = (event, newValue) => {
        setValue(newValue);
        updateData(newValue);
    };
    const updateData = (value) => {
        if (value === 1) {
            tabData = voucherData.filter((voucher) => voucher.status === "Ongoing");
        }
        if (value === 2) {
            tabData = voucherData.filter((voucher) => voucher.status === "Upcoming");
        }
        if (value === 3) {
            tabData = voucherData.filter((voucher) => voucher.status === "Expired");
        }
        setData(tabData);
    };

    return (
        
            <Layout>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Vouchers
                    </Typography>
                    <AddVoucherModal></AddVoucherModal>
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
                                            {item.usageLimit}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {item.status}
                                        </Grid>
                                        <Grid item xs={3}>
                                            <EditVoucherModal>{item}</EditVoucherModal>
                                            <Button
                                                variant="contained"
                                                startIcon={<PlaylistRemoveIcon />}
                                                style={{
                                                    width: '100px',
                                                    marginTop: "12px"
                                                }}
                                                onClick={e => {
                                                    
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