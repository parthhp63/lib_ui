import React, { useState, useEffect } from "react";
import InputComponent from "../InputComponet";
import { optional, z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SidebarBooks from "./SidebarBooks";
import Swal from "sweetalert2";
import socket from "../../services/socket.service";
import SubmitButton from "../buttons/SubmitButton";
import { useParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import { useNavigate } from "react-router-dom";

import Select from "react-select";
import {
  axiosGetRequest,
  axiosPostRequest,
} from "../../services/axios.service";
const Books = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState({});
  const [data, setData] = useState([]);
  const [author, setAuthor] = useState([]);
  const routeParams = useParams();
  const [filter, setFilters] = useState({});
  const [publisher, setPublisher] = useState([]);

  const id = routeParams.id;
  const schema = z.object({
    author: z.object({ label: z.string(), value: z.number() }),
    publisher: z.object({ label: z.string(), value: z.number() }),

    title: z.string().trim().min(2).max(30),
    description: z.string().trim().min(2).max(30),
    price: z.number(),
    isbn: z.number(),
    cover: routeParams.id
      ? z.string().nullable().optional()
      : z.any().refine(
          (file) => {
            if (!file) return true; // No file is allowed
            const fileType = file[0]?.type;
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            return allowedTypes.includes(fileType);
          },
          {
            message:
              "Only images (jpg, png, gif), PDF, CSV, or TXT files are allowed",
          }
        ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const authorOption =
    author?.map((ele) => ({
      value: ele.id,
      label: ele.name,
    })) || [];

  const publisherOption =
    publisher?.map((ele) => ({
      value: ele.id,
      label: ele.name,
    })) || [];

  const [file, setFile] = useState(null);

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }


  const submitData = (data) => {
    const formData = new FormData();
    formData.append("author", data.author.value);
    formData.append("publisher", data.publisher.value);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("isbn", data.isbn);
    if (data.cover) {
      formData.append("cover", data.cover[0]);
    }
    if (routeParams.id) {
      axiosPostRequest(`/books/updatebook/${routeParams.id}`, formData)
        .then((resp) => {
          if (resp) {
            Swal.fire({
              title: "Book Updated!",
              text: "You have updated the Book",
              icon: "success",
            });
          }
          socket.emit("fetchbooks");
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
    } else {
      axiosPostRequest("/books/addbooks", formData)
        .then((resp) => {
          if (resp) {
            Swal.fire({
              title: "Book Added!",
              text: "You have added the Author",
              icon: "success",
            });
          socket.emit("fetchbooks");
            navigate("/admin/books/display");
          }
        })
        .catch((error) => {
          console.log(error, "error");
          Swal.fire({
            icon: "error",
            title: "Existing Book",
            text: error.message,
          });
          navigate("/admin/books/addbooks");
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (routeParams.id) {
      axiosGetRequest(`/books/editbooks/${routeParams.id}`).then((resp) => {
        setBooks(resp);
        reset({
          author: {
            value: resp?.author_detail?.id,
            label: resp?.author_detail?.name,
          },
          publisher: {
            value: resp?.publisher_detail?.id,
            label: resp?.publisher_detail?.name,
          },
          title: resp?.title,
          isbn: resp?.isbn,
          description: resp?.description,
          price: resp?.price,
          cover: resp?.photo,
        });
      });
    }
  }, []);

  useEffect(() => {
    axiosGetRequest("/books/fetchauthor").then((resp) => {
      setAuthor(resp);
    });
  }, []);

  useEffect(() => {
    axiosGetRequest("/books/fetchpublisher").then((resp) => {
      setPublisher(resp);
    });
  }, []);

  return (
    <div>
      <div className="container" style={{ position: "absolute" }}>
        <div className="sidebar">
          <SidebarBooks />

          <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              <div className="component">
                <form onSubmit={handleSubmit(submitData)}>
                  <Controller
                    control={control}
                    name="author"
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                    }) => (
                      <div>
                        <label for="author">Author</label>
                        <Select
                          placeholder="Select Author"
                          name={name}
                          value={value}
                          onChange={onChange}
                          ref={ref}
                          options={
                            Array.isArray(authorOption) ? authorOption : []
                          }
                        />
                        {errors.author?.message}
                        <div>
                          {errors?.author && (
                            <p className="text-red-600 text-xs py-1"></p>
                          )}
                        </div>
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="publisher"
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                    }) => (
                      <div>
                        <label for="publisher">Publisher</label>
                        <Select
                          name={name}
                          value={value}
                          onChange={onChange}
                          ref={ref}
                          placeholder="Select Publisher"
                          options={
                            Array.isArray(publisherOption)
                              ? publisherOption
                              : []
                          }
                          // onChange={handlePublisher}
                        />
                        <div>
                          {errors.publisher && (
                            <p className="text-red-600 text-xs py-1">
                              {errors.publisher?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  />

                  <InputComponent
                    className={"w-full"}
                    type={"text"}
                    name={"title"}
                    labelfor={"title"}
                    labelname={"Title"}
                    placeholder={"Enter Book Title"}
                    register={register("title")}
                    errname={errors?.title}
                    errname_disp={errors.title?.message}
                  />
                  <InputComponent
                    className={"w-full"}
                    type={"number"}
                    name={"isbn"}
                    labelfor={"isbn"}
                    labelname={"ISBN"}
                    placeholder={"enter Book ISBN Code"}
                    register={register("isbn", { valueAsNumber: true })}
                    errname={errors?.isbn}
                    errname_disp={errors.isbn?.message}
                  />
                  <InputComponent
                    className={"w-full"}
                    type={"text"}
                    name={"description"}
                    labelfor={"description"}
                    labelname={"description"}
                    placeholder={"enter Description of Book"}
                    register={register("description")}
                    errname={errors?.description}
                    errname_disp={errors.description?.message}
                  />

                  <InputComponent
                    className={"w-full"}
                    type={"number"}
                    labelfor={"price"}
                    labelname={"price"}
                    placeholder={"enter Price"}
                    register={register("price", { valueAsNumber: true })}
                    errname={errors?.price}
                    errname_disp={errors.price?.message}
                  />

                  {routeParams.id ? (
                    <div>
                      <label htmlFor="image">Image:-</label>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="cover">Cover Photo:</label>
                      <br />
                      <input
                        type="file"
                        name="cover"
                        {...register("cover")}
                        onChange={handleChange}
                      />
                      <div>
                        {errors.cover && (
                          <p className="text-red-600 text-xs py-1">
                            {errors.cover?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {file || books?.photo ? (
                    <div>
                      <img
                        src={file || books?.photo}
                        style={{
                          width: "300px",
                          height: "250px",
                          alignItems: "center",
                          margin: "0 auto",
                        }}
                      />
                    </div>
                  ) : (
                    <></>
                  )}

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
    </div>
  );
};
export default Books;
