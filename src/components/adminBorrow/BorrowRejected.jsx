import {React,useState,useEffect} from "react";
import SidebarAdminBorrow from "./SidebarAdminBorrow";
import {
  axiosGetRequest,
  axiosPostRequest,
} from "../../services/axios.service";
import Table
 from "../Table";
const BorrowRejected=()=>{
    const [borrowList, setBorrowList] = useState([]);

    const headers = [
      {
        label: "Id",
        fieldName: "id",
      },
      {
        label:"Book Id",
        fieldName: "book_id",
      },
      {
        label: "User Id", 
        fieldName: "user_id",
      },
    //   {
    //     label: "Action",
    //     fieldName: "Action",
    //     Cell: ({ row, deleteHandler, roleName }) => (
    //       <>
    //         {/* <button
    //           type="button"
    //           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    //           onClick={() => acceptRequest(row.id)}
    //         >
    //           {console.log(row.id)}
    //           Accept
    //         </button> */}

    //         {/* <button
    //           type="button"
    //           className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    //           onClick={() => rejectRequest(row.id)}
    //         >
    //           Reject
    //         </button> */}
    //       </>
    //     ),
    //   },
      
    ];
    
      useEffect(() => {
        axiosGetRequest("/borrow/adminborrowreject").then((resp) => {
          console.log(resp, "resp");
          setBorrowList(resp);
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
                  Rejected Request
                </span>
              </h1>
              <Table
                headers={headers}
                content={borrowList}
                apiParams=""
                setApiParams=""
                deleteHandler=""
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default BorrowRejected;