import * as React from 'react';
import './index.css';
import Sidebar from './sidebar/sidebar';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function SellerCenter() {
    const [value, setValue] = React.useState('one');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <h1>Seller Center</h1>
            <div className='appContainer'>
                <div className='sidebar'>
                    <Sidebar />
                </div>
                <div className='page'>
                    <Box sx={{ width: '100%' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="wrapped label tabs example"
                        >
                            <Tab value="All" label="All"/>
                            <Tab value="Unpaid" label="Unpaid" />
                            <Tab value="To ship" label="To ship" />
                            <Tab value="Shipping" label="Shipping"/>
                            <Tab value="Completed" label="Completed"/>
                            <Tab value="Cancellation" label="Cancellation"/>
                            <Tab value="Return/Refund" label="Return/Refund"/>
                        </Tabs>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default SellerCenter;