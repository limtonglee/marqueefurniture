import { Layout } from '../Layout';
import React, { useReducer, useState } from 'react';
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
import PhotoCamera from "@mui/icons-material/PhotoCamera";;

const shopData = {
    shopName: "ABC Furniture Shop",
    shopDescription: "This is the official online store of ABC Furniture Shop.",
}

const formReducer = (state, event) => {
    if (event.reset) {
        return {
            shopName: '',
            shopDescription: '',
        }
    }
    return {
        ...state,
        [event.name]: event.value
    }
}

const Input = styled("input")({
    display: "none",
});

export const ShopProfile = () => {
    const [fileUploaded, setFileUploaded] = useState("");
    const mockFileUpload = () => {
        setFileUploaded("https://picsum.photos/200/300");
    };

    const [formData, setFormData] = useReducer(formReducer, {shopData});
    const [submitting, setSubmitting] = useState(false);
    const handleChange = (event) => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    };
    const handleSubmit = event => {
        shopData.shopName = formData.shopName;
        shopData.shopDescription = formData.shopDescription;
        event.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
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
                                    image="https://expatliving.sg/wp-content/uploads/2017/05/vitra.jpg"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {shopData.shopName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Products: 10
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Response Rate: 96%
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Response Time: Within hours
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Shop Rating: 4.5
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
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
                                        id="outlined-multiline-static"
                                        name="shopName"
                                        onChange={handleChange}
                                        value={formData.shopName || shopData.shopName}
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
                                        value={formData.shopDescription || shopData.shopDescription}
                                        sx={{ width: "100%" }}
                                    />
                                </Box>
                                <Box sx={{ mt: 3 }}>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        component="div"
                                    >
                                        Images
                                    </Typography>
                                    {mockFileUpload.length === 0 ? (
                                        <Box
                                            sx={{
                                                width: "100%",
                                                height: 250,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: "#F0F0F0",
                                                borderRadius: 3,
                                            }}
                                            onClick={mockFileUpload}
                                        >
                                            <label htmlFor="contained-button-file">
                                                <Input
                                                    accept="image/*"
                                                    id="contained-button-file"
                                                    multiple
                                                    type="file"
                                                />
                                                <Button
                                                    variant="contained"
                                                    component="span"
                                                    startIcon={<PhotoCamera />}
                                                    size="large"
                                                >
                                                    Upload
                                                </Button>
                                            </label>
                                        </Box>
                                    ) : (
                                        <Card
                                            sx={{ width: "100%", position: "relative" }}
                                            onClick={() => console.log("hi")}
                                        >
                                            <CardMedia
                                                component="img"
                                                width="100%"
                                                objectfit="scale-down"
                                                image={fileUploaded}
                                                alt="post picture"
                                            />
                                        </Card>
                                    )}
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