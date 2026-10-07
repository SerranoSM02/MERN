
import {useEffect, useState} from "react";
import axios from "axios";

function App(){

  const [students, setStudents] = useState([]);
  const[name, setName] = useState("");
  const[course, setCourse] = useState("");
  const[age, setAge] = useState("");
  const[edit, setEdit] = useState(null);
 

  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
            setStudents(response.data);
      });

  }, []);


function editStudent(student){
  setName(student.name);
  setCourse(student.course);
  setAge(student.age);
  setEdit(student._id);
}


function addStudent(){
  axios
    .post("http://localhost:5000/students", {
      name: name,
      course: course,
      age: age,
    })
    .then(() => {
      
      axios
      .get("http://localhost:5000/students")
      .then((response) => {
            setStudents(response.data);
      });
    });

    setName("");
    setCourse("");
    setAge("");

  }


function updateStudent(){
  axios
    .put("http://localhost:5000/students/"+ edit, {
      name: name,
      course: course,
      age: age,
    })

    .then(() => {
      
      axios
      .get("http://localhost:5000/students")
      .then((response) => {
            setStudents(response.data);
      });
    });

    setName("");
    setCourse("");
    setAge("");
    setEdit(null);

  }


function deleteStudent(id){
  axios
    .delete("http://localhost:5000/students/"+id )
    
    .then(() => {
      
      axios
      .get("http://localhost:5000/students")
      .then((response) => {
            setStudents(response.data);
      });
    });
  }



  return (
    <div>
    
      <h1>Student Management System</h1>

      <input placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>
      <br/>
      <input placeholder="Course" value={course} onChange={(event) => setCourse(event.target.value)}/>
      <br/>
      <input placeholder="Age" value={age} onChange={(event) => setAge(event.target.value)}/>

      <br/>

      {edit !== null && <button onClick={()=>updateStudent()}>Update Student</button>}
      {edit === null && <button onClick={()=>addStudent()}>Add Student</button>}
      

      <hr/>

      <h2>Students</h2>

      {students.map((student)=>(

        <div key={student._id}> 
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>

        <button onClick={()=>editStudent(student)}>Edit</button>
        <button onClick={()=>deleteStudent(student._id)}>Delete</button>

        </div>

      ))}
   
    </div>
  );
}

export default App;
