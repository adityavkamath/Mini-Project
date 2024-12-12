const express = require("express");
const { getMarks, addOrUpdateMarks, deleteMarks } = require("../../controllers/Other/marks.controller");
const router = express.Router();

router.post("/getMarks", getMarks);
router.post("/addOrUpdateMarks", addOrUpdateMarks);
router.delete("/deleteMarks/:id", deleteMarks);

module.exports = router;