const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;
const DATA_FILE = "students.json";

app.use(cors());
app.use(express.json());

// Load students data
const loadStudents = () => {
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
    return JSON.parse(fs.readFileSync(DATA_FILE));
};

// Save students data
const saveStudents = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Get all students
app.get("/students", (req, res) => {
    res.json(loadStudents());
});

// Add a new student
app.post("/students", (req, res) => {
    const students = loadStudents();
    students.push(req.body);
    saveStudents(students);
    res.json({ message: "Student added successfully!" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
