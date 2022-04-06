import React, { useState, useEffect } from "react";
import { Layout } from '../Layout';
import {
    Card,
    Button,
    Typography,
    Box,
    Grid,
    Switch,
} from '@mui/material';
import { useParams } from "react-router-dom";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import CategoryAddProductModal from './CategoryAddProductModal';
import * as SellerCenterAPI from "../../../services/SellerCenter";
import { useLocation } from 'react-router-dom'

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const ShopCategoryDetails = () => {

    const param = useParams();
    const [data, setData] = useState([]);
    const location = useLocation();
    const categoryName = location.state;

    const getShopCategoryListings = async () => {
        try {
            const res = await SellerCenterAPI.getShopCategoryListings(param.categoryId);
            setData(JSON.parse(JSON.stringify(res.data)));
            console.log('ZZZ', data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getShopCategoryListings();
    }, []);

    const handleRemove = (product) => {

    }

    return (
        <>
            <Layout>
                <Card sx={{ padding: "18px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography variant="h3">
                                    {categoryName}
                                </Typography>
                                <Typography>
                                    Created By:  Seller &nbsp;&nbsp;&nbsp;&nbsp;
                                    Product(s): 
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Switch {...label} defaultChecked />
                        </Grid>
                    </Grid>
                </Card>
                <Card sx={{ marginTop: "24px", padding: "18px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Typography variant="h4">
                                Product List
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <CategoryAddProductModal/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ marginTop: "12px" }}>
                        <Grid item xs={3}>
                            Image
                        </Grid>
                        <Grid item xs={3}>
                            Product Name
                        </Grid>
                        <Grid item xs={2}>
                            Price
                        </Grid>
                        <Grid item xs={2}>
                            Stock
                        </Grid>
                        <Grid item xs={2}>
                            Actions
                        </Grid>
                        <Grid item xs={12}>
                            {data.map((item) => (
                                <Card sx={{ marginTop: "24px", padding: "18px"}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <img
                                                src={`/api/image/${item.image}`}
                                                alt='img'
                                                loading="lazy"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            {item.name}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {item.listingprice}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {item.stockavailable}
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button
                                                variant="contained"
                                                startIcon={<PlaylistRemoveIcon />}
                                                style={{
                                                    height: '36px',
                                                }}
                                                onClick={e => {
                                                    handleRemove(item);
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            ))}
                        </Grid>
                    </Grid>
                </Card>
            </Layout>
        </>
    );
}