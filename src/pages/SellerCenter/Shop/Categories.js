import * as React from 'react';
import { Layout } from '../Layout';
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
    Switch,
    Link,

} from '@mui/material';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import AddCategoryModal from './AddCategoryModal';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const ShopCategories = () => {


    return (

        <Layout>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    My Shop Categories
                </Typography>
                <AddCategoryModal></AddCategoryModal>
            </Stack>
            <Grid container spacing={2}>
                <Grid item xs={2.4}>
                    Category Display Name
                </Grid>
                <Grid item xs={2.4}>
                    Created By
                </Grid>
                <Grid item xs={2.4}>
                    Product(s)
                </Grid>
                <Grid item xs={2.4}>
                    Display On/Off
                </Grid>
                <Grid item xs={2.4}>
                    Actions
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Grid container spacing={2}>
                            <Grid item xs={2.4}>
                                On Sale
                            </Grid>
                            <Grid item xs={2.4}>
                                System
                            </Grid>
                            <Grid item xs={2.4}>
                                0
                            </Grid>
                            <Grid item xs={2.4}>
                                <Switch {...label} defaultChecked />
                            </Grid>
                            <Grid item xs={2.4}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Link href="#" underline="hover">Add Products</Link>
                                    <Link href="#" underline="hover">Delete</Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Grid container spacing={2}>
                            <Grid item xs={2.4}>
                                New Arrival
                            </Grid>
                            <Grid item xs={2.4}>
                                System
                            </Grid>
                            <Grid item xs={2.4}>
                                0
                            </Grid>
                            <Grid item xs={2.4}>
                                <Switch {...label} defaultChecked />
                            </Grid>
                            <Grid item xs={2.4}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Link href="#" underline="hover">Add Products</Link>
                                    <Link href="#" underline="hover">Delete</Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>

        </Layout>

    );
}