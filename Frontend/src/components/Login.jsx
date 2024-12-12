import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data.login !== "" && data.password !== "") {
      const headers = {
        "Content-Type": "application/json",
      };

      axios
      .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data, {
        headers: headers,
      })
      .then((response) => {
        if (response.data && response.data.loginid) {
          console.log(response)
          // Store user information in local storage
          localStorage.setItem('userInfo', JSON.stringify({
            role: selected.toLowerCase(),
            loginId: response.data.loginid,
            branch: response.data.branch // Add this line to store branch
          }));
    
          // Navigate to the appropriate dashboard
          navigate(`/${selected.toLowerCase()}`, {
            state: { type: selected, loginid: response.data.loginid },
          });
        } else {
          toast.error('Invalid response from the server');
        }
      })
        .catch((error) => {
          toast.dismiss();
          console.error('Error:', error);
          if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error('An unexpected error occurred');
          }
        });
    }
  };

  const linearGradient = {
    background: "linear-gradient(19deg, rgb(2 148 181) 0%, rgb(113 4 165) 100%)"
  }

  return (
    <div className="h-[100vh] w-full flex justify-center items-center flex-col" style={linearGradient}>
      <div className="my-6">
        {["Student", "Faculty", "Admin"].map((role) => (
          <button
            key={role}
            className={`text-white mr-6 text-base font-semibold hover:text-indigo-300 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all hover:scale-125 transition-all ${
              selected === role && "border-b-2 border-yellow-500"
            }`}
            onClick={() => setSelected(role)}
          >
            {role}
          </button>
        ))}
      </div>

      <div className="w-3/12 min-w-96 m-4 flex justify-center items-center flex-col pl-8 rounded-3xl p-7 bg-gray-100">
        <p className="text-3xl font-semibold pb-2 border-b-2 border-indigo-500">
          {selected} Login
        </p>
        <form
          className="flex justify-center items-center flex-col w-full mt-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-[70%]">
            <label className="mb-1" htmlFor="eno">
              {selected} Login ID
            </label>
            <input
              type="text"
              id="eno"
              required
              className="bg-gray-300 outline-none border-2 border-transparent py-2 px-4 rounded-3xl w-full focus:border-indigo-700"
              {...register("loginid")}
            />
          </div>
          <div className="flex flex-col w-[70%] mt-3">
            <label className="mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="bg-gray-300 outline-none border-2 border-transparent py-2 px-4 rounded-3xl w-full focus:border-indigo-700"
              {...register("password")}
            />
          </div>
          <button 
            className="bg-indigo-600 mt-5 text-white px-6 py-2 text-xl rounded-3xl hover:bg-indigo-800 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all hover:scale-110 transition-all flex justify-center items-center"
          >
            Login
            <span className="ml-2">
              <FiLogIn />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;