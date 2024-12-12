import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";

const Navbar = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const linearGradient = {
    backgroundImage: "linear-gradient(135deg, rgb(102 126 234 / 59%) 0%, rgb(24 31 225 / 35%) 100%)"
  }
  return (
    <div className="shadow-md px-6 py-4 w-11/12 m-4 rounded-3xl" style={linearGradient}>
      <div className="max-w-6xl flex justify-between items-center mx-auto">
        <p
          className="font-semibold text-2xl flex justify-center items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="mr-2">
            <RxDashboard />
          </span>{" "}
          {router.state && router.state.type} Dashboard
        </p>
        <button
          className="flex justify-center items-center ease-linear duration-300 hover:scale-125 text-red-600 px-3 py-2 font-semibold rounded-sm"
          onClick={() => navigate("/")}
        >
          Logout
          <span className="ml-2">
            <FiLogOut />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
