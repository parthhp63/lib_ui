import React,{useState,useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import Table from "../Table";
const ManageUser=()=>{
    const navigate = useNavigate();

    const [data,setData]=useState([])
    useEffect(()=>{
        const fetchData=async()=>{
            const resp=await axios.get(`http://localhost:3002/adminmanage/allusers`)
            setData(resp)
        };
        fetchData()
      },[])

      const onDelete = async(id) => {
        Swal.fire({
          title: "Delete User",
          showDenyButton: true,
          text: "Are you sure you want to delete the User",
          icon: "error",
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
         
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('User deleted succesfully', '', 'success')
             axios
            .post(`/adminmanage/deleteuser/${id}`)
            .then(function (response) {
              console.log(response.status, "hhhhhhhh");
              if (response.status == 200) {
                // navigate("/admin/books/display");
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
        label: "First Name",
        fieldName: "fname",
      },
      {
        label: "Last Name",
        fieldName: "lname",
      },
      {
        label: "contact",
        fieldName: "contact",
      },
      {
        label: "profession",
        fieldName: "profession",
      },
      {
        label: "gender",
        fieldName: "gender",
      },
      {
        label: "email",
        fieldName: "email",
      },
      {
        label: "Delete",
        fieldname: "Delete",
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

     
    ];

    console.log(data.data,'data');
    return(
        <div>
          <Table headers={headers} content={data.data}/>
      </div>
    )
}
export default ManageUser;