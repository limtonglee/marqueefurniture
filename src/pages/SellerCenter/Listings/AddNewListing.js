import { Layout } from '../Layout';
import React, { useReducer, useState } from 'react';
import {
    Button,
    Card,
    TextField,
    MenuItem,
} from '@mui/material';
import * as SellerCenterAPI from "../../../services/SellerCenter";

const style = {
    cardStyle: {
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        marginBottom: 2,
        marginRight: 2,
        width: '360px'
    }
};

const type = [
    {
        value: 'Furniture',
        label: 'Furniture',
    },
    {
        value: 'Service',
        label: 'Service',
    },
    {
        value: 'Design',
        label: 'Design',
    },
];

const formReducer = (state, event) => {
    if (event.reset) {
        return {
            type: '',
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
            status: '',
            shopId: '',
        }
    }
    return {
        ...state,
        [event.name]: event.value
    }
}

export const AddNewListing = () => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event) => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    };
    const handleSubmit = event => {
        event.preventDefault();
        SellerCenterAPI.createListing(
            formData.name,
            formData.image,
            formData.description,
            formData.category,
            formData.brand,
            formData.warrantyInfo,
            formData.shippingProvider,
            formData.parcelSize,
            formData.weight,
            formData.stockAvailable,
            formData.listingPrice,
            formData.variations,
            formData.dimensions,
            'LIVE',
            1,
            formData.type,
        );
        setTimeout(() => {
            setSubmitting(false);
            setFormData({
                reset: true
            })
        }, 3000);
    }
    return (
        <Layout>
            <h2>Add New Listing</h2>
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
                            id="outlined-select-product-type"
                            select
                            label="Product type"
                            name="type"
                            onChange={handleChange}
                            value={formData.type || ''}
                            helperText=""
                        >
                            {type.map((option) => (
                                <MenuItem value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            required
                            id="outlined-required"
                            name="name"
                            label="Product name"
                            onChange={handleChange}
                            value={formData.name || ''}
                        >
                        </TextField>
                        <TextField
                            required
                            id="outlined-required"
                            name="image"
                            label="Image"
                            onChange={handleChange}
                            value={formData.image || ''}
                        >
                        </TextField>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            name="description"
                            label="Product description"
                            onChange={handleChange}
                            value={formData.description || ''}
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
                            value={formData.category || ''}>
                        </TextField>
                        <TextField
                            required
                            id="outlined-required"
                            name="brand"
                            label="Brand"
                            onChange={handleChange}
                            value={formData.brand || ''}>
                        </TextField>
                        <TextField
                            required
                            id="outlined-required"
                            name="dimensions"
                            label="Dimensions"
                            onChange={handleChange}
                            value={formData.dimensions || ''}>
                        </TextField>
                        <TextField
                            required
                            id="outlined-required"
                            name="warrantyInfo"
                            label="Warranty"
                            onChange={handleChange}
                            value={formData.warrantyInfo || ''}>
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
                            value={formData.variations || ''}>
                        </TextField>
                        <TextField
                            required
                            id="outlined-required"
                            name="listingPrice"
                            label="Price"
                            onChange={handleChange}
                            value={formData.listingPrice || ''}>
                        </TextField>
                        <TextField
                            required
                            id="outlined-required"
                            name="stockAvailable"
                            label="Stock"
                            onChange={handleChange}
                            value={formData.stockAvailable || ''}>
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
                            value={formData.weight || ''}>
                        </TextField>
                        <TextField
                            required
                            id="outlined-required"
                            name="parcelSize"
                            label="Parcel size"
                            onChange={handleChange}
                            value={formData.parcelSize || ''}>
                        </TextField>
                        <TextField
                            required
                            id="outlined-required"
                            name="shippingProvider"
                            label="Shipping provider"
                            onChange={handleChange}
                            value={formData.shippingProvider || ''}>
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

        </Layout>

    );
}