import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Heading from "../../components/Heading";
import { baseApiURL } from "../../baseUrl";

const Marks = () => {
  const userData = useSelector((state) => state.userData);
  const [internal, setInternal] = useState();
  const [assignment, setAssignment] = useState(0);
  const [external, setExternal] = useState(0);
  const [averageInternal, setAverageInternal] = useState(0);
  const [finalMarks, setFinalMarks] = useState(0);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/marks/getMarks`,
        { enrollmentNo: userData.enrollmentNo },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          const marks = response.data.Mark;
          const internalMarks = marks.internal;
          setInternal(internalMarks);
          setAssignment(marks.assignment);
          setExternal(marks.external);
          const bestTwoInternal = [internalMarks.internal1, internalMarks.internal2, internalMarks.internal3]
            .sort((a, b) => b - a)
            .slice(0, 2);
          const average = bestTwoInternal.reduce((acc, mark) => acc + mark, 0) / 2;
          setAverageInternal(isNaN(average) ? 0 : average);
          setFinalMarks(average + marks.assignment + marks.external);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        console.log(error);
      });
  }, [userData.enrollmentNo]);

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10 p-5">
      <Heading title={`Marks of Semester ${userData.semester}`} />
      <div className="mt-14 w-full flex gap-5 justify-center items-center flex-wrap mb-10">
        {internal && (
          <div className="w-1/2 shadow-md p-4 bg-white rounded-3xl border border-gray-300">
            <p className="border-b-2 border-gray-300 text-2xl font-semibold pb-2 text-gray-700">
              Internal Marks (Out of 25)
            </p>
            <div className="mt-5">
              {Object.keys(internal).map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center w-full text-lg mt-2 text-gray-700"
                  >
                    <p className="w-full">{item}</p>
                    <span>{internal[item]}</span>
                  </div>
                );
              })}
              <div className="flex justify-between items-center w-full text-lg mt-2 text-gray-700">
                <p className="w-full">Average of Best Two Internals</p>
                <span>{averageInternal}</span>
              </div>
            </div>
          </div>
        )}
        {assignment !== undefined && (
          <div className="w-1/2 shadow-md p-4 bg-white rounded-3xl border border-gray-300">
            <p className="border-b-2 border-gray-300 text-2xl font-semibold pb-2 text-gray-700">
              Assignment Marks (Out of 25)
            </p>
            <div className="mt-5">
              <div className="flex justify-between items-center w-full text-lg mt-2 text-gray-700">
                <p className="w-full">Assignment</p>
                <span>{assignment}</span>
              </div>
            </div>
          </div>
        )}
        {external !== undefined && (
          <div className="w-1/2 shadow-md p-4 bg-white rounded-3xl border border-gray-300">
            <p className="border-b-2 border-gray-300 text-2xl font-semibold pb-2 text-gray-700">
              External Marks (Out of 50)
            </p>
            <div className="mt-5">
              <div className="flex justify-between items-center w-full text-lg mt-2 text-gray-700">
                <p className="w-full">External</p>
                <span>{external}</span>
              </div>
            </div>
          </div>
        )}
        <div className="w-full shadow-md p-4 bg-white rounded-3xl mt-8 border border-gray-300">
          <p className="border-b-2 border-gray-300 text-2xl font-semibold pb-2 text-gray-700">
            Final Marks
          </p>
          <div className="mt-5">
            <div className="flex justify-between items-center w-full text-lg mt-2 text-gray-700">
              <p className="w-full">Final Marks (Internal + Assignment + External)</p>
              <span>{finalMarks}</span>
            </div>
          </div>
        </div>
        {!internal && !external && !assignment && <p>No Marks Available At The Moment!</p>}
      </div>
    </div>
  );
};

export default Marks;