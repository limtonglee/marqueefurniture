import React, { useReducer } from 'react';
import {
    Button,
    Box,
    Modal,
    TextField,
    MenuItem,
    Typography,
    IconButton,

} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import * as SellerCenterAPI from "../../../services/SellerCenter";
import { createNotification } from '../../../services/Notification';

const UpdateOrderModal = ({
    children,
    refreshData,
    notifyUpdate
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
            width: 350,
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

    const orderStatus = [
        {
            value: 'UNPAID',
            label: 'UNPAID',
        },
        {
            value: 'PAID',
            label: 'PAID',
        },
        {
            value: 'SHIPPING',
            label: 'SHIPPING',
        },
        {
            value: 'DELIVERED',
            label: 'DELIVERED',
        },
        {
            value: 'CANCELLED',
            label: 'CANCELLED',
        },
        {
            value: 'RETURN/REFUND',
            label: 'RETURN/REFUND',
        },
    ];

    const formReducer = (state, event) => {
        if (event.reset) {
            return {
                orderStatus: '',
                trackingNumber: '',
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await SellerCenterAPI.updateOrderStatus(formData.orderStatus, children.id);
        // console.log(children.id)
        // console.log(children)

        SellerCenterAPI.updateTrackingNumber(formData.trackingNumber, children.id);
        if (response.data === "order updated") {
            notifyUpdate();
            refreshData();
            console.log(children.sellerid + " " + children.buyerid)
            await createNotification(
                "has updated order status",
                "1",
                "/profile/orders",
                children.sellerid,
                children.buyerid
              );
        }
        handleClose();
    }

    return (
        <>
            <Button onClick={handleOpen}>
                Update Order Status
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
                            Update Order Status
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
                            Order Status
                            <TextField
                                select
                                name="orderStatus"
                                onChange={handleChange}
                                value={formData.orderStatus || children.order_status}
                            >
                                {orderStatus.map((option) => (
                                    <MenuItem value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Box sx={style.contents}>
                            Tracking Number
                            <TextField
                                name="trackingNumber"
                                onChange={handleChange}
                                value={formData.trackingNumber || children.trackingnumber}
                            >
                            </TextField>
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

export default UpdateOrderModal;