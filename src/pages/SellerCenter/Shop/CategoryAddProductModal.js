import React, { useReducer, useState } from 'react';
import {
    Button,
    Box,
    Card,
    Modal,
    Typography,
    IconButton,
    Grid,
    Checkbox,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from "@mui/icons-material/Close";
import { listingsData } from "../../../data/listingsData";

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
};

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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function BasicModal({ children }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);

    const [data, setData] = React.useState(listingsData);

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
        <>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
            >
                Add Listings
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
                            Select Listing
                        </Typography>
                        <IconButton
                            aria-label="delete"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Box sx={style.contents}>
                            <Grid container sx={{ padding: "12px" }}>
                                <Grid item xs={1}>
                                    <Checkbox {...label} defaultChecked />
                                </Grid>
                                <Grid item xs={4}>
                                    Product Details
                                </Grid>
                                <Grid item xs={2}>
                                    Price
                                </Grid>
                                <Grid item xs={2}>
                                    Status
                                </Grid>
                                <Grid item xs={2}>
                                    Stock
                                </Grid>
                                <Grid item xs={1}>
                                    Sales
                                </Grid>
                                <Grid item xs={12}>
                                    {data.map((item) => (
                                        <Card key={item.id}
                                            sx={{
                                                marginTop: '10px',
                                                marginBottom: '10px',
                                                border: 1,
                                            }}>
                                            <Grid container>
                                                <Grid item xs={1}>
                                                    <Checkbox {...label} defaultChecked />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <img
                                                        src={`${item.img}?w=124&fit=crop&auto=format`}
                                                        srcSet={`${item.img}?w=124&fit=crop&auto=format&dpr=2 2x`}
                                                        alt={item.title}
                                                        loading="lazy"
                                                    />
                                                    <div>{item.productName}</div>
                                                    <div>Variation: {item.variation}</div>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    S${item.price}
                                                </Grid>
                                                <Grid item xs={2}>
                                                    {item.status}
                                                </Grid>
                                                <Grid item xs={2}>
                                                    {item.stock}
                                                </Grid>
                                                <Grid item xs={1}>
                                                    {item.sales}
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    ))}
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={style.buttons}>
                            <Button
                                type="submit"
                                value="Submit"
                                variant="contained"

                            >
                                Confirm
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    );
}