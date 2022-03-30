import { Layout } from '../Layout';
import React, { useReducer, useState, useEffect } from "react";
import {
    Button,
    Card,
    TextField,
    Container,
    Box,
    Typography,
    CardMedia,
    Grid,
    CardContent,
} from '@mui/material';
import * as SellerCenterAPI from "../../../services/SellerCenter";
import { useStores } from "../../../stores/RootStore";

const formReducer = (state, event) => {
    if (event.reset) {
        return {
            shopName: '',
            shopDescription: '',
            shopWebsite: '',
        }
    }
    return {
        ...state,
        [event.name]: event.value
    }
}

export const ShopProfile = () => {
    const [shop, setShop] = useState([]);
    const { userStore } = useStores();

    const getShopProfile = async () => {
        try {
            const res = await SellerCenterAPI.getShopProfile(userStore.id);
            setShop(JSON.parse(JSON.stringify(res.data))[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getShopProfile();
    }, []);

    const [formData, setFormData] = useReducer(formReducer, {});
    const handleChange = (event) => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    };
    const handleSubmit = event => {
        event.preventDefault();
        SellerCenterAPI.editShopProfile(formData.shopName, formData.shopWebsite, formData.shopDescription, 1);
        getShopProfile();
        setTimeout(() => {

        }, 3000);
    }

    return (
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
                        Shop Profile
                    </Typography>
                    <Typography variant="h7">
                        View your shop status and update your shop profile
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item md={5} xs={12} sx={{ px: 2 }}>
                            <Card sx={{ mt: 3 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    // image={`/api/image/${shop.images}`}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {shop.shopname}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Products: 10
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Shop Rating: 4.5
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={7} xs={12} sx={{ px: 2 }}>
                            <form onSubmit={handleSubmit}>
                                <Box
                                    sx={{ mt: 3 }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        component="div"
                                    >
                                        Shop Name
                                    </Typography>
                                    <TextField
                                        
                                        name="shopName"
                                        onChange={handleChange}
                                        value={formData.shopName || shop.shopname}
                                        sx={{ width: "100%" }}
                                    />
                                </Box>
                                <Box sx={{ mt: 3 }}>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        component="div"
                                    >
                                        Shop Website
                                    </Typography>
                                    <TextField
                                        name="shopWebsite"
                                        onChange={handleChange}
                                        value={formData.shopWebsite || shop.website}
                                        sx={{ width: "100%" }}
                                    />
                                </Box>
                                <Box sx={{ mt: 3 }}>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        component="div"
                                    >
                                        Shop Description
                                    </Typography>
                                    <TextField
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        name="shopDescription"
                                        onChange={handleChange}
                                        value={formData.shopDescription || shop.description}
                                        sx={{ width: "100%" }}
                                    />
                                </Box>
                                <Button
                                    type="submit"
                                    value="Submit"
                                    variant="contained"
                                    sx={{ mt: 3 }}
                                >
                                    Save
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Layout >
    );
}