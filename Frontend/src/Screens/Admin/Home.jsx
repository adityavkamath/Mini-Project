/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import Notice from "../../components/Notice";
import Student from "./Student";
import Faculty from "./Faculty";
import Subjects from "./Subject";
import { baseApiURL } from "../../baseUrl";
import Admin from "./Admin";
import Profile from "./Profile";
import Branch from "./Branch";

const Home = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Profile");
  const [dashboardData, setDashboardData] = useState({
    studentCount: "",
    facultyCount: "",
  });
  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  useEffect(() => {
    getStudentCount();
    getFacultyCount();
  }, []);

  const getStudentCount = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/student/details/count`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          setDashboardData({
            ...dashboardData,
            studentCount: response.data.user,
          });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getFacultyCount = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/faculty/details/count`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          setDashboardData({
            ...dashboardData,
            facultyCount: response.data.user,
          });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {load && (
        <>
          <Navbar />
          <div className="max-w-6xl mx-auto flex w-full bg-lime-200 rounded-3xl p-5">
            <ul className="flex justify-center gap-10 w-1/5 mx-auto my-8 flex-col items-center p-5 rounded-3xl bg-gray-50">
              <li
                className={`text-center rounded-3xl px-4 py-2 w-28 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all hover:scale-125 ${
                  selectedMenu === "Profile"
                    ? "border-b-2 pb-2 border-indigo-500 bg-indigo-100 rounded-3xl"
                    : "bg-indigo-500 text-white hover:bg-indigo-600 border-b-2 border-indigo-500"
                }`}
                onClick={() => setSelectedMenu("Profile")}
              >
                Profile
              </li>
              <li
                className={`text-center rounded-3xl px-4 py-2 w-28 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all hover:scale-125 ${
                  selectedMenu === "Student"
                    ? "border-b-2 pb-2 border-indigo-500 bg-indigo-100 rounded-3xl"
                    : "bg-indigo-500 text-white hover:bg-indigo-600 border-b-2 border-indigo-500"
                }`}
                onClick={() => setSelectedMenu("Student")}
              >
                Student
              </li>
              <li
                className={`text-center rounded-3xl px-4 py-2 w-28 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all hover:scale-125 ${
                  selectedMenu === "Faculty"
                    ? "border-b-2 pb-2 border-indigo-500 bg-indigo-100 rounded-3xl"
                    : "bg-indigo-500 text-white hover:bg-indigo-600 border-b-2 border-indigo-500"
                }`}
                onClick={() => setSelectedMenu("Faculty")}
              >
                Faculty
              </li>
              <li
                className={`text-center rounded-3xl px-4 py-2 w-28 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all hover:scale-125 ${
                  selectedMenu === "Branch"
                    ? "border-b-2 pb-2 border-indigo-500 bg-indigo-100 rounded-3xl"
                    : "bg-indigo-500 text-white hover:bg-indigo-600 border-b-2 border-indigo-500"
                }`}
                onClick={() => setSelectedMenu("Branch")}
              >
                Branch
              </li>
              <li
                className={`text-center rounded-3xl px-4 py-2 w-28 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all hover:scale-125 ${
                  selectedMenu === "Notice"
                    ? "border-b-2 pb-2 border-indigo-500 bg-indigo-100 rounded-3xl"
                    : "bg-indigo-500 text-white hover:bg-indigo-600 border-b-2 border-indigo-500"
                }`}
                onClick={() => setSelectedMenu("Notice")}
              >
                Notice
              </li>
              <li
                className={`text-center rounded-3xl px-4 py-2 w-28 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all hover:scale-125 ${
                  selectedMenu === "Subjects"
                    ? "border-b-2 pb-2 border-indigo-500 bg-indigo-100 rounded-3xl"
                    : "bg-indigo-500 text-white hover:bg-indigo-600 border-b-2 border-indigo-500"
                }`}
                onClick={() => setSelectedMenu("Subjects")}
              >
                Subjects
              </li>
              <li
                className={`text-center rounded-3xl px-4 py-2 w-28 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all hover:scale-125 ${
                  selectedMenu === "Admin"
                    ? "border-b-2 pb-2 border-indigo-500 bg-indigo-100 rounded-3xl"
                    : "bg-indigo-500 text-white hover:bg-indigo-600 border-b-2 border-indigo-500"
                }`}
                onClick={() => setSelectedMenu("Admin")}
              >
                Admins
              </li>
            </ul>

            <>
              {selectedMenu === "Branch" && <Branch />}
              {selectedMenu === "Notice" && <Notice />}
              {selectedMenu === "Student" && <Student />}
              {selectedMenu === "Faculty" && <Faculty />}
              {selectedMenu === "Subjects" && <Subjects />}
              {selectedMenu === "Admin" && <Admin />}
              {selectedMenu === "Profile" && <Profile />}
            </>
          </div>
        </>
      )}
      <Toaster position="bottom-center" />
    </>
  );
};

export default Home;
