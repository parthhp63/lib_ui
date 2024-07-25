import React, { useState, useEffect } from "react";
import SidebarAdminBorrow from "./SidebarAdminBorrow";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import {
  axiosGetRequest,
  axiosPostRequest,
} from "../../services/axios.service";

import { Link } from "react-router-dom";
// import Table from "../../Table";
import Table from "../Table";

const BorrowRequest = () => {
  const [borrow, setBorrow] = useState([]);
  const navigate = useNavigate();

  const acceptRequest = (id) => {
    console.log(id, "idddd");
    const data={
      id:id
    }
    axiosPostRequest("/borrow/acceptborrowrequest", data)
      .then((resp) => {
        console.log(resp, "resp");
        // Swal.fire({
        //   title: "Request submitted",
        //   text: "Your Request for borrowing the book is submitted ",
        //   icon: "success",
        // });
        // navigate("/user/borrow");
      })
      .catch((error) => {
        console.log(error, "error");
        // Swal.fire({
        //   icon: "error",
        //   title: "Book borrow request already submitted",
        //   text: "You have already submitted request for the book!!",
        // });
      });
  };

  const rejectRequest = (id) => {
        console.log(id, "idddd");
        const data = {
          id: id,
        };
        axiosPostRequest("/borrow/rejectborrowrequest", data)
          .then((resp) => {
            console.log(resp, "resp");
            // Swal.fire({
            //   title: "Request submitted",
            //   text: "Your Request for borrowing the book is submitted ",
            //   icon: "success",
            // });
            // navigate("/user/borrow");
          })
          .catch((error) => {
            console.log(error, "error");
            // Swal.fire({
            //   icon: "error",
            //   title: "Book borrow request already submitted",
            //   text: "You have already submitted request for the book!!",
            // });
          });
  };

  const headers = [
    {
      label: "Id",  
      fieldName: "id",
    },
    {
      label: "User Id",
      fieldName: "user_id",
    },
    {
      label: "Book Id",
      fieldName: "book_id",
    },
    {
      label: "Action",
      fieldName: "Action",
      Cell: ({ ele, deleteHandler, roleName }) => (
        <>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => acceptRequest(ele.id)}
          >
            {console.log(ele.id)}
            Accept
          </button>

          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => rejectRequest(ele.id)}
          >
            Reject
          </button>

        </>
      ),
    },

  ];

  useEffect(() => {
    axiosGetRequest("/borrow/adminborrowrequest").then((resp) => {
      console.log(resp, "resp");
      setBorrow(resp);
    });
  }, []);
  return (
    <div>
      <div className="container" style={{ position: "absolute" }}>
        <div className="sidebar">
          <SidebarAdminBorrow />
          <div className="p-4 sm:ml-64">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Borrow Request
              </span>
            </h1>
            <Table
              headers={headers}
              content={borrow}
            />
          </div>
        </div>
      </div>
    </div>
    //   </div>
  );
};

export default BorrowRequest;
