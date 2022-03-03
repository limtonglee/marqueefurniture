import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";

const ProductView = ({ moodboard }) => {
	console.log(moodboard);
	console.log(moodboard.products);

	// TO DO: retrieve products from moodboard

	const products = [
		{
			id: "0",
			listingType: "Furniture",
			img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25",
			title: "Brown Sofa",
			author: "@FurnitureFirstStop",
		},
		{
			id: "1",
			listingType: "Furniture",
			img: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c",
			title: "Black Sofa",
			author: "@FurnitureLife",
		},
	];

	return (
		<>
			<Grid container spacing={2} sx={{ mt: 1 }}>
				{products.map((item, index) => (
					<Grid item xs={6} md={3} key={item.id}>
						<Link
							to={`/marketplace/${item.id}`}
							target="_blank"
							style={{ textDecoration: "none" }}
						>
							<Card
								sx={{
									width: "100%",
									position: "relative",
								}}
							>
								<Box
									sx={{
										flexGrow: 1,
									}}
								>
									<CardMedia
										component="img"
										height="100"
										image={item.img}
										alt="green iguana"
									/>
									<Grid
										container
										spacing={2}
										sx={{
											display: "flex",
											alignItems: "center",
										}}
									>
										<Grid item xs={8}>
											<Box
												sx={{
													p: 1,
												}}
											>
												<Typography
													variant="subtitle2"
													component="div"
												>
													{item.title}
												</Typography>
												<Typography
													variant="caption"
													display="block"
												>
													{item.author}
												</Typography>
												<Typography
													variant="caption"
													display="block"
												>
													{item.price}
												</Typography>
											</Box>
										</Grid>
									</Grid>
								</Box>
							</Card>
						</Link>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default ProductView;
