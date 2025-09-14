import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const handleName = (event) => {
    const value = event.target.value;
    setName(value);
    if (value.length > 5) {
      setNameErr("Please enter valid username. Only 5 characters allowed.");
    } else {
      setNameErr("");
    }
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
    let regex = /^[A-Z0-9]+$/i;
    if (regex.test(value)) {
      setPasswordErr("");
    } else {
      setPasswordErr(
        "Please enter valid password, only numbers and alphabet allowed!"
      );
    }
  };

  const isDisabled = nameErr || passwordErr || !name || !password;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        marginTop: "40px",
      }}
    >
      <input
        type="text"
        value={name}
        onChange={handleName}
        placeholder="Enter name"
        style={{
          width: "250px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      />
      <span style={{ color: "red", fontSize: "14px" }}>{nameErr}</span>

      <input
        type="password"
        value={password}
        onChange={handlePassword}
        placeholder="Enter password"
        style={{
          width: "250px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      />
      <span style={{ color: "red", fontSize: "14px" }}>{passwordErr}</span>

      <button
        style={{
          width: "120px",
          padding: "10px",
          backgroundColor: isDisabled ? "#93c5fd" : "#3b82f6",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          cursor: isDisabled ? "not-allowed" : "pointer",
        }}
        disabled={isDisabled}
      >
        Login
      </button>
    </div>
  );
}

export default App;
