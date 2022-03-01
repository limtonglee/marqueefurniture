import { Layout } from '../Layout';
import {
    Card,
    Button,
    Typography,
    Box,
    Grid,
    Switch,
    CardContent
} from '@mui/material';
import { useParams } from "react-router-dom";
import { shopCategoriesData } from "../../../data/shopCategoriesData";
import { listingsData } from "../../../data/listingsData";
import AddIcon from '@mui/icons-material/Add';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import CategoryAddProductModal from './CategoryAddProductModal';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function getProductList(productIdList) {

    var productList = [];
    for (let j = 0; j < productIdList.length; j++) {
        for (let i = 0; i < listingsData.length; i++) {
            if (productIdList[j] === listingsData[i].id) {
                productList.push(listingsData[i]);
                break;
            }
        }
    }
    return productList;
}


export const ShopCategoryDetails = () => {

    const param = useParams();
    const category = shopCategoriesData[param.categoryId];
    var productList = getProductList(category.productIdList);


    return (
        <>
            <Layout>
                <Card sx={{ padding: "18px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography variant="h3">
                                    {category.name}
                                </Typography>
                                <Typography>
                                    Created By: {category.createdBy} &nbsp;&nbsp;&nbsp;&nbsp;
                                    Product(s): {category.products}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Switch {...label} defaultChecked />
                        </Grid>
                    </Grid>
                </Card>
                <Card sx={{ marginTop: "24px", padding: "18px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Typography variant="h4">
                                Product List
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <CategoryAddProductModal/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ marginTop: "12px" }}>
                        <Grid item xs={3}>
                            Image
                        </Grid>
                        <Grid item xs={3}>
                            Product Name
                        </Grid>
                        <Grid item xs={2}>
                            Price
                        </Grid>
                        <Grid item xs={2}>
                            Stock
                        </Grid>
                        <Grid item xs={2}>
                            Actions
                        </Grid>
                        <Grid item xs={12}>
                            {productList.map((product) => (
                                <Card sx={{ marginTop: "24px", padding: "18px"}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <img
                                                src={`${product.img}?w=124&fit=crop&auto=format`}
                                                srcSet={`${product.img}?w=124&fit=crop&auto=format&dpr=2 2x`}
                                                loading="lazy"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            {product.productName}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {product.price}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {product.stock}
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button
                                                variant="contained"
                                                startIcon={<PlaylistRemoveIcon />}
                                                style={{
                                                    height: '36px',
                                                }}
                                                onClick={e => {

                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            ))}
                        </Grid>
                    </Grid>
                </Card>
            </Layout>
        </>
    );
}