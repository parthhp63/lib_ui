import React from "react";
import SubmitButton from "./buttons/SubmitButton";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../redux/slices/users/authSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = z.object({
    email: z.string().trim().min(2).max(30),
    password: z.string().trim().min(2).max(30),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const submitData = (data) => {
    console.log(data);
    dispatch(login(data)).then((resp) => {
      console.log(resp.payload, resp.error);
      if (resp.error == null) {
        if (resp.payload.user.role_id == 1) {
            console.log("inside Admin");
            console.log(Swal);
            Swal.fire({
              title: "Welcome Admin!",
              text: "Login as Admin",
              icon: "success",
            });
            navigate("/admin/dashboard");
        }
        else if(resp.payload.user.role_id == 2){
            console.log("inside User");
            console.log(Swal);
            Swal.fire({
              title: "Welcome user!",
              text: "Login as User",
              icon: "success",
            });
navigate("/user/books");
        }
      } else {
        Swal.fire({
            icon: "error",
            title: "Wrong  Credentials",
            text: "Write correct credentials!!",
          });
      }
    });
  };

  return (
    <div>
      <div className="mt-6 ml-2 mr-4">
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              Library World
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit(submitData)}
                >
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                      {...register("email")}
                    />
                    <div>
                      {errors.email && (
                        <p className="text-red-600 text-xs py-1">
                          {errors.email?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("password")}
                      required=""
                    />
                    <div>
                      {errors.password && (
                        <p className="text-red-600 text-xs py-1">
                          {errors.password?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <SubmitButton
                      name={"Sign in"}
                      type={"submit"}
                      className={
                        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      }
                    />

                    <Link to="/register">
                      <button
                        type="button"
                        className="container flex justify-around mt-4 mb-8 
                        text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Register Here!!
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
