import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "./InputComponet";
import RadioButton from "./buttons/RadioButton";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SubmitButton from "./buttons/SubmitButton";

const Registration=()=>{
  const navigate = useNavigate();
    const [gender,setGender]=useState()
    const genderOptions = ["Male", "Female"];
    
    const handleGenderChange = (selectedGender) => {
        console.log("selectedGender", selectedGender);
           setGender(selectedGender)
      };

      const schema = z.object({
        fname: z.string().trim().min(2),
        lname: z.string().trim().min(2).max(30),
        no: z.number(),
        address: z.string(),
        profession: z.string().trim().min(2).max(30),
        password: z.string().trim().min(2).max(30),
        email: z.string().trim().min(2).max(30),
      });

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ resolver: zodResolver(schema) });
   
      console.log(errors);
      const submitData = (data) => {
      
        console.log('inh subnnit');
        console.log(data);
        axios
          .post("/register", data)
          .then(function (response) {
            console.log(response);
            if (response.status == 200) {
              console.log("inside stayus");
              console.log(Swal);
              Swal.fire({
                title: "User Added!",
                text: "You are added",
                icon: "success",
              });
              // navigate("/admin/books/addauthor");
            }
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Existing Email",
              text: "Email already Registered",
            });
            // navigate("/admin/books/addauthor");
            console.log(error);
          });
      };

return(
   <div>
    <div className="flex">
        <div className="form" style={{marginLeft:'30px', width:'80%'}}>
     <form onSubmit={handleSubmit(submitData)} >
     <InputComponent
              className
              type={"text"}
              name={"fname"}
              labelfor={"fname"}
              labelname={"First Name"}
              placeholder={"enter your First Name"}
              register={register("fname")}
   
            //   change={handleChange}
              errname={errors?.fname}                
              errname_disp={errors.fname?.message}
            />

     <InputComponent
              className
              type={"text"}
            //   name={"lname"}
              labelfor={"lname"}
              labelname={"Last Name"}
              placeholder={"enter your last name"}
              register={register("lname")}

            //   change={handleChange}
              errname={errors?.lname}
              errname_disp={errors.lname?.message}
            />
  {/* <div>
              <p> Gender</p>
              <RadioButton
                options={genderOptions}
                selectedOption={gender}
                name={"gender"}
                onOptionChange={handleGenderChange}
                register={register("gender")}


                // change={handleChange}
                errname={errors?.gender}
                errname_disp={errors.gender?.message}
              />
            </div> */}
<InputComponent
              className
              type={"number"}
            //   name={"no"}
              labelfor={"no"}
              labelname={"Number"}
              placeholder={"enter your contact NO."}
              register={register("no", { valueAsNumber: true })}


            //   change={handleChange}
              errname={errors?.no}
              errname_disp={errors.no?.message}
            />
<label htmlFor="Address">Address</label><br />
<textarea name="address" id="address" placeholder="Enter Your Address"  {...register("address")}></textarea>
<div>  {errors.address && (
                    <p className="text-red-600 text-xs py-1">
                      {errors.address?.message}
                    </p>
                  )}
                </div>
<InputComponent
              className
              type={"text"}
            //   name={"profession"}
              labelfor={"profession"}
              labelname={"profession"}
              placeholder={"enter your Profession"}
              register={register("profession")}


            //   change={handleChange}
              errname={errors?.profession}
              errname_disp={errors.profession?.message}
            />
            <InputComponent
              className
              type={"email"}
              name={"email"}
              labelfor={"email"}
              labelname={"email"}
              placeholder={"enter your email"}
              register={register("email")}


            //   change={handleChange}
              errname={errors?.email}
              errname_disp={errors.email?.message}
            />

<InputComponent
              className
              type={"password"}
              name={"password"}
              labelfor={"password"}
              labelname={"password"}
              placeholder={"enter your password"}
              register={register("password")}


            //   change={handleChange}
              errname={errors?.password}
              errname_disp={errors.password?.message}
            />
           <SubmitButton
                  name={"Submit"}
                  type={"submit"}
                  className={
                    "bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-600 hover:text-white transition duration-200 ease-in-out"
                  }
                />
          </form>
          </div>
          <div className="img">
          <div className=""  >
<img  
  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
  className="img-fluid" alt="Sample image"  />
</div>
</div>
   </div>
   </div>
)
}

export default Registration;