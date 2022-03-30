import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import * as socialMediaAPI from "../../../services/SocialMedia";
import Button from "@mui/material/Button";
import { ImageListItem, ImageListItemBar } from "@mui/material";

const ProductView = ({ moodboard }) => {
  console.log("moodboard posts", moodboard.moodboardItems);

  const [productsInMoodboard, setProductsInMoodboard] = useState([]);

  const getPostProducts = async (post) => {
    try {
      const res = await socialMediaAPI.getPostListings(post.id);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllProducts = async () => {
    const allProducts = [];
    const uniqueProductId = [];

    for (let post of moodboard.moodboardItems) {
      const postProducts = await getPostProducts(post);
      for (let product of postProducts) {
        if (!uniqueProductId.includes(product.id)) {
          allProducts.push(product);
          uniqueProductId.push(product.id);
        }
      }
    }

    console.log("all products tagged", allProducts);
    setProductsInMoodboard(allProducts);
  };

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: update listing card UI after API has been updated

  return (
    <>
      {productsInMoodboard.length === 0 ? (
        <>
          <Box
            sx={{
              width: "100%",
              height: 200,
              border: "1px solid #DFE3E8",
              borderRadius: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{ fontWeight: "normal", fontStyle: "italic" }}
            >
              No products tagged
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Grid container spacing={2}>
            {productsInMoodboard.map((item, index) => (
              <>
                <ImageListItem
                  key={item.id}
                  sx={{ boxShadow: 1, margin: 2.5, padding: 2 }}
                >
                  <Link to={`/marketplace/${item.id}`}>
                    <Button>
                      <img
                        src={`/api/image/${item.image}`}
                        alt={item.name}
                        loading="lazy"
                        width="188"
                        height="188"
                      />
                    </Button>
                  </Link>
                  <ImageListItemBar
                    sx={{
                      backgroundColor: "primary",
                      fontWeight: "bold",
                      "& .MuiImageListItemBar-subtitle": {
                        overflow: "visible",
                      },
                    }}
                    title={item.name}
                    subtitle={item.author}
                    position="below"
                  />
                  <Grid container spacing={2}>
                    {item.listingprice && (
                      <Grid
                        item
                        xs={4}
                        sx={{
                          fontWeight: "bold",
                          fontSize: 18,
                          color: "primary.main",
                          my: 2,
                        }}
                      >
                        ${item.listingprice.toFixed(2)}
                      </Grid>
                    )}
                  </Grid>
                </ImageListItem>

                {/* <Grid item xs={6} md={3} key={item.id}>
                  <>
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
                            image={item.image}
                            alt={item.name}
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
                                <Typography variant="subtitle2" component="div">
                                  {item.name}
                                </Typography>
                                <Typography variant="caption" display="block">
                                  {item.author}
                                </Typography>
                                <Typography variant="caption" display="block">
                                  {item.price}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Card>
                    </Link>
                  </>
                </Grid> */}
              </>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default ProductView;
