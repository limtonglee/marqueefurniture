import React, { useState, useEffect } from "react";
import { Layout } from '../Layout';
import {
    Card,
    Stack,
    Button,
    Typography,
    Box,
    styled,
    Grid,
    Switch,
    TextField,
} from '@mui/material';
import { Link } from "react-router-dom";

import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddCategoryModal from './AddCategoryModal';
// import { shopCategoriesData } from "../../../data/shopCategoriesData";
import * as SellerCenterAPI from "../../../services/SellerCenter";

const label = { inputProps: { 'aria-label': 'Switch demo' } };
let tempName = "On Sale";

export const ShopCategories = (props) => {

    // const [data, setData] = useState(shopCategoriesData);
    const [data, setData] = useState([]);
    //first use effect only called once
    useEffect(() => {
        SellerCenterAPI.getShopCategories(1)
            .then((response) => {
                setData(JSON.parse(JSON.stringify(response.data)));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const getShopCategories = async () => {
        try {
            const res = await SellerCenterAPI.getShopCategories(1);
            setData(JSON.parse(JSON.stringify(res.data)));
            console.log('ZZZ', 2121212);
        } catch (error) {
            console.error(error);
        }
    };

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

    useEffect(() => {
        getShopCategories();
    }, []);

    const refreshData = () => {
        getShopCategories();
    };

    return (
        <>
            <Layout>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        My Shop Categories
                    </Typography>
                    <AddCategoryModal refreshData={refreshData}></AddCategoryModal>
                </Stack>
                <Grid container>
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
                        {data.map((category) => (
                            <Card key={category.id}
                                sx={{
                                    marginTop: '10px',
                                    marginBottom: '10px',
                                    border: 1,
                                    borderColor: '#C4CDD5',
                                    paddingTop: "24px",
                                    paddingBottom: "24px",
                                }}>
                                <Grid container sx={{ paddingLeft: "12px" }}>
                                    {!editActivated && (
                                        <Grid item xs={4}>
                                            {category.name}
                                            {/* <Button
                                            variant="outlined"
                                            startIcon={<EditIcon />}
                                            sx={{
                                                width:"16px",
                                                height:"16px",
                                                marginLeft: "10px",
                                            }}
                                            onClick={event => {
                                                openEdit(event, category)
                                            }}
                                        /> */}
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
                                                    defaultValue={category.name}
                                                    sx={{ height: "16px" }}
                                                    onChange={handleEdit}
                                                />

                                                <Box sx={{ width: "16px", height: "16px", marginLeft: "10px" }}>
                                                    <Button
                                                        endIcon={<CheckIcon />}
                                                        variant="outlined"
                                                        sx={{
                                                            height: "16px",
                                                        }}
                                                        onClick={sendEdit}
                                                    >
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    )}
                                    <Grid item xs={2}>
                                        Seller
                                    </Grid>
                                    <Grid item xs={2}>
                                        {category.products}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Switch {...label} defaultChecked />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Link to={`/sellercenter/shop/categories/${category.id}`}>
                                                <Button>
                                                    Add Products
                                                </Button>
                                            </Link>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Card>
                        ))}
                    </Grid>
                </Grid>

            </Layout>
        </>
    );
}