// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import Profile from "./Profile";
// import Timetable from "./Timetable";
// import Marks from "./Marks";
// import Notice from "../../components/Notice";
// import Material from "./Material";
// import { Toaster } from "react-hot-toast";
// import { useLocation, useNavigate } from "react-router-dom";
// const Home = () => {
//   const [selectedMenu, setSelectedMenu] = useState("My Profile");
//   const router = useLocation();
//   const navigate = useNavigate();
//   const [load, setLoad] = useState(false);
//   useEffect(() => {
//     if (router.state === null) {
//       navigate("/");
//     }
//     setLoad(true);
//   }, [navigate, router.state]);
//   return (
//     <section>
//       {load && (
//         <>
//           <Navbar />
//           <div className="max-w-6xl mx-auto">
//             <ul className="flex justify-evenly items-center gap-10 w-full mx-auto my-8">
//               <li
//                 className={`text-center rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
//                   selectedMenu === "My Profile"
//                     ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
//                     : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
//                 }`}
//                 onClick={() => setSelectedMenu("My Profile")}
//               >
//                 My Profile
//               </li>
//               <li
//                 className={`text-center rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
//                   selectedMenu === "Timetable"
//                     ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
//                     : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
//                 }`}
//                 onClick={() => setSelectedMenu("Timetable")}
//               >
//                 Timetable
//               </li>
//               <li
//                 className={`text-center rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
//                   selectedMenu === "Marks"
//                     ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
//                     : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
//                 }`}
//                 onClick={() => setSelectedMenu("Marks")}
//               >
//                 Marks
//               </li>
//               <li
//                 className={`text-center rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
//                   selectedMenu === "Material"
//                     ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
//                     : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
//                 }`}
//                 onClick={() => setSelectedMenu("Material")}
//               >
//                 Material
//               </li>
//               <li
//                 className={`text-center rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
//                   selectedMenu === "Notice"
//                     ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
//                     : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
//                 }`}
//                 onClick={() => setSelectedMenu("Notice")}
//               >
//                 Notice
//               </li>
//             </ul>
//             {selectedMenu === "Timetable" && <Timetable />}
//             {selectedMenu === "Marks" && <Marks />}
//             {selectedMenu === "Material" && <Material />}
//             {selectedMenu === "Notice" && <Notice />}
//             {selectedMenu === "My Profile" && <Profile />}
//           </div>
//         </>
//       )}
//       <Toaster position="bottom-center" />
//     </section>
//   );
// };

// export default Home;









import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import Notice from "../../components/Notice";
import Profile from "./Profile";
import Timetable from "./Timetable";
import Marks from "./Marks";
import Material from "./Material";
import { baseApiURL } from "../../baseUrl";

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
            {/* Sidebar for navigation */}
            <ul className="flex flex-col justify-center gap-10 w-1/5 mx-auto my-8 items-center p-5 rounded-3xl bg-gray-50">
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
                  selectedMenu === "Timetable"
                    ? "border-b-2 pb-2 border-indigo-500 bg-indigo-100 rounded-3xl"
                    : "bg-indigo-500 text-white hover:bg-indigo-600 border-b-2 border-indigo-500"
                }`}
                onClick={() => setSelectedMenu("Timetable")}
              >
                Timetable
              </li>
              <li
                className={`text-center rounded-3xl px-4 py-2 w-28 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all hover:scale-125 ${
                  selectedMenu === "Marks"
                    ? "border-b-2 pb-2 border-indigo-500 bg-indigo-100 rounded-3xl"
                    : "bg-indigo-500 text-white hover:bg-indigo-600 border-b-2 border-indigo-500"
                }`}
                onClick={() => setSelectedMenu("Marks")}
              >
                Marks
              </li>
              <li
                className={`text-center rounded-3xl px-4 py-2 w-28 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all hover:scale-125 ${
                  selectedMenu === "Material"
                    ? "border-b-2 pb-2 border-indigo-500 bg-indigo-100 rounded-3xl"
                    : "bg-indigo-500 text-white hover:bg-indigo-600 border-b-2 border-indigo-500"
                }`}
                onClick={() => setSelectedMenu("Material")}
              >
                Material
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
            </ul>

            {/* Content display based on selected menu */}
            <div className="w-4/5 mx-auto min-h-[650px]">

              <div className="flex justify-center items-center flex-col">
                {/* Profile Section */}
                {selectedMenu === "Profile" && <Profile />}
                {selectedMenu === "Timetable" && <Timetable />}
                {selectedMenu === "Marks" && <Marks />}
                {selectedMenu === "Material" && <Material />}
                {selectedMenu === "Notice" && <Notice />}
              </div>
            </div>
          </div>
        </>
      )}
      <Toaster position="bottom-center" />
    </>
  );
};

export default Home;