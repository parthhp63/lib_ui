import React, { useState, useEffect } from "react";
import { axiosGetRequest } from "../../../services/axios.service";
import Search from "../../seachComponent/Search";
import Table from "../../Table";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../../services/socket.service";
const Borrow = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

  const [data, setData] = useState([]);
  const [intialdata, setIntialData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const headers = [
    {
      label: "Id",
      fieldName: "id",
    },
    {
      label: "Title",
      fieldName: "title",
    },
    {
      label: "Isbn",
      fieldName: "isbn",
    },
    {
      label: "Price",
      fieldName: "price",
    },
    {
      label: "Action",
      fieldName: "Action",
      Cell: ({ ele, deleteHandler, roleName }) => (
        <>
          <Link
            to={`/user/borrow/bookdetails/${ele["id"]}`}
            className="pr-2 text-blue-800"
          >
            View
          </Link>
        </>
      ),
    },
    {
      label: "Status",
      fieldName: "Status",
      Cell: ({ ele, deleteHandler, roleName }) => (
        <>
          {console.log(ele, "ele another user")}
          {ele?.borrow_requests?.find(
            (item) => item.user_id === users.user.id
          ) && ele?.borrow_requests[0]?.req == 0
            ? "Pending"
            : ele?.borrow_requests?.find(
                (item) => item.user_id === users.user.id
              ) && ele?.borrow_requests[0]?.req == 1
            ? "Succesfull"
            : ele?.borrow_requests?.find(
                (item) => item.user_id === users.user.id
              ) && ele?.borrow_requests[0]?.req == -1
            ? "Rejected"
            : "-"}
        </>
      ),
    },
  ];

  useEffect(() => {
        console.log(users.user.id, "usersusersusresds");
        const fetchAllBooks=async()=>{
              axiosGetRequest(`/user/userborrow/${users?.user?.id}`).then(
                (resp) => {
                  console.log(resp, "resp");
                  setIntialData(resp);
                  setData(resp);
                }
              );
        }
        fetchAllBooks();
        socket.on("fetchAllBooks", fetchAllBooks); 
  }, []);

  useEffect(() => {
    if (searchItem === "") {
      setData(intialdata);
    } else {
      console.log(data, "data21111");
      const filtered = intialdata.filter((book) =>
        book.isbn.toString().includes(searchItem)
      );
      console.log(searchItem);
      setData(filtered);
    }
  }, [searchItem]);

  console.log(data?.data, "data");
  return (
    <div>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
         Borrow Books
        </span>
      </h1>
      <Search searchItem={searchItem} setSearchItem={setSearchItem} />
      <Table
        headers={headers}
        content={data}
      />
      {/* <table>
        <thead>
          view
        </thead>
        <tbody>
          View
        </tbody>
      </table> */}
    </div>
  );
};

export default Borrow;
