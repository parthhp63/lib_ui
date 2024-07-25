import React, { useCallback, useState } from "react";
import SidebarBooks from "./SidebarBooks";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import DisplayBooks from "./DisplayBooks";
import DisplayPublisher from "./DisplayPublisher";
import DisplayAuthor from "./DisplayAuthor";
const ShowBooks=()=>{
  const [activeTab, setActiveTab] = useState("book");

  const handleTab = (tabName)=> {
    setActiveTab(tabName)
  }

  const handleRenderTable = useCallback(()=>{
   
    switch (activeTab) {
      case "book":
            return(
      <DisplayBooks />
    )

        case "author":
            return(

      <DisplayAuthor/>
    )
       

        case "publisher":
            return(
      <DisplayPublisher />
    )
    
      default:
        break;
    }
  },[activeTab])
    return (
      <div>
        <div className="container" style={{ position: "absolute" }}>
          <div className="sidebar">
            <SidebarBooks />
            <div className="p-4 sm:ml-64">
              <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <ul className="flex justify-center flex-col mt-4 font-medium lg:flex-row lg:space-x-5 lg:mt-0">
                  <button onClick={() => handleTab("book")}>Books</button>
                  <button onClick={() => handleTab("author")}>Author</button>
                  <button onClick={() => handleTab("publisher")}>
                    Publisher
                  </button>
                </ul>
                {handleRenderTable()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ShowBooks;