import React from "react";

const InputComponent=({name,placeholder,max,min,type,maxLength,labelfor,id,value,labelname,change,className,errname,errname_disp,register})=>{
         return(
            <div>
                <label htmlFor={labelfor} >{labelname}</label><br />
                <input type={type} name={name} id={id} value={value} className={className} placeholder={placeholder} onChange={change} max={max} min={min} maxLength={maxLength} {...register}/><br />
                
                {{errname}  && (
                <p className="text-red-600 text-xs py-1">{errname_disp}</p>
              )}
            </div>  
         )
    }     
    
export default InputComponent;