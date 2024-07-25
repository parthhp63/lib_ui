import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PaginationComponent from "./PaginationComponent";
import InputComponent from "./InputComponet";

function Table({ headers, content, setApiParams, deleteHandler }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = content?.slice(indexOfFirstItem, indexOfLastItem);

  const pageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return(
    <>
      <div className="container" style={{ position: "relative" }}>
        <div className="p-4 ">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <ul className="flex justify-center flex-col mt-4 font-medium lg:flex-row lg:space-x-5 lg:mt-0"></ul>

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {headers.map((ele, index) => {
                      return (
                        <th scope="col" key={index} className="px-6 py-3 text-center">
                          {ele.label}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                 <tbody>
                   {currentItems?.length > 0 ? (
            currentItems?.map((ele, rowIndex) => (
                    <tr
                      className="border-b dark:border-neutral-500"
                      key={rowIndex}
                    >
                      {headers?.map((col, colIndex) => {
                        return (
                          <td className="p-4 text-sm font-normal text-center text-gray-900 whitespace-nowrap dark:text-white">
                            {col.Cell
                              ? col.Cell({
                                  ele: ele,
                                  deleteHandler: deleteHandler,
                                })
                              : ele[col.fieldName]}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                  ) : (
                    <tr>
                      <td
                        colSpan={headers.length}
                        className="text-center py-4"
                      >
                        No Data Found
                      </td>
                    </tr>
                  
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
           {content?.length > itemsPerPage && (
          <PaginationComponent
            totalPages={Math.ceil(content.length / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            pageChange={pageChange}
          />
        )} 
       </div>
</>
  );
}

export default Table;
