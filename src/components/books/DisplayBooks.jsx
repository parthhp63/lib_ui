import React,{useEffect, useState} from "react";
import axios from "axios";
import SidebarBooks from "./SidebarBooks";
import socket from "../../services/socket.service";
import Swal from "sweetalert2";
import {
  axiosGetRequest,
  axiosPostRequest,
} from "../../services/axios.service";
import { useNavigate } from 'react-router-dom';
import Table from "../Table";


const DisplayBooks = () => {
  const navigate = useNavigate();
  const [data,setData]=useState([])


  useEffect(()=>{
    // const fetchAllBooks = async() => {
  //     axiosGetRequest("/books/allbooks").then((resp) => {
  //       console.log(resp, "resp");
  //       setData(resp);
  //     });
  //   // };
  //   console.log('dattttaaaa',data);
  //   // fetchAllBooks();
  //   // socket.on("fetchAllBooks", fetchAllBooks);
  // }, []);
    const fetchData=async()=>{
        const resp=await axios.get(`http://localhost:3002/books/allbooks`)
        setData(resp)
    };
    fetchData()
  },[]);

  const onDelete = async(id) => {
    Swal.fire({
      title: "Delete Book",
      showDenyButton: true,
      text: "Are you sure you want to delte the Book",
      icon: "error",
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
     
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Book deleted succesfully', '', 'success')
         axios
        .post(`/books/deletebook/${id}`, id)
        .then(function (response) {
          console.log(response.status, "hhhhhhhh");
          if (response.status == 200) {
            navigate("/admin/books/display");
          }
        })
        .catch(function (error) {
    
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
}

const headers = [
  {
    label: "Id",
    fieldName: "id",
  },
  {
    label: "Isbn",
    fieldName: "isbn",
  },
  {
    label: "Title",
    fieldName: "title",
  },
  {
    label: "Price",
    fieldName: "price",
  },
  {
    label: "Delete",
    fieldName: "Delete",
    Cell: ({ ele, deleteHandler, roleName }) => (
      <>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900  "
          onClick={() => {
            onDelete(ele.id);
          }}
        >
          {console.log(ele.id)}
          Delete
        </button>
      </>
    ),
  },

  {
    label: "Edit",
    fieldName: "Edit",
    Cell: ({ ele, deleteHandler, roleName }) => (
      <>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => navigate(`/admin/books/addbooks/${ele.id}`)}
        >
          Edit
        </button>
      </>
    ),
  },
];  
  return (
    <div>
      <Table  headers={headers} content={data.data}/> 
      {/* <div className="container" style={{ position: "relative" }}>
        <div className="p-4 ">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Isbn
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                     Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                     Delete
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Edit
                    </th>
                  </tr>
                </thead>
                {data.data?.map((ele)=>(
              <tbody>
                  {console.log(ele.description,ele.isbn,ele.title)}
                    <tr className="border-b dark:border-neutral-500">
                             <td className="whitespace-nowrap px-6 py-2">{ele.id}</td>
                             <td className="whitespace-nowrap px-6 py-2">{ele.isbn}</td>
                             <td className="whitespace-nowrap px-6 py-2">{ele.title}</td>                 
                             <td className="whitespace-nowrap px-6 py-2">{ele.price}</td>
                             <td className="px-6 py-4">
                        <button  onClick={() => {onDelete(ele.id)}}>Delete </button>
                      </td>
                      <td className="px-6 py-4">
                            <button onClick={()=> navigate(`/admin/books/addbooks/${ele.id}`)}>Edit</button>
                        </td>
                           </tr>
                           </tbody>
                ))}
             
              </table>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DisplayBooks;
