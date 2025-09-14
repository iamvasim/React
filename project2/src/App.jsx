import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Add new task
  const addTask = () => {
    if (task.trim() === "") return;
    setTodos([...todos, task]);
    setTask(""); // clear input
  };

  // Delete task
  const deleteTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>📝 To-Do List</h1>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid gray",
          marginRight: "10px",
        }}
      />
      <button
        onClick={addTask}
        style={{
          padding: "10px 15px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "green",
          color: "white",
          cursor: "pointer",
        }}
      >
        Add
      </button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {todos.map((item, index) => (
          <li
            key={index}
            style={{
              margin: "10px 0",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "300px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {item}
            <button
              onClick={() => deleteTask(index)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
