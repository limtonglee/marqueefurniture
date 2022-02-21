import React from "react";
import { Outlet } from "react-router-dom";
const SellerCenter = () => {

    return (
        <>
            <h1>Seller Center</h1>
            <Outlet/>
        </>
    );
}

export default SellerCenter;