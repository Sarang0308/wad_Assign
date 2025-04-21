import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({ name: "", rollno: "", department: "", division: "", year: "" });
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/students")
            .then(response => setStudents(response.data))
            .catch(error => console.error("Error fetching students:", error));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/students", formData)
            .then(() => {
                setStudents([...students, formData]);
                setFormData({ name: "", rollno: "", department: "", division: "", year: "" });
            })
            .catch(error => console.error("Error adding student:", error));
    };

    // Filter students based on search query (case-insensitive)
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Student List</h1>
            
            {/* Search Bar */}
            <input 
                type="text" 
                placeholder="Search by Name" 
                value={searchQuery} 
                onChange={handleSearch} 
                className="search-bar"
            />

            <ul>
                {filteredStudents.map((student, index) => (
                    <li key={index}>
                        {student.name} - {student.rollno} - {student.department} - {student.division} - Year {student.year}
                    </li>
                ))}
            </ul>

            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="rollno" placeholder="Roll No" value={formData.rollno} onChange={handleChange} required />
                <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
                <input type="text" name="division" placeholder="Division" value={formData.division} onChange={handleChange} required />
                <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} required />
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
}

export default App;
