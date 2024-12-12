const studentCredential = require("../../models/Students/credential.model.js");
const studentDetails = require("../../models/Students/details.model.js");

const loginHandler = async (req, res) => {
    let { loginid, password } = req.body;
    try {
        const enrollmentNo = loginid;
        let user = await studentCredential.findOne({ loginid });
        let userDetail = await studentDetails.findOne({ enrollmentNo });
        if (!user) {
            return res.status(400).json({ success: false, message: "Wrong Credentials" });
        }
        if (password !== user.password) {
            return res.status(400).json({ success: false, message: "Wrong Credentials" });
        }
        const data = {
            success: true,
            message: "Login Successful!",
            loginid: user.loginid,
            branch: userDetail.branch,
            id: user.id,
        };
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const registerHandler = async (req, res) => {
    let { loginid, password } = req.body;
    try {
        let user = await studentCredential.findOne({ loginid });
        if (user) {
            return res.status(400).json({ success: false, message: "User With This LoginId Already Exists" });
        }
        user = await studentCredential.create({ loginid, password });
        const data = {
            success: true,
            message: "Register Successful!",
            loginid: user.loginid,
            id: user.id,
        };
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const addMultipleStudents = async (req, res) => {
    const { students } = req.body;
    try {
        // Validate student data
        if (!students || !Array.isArray(students) || students.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid student data" });
        }

        // Filter out invalid students
        const validStudents = students.filter(student => student.enrollmentNo && student.enrollmentNo.trim() !== "");

        if (validStudents.length === 0) {
            return res.status(400).json({ success: false, message: "No valid student data provided" });
        }

        // Insert student details
        const insertedStudents = await studentDetails.insertMany(validStudents);

        // Create student credentials
        const credentials = validStudents.map(student => ({
            loginid: student.enrollmentNo,
            password: student.enrollmentNo, // You can use a different logic for passwords
        }));

        await studentCredential.insertMany(credentials);

        res.json({ success: true, message: "Students and credentials added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const updateHandler = async (req, res) => {
    try {
        let user = await studentCredential.findByIdAndUpdate(req.params.id, req.body);
        if (!user) {
            return res.status(400).json({ success: false, message: "No User Exists!" });
        }
        const data = {
            success: true,
            message: "Updated Successfully!",
        };
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const deleteHandler = async (req, res) => {
    try {
        let user = await studentCredential.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).json({ success: false, message: "No User Exists!" });
        }
        const data = {
            success: true,
            message: "Deleted Successfully!",
        };
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { loginHandler, registerHandler, updateHandler, deleteHandler, addMultipleStudents };