import React,{useState,useEffect} from "react";
import axios from "axios";

const MembersCard=()=>{
    const [resp,setResp]=useState([])

    useEffect(()=>{
      const fetchData=async()=>{
          const data=await axios.get(`/admin/latestmembers`)
          setResp(data)
      };
      fetchData()
    },[])
    // console.log(resp.data);
    return(
        <div>
            <div className="title " >
            <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-500 dark:text-white md:text-2xl lg:text-xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-500 from-sky-400">Latest Members</span> </h1>
            </div>
            <div className="card">
            <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                <th scope="col" className="px-6 py-2">Id</th>
                  <th scope="col" className="px-6 py-2">First Name</th>
                  <th scope="col" className="px-6 py-2">last Name</th>
                  <th scope="col" className="px-6 py-2">Gender</th>
                </tr>
              </thead>
                {resp.data?.map((ele)=>(
              <tbody>
                 
                    <tr className="border-b dark:border-neutral-500">
                             <td className="whitespace-nowrap px-6 py-2">{ele.id}</td>
                             <td className="whitespace-nowrap px-6 py-2">{ele.fname}</td>
                             <td className="whitespace-nowrap px-6 py-2">{ele.lname}</td>
                             <td className="whitespace-nowrap px-6 py-2">{ele.gender}</td>
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
    )
}
export default MembersCard;