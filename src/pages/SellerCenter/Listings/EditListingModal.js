import EditIcon from '@mui/icons-material/Edit';
import React, { useReducer, useState } from 'react';
import {
    Button,
    Box,
    Card,
    Modal,
    TextField,
    MenuItem,
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const productType = [
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
            productType: '',
            productName: '',
            productDescription: '',
            variation: '',
            price: 0,
            stock: 0,
        }
    }
    return {
        ...state,
        [event.name]: event.value
    }
}

export default function BasicModal({children}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
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
                    height: '50px',
                }}
            >
                Edit Listing
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>Edit Listing</h2>
                    {submitting &&
                        <div>You are submitting the following:
                            <ul>
                                {Object.entries(formData).map(([name, value]) => (
                                    <li key={name}><strong>{name}</strong>:{value.toString()}</li>
                                ))}
                            </ul>
                        </div>
                    }
                    <form onSubmit={handleSubmit}>
                        <Card
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 2,
                                marginBottom: 3,
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            Basic Information
                            <TextField
                                id="outlined-select-product-type"
                                select
                                label="Product type"
                                name="productType"
                                onChange={handleChange}
                                value={formData.productType || ''}
                                helperText=""
                            >
                                {productType.map((option) => (
                                    <MenuItem value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                required
                                id="outlined-required"
                                name="productName"
                                label="Product Name"
                                onChange={handleChange}
                                value={formData.productName || children.productName}
                            >
                            </TextField>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                                name="productDescription"
                                label="Product Description"
                                onChange={handleChange}
                                value={formData.productDescription || ''}
                            />
                            <input type="file" />
                        </Card>
                        <Card
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 2,
                                marginBottom: 3,
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            Sales Information
                            <TextField
                                required
                                id="outlined-required"
                                name="variation"
                                label="Variation"
                                onChange={handleChange}
                                value={formData.variation || ''}>
                            </TextField>
                            <TextField
                                required
                                id="outlined-required"
                                name="price"
                                label="Price"
                                onChange={handleChange}
                                value={formData.price || ''}>
                            </TextField>
                            <TextField
                                required
                                id="outlined-required"
                                name="stock"
                                label="Stock"
                                onChange={handleChange}
                                value={formData.stock || ''}>
                            </TextField>
                        </Card>
                        <Button
                            type="submit"
                            value="Submit"
                            variant="contained"
                        >
                            Save and Publish
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}