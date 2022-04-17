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
import { useStores } from "../../../stores/RootStore";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const ShopCategories = () => {

    const [data, setData] = useState([]);
    const { userStore } = useStores();

    const getShopCategories = async () => {
        try {
            const res = await SellerCenterAPI.getShopCategories(userStore.id);
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
                    <AddCategoryModal
                        refreshData={refreshData}
                    />
                </Stack>
                <Grid container>
                    <Grid item xs={5}>
                        <Typography variant="h6">
                            Category Display Name
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6">
                            Created By
                        </Typography>
                    </Grid>
                    {/* <Grid item xs={2}>
                        Product(s)
                    </Grid>
                    <Grid item xs={2}>
                        Display On/Off
                    </Grid> */}
                    <Grid item xs={4}
                        display="flex"
                        justifyContent="center"
                    >
                        <Typography variant="h6">
                            Actions
                        </Typography>
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
                                    <Grid item xs={5}>
                                        {category.name}
                                    </Grid>
                                    <Grid item xs={3}>
                                        Seller
                                    </Grid>
                                    {/* <Grid item xs={2}>
                                        {category.products}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Switch {...label} defaultChecked />
                                    </Grid> */}
                                    <Grid item xs={4}>
                                        <Stack
                                            direction="column"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Link to={`/sellercenter/shop/categories/${category.id}`}

                                                state={`${category.name}`}
                                            >
                                                <Button>
                                                    Add Listings
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