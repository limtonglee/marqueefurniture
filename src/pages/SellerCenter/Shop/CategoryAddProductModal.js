import React, { useReducer, useState, useEffect } from 'react';
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
import * as SellerCenterAPI from "../../../services/SellerCenter";
import { useStores } from "../../../stores/RootStore";

const CategoryAddProductModal = ({
    listingIds,
    refreshData,
}) => {
    const style = {
        wrapper: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
        },
        contents: {
            display: "flex",
            flexDirection: "column",
            marginTop: "12px",
            marginBottom: "12px",
            padding: '8px',
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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);

    const [listings, setListings] = useState([]);
    const { userStore } = useStores();
    const getListings = async () => {
        try {
            const res = await SellerCenterAPI.getListings(userStore.id);
            setListings(JSON.parse(JSON.stringify(res.data)));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getListings();
    }, []);

    const handleChange = (event) => {

        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    };

    const handleSubmit = event => {
        event.preventDefault();

        refreshData();
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
                        <Box
                            sx={{
                                overflow: 'scroll',
                                overflowX: 'hidden',
                                height: '100%',
                                maxHeight: 480,
                                marginBottom: '12px'
                            }}>
                            <Grid container sx={{ padding: "12px" }}>
                                <Grid item xs={1}>
                                    {/* {item.id  ? (
                                    <Checkbox {...label} defaultChecked />
                                ) : (
                                    <Checkbox {...label} defaultChecked />
                                )} */}
                                </Grid>
                                <Grid item xs={3}>
                                    Product Details
                                </Grid>
                                <Grid item xs={1}>

                                </Grid>
                                <Grid item xs={3}>
                                    Price
                                </Grid>
                                <Grid item xs={3}>
                                    Status
                                </Grid>
                                <Grid item xs={1}>
                                    Stock
                                </Grid>
                                <Grid item xs={12} >
                                    {listings.map((item) => (
                                        <Card key={item.id} sx={style.contents}>
                                            <Grid container>
                                                <Grid item xs={1}>
                                                    <Checkbox {...label} defaultChecked />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <img
                                                        src={`/api/image/${item.image}`}
                                                        alt={item.title}
                                                    />
                                                    <div>{item.name}</div>
                                                    <div>Variation: {item.variations}</div>
                                                </Grid>
                                                <Grid item xs={1}>

                                                </Grid>
                                                <Grid item xs={3}>
                                                    ${item.listingprice}
                                                </Grid>
                                                <Grid item xs={3}>
                                                    {item.status}
                                                </Grid>
                                                <Grid item xs={1}>
                                                    {item.stockavailable}
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
export default CategoryAddProductModal;