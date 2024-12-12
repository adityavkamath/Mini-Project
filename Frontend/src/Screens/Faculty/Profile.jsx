// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { baseApiURL } from "../../baseUrl";
// import { toast } from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { setUserData } from "../../redux/actions";
// const Profile = () => {
//   const [showPass, setShowPass] = useState(false);
//   const router = useLocation();
//   const [data, setData] = useState();
//   const dispatch = useDispatch();
//   const [password, setPassword] = useState({
//     new: "",
//     current: "",
//   });
//   useEffect(() => {
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     axios
//       .post(
//         `${baseApiURL()}/${router.state.type}/details/getDetails`,
//         { employeeId: router.state.loginid },
//         {
//           headers: headers,
//         }
//       )
//       .then((response) => {
//         if (response.data.success) {
//           setData(response.data.user);
//           dispatch(
//             setUserData({
//               fullname: `${response.data.user[0].firstName} ${response.data.user[0].middleName} ${response.data.user[0].lastName}`,
//               employeeId: response.data.user[0].employeeId,
//             })
//           );
//         } else {
//           toast.error(response.data.message);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [router.state.loginid, router.state.type]);

//   const checkPasswordHandler = (e) => {
//     e.preventDefault();
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     axios
//       .post(
//         `${baseApiURL()}/faculty/auth/login`,
//         { loginid: router.state.loginid, password: password.current },
//         {
//           headers: headers,
//         }
//       )
//       .then((response) => {
//         if (response.data.success) {
//           changePasswordHandler(response.data.id);
//         } else {
//           toast.error(response.data.message);
//         }
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message);
//         console.error(error);
//       });
//   };

//   const changePasswordHandler = (id) => {
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     axios
//       .put(
//         `${baseApiURL()}/faculty/auth/update/${id}`,
//         { loginid: router.state.loginid, password: password.new },
//         {
//           headers: headers,
//         }
//       )
//       .then((response) => {
//         if (response.data.success) {
//           toast.success(response.data.message);
//           setPassword({ new: "", current: "" });
//         } else {
//           toast.error(response.data.message);
//         }
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message);
//         console.error(error);
//       });
//   };

//   return (
//     <div className="w-full mx-auto my-8 flex justify-between items-start">
//       {data && (
//         <>
//           <div>
//             <p className="text-2xl font-semibold">
//               Hello {data[0].firstName} {data[0].middleName} {data[0].lastName}{" "}
//               👋
//             </p>
//             <div className="mt-3">
//               <p className="text-lg font-normal mb-2">
//                 Employee Id: {data[0].employeeId}
//               </p>
//               <p className="text-lg font-normal mb-2">Post: {data[0].post}</p>
//               <p className="text-lg font-normal mb-2">
//                 Email Id: {data[0].email}
//               </p>
//               <p className="text-lg font-normal mb-2">
//                 Phone Number: {data[0].phoneNumber}
//               </p>
//               <p className="text-lg font-normal mb-2">
//                 Department: {data[0].department}
//               </p>
//             </div>
//             <button
//               className={`${
//                 showPass ? "bg-red-100 text-red-600" : "bg-blue-600 text-white"
//               }  px-3 py-1 rounded mt-4`}
//               onClick={() => setShowPass(!showPass)}
//             >
//               {!showPass ? "Change Password" : "Close Change Password"}
//             </button>
//             {showPass && (
//               <form
//                 className="mt-4 border-t-2 border-blue-500 flex flex-col justify-center items-start"
//                 onSubmit={checkPasswordHandler}
//               >
//                 <input
//                   type="password"
//                   value={password.current}
//                   onChange={(e) =>
//                     setPassword({ ...password, current: e.target.value })
//                   }
//                   placeholder="Current Password"
//                   className="px-3 py-1 border-2 border-blue-500 outline-none rounded mt-4"
//                 />
//                 <input
//                   type="password"
//                   value={password.new}
//                   onChange={(e) =>
//                     setPassword({ ...password, new: e.target.value })
//                   }
//                   placeholder="New Password"
//                   className="px-3 py-1 border-2 border-blue-500 outline-none rounded mt-4"
//                 />
//                 <button
//                   className="mt-4 hover:border-b-2 hover:border-blue-500"
//                   onClick={checkPasswordHandler}
//                   type="submit"
//                 >
//                   Change Password
//                 </button>
//               </form>
//             )}
//           </div>
//           <img
//             // src={process.env.REACT_APP_MEDIA_LINK + "/" + data[0].profile}
//             src={import.meta.env.VITE_MEDIA_LINK + "/" + data[0].profile}
//             alt="faculty profile"
//             className="h-[200px] w-[200px] object-cover rounded-lg shadow-md"
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default Profile;



import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseApiURL } from "../../baseUrl";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";

const Profile = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useLocation();
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    new: "",
    current: "",
  });

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/${router.state.type}/details/getDetails`,
        { employeeId: router.state.loginid },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          setData(response.data.user[0]);
          dispatch(
            setUserData({
              fullname: `${response.data.user[0].firstName} ${response.data.user[0].middleName} ${response.data.user[0].lastName}`,
              employeeId: response.data.user[0].employeeId,
            })
          );
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, router.state.loginid, router.state.type]);

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/faculty/auth/login`,
        { loginid: router.state.loginid, password: password.current },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          changePasswordHandler(response.data.id);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  const changePasswordHandler = (id) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .put(
        `${baseApiURL()}/faculty/auth/update/${id}`,
        { loginid: router.state.loginid, password: password.new },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setPassword({ new: "", current: "" });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  return (
    <div className="w-full mt-12 flex justify-center items-center">
      {data && (
        <div className="flex flex-col justify-center items-center">
          <img
            src={import.meta.env.VITE_MEDIA_LINK + "/" + data.profile}
            alt="faculty profile"
            className="h-[200px] w-[200px] object-cover rounded-full shadow-md mb-5"
          />
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-center">
              Hello {data.firstName} {data.middleName} {data.lastName}👋
            </p>
            <div className="mt-3">
              <p className="text-lg font-normal mb-2">
                Employee Id: {data.employeeId}
              </p>
              <p className="text-lg font-normal mb-2">Post: {data.post}</p>
              <p className="text-lg font-normal mb-2">
                Email Address: {data.email}
              </p>
              <p className="text-lg font-normal mb-2">
                Phone Number: +91 {data.phoneNumber}
              </p>
              <p className="text-lg font-normal mb-2">
                Department: {data.department}
              </p>
            </div>
            <button
              className={`${
                showPass ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-indigo-600 text-white"
              } p-3 rounded-3xl mt-4 ease-linear duration-300 hover:scale-110`}
              onClick={() => setShowPass(!showPass)}
            >
              {!showPass ? "Change Password" : "Close Change Password"}
            </button>
            {showPass && (
              <form
                className="mt-4 border-t-2 border-indigo-500 flex flex-col justify-center items-start"
                onSubmit={checkPasswordHandler}
              >
                <input
                  type="password"
                  value={password.current}
                  onChange={(e) =>
                    setPassword({ ...password, current: e.target.value })
                  }
                  placeholder="Current Password"
                  className="p-3 border-2 border-indigo-500 outline-none rounded-3xl mt-4"
                />
                <input
                  type="password"
                  value={password.new}
                  onChange={(e) =>
                    setPassword({ ...password, new: e.target.value })
                  }
                  placeholder="New Password"
                  className="p-3 border-2 border-indigo-500 outline-none rounded-3xl mt-4"
                />
                <button
                  className="mt-4 p-3 rounded-3xl hover:border-b-2 hover:bg-indigo-500 hover:text-white ease-linear duration-300 hover:scale-110"
                  onClick={checkPasswordHandler}
                  type="submit"
                >
                  Change Password
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;