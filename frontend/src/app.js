

import React, {useState, useEffect} from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import './main.css';

const App = () => {
    const[showAddStudentForm, setShowAddStudentForm] = useState(false)
    const [students, setStudents] = useState([])
    const [newStudent, setNewStudent] = useState({
        firstName: "",
        lastName: "",
        projectName: ""
    })
    const [selectedStudent, setSelectedStudent] = useState(null)
    // const [selectedStudents, setSelectedStudents] = useState({
    //     firstName: "",
    //     lastName: "",
    //     projectName: ""
    // })
    // const [toView, setToView] = useState({
    //     firstName: "",
    //     lastName: "",
    //     projectName: ""
    // })
    // const [openView, setOpenView] = useState(false);

    useEffect(() => {
        fetchStudents()
    }, [])

    // fetch students
    const fetchStudents = () =>{
        axios.get('http://127.0.0.1:8000/api/students/')
        .then(response => {
            console.log(response.data)
            setStudents(response.data)
        })
        .catch(error => console.error(error))
    }

    const handleInputChange = (e) => {
        setNewStudent({...newStudent, [e.target.name]:e.target.value})
        console.log(newStudent)
    }

    const handleAddStudent = (e) => {
        axios.post('http://127.0.0.1:8000/api/students/', newStudent)
        .then(response => {
            setStudents([...students, response.data])
            setNewStudent(
                {
                    firstName: "",
                    lastName: "",
                    projectName: ""
                }
            )
            setShowAddStudentForm(false);
        })
        .catch(error => console.error(error))
    }
    const handleEditStudent = (student) => {
        setSelectedStudent(student)
        setNewStudent({
            firstName: student.firstName,
            lastName: student.lastName,
            projectName: student.projectName
        });
        setShowAddStudentForm(true);
    }
    // const handleUpdateStudent = (id) => {
    //     axios.put(`http://127.0.0.1:8000/api/students/${selectedStudent.id}/`, newStudent)
    //     .then(response => {
    //         fetchStudents()
    //         setNewStudent(
    //             {
    //                 firstName: "",
    //                 lastName: "",
    //                 projectName: ""
    //             }
    //         );
    //         setSelectedStudent(null);
    //         setShowAddStudentForm(false);
    //     })
    //     .catch(error => console.error(error))
    // }

    const handleUpdateStudent = (e) => {
        // e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/students/${selectedStudent.student_id}/`, newStudent)
            .then(response => {
                fetchStudents();
                setNewStudent({ firstName: "", lastName: "", projectName: "" });
                setSelectedStudent(null);
                setShowAddStudentForm(false); // Hide form after updating
            })
            .catch(error => console.error(error));
    };

    const handleDeleteStudent = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/students/${id}/`)
            .then(response => {
                setStudents(students.filter(student => student.student_id !== id));
            })
            .catch(error => console.error(error));
    };

    const handleCancel = () => {
        setNewStudent({ firstName: "", lastName: "", projectName: "" });
        setSelectedStudent(null);
        setShowAddStudentForm(false);
    };

    return (
        <div>
            <h3 className="title">Student List</h3>
        {/* <table border={"2px"} cellPadding={"10px"}> */}
        <table className="table able-dark table-striped custom-table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Project Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student => (
                    <tr key={student.student_id}>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.projectName}</td>
                        <td>
                            <button className="btn btn-outline-info btn-gap" onClick={() => handleEditStudent(student)}>Edit</button>
                        
                            <button className="btn btn-outline-danger btn-gap" onClick={() => handleDeleteStudent(student.student_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <button className="btn btn-link" onClick={() => setShowAddStudentForm(true)}> Add New Student</button>
        </table>


        {/* <h3 className="title">{isEditMode ? "Edit Student" : "Add New Student"}</h3> */}
        {showAddStudentForm && (
        <div className="form-container">
        <form className="row g-3 custom-form" >
        
            <div className="form-group col-md-4 ">
                <label className="form-label">First name</label>
                <input type="text" className="form-control" name="firstName" value={newStudent.firstName} onChange={handleInputChange} required/>
            </div>
            
            <div className="form-group col-md-4 ">
                <label className="form-label">Last name</label>
                <input type="text" className="form-control" name="lastName" value={newStudent.lastName} onChange={handleInputChange} required/>
            </div>
            
            <div className="form-group col-md-4 ">
                <label className="form-label">Project name</label>
                <input type="text" className="form-control" name="projectName" value={newStudent.projectName} onChange={handleInputChange} required/>
            </div>
            
            <div className="form-group col-md-4 ">
                {
                    selectedStudent ? (
                        <>
                            <button className="btn btn-outline-primary button-gap" onClick={handleUpdateStudent}>Edit</button>
                            <button className="btn btn-outline-danger button-gap" onClick={handleCancel}>Cancel</button>
                        </>
                    ): (
                        <>
                            <button className="btn btn-outline-primary button-gap" type="submit" onClick={handleAddStudent}>Add</button>
                            <button className="btn btn-outline-danger button-gap" onClick={handleCancel}>Cancel</button>
                        </>
                        
                        
                    )
                }
                
            </div>
        </form>     
        </div>



        )}
        {/* <footer>made with Django-React</footer> */}

        {/* <div>
            <footer>made with Django-React</footer>
        </div> */}
        </div>
    )
}
export default App