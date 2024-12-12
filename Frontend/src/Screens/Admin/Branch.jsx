import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../../components/Heading";
import { MdOutlineDelete } from "react-icons/md";
import { baseApiURL } from "../../baseUrl";
const Branch = () => {
  const [data, setData] = useState({
    name: "",
  });
  const [selected, setSelected] = useState("add");
  const [branch, setBranch] = useState();
  useEffect(() => {
    getBranchHandler();
  }, []);

  const getBranchHandler = () => {
    axios
      .get(`${baseApiURL()}/branch/getBranch`)
      .then((response) => {
        if (response.data.success) {
          setBranch(response.data.branches);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const addBranchHandler = () => {
    toast.loading("Adding Branch");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/branch/addBranch`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setData({ name: "", code: "" });
          getBranchHandler();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const deleteBranchHandler = (id) => {
    const alert = prompt("Are You Sure? Type CONFIRM to continue");
    if (alert === "CONFIRM") {
      toast.loading("Deleting Branch");
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .delete(`${baseApiURL()}/branch/deleteBranch/${id}`, {
          headers: headers,
        })
        .then((response) => {
          toast.dismiss();
          if (response.data.success) {
            toast.success(response.data.message);
            getBranchHandler();
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.response.data.message);
        });
    }
  };
  return (
    <div className="w-full mx-auto mt-10 ml-5 flex items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Add Branch" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${
              selected === "add" && "border-b-4 "
            }border-indigo-500 bg-indigo-200 px-4 py-2 text-black rounded-3xl mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Branch
          </button>
          <button
            className={`${
              selected === "view" && "border-b-4 "
            }border-indigo-500 bg-indigo-200 px-4 py-2 text-black rounded-3xl`}
            onClick={() => setSelected("view")}
          >
            View Branch
          </button>
        </div>
      </div>
      {selected === "add" && (
        <div className="flex flex-col justify-center items-center w-full mt-8">
          <div className="w-[40%]">
            <label htmlFor="name" className="leading-7 text-sm ">
              Enter Branch Name
            </label>
            <input
              type="name"
              id="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full bg-white rounded-3xl border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            className="mt-6 bg-indigo-500 px-6 py-3 text-white rounded-3xl hover:bg-indigo-700 ease-linear duration-300 hover:scale-110"
            onClick={addBranchHandler}
          >
            Add Branch
          </button>
        </div>
      )}
      {selected === "view" && (
        <div className="mt-8 w-full">
          <ul>
            {branch &&
              branch.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="bg-white rounded-3xl py-3 px-6 mb-3 flex justify-between items-center w-[70%]"
                  >
                    <div>{item.name}</div>
                    <button
                      className="text-2xl hover:text-red-500 ease-linear duration-300 hover:scale-125"
                      onClick={() => deleteBranchHandler(item._id)}
                    >
                      <MdOutlineDelete />
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Branch;
