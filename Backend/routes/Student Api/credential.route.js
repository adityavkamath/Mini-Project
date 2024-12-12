const express = require("express");
const router = express.Router();
const { loginHandler, registerHandler, updateHandler, deleteHandler,addMultipleStudents} = require("../../controllers/Student/credential.controller.js");

router.post("/login", loginHandler);

router.post("/register", registerHandler);

router.post("/addMultiple", addMultipleStudents);

router.put("/update/:id", updateHandler);

router.delete("/delete/:id", deleteHandler);

module.exports = router;
