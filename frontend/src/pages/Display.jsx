import { useEffect, useState } from "react";
import axios from "axios";

export default function Display() {
  const url = "http://localhost:3000";
  const [students, setStudents] = useState([]);
   const [user, setUser] = useState(null);

  // Fetch students
  const fetchStudents = () => {
    axios
      .get(`${url}/students`, { withCredentials: true })
      .then((res) => setStudents(res.data))
      .catch((e) => console.log(e));
  };

  // Delete student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${url}/students/${id}`, {
        withCredentials: true,
      });
      // Refresh list after delete
      fetchStudents();
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };
   const fetchUser = () => {
    axios
      .get(`${url}/me`, { withCredentials: true })
      .then((res) => {setUser(res.data);
        // console.log(res);
        
      })
      .catch(() => setUser(null));
  };

  useEffect(() => {
    fetchStudents();
    fetchUser()
  }, []);

  return (
    <div>
      {students.map((s) => (
        <div key={s._id} style={{ marginBottom: "10px" }}>
          {s.name} : {s.classId?.title}

         {user && user._id && user._id === s.author && (
      <button onClick={() => deleteStudent(s._id)}>delete</button>
    )}
        </div>
      ))}
    </div>
  );
}
