import EditIcon from '@mui/icons-material/Edit';
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
import CloseIcon from "@mui/icons-material/Close";

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

export default function BasicModal({ children }) {
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
                            Edit Voucher Detail
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
                            New Voucher Name
                            <TextField
                                required
                                id="outlined-required"
                                name="voucherName"
                                placeholder='Enter a voucher name'
                                onChange={handleChange}
                                value={formData.voucherName || children.name}
                            >
                            </TextField>
                        </Box>
                        <Box sx={style.contents}>
                            New Usage Limit
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
        </div>
    );
}