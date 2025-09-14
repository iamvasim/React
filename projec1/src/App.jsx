import { useState } from "react";

function App() {
  const [name, setName] = useState("Vasim");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚀 My First React App</h1>
      <h2>Hello, {name}!</h2>

      <input
        type="text"
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid gray",
          marginTop: "20px",
        }}
      />
    </div>
  );
}

export default App;
