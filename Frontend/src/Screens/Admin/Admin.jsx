import React, { useState } from "react";
import Heading from "../../components/Heading";
import EditAdmin from "./Admin/EditAdmin";
import AddAdmin from "./Admin/AddAdmin";

const Admin = () => {
  const [selected, setSelected] = useState("add");

  return (
    <div className="w-full mx-auto mt-10 ml-5 flex items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Admin Details" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${
              selected === "add" && "border-b-4 "
            }border-indigo-500 px-4 py-2 text-black rounded-3xl bg-indigo-200 mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Admin
          </button>
          <button
            className={`${
              selected === "edit" && "border-b-4 "
            }border-indigo-500 px-4 py-2 text-black rounded-3xl bg-indigo-200`}
            onClick={() => setSelected("edit")}
          >
            Edit Admin
          </button>
        </div>
      </div>
      {selected === "add" && <AddAdmin />}
      {selected === "edit" && <EditAdmin />}
    </div>
  );
};

export default Admin;
