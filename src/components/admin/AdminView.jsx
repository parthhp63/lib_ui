import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from '../Navbar';

const AdminView=()=>{
return(

   <>
        <Navbar  />
      <div className="main-content flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
      </>
  );
};


export default AdminView;