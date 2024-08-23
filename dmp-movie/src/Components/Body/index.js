import React from "react";
import "./Body.css"
import { Outlet } from "react-router-dom";
function Body() {
    return (  
        <>
            <Outlet/>
        </>
    );
}

export default Body;