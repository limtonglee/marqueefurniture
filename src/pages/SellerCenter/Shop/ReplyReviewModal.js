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

const ReplyReviewModal = ({
    reviewId,
    refreshData,
    notifyReply,
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
                reply: '',
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
        const response = await SellerCenterAPI.replyReview(reviewId, formData.reply);
        if (response.data === "Merchant successfully replied!") {
            notifyReply();
            refreshData();
            setFormData({
                reset: true
            })
        }
        handleClose();
    }

    return (
        <>
            <Button onClick={handleOpen}>
                Reply to Customer Review
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
                            Reply to Customer Review
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
                            <TextField
                                required
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                                name="reply"
                                placeholder='Enter your reply'
                                onChange={handleChange}
                                value={formData.reply || ""}
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

export default ReplyReviewModal;