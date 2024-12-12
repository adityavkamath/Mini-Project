const Marks = require("../../models/Other/marks.model.js");

const getMarks = async (req, res) => {
    try {
        let Mark = await Marks.findOne({ enrollmentNo: req.body.enrollmentNo });
        if (!Mark) {
            return res
                .status(400)
                .json({ success: false, message: "Marks Not Available" });
        }
        const data = {
            success: true,
            message: "Marks Loaded!",
            Mark,
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const addOrUpdateMarks = async (req, res) => {
    let { enrollmentNo, internal1, internal2, internal3, assignment, external } = req.body;
    try {
        let existingMarks = await Marks.findOne({ enrollmentNo });
        const internal = { internal1, internal2, internal3 };
        const bestTwoInternal = [internal1, internal2, internal3]
            .sort((a, b) => b - a)
            .slice(0, 2);
        const totalInternal = bestTwoInternal.reduce((acc, mark) => acc + mark, 0);
        const finalMarks = totalInternal + assignment + external;

        if (existingMarks) {
            existingMarks.internal = internal;
            existingMarks.assignment = assignment;
            existingMarks.external = external;
            existingMarks.totalInternal = totalInternal;
            existingMarks.finalMarks = finalMarks;
            await existingMarks.save();
            return res.status(200).json({ success: true, message: "Marks updated successfully", existingMarks });
        } else {
            const newMarks = new Marks({
                enrollmentNo,
                internal,
                assignment,
                external,
                totalInternal,
                finalMarks
            });
            await newMarks.save();
            return res.status(200).json({ success: true, message: "Marks added successfully", newMarks });
        }
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteMarks = async (req, res) => {
    try {
        await Marks.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Marks deleted successfully" });
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { getMarks, addOrUpdateMarks, deleteMarks };