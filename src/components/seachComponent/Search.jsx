import React,{useState,useEffect} from "react";
import InputComponent from "../InputComponet";

const Search = ({ searchItem, setSearchItem }) => {
  const handleChange = (e) => {
    setSearchItem(e.target.value);
  };
  return (
    <>
      <InputComponent
        className={
          " border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-full"
        }
        type={"text"}
        name={"no"}
        labelfor={"no"}
        labelname={"Search"}
        placeholder={"Isbn No"}
        change={handleChange}
        value={searchItem}
      />
    </>
  );
};   
export default Search;