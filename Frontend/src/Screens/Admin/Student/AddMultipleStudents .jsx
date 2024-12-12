import React, { useState } from "react";
import toast from "react-hot-toast";
import Papa from "papaparse";
import axios from "axios";
import { baseApiURL } from "../../../baseUrl";

const AddMultipleStudents = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) {
      toast.error("Please upload a CSV file.");
      return;
    }

    setLoading(true);
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const students = results.data;
        try {
          const response = await axios.post(`${baseApiURL()}/student/addMultiple`, {
            students,
          });
          if (response.data.success) {
            toast.success("Students added successfully!");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("Failed to add students.");
        } finally {
          setLoading(false);
        }
      },
      error: (error) => {
        toast.error("Error parsing CSV file.");
        setLoading(false);
      },
    });
  };

  const handleDownloadTemplate = () => {
    const headers = [
      "enrollmentNo",
      "firstName",
      "middleName",
      "lastName",
      "email",
      "phoneNumber",
      "semester",
      "branch",
      "gender"
    ];
    const sampleData = [
      "4MW2XCS0XX",
      "STUDENT",
      "1",
      ".0",
      "student1.0@example.com",
      "1234567890",
      "3",
      "Computer Science",
      "Male"
    ];  

    const csvContent = [headers.join(","), sampleData.join(",")].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Add Multiple Students
      </h2>

      <div className="space-y-6">
        {/* Download Template Button */}
        <button
          onClick={handleDownloadTemplate}
          className="w-full max-w-md mx-auto block px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <div className="flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download CSV Template
          </div>
        </button>

        {/* File Upload Area */}
        <div className="w-full max-w-md mx-auto">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">CSV file only</p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".csv"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Selected File Name */}
        {file && (
          <p className="text-sm text-gray-500 text-center">
            Selected file: {file.name}
          </p>
        )}

        {/* Upload Button */}
        <button
          onClick={handleFileUpload}
          disabled={!file || loading}
          className={`w-full max-w-md mx-auto block px-4 py-2 text-sm font-medium text-white rounded-md 
            ${
              !file || loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }`}
        >
          <div className="flex items-center justify-center">
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            )}
            {loading ? "Uploading..." : "Upload Students Data"}
          </div>
        </button>
      </div>
    </div>
  );
};

export default AddMultipleStudents;