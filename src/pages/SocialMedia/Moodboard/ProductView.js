import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import * as socialMediaAPI from "../../../services/SocialMedia";

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
          uniqueProductId.push(product);
        }
      }
      // allProducts.push(...postProducts);
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
      <Grid container spacing={2}>
        {productsInMoodboard.map((item, index) => (
          <Grid item xs={6} md={3} key={item.id}>
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
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductView;
