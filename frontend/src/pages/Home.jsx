import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const url = "http://localhost:3000";
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    classId: ""
  });

  useEffect(() => {
    axios
      .get(`${url}/classes`, { withCredentials: true })
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${url}/students`, form, { withCredentials: true })
      .then((res) => {
        alert("Student added!");
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>

      <input
        type="text"
        placeholder="Student Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />

      <select
        value={form.classId}
        onChange={(e) => setForm({ ...form, classId: e.target.value })}
      >
        <option value="">Select Class</option>
        {classes.map((c) => (
          <option value={c._id} key={c._id}>
            {c.title}
          </option>
        ))}
      </select>

      <button type="submit">Add Student</button>
    </form>
  );
}
