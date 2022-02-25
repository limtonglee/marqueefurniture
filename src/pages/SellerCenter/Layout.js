import Sidebar from "./Sidebar";
import React from 'react';

export const Layout = ({ children }) => {
    return (
        <>
            <div className='appContainer' style={{ display: 'flex', flexDirection: 'row' }}>
                <div className='sidebar' style={{ width: '25%', marginRight: '20px' }}>
                    <Sidebar />
                </div>
                <div style={{ width: '100%' }}>
                    <main>
                        <div className="content" >
                            { children }
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}