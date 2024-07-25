import React, { useState, useEffect } from "react";
import { axiosGetRequest,axiosPostRequest } from "../../../services/axios.service";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../Table";
import { Link } from "react-router-dom";

const UserBooks = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [userBooks, setUserBooks] = useState([]);

  const viewBook=(id)=>{
    console.log(id,'idddddd');
     console.log(id, "idddd");
     const data = {
       id: id,
     };
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
  }

  
  const headers = [
    {
      label: "Id",
      fieldName: "id",
    },
    {
      label: "Isbn Id",
      fieldName: "isbn_id",
    },
    {
      label: "Issue Date",
      fieldName: "issue_date",
    },
    {
      label: "Due Date",
      fieldName: "due_date",
    },
    {
      label: "Action",
      fieldName: "Action",
      Cell: ({ ele, deleteHandler, roleName }) => (
        <>
          <Link
            to={`/user/book/bookdetails/${ele["isbn_id"]}`}
            className="pr-2 text-blue-800"
          >
            View
          </Link>
        </>
      ),
    },
  ];

  useEffect(() => {
    axiosGetRequest(`/user/userbooks/${users?.user?.id}`).then((resp) => {
      console.log(resp, "resp");
      setUserBooks(resp);
    });
  }, []);

  return (
    <div>
      <div className="container" style={{ position: "absolute" }}>
        <div className="sidebar">
          <div className="content-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Your Books
              </span>
            </h1>
            <Table
              headers={headers}
              content={userBooks}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBooks;
