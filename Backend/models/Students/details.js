const mongoose = require("mongoose");

const studentDetails = new mongoose.Schema({
  enrollmentNo: {
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
  semester: {
    type: Number,
  },
  branch: {
    type: String,
  },
  gender: {
    type: String,
  },
  profile: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("Student Detail", studentDetails);
