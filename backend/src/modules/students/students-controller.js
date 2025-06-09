const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const { name, className, section, roll } = req.query;
    const students = await getAllStudents({ name, className, section, roll });
    res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const payload = req.body;

    try {
        const newStudent = await addNewStudent(payload);
        res.status(201).json({ student: newStudent });
    } catch (err) {
        res.status(err.statusCode || 500).json({
        error: err.message || "Unexpected error occurred",
        });
    }
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const payload = req.body;

    try {
        const message = await updateStudent({ ...payload, userId: Number(userId) });
        res.json(message);
    } catch (err) {
        res.status(err.statusCode || 500).json({
        error: err.message || "Unexpected error occurred",
        });
    }
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(Number(id));
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await setStudentStatus({ userId: Number(id), status});
    if (!updated) {
        return res.status(404).json({ message: "Student not found or status not updated" });
    }
    res.json({ success: true });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};