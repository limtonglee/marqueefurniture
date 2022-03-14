import React, { useReducer, useState } from 'react';
import {
    Button,
    Box,
    Card,
    Modal,
    TextField,
    MenuItem,
    Typography,
    IconButton,

} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from "@mui/icons-material/Close";
import { voucherData } from "../../../data/voucherData";

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

const formReducer = (state, event) => {
    if (event.reset) {
        return {
            categoryName: '',
        }
    }
    return {
        ...state,
        [event.name]: event.value
    }
}

export default function BasicModal(props) {
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
        voucherData.push({
            id: voucherData.length,
            name: formData.voucherName,
            createdBy: "Seller",
            products: "0",
            productIdList: [],
            display: true,
        });
        props.onCloseModal();
        handleClose();     
        setTimeout(() => {
            setSubmitting(false);
            setFormData({
                reset: true
            })
        }, 1000);
    }

    return (
        <>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
            >
                Add Voucher
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
                            Add Voucher
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
                            Create New Voucher
                            <TextField
                                required
                                id="outlined-required"
                                name="voucherName"
                                placeholder='Enter a voucher name'
                                onChange={handleChange}
                                value={formData.voucherName || ""}
                            >
                            </TextField>
                        </Box>
                        <Box sx={style.contents}>
                            Usage Limit
                            <TextField
                                required
                                id="outlined-required"
                                name="usageLimit"
                                placeholder='Minimum spend'
                                onChange={handleChange}
                                value={formData.usageLimit || ""}
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