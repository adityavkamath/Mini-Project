import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { IoAddOutline } from "react-icons/io5";
import { MdEditNote } from "react-icons/md";
import { toast } from "react-hot-toast";
import axios from "axios";
import { baseApiURL } from "../baseUrl";
import Heading from "./Heading";

const Notice = () => {
  const router = useLocation();
  const [notices, setNotices] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [branches, setBranches] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [userBranch, setUserBranch] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "student",
    link: "",
    branch: [],
  });

  useEffect(() => {
    // Get user details from local storage or context
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    setUserRole(userInfo.role || '');
    setUserBranch(userInfo.branch || '');

    getBranchData();
    getNotices(userInfo.role, userInfo.branch);
  }, []);

  const getBranchData = async () => {
    try {
      const response = await axios.get(`${baseApiURL()}/branch/getBranch`);
      if (response.data.success) {
        setBranches(response.data.branches);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
      toast.error(error.message || 'Failed to fetch branches');
    }
  };

  const getNotices = async (role, userBranch) => {
    console.log('Fetching Notices with:', { role, userBranch }); // Add this debug log
    try {
      const response = await axios.get(`${baseApiURL()}/notice/getNotice`, {
        params: { 
          role, 
          branch: userBranch 
        }
      });
      console.log('Notice Response:', response.data); // Add this debug log
      if (response.data.success) {
        setNotices(response.data.notice);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Notice Fetch Error:', error); // Improve error logging
      toast.error(error.response?.data?.message || 'Failed to fetch notices');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(isEditing ? "Updating Notice" : "Adding Notice");
    
    try {
      // Ensure the notice is added/updated for the correct branch based on user role
      const branchesToAdd = userRole === 'admin' 
        ? formData.branch 
        : [userBranch];

      const finalFormData = {
        ...formData,
        branch: branchesToAdd,
        userId: JSON.parse(localStorage.getItem('userInfo')).loginId,
        userRole: userRole,
        userBranch: userBranch
      };
      
      const endpoint = isEditing 
        ? `${baseApiURL()}/notice/updateNotice/${editingId}`
        : `${baseApiURL()}/notice/addNotice`;
      
      const method = isEditing ? 'put' : 'post';
      
      const response = await axios[method](endpoint, finalFormData, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        getNotices(userRole, userBranch);
        resetForm();
      } else {
        toast.error(response.data.message, { id: toastId });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed', { id: toastId });
    }
  };

  const handleEdit = (notice) => {
    // Only allow editing if the user is an admin or the notice is for their branch
    const canEditNotice = 
      userRole === 'admin' || 
      (userRole === 'faculty' && notice.branch.includes(userBranch));

    if (!canEditNotice) {
      toast.error("You are not authorized to edit this notice.");
      return;
    }

    setFormData({
      title: notice.title,
      description: notice.description,
      type: notice.type,
      link: notice.link,
      branch: notice.branch
    });
    setEditingId(notice._id);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleDelete = async (noticeId) => {
    // Confirm deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this notice?");
    if (!confirmDelete) return;

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const response = await axios.delete(`${baseApiURL()}/notice/deleteNotice/${noticeId}`, {
        data: {
          userId: userInfo.loginId,
          userRole: userRole,
          userBranch: userBranch
        }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        getNotices(userRole, userBranch);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete notice');
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "student",
      link: "",
      branch: []
    });
    setIsEditing(false);
    setEditingId("");
    setIsFormOpen(false);
  };

  const handleBranchChange = (e) => {
    const selectedBranches = userRole === 'admin'
      ? Array.from(e.target.selectedOptions, option => option.value)
      : [userBranch];
    
    setFormData(prev => ({ ...prev, branch: selectedBranches }));
  };

  // Determine if user can add/edit notices
  const canManageNotices = userRole === 'admin' || userRole === 'faculty';
  
  // Filter notices based on user role
  const filteredNotices = userRole === 'admin' 
    ? notices 
    : notices.filter(notice => notice.branch.includes(userBranch));

  return (
    <div className="w-full mx-auto flex items-start flex-col my-10 p-5">
      <div className="relative flex justify-between items-center w-full">
        <Heading title="Notices" />
        {canManageNotices && (
          <button
            className="absolute right-2 flex justify-center items-center border-2 border-red-500 px-3 py-2 rounded-3xl text-red-500 ease-linear duration-300 hover:scale-110"
            onClick={() => isFormOpen ? resetForm() : setIsFormOpen(true)}
          >
            {isFormOpen ? (
              <>
                <BiArrowBack className="text-red-500 mr-2" />
                Close
              </>
            ) : (
              <>
                Add Notice
                <IoAddOutline className="text-red-500 text-xl ml-2" />
              </>
            )}
          </button>
        )}
      </div>

      {canManageNotices && isFormOpen && (
        <form onSubmit={handleSubmit} className="w-full mt-8 space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full rounded-3xl border px-3 py-2"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full rounded-3xl border px-3 py-2"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required
          />
          <input
            type="url"
            placeholder="Link"
            className="w-full rounded-3xl border px-3 py-2"
            value={formData.link}
            onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
          />
          {userRole === 'admin' && (
            <select
              multiple
              value={formData.branch}
              onChange={handleBranchChange}
              className="w-full bg-white rounded-3xl border focus:border-dark-green focus:ring-2 focus:ring-light-green text-base outline-none py-2 px-3"
            >
              {branches.map((branch) => (
                <option key={branch._id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          )}
          <button
            type="submit"
            className="bg-indigo-500 text-white px-6 rounded-3xl text-lg py-2 hover:bg-indigo-700 ease-linear duration-300 hover:scale-110"
          >
            {isEditing ? 'Update Notice' : 'Add Notice'}
          </button>
        </form>
      )}

      {filteredNotices.length > 0 ? (
        <div className="mt-8 w-full space-y-4">
          {filteredNotices.map((notice) => (
            <div
              key={notice._id}
              className="border-indigo-500 bg-white border-2 w-full rounded-3xl shadow-sm py-4 px-6 relative"
            >
              {canManageNotices && (
                <div className="absolute right-2 top-2 flex space-x-2">
                  <button
                    className="flex items-center border-2 border-green-500 px-3 py-2 rounded-3xl text-green-500 hover:scale-110 transition-transform"
                    onClick={() => handleEdit(notice)}
                  >
                    Edit
                    <MdEditNote className="text-green-500 text-xl ml-2" />
                  </button>
                  <button
                    className="flex items-center border-2 border-red-500 px-3 py-2 rounded-3xl text-red-500 hover:scale-110 transition-transform"
                    onClick={() => handleDelete(notice._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{notice.title}</h3>
              <p className="text-gray-700 mb-2">{notice.description}</p>
              {notice.link && (
                <a 
                  href={notice.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 hover:text-indigo-700 mb-2 block"
                >
                  Related Link
                </a>
              )}
              <p className="text-sm text-gray-600">
                Branches: {notice.branch.join(", ")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full text-center text-gray-500 mt-8">
          No notices available
        </div>
      )}
    </div>
  );
};

export default Notice;