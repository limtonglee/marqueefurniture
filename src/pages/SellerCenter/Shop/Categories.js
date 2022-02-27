import React, { useState, useEffect } from "react";
import { Layout } from '../Layout';
// material
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
    Switch,
    Link,
    TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddCategoryModal from './AddCategoryModal';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
let tempName = "On Sale";

export const ShopCategories = () => {
    const [editActivated, setEditActivated] = useState(false);
    const openEdit = () => {
        setEditActivated(true);
    };
    const handleEdit = (event) => {
        tempName = event.target.value;
    };
    const sendEdit = (event) => {
        setEditActivated(false);
    };

    return (

        <Layout>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    My Shop Categories
                </Typography>
                <AddCategoryModal></AddCategoryModal>
            </Stack>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    Category Display Name
                </Grid>
                <Grid item xs={2}>
                    Created By
                </Grid>
                <Grid item xs={2}>
                    Product(s)
                </Grid>
                <Grid item xs={2}>
                    Display On/Off
                </Grid>
                <Grid item xs={2}>
                    Actions
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Grid container spacing={2}>
                            {!editActivated && (
                                <Grid item xs={4}>
                                    {tempName}
                                    <Button
                                        variant="outlined"
                                        startIcon={<EditIcon />}
                                        onClick={openEdit}
                                        sx={{ width: "16px", height: "16px", marginLeft: "10px" }}
                                    />
                                </Grid>
                            )}
                            {editActivated && (
                                <Grid item xs={4}>
                                    <Box
                                        component="form"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >

                                        <TextField
                                            required
                                            id="outlined-basic"
                                            defaultValue={tempName}
                                            onChange={handleEdit}
                                        />

                                        <Box sx={{ width: "16px", height: "16px", marginLeft: "10px" }}>
                                            <Button
                                                endIcon={<CheckIcon />}
                                                variant="outlined"
                                                onClick={sendEdit}
                                            >
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            )}
                            <Grid item xs={2}>
                                System
                            </Grid>
                            <Grid item xs={2}>
                                0
                            </Grid>
                            <Grid item xs={2}>
                                <Switch {...label} defaultChecked />
                            </Grid>
                            <Grid item xs={2}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Link href="#" underline="hover">Add Products</Link>
                                    <Link href="#" underline="hover">Delete</Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                New Arrival
                            </Grid>
                            <Grid item xs={2}>
                                System
                            </Grid>
                            <Grid item xs={2}>
                                0
                            </Grid>
                            <Grid item xs={2}>
                                <Switch {...label} defaultChecked />
                            </Grid>
                            <Grid item xs={2}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Link href="#" underline="hover">Add Products</Link>
                                    <Link href="#" underline="hover">Delete</Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>

        </Layout>

    );
}