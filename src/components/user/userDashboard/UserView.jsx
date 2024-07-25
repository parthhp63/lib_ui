import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../userNavbar";

const UserView = () => {
  return (
    <>
      <UserNavbar />
      <div className="main-content flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </>
  );
};

export default UserView;
