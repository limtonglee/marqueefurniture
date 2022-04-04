import React, { useReducer } from 'react';
import {
    Button,
    Box,
    Modal,
    TextField,
    Typography,
    IconButton,

} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import * as SellerCenterAPI from "../../../services/SellerCenter";

const WithdrawBalanceModal = ({
    shopId,
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
                withdrawAmount: 0,
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
        SellerCenterAPI.withdrawBalance(formData.withdrawAmount, shopId);
        refreshData();
        handleClose();
        setTimeout(() => {
            setFormData({
                reset: true
            })
        }, 1000);
    }

    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpen}
            >
                Withdraw
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
                            Withdraw from balance
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
                            Amount
                            <TextField
                                required
                                id="outlined-number"
                                name="withdrawAmount"
                                type="number"
                                onChange={handleChange}
                                value={formData.withdrawAmount || ''}
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

export default WithdrawBalanceModal;