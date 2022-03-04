import React, { useState, useEffect } from "react";
import { Layout } from "../Layout";
// import { user } from "../../../data/currentUserData";
import user from "../../../data/currentUserData2";
// material
import {
	Card,
	Stack,
	Button,
	Typography,
	Tabs,
	Tab,
	Box,
	styled,
	Grid,
	ButtonBase,
	Avatar,
	Link,
	TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

const commentButtonStyles = {
	textTransform: "none",
	color: "grey !important",
	fontWeight: "normal",
};

const addReplyStyles = {
    "&.MuiButton-root": {
        borderRadius: 1.5,
    },
    borderColor: "#2E6B75",
    color: "#2E6B75",
    marginTop: "10px",
    width: "32px",
    height: "32px",
    "&:hover": {
        borderColor: "#F2F2F2",
    },
};

export const ShopRating = () => {
	const handleReply = () => {
		console.log("add comment");
		setCommentActivated(true);
	};
	const [commentActivated, setCommentActivated] = useState(false);
	const [comment, setComment] = useState("");
	const updateComment = (e) => {
		setComment(e.target.value);
	};
	const sendComment = () => {
		console.log("sendComment");
		console.log(comment);

		const newId = Math.floor(Math.random() * 100 + 1);

		const newComment = {
			id: newId,
			user: user,
			comment: comment,
			datetime: "",
		};

		setComment("");
	};

    const [noReply, setNoReply] = useState(true);


    return (

        <Layout>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Shop Rating
                </Typography>
                <Typography variant="h4" gutterBottom>
                    4.5/5
                </Typography>
            </Stack>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs>
                    <Tab label="All" />
                    <Tab label="To Reply" />
                    <Tab label="Replied" />
                </Tabs>
            </Box>
            <Box sx={{ border: 1, borderColor: 'divider', margin: '10px' }}>
                <Tabs>
                    <Tab label="All" />
                    <Tab label="5 Star" />
                    <Tab label="4 Star" />
                    <Tab label="3 Star" />
                    <Tab label="2 Star" />
                    <Tab label="1 Star" />
                </Tabs>
            </Box>
            <Grid container spacing={2} >
                <Grid item xs={4}>
                    Product Information
                </Grid>
                <Grid item xs={4}>
                    Buyers' Review
                </Grid>
                <Grid item xs={4}>
                    Your Reply
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card sx={{ height: '100%' }}>
                        <Grid container spacing={2} p={2}>
                            <Grid item>
                                <ButtonBase sx={{ width: 128, height: 128 }}>
                                    <Img alt="complex" src="https://images.unsplash.com/photo-1540574163026-643ea20ade25" />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            Sofa
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Variation: Brown
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ID: 0
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                            Link to listing
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" component="div">
                                        $298.99
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ height: '100%' }}>
                        <Grid container spacing={2} p={2}>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                                            sx={{ width: 50, height: 50 }}
                                        />
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            Remy Sharp
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Good item, fast delivery
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Rating: 5/5
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" component="div">
                                        Date: 27/2/2022
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ height: '100%' }}>
                        <Grid container spacing={2} p={2}>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src="https://i.pinimg.com/originals/34/60/3c/34603ce8a80b1ce9a768cad7ebf63c56.jpg"
                                            sx={{ width: 50, height: 50 }}
                                        />
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            ABC Furniture Shop
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Thank you for your review!
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" component="div">
                                        Date: 27/2/2022
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{marginTop: "8px"}}>
                <Grid item xs={4}>
                    <Card sx={{ height: '100%' }}>
                        <Grid container spacing={2} p={2}>
                            <Grid item>
                                <ButtonBase sx={{ width: 128, height: 128 }}>
                                    <Img alt="complex" src="https://images.unsplash.com/photo-1540574163026-643ea20ade25" />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            Sofa
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Variation: Brown
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ID: 0
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                            Link to listing
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" component="div">
                                        $298.99
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ height: '100%' }}>
                        <Grid container spacing={2} p={2}>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                                            sx={{ width: 50, height: 50 }}
                                        />
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            Remy Sharp
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Good item, fast delivery
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Rating: 4/5
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" component="div">
                                        Date: 27/2/2022
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ height: '100%', display: 'flex', alignItems: "center", justifyContent: "center" }}>
                        {!commentActivated && noReply && (
                            <Button


                            onClick={handleReply}
                            >
                                Add reply
                            </Button>
                        )}
                        {commentActivated && (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <TextField
                                    id="outlined-multiline-flexible"
                                    multiline
                                    maxRows={4}
                                    value={comment}
                                    onChange={updateComment}
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                    }}
                                 />
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    {comment.length === 0 ? (
                                        <Button
                                            endIcon={<SendIcon />}
                                            variant="outlined"
                                            onClick={sendComment}
                                            sx={
                                                addReplyStyles
                                            }
                                            disabled
                                        >
                                            Send
                                        </Button>
                                    ) : (
                                        <Button
                                            endIcon={<SendIcon />}
                                            variant="outlined"
                                            onClick={sendComment}
                                            sx={
                                                addReplyStyles
                                            }
                                        >
                                            Send
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                        )}
                    </Card>
                </Grid>
            </Grid>
        </Layout>

    );
}
