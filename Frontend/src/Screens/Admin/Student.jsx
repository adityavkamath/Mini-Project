import React, { useState } from "react";
import Heading from "../../components/Heading";
import AddStudent from "./Student/AddStudent";
import EditStudent from "./Student/EditStudent";
import AddMultipleStudents from "./Student/AddMultipleStudents "; // Import the new component

const Student = () => {
  const [selected, setSelected] = useState("add");

  return (
    <div className="w-full mx-auto mt-10 ml-5 flex items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Student Details" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${selected === "add" && "border-b-4 "}border-indigo-500 px-4 py-2 text-black rounded-3xl bg-indigo-200 mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Student
          </button>
          <button
            className={`${selected === "edit" && "border-b-4 "}border-indigo-500 px-4 py-2 text-black rounded-3xl bg-indigo-200 mr-6`}
            onClick={() => setSelected("edit")}
          >
            Edit Student
          </button>
          <button
            className={`${selected === "addMultiple" && "border-b-4 "}border-indigo-500 px-4 py-2 text-black rounded-3xl bg-indigo-200`}
            onClick={() => setSelected("addMultiple")}
          >
            Add Multiple Students
          </button>
        </div>
      </div>
      {selected === "add" && <AddStudent />}
      {selected === "edit" && <EditStudent />}
      {selected === "addMultiple" && <AddMultipleStudents />}
    </div>
  );
};

export default Student;
