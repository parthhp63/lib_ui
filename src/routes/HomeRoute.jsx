import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "../components/registration";
import Sidebar from "../components/Navbar";

const HomeRoute = () => {
    return(
        <div>
            <Sidebar/>
    <Routes>    
    <Route path="addbooks" element={<Registration />} />
    </Routes>
    </div>
    )
};

export default HomeRoute;
