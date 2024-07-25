import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [data, setData] = useState({result : null});
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(url);
      const newData = await data.json();
      setData({ result : newData});
    };
    // console.log(data,'infetxh');
    fetchData();
  }, [url]);
  return [data,setData];
};
export default useFetch;
