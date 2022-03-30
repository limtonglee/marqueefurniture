import Sidebar from "./Sidebar";
import React from 'react';
import {
    Box
} from '@mui/material';

export const Layout = ({ children }) => {
    return (
        <>
            <Box sx={{paddingLeft: '36px', paddingRight: '36px'}}>
                <h2>Seller Center</h2>
                <div className='appContainer'
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: "center",
                        paddingRight: "10%",
                    }}>
                    <div className='sidebar' style={{ width: '25%', marginRight: '20px' }}>
                        <Sidebar />
                    </div>
                    <div style={{ width: '100%' }}>
                        <main>
                            <div className="content" >
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </Box>
        </>
    );
}