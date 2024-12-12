import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { baseApiURL } from "../../baseUrl";

const Marks = () => {
  const [subject, setSubject] = useState();
  const [branch, setBranch] = useState();
  const [studentData, setStudentData] = useState();
  const [selected, setSelected] = useState({
    branch: "",
    semester: "",
    subject: "",
    examType: "",
  });

  const loadStudentDetails = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/student/details/getDetails`,
        { branch: selected.branch, semester: selected.semester },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          setStudentData(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const loadStudentMarks = (enrollmentNo) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/marks/getMarks`,
        { enrollmentNo },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          const marks = response.data.Mark;
          document.getElementById(`${enrollmentNo}internal1`).value = marks.internal.internal1;
          document.getElementById(`${enrollmentNo}internal2`).value = marks.internal.internal2;
          document.getElementById(`${enrollmentNo}internal3`).value = marks.internal.internal3;
          document.getElementById(`${enrollmentNo}assignment`).value = marks.assignment;
          document.getElementById(`${enrollmentNo}external`).value = marks.external;
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const submitMarksHandler = () => {
    let container = document.getElementById("markContainer");
    container.childNodes.forEach((enroll) => {
      setStudentMarksHandler(
        enroll.id,
        document.getElementById(enroll.id + "internal1").value,
        document.getElementById(enroll.id + "internal2").value,
        document.getElementById(enroll.id + "internal3").value,
        document.getElementById(enroll.id + "assignment").value,
        document.getElementById(enroll.id + "external").value
      );
    });
  };

  const setStudentMarksHandler = (
    enrollment,
    internal1,
    internal2,
    internal3,
    assignment,
    external
  ) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/marks/addOrUpdateMarks`,
        {
          enrollmentNo: enrollment,
          internal1: parseInt(internal1) || 0,
          internal2: parseInt(internal2) || 0,
          internal3: parseInt(internal3) || 0,
          assignment: parseInt(assignment) || 0,
          external: parseInt(external) || 0,
        },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          toast.dismiss();
          toast.success(response.data.message);
        } else {
          toast.dismiss();
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const getBranchData = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/branch/getBranch`, { headers })
      .then((response) => {
        if (response.data.success) {
          setBranch(response.data.branches);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const getSubjectData = () => {
    toast.loading("Loading Subjects");
    axios
      .get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          setSubject(response.data.subject);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  };

  useEffect(() => {
    getBranchData();
    getSubjectData();
  }, []);

  const resetValueHandler = () => {
    setStudentData();
  };

  return (
    <div className="w-full mx-auto flex justify-center items-start flex-col my-10 p-5">
      <div className="relative flex justify-between items-center w-full">
        <Heading title={`Upload Marks`} />
        {studentData && (
          <button
            className="absolute right-2 flex justify-center items-center border-2 border-red-500 px-3 py-2 rounded-3xl text-red-500 ease-linear duration-300 hover:scale-110"
            onClick={resetValueHandler}
          >
            <span className="mr-2">
              <BiArrowBack className="text-red-500" />
            </span>
            Close
          </button>
        )}
      </div>
      {!studentData && (
        <>
          <div className="mt-10 w-full flex justify-evenly items-center gap-x-6">
            <div className="w-full">
              <label htmlFor="branch" className="leading-7 text-base ">
                Select Branch
              </label>
              <select
                id="branch"
                className="px-2 bg-white py-3 rounded-3xl text-base w-full accent-indigo-700 mt-1"
                value={selected.branch}
                onChange={(e) =>
                  setSelected({ ...selected, branch: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                {branch &&
                  branch.map((branch) => {
                    return (
                      <option value={branch.name} key={branch.name}>
                        {branch.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="semester" className="leading-7 text-base ">
                Select Semester
              </label>
              <select
                id="semester"
                className="px-2 bg-white py-3 rounded-3xl text-base w-full accent-indigo-700 mt-1"
                value={selected.semester}
                onChange={(e) =>
                  setSelected({ ...selected, semester: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="subject" className="leading-7 text-base ">
                Select Subject
              </label>
              <select
                id="subject"
                className="px-2 bg-white py-3 rounded-3xl text-base w-full accent-indigo-700 mt-1"
                value={selected.subject}
                onChange={(e) =>
                  setSelected({ ...selected, subject: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                {subject &&
                  subject.map((subject) => {
                    return (
                      <option value={subject.name} key={subject.name}>
                        {subject.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="examType" className="leading-7 text-base ">
                Select Exam Type
              </label>
              <select
                id="examType"
                className="px-2 bg-white py-3 rounded-3xl text-base w-full accent-indigo-700 mt-1"
                value={selected.examType}
                onChange={(e) =>
                  setSelected({ ...selected, examType: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </div>
          </div>
          <button
            className="bg-indigo-500 px-4 py-2 mt-8 mx-auto rounded-3xl border-2 border-indigo-500 text-white ease-linear duration-300 hover:scale-110"
            onClick={loadStudentDetails}
          >
            Load Student Data
          </button>
        </>
      )}
      {studentData && studentData.length !== 0 && (
        <>
          <p className="mt-4 text-lg">
            Upload {selected.examType} Marks Of {selected.branch} Semester{" "}
            {selected.semester} of {selected.subject}
          </p>
          <div
            className="w-full flex flex-wrap justify-center items-center mt-8 gap-4"
            id="markContainer"
          >
            {studentData.map((student) => {
              return (
                <div
                  key={student.enrollmentNo}
                  className="w-full flex justify-between items-center border-2 border-gray-300 rounded-lg p-4 mb-4"
                  id={student.enrollmentNo}
                  onClick={() => loadStudentMarks(student.enrollmentNo)}
                >
                  <p className="text-lg w-1/5 text-gray-700">
                    {student.enrollmentNo}
                  </p>
                  <input
                    type="number"
                    className="px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none w-1/5 rounded-lg border border-gray-300"
                    placeholder="Internal 1"
                    id={`${student.enrollmentNo}internal1`}
                  />
                  <input
                    type="number"
                    className="px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none w-1/5 rounded-lg border border-gray-300"
                    placeholder="Internal 2"
                    id={`${student.enrollmentNo}internal2`}
                  />
                  <input
                    type="number"
                    className="px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none w-1/5 rounded-lg border border-gray-300"
                    placeholder="Internal 3"
                    id={`${student.enrollmentNo}internal3`}
                  />
                  <input
                    type="number"
                    className="px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none w-1/5 rounded-lg border border-gray-300"
                    placeholder="Assignment"
                    id={`${student.enrollmentNo}assignment`}
                  />
                  <input
                    type="number"
                    className="px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none w-1/5 rounded-lg border border-gray-300"
                    placeholder="External"
                    id={`${student.enrollmentNo}external`}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="bg-indigo-500 px-6 py-3 mt-8 mx-auto rounded-3xl text-white ease-linear duration-300 hover:scale-110"
            onClick={submitMarksHandler}
          >
            Upload Student Marks
          </button>
        </>
      )}
    </div>
  );
};

export default Marks;