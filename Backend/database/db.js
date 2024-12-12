require("dotenv").config();
const mongoose = require("mongoose");
// const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/College-Management-System";
const mongoURI = "mongodb://localhost:27017/College";

// console.log(process.env.MONGODB_URI);


const connectToMongo = () => {
  mongoose
    // .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB Successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB", error);
    });
};

module.exports = connectToMongo;
