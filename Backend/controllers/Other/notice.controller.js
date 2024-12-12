const Notice = require("../../models/Other/notice.model");
const Branch = require("../../models/Other/branch.model");

const getNotice = async (req, res) => {
    const { role, branch, userId } = req.query;    
    try {
        let notices;
        switch(role) {
            case 'admin':
                notices = await Notice.find().sort({ createdAt: -1 });
                break;
            case 'faculty':
                notices = await Notice.find({ 
                    branch: { $in: [branch] } 
                }).sort({ createdAt: -1 });
                break;
            case 'student':
                notices = await Notice.find({ 
                    branch: { $in: [branch] } 
                }).sort({ createdAt: -1 });
                break;
            default:
                notices = [];
        }

        if (notices && notices.length > 0) {
            res.json({ success: true, message: "Notice Retrieved Successfully", notice: notices });
        } else {
            res.status(404).json({ success: false, message: "No Notices Available!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
const addNotice = async (req, res) => {
    let { link, description, title,branch } = req.body;
    try {
        let notice = await Notice.findOne({ link, description, title});
        if (notice) {
            return res
                .status(400)
                .json({ success: false, message: "Notice Already Exists!" });
        }
        await Notice.create({
            link,
            description,
            title,
            branch,
        });
        const data = {
            success: true,
            message: "Notice Added Successfully",
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const updateNotice = async (req, res) => {
    const { id } = req.params;
    const { link, description, title, branch, userId, userRole } = req.body;

    try {
        // Find the existing notice
        const existingNotice = await Notice.findById(id);

        if (!existingNotice) {
            return res
                .status(404)
                .json({ success: false, message: "Notice Not Found!" });
        }

        // Check if user has permission to update
        const canUpdate = 
            req.body.userRole === 'admin' || 
            (req.body.userRole === 'faculty' && 
             existingNotice.branch.some(b => b === req.body.userBranch));

        if (!canUpdate) {
            return res
                .status(403)
                .json({ success: false, message: "Not Authorized to Update This Notice!" });
        }

        // Update the notice
        await Notice.findByIdAndUpdate(id, {
            link,
            description,
            title,
            branch
        }, { new: true });

        res.json({
            success: true,
            message: "Notice Updated Successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteNotice = async (req, res) => {
    const { id } = req.params;
    const { userId, userRole, userBranch } = req.body;

    try {
        const existingNotice = await Notice.findById(id);

        if (!existingNotice) {
            return res
                .status(404)
                .json({ success: false, message: "Notice Not Found!" });
        }

        const canDelete = 
            userRole === 'admin' || 
            (userRole === 'faculty' && 
             existingNotice.branch.some(b => b === userBranch));

        if (!canDelete) {
            return res
                .status(403)
                .json({ success: false, message: "Not Authorized to Delete This Notice!" });
        }
        await Notice.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Notice Deleted Successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { getNotice, addNotice, updateNotice, deleteNotice };