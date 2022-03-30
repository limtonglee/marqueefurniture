import EditIcon from '@mui/icons-material/Edit';
import React, { useReducer, useState } from 'react';
import {
    Button,
    Box,
    Card,
    Modal,
    TextField,
    Typography,
    IconButton,

} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import * as SellerCenterAPI from "../../../services/SellerCenter";

const EditListingModal = ({
    children,
    refreshData,
}) => {

const style = {
    wrapper: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    },
    contents: {
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
        marginBottom: "15px",
        justifyContent: "flex-start",
    },
    buttons: {
        display: "flex",
        justifyContent: "end",
    },
    cardStyle: {
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        margin: 1,
    }
};

const formReducer = (state, event) => {
    if (event.reset) {
        return {
            name: '',
            image: '',
            description: '',
            category: '',
            brand: '',
            warrantyInfo: '',
            shippingProvider: '',
            parcelSize: '',
            weight: '',
            stockAvailable: '',
            listingPrice: '',
            variations: '',
            dimensions: '',
        }
    }
    return {
        ...state,
        [event.name]: event.value
    }
}


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useReducer(formReducer, {});

    const handleChange = (event) => {

        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    };
    const handleSubmit = event => {
        event.preventDefault();

        setTimeout(() => {
            setFormData({
                reset: true
            })
        }, 3000);
    }
    return (
        <div>
            <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleOpen}
                style={{
                    width: '100px',
                }}
            >
                Edit
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.wrapper}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Edit Listing
                        </Typography>
                        <IconButton
                            aria-label="delete"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Card
                                component="form"
                                sx={style.cardStyle}
                                noValidate
                                autoComplete="off"
                            >
                                Basic Information
                                <TextField
                                    required
                                    id="outlined-required"
                                    name="name"
                                    label="Product name"
                                    onChange={handleChange}
                                    value={formData.name || children.name}
                                >
                                </TextField>
                                <TextField
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={4}
                                    name="description"
                                    label="Product description"
                                    onChange={handleChange}
                                    value={formData.description || children.description}
                                />

                            </Card>
                            <Card
                                component="form"
                                sx={style.cardStyle}
                                noValidate
                                autoComplete="off"
                            >
                                Specification
                                <TextField
                                    required
                                    id="outlined-required"
                                    name="category"
                                    label="Category"
                                    onChange={handleChange}
                                    value={formData.category || children.category}>
                                </TextField>
                                <TextField
                                    required
                                    id="outlined-required"
                                    name="brand"
                                    label="Brand"
                                    onChange={handleChange}
                                    value={formData.brand || children.brand}>
                                </TextField>
                                <TextField

                                    required
                                    id="outlined-required"
                                    name="dimensions"
                                    label="Dimensions"
                                    onChange={handleChange}
                                    value={formData.dimensions || children.dimensions}>
                                </TextField>
                                <TextField
                                    required
                                    id="outlined-required"
                                    name="warrantyInfo"
                                    label="Warranty"
                                    onChange={handleChange}
                                    value={formData.warrantyInfo || children.warrantyinfo}>
                                </TextField>
                            </Card>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Card
                                component="form"
                                sx={style.cardStyle}
                                noValidate
                                autoComplete="off"
                            >
                                Sales Information
                                <TextField
                                    required
                                    id="outlined-required"
                                    name="variations"
                                    label="Variation"
                                    onChange={handleChange}
                                    value={formData.variations || children.variations}>
                                </TextField>
                                <TextField
                                    required
                                    id="outlined-required"
                                    name="listingPrice"
                                    label="Price"
                                    onChange={handleChange}
                                    value={formData.listingPrice || children.listingprice}>
                                </TextField>
                                <TextField
                                    required
                                    id="outlined-required"
                                    name="stockAvailable"
                                    label="Stock"
                                    onChange={handleChange}
                                    value={formData.stockAvailable || children.stockavailable}>
                                </TextField>
                            </Card>
                            <Card
                                component="form"
                                sx={style.cardStyle}
                                noValidate
                                autoComplete="off"
                            >
                                Shipping
                                <TextField
                                    required
                                    id="outlined-required"
                                    name="weight"
                                    label="Weight"
                                    onChange={handleChange}
                                    value={formData.weight || children.stockavailable}>
                                </TextField>
                                <TextField
                                    required
                                    id="outlined-required"
                                    name="parcelSize"
                                    label="Parcel size"
                                    onChange={handleChange}
                                    value={formData.parcelSize || children.parcelsize}>
                                </TextField>
                                <TextField
                                    required
                                    id="outlined-required"
                                    name="shippingProvider"
                                    label="Shipping provider"
                                    onChange={handleChange}
                                    value={formData.shippingProvider || children.shippingprovider}>
                                </TextField>
                            </Card>
                        </div>
                        <Button
                            type="submit"
                            value="Submit"
                            variant="contained"
                            sx={{ m: 2 }}
                        >
                            Save and Publish
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default EditListingModal;