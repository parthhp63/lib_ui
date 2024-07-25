import React, { useState, useEffect } from "react";
import useFetch from "../customHooks/useFetch";
import axios from "axios";
import Table from "../Table";
const BooksCard = () => {
  const [resp, setResp] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`/admin/latestbooks`);
      console.log("axios");
      console.log(data, "data");
      setResp(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      {/* {resp && resp?.data } */}
      {console.log(resp.data, "resp")}
      <div className="title">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-500 dark:text-white md:text-2xl lg:text-xl text-center ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-500 from-sky-400">
            Latest Books
          </span>{" "}
        </h1>
      </div>
      <div className="card">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                {/* <Table
                  headers={["id", "Isbn", "Description", "Title",'a','bbb']}
                  content=""
                  apiParams=""
                  setApiParams=""
                  deleteHandler=""
                /> */}
                <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-2">Id</th>
                  <th scope="col" className="px-6 py-2">Isbn</th>
                  <th scope="col" className="px-6 py-2">Description</th>
                  <th scope="col" className="px-6 py-2">Title</th>
                </tr>
              </thead>
                {resp.data?.map((ele)=>(
              <tbody>
                    {console.log(ele.description,ele.isbn,ele.title)}
                    <tr className="border-b dark:border-neutral-500">
                             <td className="whitespace-nowrap px-6 py-2 font-medium">{ele.id}</td>
                             <td className="whitespace-nowrap px-6 py-2">{ele.isbn}</td>
                             <td className="whitespace-nowrap px-6 py-2">{ele.description}</td>
                             <td className="whitespace-nowrap px-6 py-2">{ele.title}</td>
                           </tr>
                           </tbody>
                ))}

            
            </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BooksCard;
