import React, { useState, useEffect } from "react";
import { Layout } from '../Layout';
import {
    Card,
    Stack,
    Button,
    Typography,
    Box,
    styled,
    Grid,
    Switch,
    TextField,
    //Link
} from '@mui/material';
import { Link } from "react-router-dom";

import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddCategoryModal from './AddCategoryModal';
import { shopCategoriesData } from "../../../data/shopCategoriesData";
import { useNavigate } from "react-router";


const label = { inputProps: { 'aria-label': 'Switch demo' } };
let tempName = "On Sale";

export const ShopCategories = () => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [data, setData] = React.useState(shopCategoriesData);

    const [editActivated, setEditActivated] = useState(false);
    const openEdit = () => {
        setEditActivated(true);
    };
    const handleEdit = (event) => {
        tempName = event.target.value;
    };
    const sendEdit = (event) => {
        setEditActivated(false);
    };

    // const handleClick = (route) => {
    //     navigate(/sellercenter/shop/categories/${category.id})
    // }

    return (

        <Layout>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    My Shop Categories
                </Typography>
                <AddCategoryModal></AddCategoryModal>
            </Stack>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    Category Display Name
                </Grid>
                <Grid item xs={2}>
                    Created By
                </Grid>
                <Grid item xs={2}>
                    Product(s)
                </Grid>
                <Grid item xs={2}>
                    Display On/Off
                </Grid>
                <Grid item xs={2}>
                    Actions
                </Grid>
                <Grid item xs={12}>
                    {data.map((category) => (
                        <Card key={category.id}
                            sx={{
                                marginTop: '10px',
                                marginBottom: '10px',
                                border: 1,
                            }}>
                            <Grid container spacing={2}>
                                {!editActivated && (
                                    <Grid item xs={4}>
                                        {category.name}
                                        <Button
                                            variant="outlined"
                                            startIcon={<EditIcon />}
                                            onClick={event => {
                                                openEdit(event, category)
                                            }}
                                            sx={{ width: "16px", height: "16px", marginLeft: "10px" }}
                                        />
                                    </Grid>
                                )}
                                {editActivated && (
                                    <Grid item xs={4}>
                                        <Box
                                            component="form"
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                            }}
                                        >

                                            <TextField
                                                required
                                                id="outlined-basic"
                                                defaultValue={category.name}
                                                onChange={handleEdit}
                                            />

                                            <Box sx={{ width: "16px", height: "16px", marginLeft: "10px" }}>
                                                <Button
                                                    endIcon={<CheckIcon />}
                                                    variant="outlined"
                                                    onClick={sendEdit}
                                                >
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )}
                                <Grid item xs={2}>
                                    {category.createdBy}
                                </Grid>
                                <Grid item xs={2}>
                                    {category.products}
                                </Grid>
                                <Grid item xs={2}>
                                    <Switch {...label} defaultChecked />
                                </Grid>
                                <Grid item xs={2}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Link to = {`/sellercenter/shop/categories/${category.id}`}>
                                        <Button>
                                            Add Products
                                        </Button>
                                        </Link>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Card>
                    ))}
                </Grid>
            </Grid>

        </Layout>

    );
}