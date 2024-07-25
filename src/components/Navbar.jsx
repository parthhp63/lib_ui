import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/users/authSlice";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <header>
      <nav className="bg-slate-400 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a className="flex items-center">
            <img
              src="https://editor.analyticsvidhya.com/uploads/66982lms.jpg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              LibraryWorld
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <Link to="/login">
              <button onClick={() => dispatch(logout())}>Signout</button>
            </Link>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <Link to="/admin/dashboard">Dashboard</Link>
              <Link to="/admin/books/addbooks">Add Books</Link>
              <Link to="/admin/borrow/handleborrow">Borrow's</Link>
              <Link to="/admin/manage/manageuser">Manage</Link>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
