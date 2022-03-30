import React from 'react';
import { useEffect, useState } from "react";
import { Layout } from '../Layout';
import {
    Button,
    Card,
    TextField,
    Container,
    Box,
    Typography,
    CardMedia,
    Grid,
    styled,
    CardContent,
    CardActions,
} from '@mui/material';
import { useParams } from "react-router-dom";
import UpdateOrderModal from './UpdateOrderModal';
import * as SellerCenterAPI from "../../../services/SellerCenter";

export const OrderDetails = () => {

    const param = useParams();
    const [order, setOrder] = useState([]);
    const getOrderDetails = async () => {
        try {
            const res = await SellerCenterAPI.getOrderDetails(param.orderId);
            setOrder(JSON.parse(JSON.stringify(res.data))[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getOrderDetails();
    }, []);

    return (
        <>
            <Layout>
                <Container sx={{ pt: 2 }}>
                    <Box
                        sx={{
                            py: 2,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            id="modal-modal-title"
                            variant="h4"
                        >
                            Order Details
                        </Typography>
                        <Typography variant="h7">
                            Order ID: {order.id} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tracking Number: {order.trackingnumber}
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item md={5} xs={12} sx={{ px: 2 }}>
                                <Card sx={{ mt: 3 }}>
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        // image={`/api/image/${order.image}`}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {order.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Variation: {order.variations}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={7} xs={12} sx={{ px: 2 }}>
                    
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Layout>
        </>
    );
}