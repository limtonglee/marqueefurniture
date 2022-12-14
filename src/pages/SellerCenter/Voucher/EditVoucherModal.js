import EditIcon from '@mui/icons-material/Edit';
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
import CloseIcon from "@mui/icons-material/Close";
import * as SellerCenterAPI from "../../../services/SellerCenter";

const EditVoucherModal = ({
    children,
    refreshData,
    notifyUpdate,
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

    const formReducer = (state, event) => {
        if (event.reset) {
            return {
                voucherName: children.name,
                minSpend: children.minspend,
                discountAmount: children.discountamount,
                voucherStatus: children.status,
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

    const voucherId = children.id;

    const handleSubmit = async (event) => {
        event.preventDefault();

        formData.voucherName = !formData.voucherName ? children.name : formData.voucherName;
        formData.minSpend = !formData.minSpend ? children.minspend : formData.minSpend;
        formData.discountAmount = !formData.discountAmount ? children.discountamount : formData.discountAmount;
        formData.voucherStatus = !formData.voucherStatus ? children.status : formData.voucherStatus;

        const response = await SellerCenterAPI.editVoucher(
            voucherId,
            formData.voucherName,
            formData.minSpend,
            formData.discountAmount,
            '2021-09-01',
            '2022-09-01',
            formData.voucherStatus,
        );
        if (response.data === "Voucher has been successfully updated!") {
            notifyUpdate();
            refreshData();
            setFormData({
                reset: true
            })
        }
        handleClose();
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
                            Voucher Name
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
                            Minimum spend
                            <TextField
                                required
                                id="outlined-required"
                                name="minSpend"
                                onChange={handleChange}
                                value={formData.minSpend || children.minspend}
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
                                value={formData.discountAmount || children.discountamount}
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
                                value={formData.voucherStatus || children.status}
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
        </div>
    );
}

export default EditVoucherModal;