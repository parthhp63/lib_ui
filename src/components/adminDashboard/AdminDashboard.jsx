import React from "react";
import useFetch from "../customHooks/useFetch";
import BooksCard from "./BooksCard";

import MembersCard from "./MembersCard";

const AdminDashboard = () => {
  const [books] = useFetch(`http://localhost:3002/admin/adminbooks`);

  const [members] = useFetch(`http://localhost:3002/admin/adminmembers`);
  const [users] = useFetch(`http://localhost:3002/admin/adminusers`);
  // console.log(books, members, users);

  return (
    <div>
        <div className="grid gap-4  grid-cols-3 mt-4 ml-2 mr-4">
    <div>
      <div className="flex flex-col  p-3 space-y-5 square-xl border border-black bg-white shadow-md" style={{backgroundColor:'lightblue' ,height:'120px'}}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
</svg>
        <section className="text-sm font-thin text-black-800 pl-20">
        
<div className="data">
    <p style={{fontSize:'25px'}}>Total Books:  {books.result}</p>
</div>
        </section>
      </div>
    </div>

    <div>
      <div className="flex flex-col  p-3 space-y-5 square-xl border border-black bg-white shadow-md" style={{backgroundColor:'lightblue' ,height:'120px'}}>
      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd"/>
</svg>

        <section className="text-sm font-thin text-black-800 pl-20">
        
<div className="data">
    <p style={{fontSize:'25px'}}>Active Users:  {users.result}</p>
</div>
        </section>
      </div>
    </div>

    <div>
      <div className="flex flex-col  p-3 space-y-5 square-xl border border-black bg-white shadow-md" style={{backgroundColor:'lightblue' ,height:'120px'}}>
      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>

        <section className="text-sm font-thin text-black-800 pl-20">
        
<div className="data">
    <p style={{fontSize:'25px'}}>Total Members:  {members.result}</p>
</div>
        </section>
      </div>
    </div>
    </div>

    <div className=" pt-10 booksdetail grid grid-cols-2 gap-1 p" >
      <BooksCard />
      <MembersCard />
    </div>
    </div>
  );
};
export default AdminDashboard;
