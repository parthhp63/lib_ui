import {React,useState,useEffect} from "react";
import InputComponent from "../InputComponet";
import axios from "axios";
import Swal from "sweetalert2";
import SidebarBooks from "./SidebarBooks";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import city from "../cities/City";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  axiosGetRequest,
  axiosPostRequest,
} from "../../services/axios.service";

import SubmitButton from "../buttons/SubmitButton";
import City from "../cities/City";
const Author = () => {

  const [author, setAuthor] = useState([]);
  const navigate = useNavigate();
  const routeParams = useParams();

  const schema = z.object({
    uniqueid: z.string().trim().min(2),
    name: z.string().trim().min(2).max(30),
    description: z.string().trim().min(2).max(30),
    no: z.number(),
    rating: z.number().min(0).max(10),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const submitData = (data) => {
    console.log(data);
     if (routeParams.id) {
       axiosPostRequest(`/books/updateauthor/${routeParams.id}`, data)
       .then((resp) => {
          if (resp) {
            Swal.fire({
              title: "Author Updated!",
              text: "You have updated the Author",
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
     }
     else{
      axiosPostRequest("/books/addauthor", data)
        .then((resp) => {
          console.log(resp, "resp");
          if (resp) {
            console.log("inside stayus");
            console.log(Swal);
            Swal.fire({
              title: "Author Added!",
              text: "You have added the Author",
              icon: "success",
            });
            navigate("/admin/books/display");
          }
        })
        .catch((error) => {
          console.log(error, "error");
          Swal.fire({
            icon: "error",
            title: "Existing Author",
            text: "Author already added",
          });
          navigate("/admin/books/display");
        });
     }
    

  };


      useEffect(() => {
        if (routeParams.id) {
          axiosGetRequest(`/books/editauthor/${routeParams.id}`).then((resp) => {
            setAuthor(resp);
            console.log(resp,'author edit resp');
            reset({
              uniqueid: resp?.unique_id,
              name: resp?.name,
              no: resp?.contact,
              description: resp?.description,
              rating: resp?.rating,
            });
          });
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
                  name={"uniqueid"}
                  labelfor={"uniqueid"}
                  labelname={"Author Id"}
                  placeholder={"Enter Author Id"}
                  register={register("uniqueid")}
                  //   change={handleChange}
                  errname={errors?.uniqueid}
                  errname_disp={errors.uniqueid?.message}
                />


                <InputComponent
                  className={"w-full"}
                  type={"text"}
                  name={"name"}
                  labelfor={"name"}
                  labelname={"Name"}
                  placeholder={"Enter Author Name"}
                  register={register("name")}
                  errname={errors?.name}
                  errname_disp={errors.name?.message}
                />

                <InputComponent
                  className={"w-full"}
                  type={"number"}
                  name={"no"}
                  labelfor={"no"}
                  labelname={"Contact"}
                  placeholder={"Enter Author Contact"}
                  register={register("no", { valueAsNumber: true })}
                  errname={errors?.no}
                  errname_disp={errors.no?.message}
                />

                <label htmlFor="description">Description</label>
                <br />
                <textarea
                  name="desctription"
                  id=""
                  placeholder="description"
                  className="w-full"
                  {...register("description")}
                ></textarea>
                <div>
                  {errors.description && (
                    <p className="text-red-600 text-xs py-1">
                      {errors.description?.message}
                    </p>
                  )}
                </div>
         

                <InputComponent
                  className={"w-full"}
                  type={"float"}
                  name={"rating"}
                  labelfor={"rating"}
                  labelname={"Rating"}
                  placeholder={"Enter Rating"}
                  register={register("rating", { valueAsNumber: true })}
                  errname={errors?.rating}
                  errname_disp={errors.rating?.message}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
