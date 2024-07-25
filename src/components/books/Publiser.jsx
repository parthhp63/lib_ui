import {React,useState,useEffect} from "react";
import InputComponent from "../InputComponet";
import Swal from "sweetalert2";
import axios from "axios";
import SidebarBooks from "./SidebarBooks";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import {
  axiosGetRequest,
  axiosPostRequest,
} from "../../services/axios.service";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../buttons/SubmitButton";
const Publisher = () => {
  const routeParams = useParams();
  const [publisher,setPublisher]=useState([])

  const schema = z.object({
    name: z.string().trim().min(2).max(30),
    address: z.string().trim().min(2).max(30),
    no: z.number(),
    uniqueid: z.string().trim().min(2),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const navigate = useNavigate();
  
  const submitData = (data) => {
     if (routeParams.id) {
      axiosPostRequest(`/books/updatepublisher/${routeParams.id}`, data)
        .then((resp) => {
          if (resp) {
            Swal.fire({
              title: "Author Updated!",
              text: "You have updated the Publisher",
              icon: "success",
            });
          }
          navigate("/admin/books/display");
        })
        .catch((error) => {
          console.log(error, "error");
          Swal.fire({
            icon: "error",
            title: "Existing updating",
            text: error.message,
          });
          console.log(error);
        });
     }else{
      axiosPostRequest("/books/addpublisher", data)
        .then((resp) => {
          console.log(resp, "resp");
          if (resp) {
            console.log("inside stayus");
            console.log(Swal);
            Swal.fire({
              title: "Publihser Added!",
              text: "You have added the Publisher",
              icon: "success",
            });
            navigate("/admin/books/addpublisher");
          }
        })
        .catch((error) => {
          console.log(error, "error");
          Swal.fire({
            icon: "error",
            title: "Existing Publisher",
            text: error.message,
          });
          navigate("/admin/books/addpublisher");
          console.log(error);
        });
     }
  };

        useEffect(() => {
          if (routeParams.id) {
            axiosGetRequest(`/books/editpublisher/${routeParams.id}`).then(
              (resp) => {
                setPublisher(resp);
                console.log(resp, "author edit resp");
                reset({
                  uniqueid: resp?.unique_id,
                  name: resp?.name,
                  no: resp?.contact,
                  address:resp?.address

                });
              }
            );
          }
        }, []);
        
  return (
    <div>
      <div className="container" style={{ position: "absolute" }}>
        <div className="sidebar">
          <SidebarBooks />
          <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              <form onSubmit={handleSubmit(submitData)}>
                <InputComponent
                  className={"w-full"}
                  type={"text"}
                  name={"name"}
                  labelfor={"name"}
                  labelname={"Name"}
                  placeholder={"Enter Publisher Name"}
                  register={register("name")}
                  //   change={handleChange}
                  errname={errors?.name}
                  errname_disp={errors.name?.message}
                />

                <InputComponent
                  className={"w-full"}
                  type={"text"}
                  name={"uniqueid"}
                  labelfor={"uniqueid"}
                  labelname={"Publisher Id"}
                  placeholder={"Enter Publisher Id"}
                  register={register("uniqueid")}
                  //   change={handleChange}
                  errname={errors?.uniqueid}
                  errname_disp={errors.uniqueid?.message}
                />

                <InputComponent
                  className={"w-full"}
                  type={"number"}
                  name={"no"}
                  labelfor={"no"}
                  labelname={"Contact"}
                  placeholder={"Enter Publisher Contact"}
                  register={register("no", { valueAsNumber: true })}
                  //   change={handleChange}
                  errname={errors?.no}
                  errname_disp={errors.no?.message}
                />

                <label htmlFor="address"> Address</label>
                <br />
                <textarea
                  name="address"
                  id=""
                  className="w-full"
                  {...register("address")}
                ></textarea>
                <div>
                  {errors.address && (
                    <p className="text-red-600 text-xs py-1">
                      {errors.address?.message}
                    </p>
                  )}
                </div>
                <SubmitButton
                  name={"Submit"}
                  type={"submit"}
                  className={
                    "bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-600 hover:text-white transition duration-200 ease-in-out"
                  }
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Publisher;
