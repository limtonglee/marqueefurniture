import React, { useReducer } from 'react';
import {
    Button,
    Box,
    Modal,
    TextField,
    Typography,
    IconButton,
    MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from "@mui/icons-material/Close";
import * as SellerCenterAPI from "../../../services/SellerCenter";
import { useStores } from "../../../stores/RootStore";

const AddVoucherModal = ({
    refreshData,
    notifyCreate,
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
            justifyContent: "space-between",
            marginTop: "20px",
            marginBottom: "15px",
        },
        buttons: {
            display: "flex",
            justifyContent: "end",
        },
    };

    const formReducer = (state, event) => {
        if (event.reset) {
            return {
                voucherName: '',
                minSpend: 0,
                discountAmount: 0,
                voucherStatus: '',
            }
        }
        return {
            ...state,
            [event.name]: event.value
        }
    }

    const voucherStatus = [
        {
            value: 'Ongoing',
            label: 'Ongoing',
        },
        {
            value: 'Upcoming',
            label: 'Upcoming',
        },
        {
            value: 'Expired',
            label: 'Expired',
        },
    ];

    const { userStore } = useStores();
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
        const response = await SellerCenterAPI.createVoucher(
            formData.voucherName,
            formData.minSpend,
            formData.discountAmount,
            '2022-07-01',
            '2022-07-01',
            formData.voucherStatus,
            userStore.shop.id,
        );
        if (response.data === "Voucher successfully added!") {
            notifyCreate();
            refreshData();
            setFormData({
                reset: true
            })
        }
        handleClose();
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
                            <Typography sx={{ verticalAlign: 'center' }}>
                                Voucher Name
                            </Typography>
                            <TextField
                                required
                                id="outlined-required"
                                name="voucherName"
                                onChange={handleChange}
                                value={formData.voucherName || ""}
                            >
                            </TextField>
                        </Box>
                        <Box sx={style.contents}>
                            Minimum spend
                            <TextField
                                required
                                id="outlined-required"
                                name="minSpend"
                                onChange={handleChange}
                                value={formData.minSpend || ""}
                            >
                            </TextField>
                        </Box>
                        <Box sx={style.contents}>
                            Discount Amount
                            <TextField
                                required
                                id="outlined-required"
                                name="discountAmount"
                                onChange={handleChange}
                                value={formData.discountAmount || ""}
                            >
                            </TextField>
                        </Box>
                        <Box sx={style.contents}>
                            Voucher status
                            <TextField
                                id="outlined-select-voucher-status"
                                select
                                name="voucherStatus"
                                onChange={handleChange}
                                value={formData.voucherStatus || ''}
                                helperText=""
                            >
                                {voucherStatus.map((option) => (
                                    <MenuItem value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
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

export default AddVoucherModal;