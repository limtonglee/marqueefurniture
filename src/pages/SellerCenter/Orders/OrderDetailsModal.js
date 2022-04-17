import React from 'react';
import {
    Button,
    Box,
    Modal,
    Typography,
    IconButton,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Avatar
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

const OrderDetailsModal = ({
    children,
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
            width: 1050,
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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen}>
                View Order Details
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
                            View Order Details
                        </Typography>
                        <IconButton
                            aria-label="delete"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item md={5} xs={12} sx={{ px: 2 }}>
                            <Card sx={{ mt: 3 }}>
                                <CardMedia
                                    component="img"
                                    height="340"
                                    image={`/api/image/${children.image}`}
                                    alt={`/api/image/journeyeast.jpeg`}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {children.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Variation: {children.variations}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: {children.price}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={7} xs={12} sx={{ px: 2 }}>
                            <Card sx={{ mt: 3, padding: '8px' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Buyer information
                                </Typography>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                    <Avatar
                                        alt="avatar"
                                        src={`/api/image/${children.profilepic}`}
                                        sx={{ width: 30, height: 30 }}
                                    />
                                    <Typography variant="body2" color="text.primary">
                                        &nbsp; &nbsp;{children.username}
                                        </Typography>
                                </div>
                                <Typography variant="body2" color="text.primary">
                                    Special message: {children.message}
                                </Typography>
                            </Card>
                            <Card sx={{ mt: 3, padding: '8px' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Shipping information
                                </Typography>
                                <Typography variant="body2" color="text.primary">
                                    Address: {children.address}
                                </Typography>
                                <Typography variant="body2" color="text.primary">
                                    Tracking number: {children.trackingnumber}
                                </Typography>
                                <Typography variant="body2" color="text.primary">
                                    Shipping provider: {children.shippingprovider}
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
}

export default OrderDetailsModal;