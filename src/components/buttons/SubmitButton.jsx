import React from "react";

const SubmitButton=({type,name,className,click})=>{

    return(
        <div type={type} className="container flex justify-around mt-4 mb-8">
            <button onClick={click} className={className}>
              {name}
            </button>
        </div>
    )
}
export default SubmitButton;