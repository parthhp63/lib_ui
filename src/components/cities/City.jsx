import React,{useState,useEffect} from "react";

const City=({register,city})=>{
    const cities = [
        "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad",
        "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
        // Add more cities as needed
      ];

  const [selectedCity, setSelectedCity] = useState("");
  const handleChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <h2>Select a City</h2>
      <select value={selectedCity} onChange={handleChange} city={selectedCity} className={"w-full"}  {...register} >
        <option value="">Select...</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>{city}  </option>
        )) } 
      </select>
     
    </div>
  );

}
export default City;

  