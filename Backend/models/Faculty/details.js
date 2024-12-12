const mongoose = require("mongoose");

const facultyDetails = new mongoose.Schema({
  employeeId: {
    type: Number,
  },
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  department: {
    type: String,
  },
  gender: {
    type: String,
  },
  experience: {
    type: Number,
  },
  post: {
    type: String,
  },
  profile: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("Faculty Detail", facultyDetails);
