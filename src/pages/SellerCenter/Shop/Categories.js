import React, { useState, useEffect } from "react";
import { Layout } from '../Layout';
import {
    Card,
    Stack,
    Button,
    Typography,
    Grid,
    Switch,
} from '@mui/material';
import { Link } from "react-router-dom";
import AddCategoryModal from './AddCategoryModal';
import EditCategoryModal from './EditCategoryModal';
import * as SellerCenterAPI from "../../../services/SellerCenter";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const ShopCategories = (props) => {

    const [data, setData] = useState([]);

    const getShopCategories = async () => {
        try {
            const res = await SellerCenterAPI.getShopCategories(1);
            setData(JSON.parse(JSON.stringify(res.data)));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getShopCategories();
    }, []);

    const handleDelete = async (categoryId) => {
        try {
            await SellerCenterAPI.deleteShopCategory(categoryId);
            await SellerCenterAPI.deleteShopCategoryListings(categoryId);
            refreshData();
        } catch (error) {
            console.error(error);
        }
    };

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
                                    marginTop: '12px',
                                    marginBottom: '12px',
                                    border: 1,
                                    borderColor: '#C4CDD5',
                                    paddingTop: "18px",
                                    paddingBottom: "18px",
                                }}>
                                <Grid container sx={{ paddingLeft: "12px" }}>
                                    <Grid item xs={4}>
                                        {category.name}
                                    </Grid>
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
                                        <Stack direction="column" alignItems="center" justifyContent="space-between">
                                            <Link to={`/sellercenter/shop/categories/${category.id}`}>
                                                <Button>
                                                    Add Products
                                                </Button>
                                            </Link>
                                            <EditCategoryModal refreshData={refreshData}>{category}</EditCategoryModal>
                                            <Button onClick={e => {
                                                handleDelete(category.id);
                                            }}>
                                                Delete
                                            </Button>
                                        </Stack>
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