import React from "react";

const RadioButton = ({ options, selectedOption, onOptionChange,name,errname,errname_disp }) => {
  const handleChange = (event) => {
    onOptionChange(event.target.value);
  };

  return (
    <div className="radiobutton" style={{paddingTop:"5px", paddingInline:'6px'}}>
      {options.map((option) => (
        <label key={option} style={{paddingLeft:"20px"}}>
          <input  style={{marginRight:"5px"}}
            type="radio"
            value={option}
            checked={selectedOption === option}
            name={name}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}
      

{{errname}  && (
            <p className="text-red-600 text-xs py-1">{errname_disp}</p>
          )}

    </div>
  );
};

export default RadioButton;