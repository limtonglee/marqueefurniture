import Sidebar from "./Sidebar";
import React from 'react';

export const Layout = ({ children }) => {
    return (
        <>
            <h1>Seller Center</h1>
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
        </>
    );
}