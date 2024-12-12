const mongoose = require("mongoose");

const Marks = new mongoose.Schema({
  enrollmentNo: {
    type: String,
    required: true,
  },
  internal: {
    internal1: { type: Number, default: 0 },
    internal2: { type: Number, default: 0 },
    internal3: { type: Number, default: 0 },
  },
  assignment: {
    type: Number,
    default: 0,
  },
  external: {
    type: Number,
    default: 0,
  },
  totalInternal: {
    type: Number,
    default: 0,
  },
  finalMarks: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model("Mark", Marks);