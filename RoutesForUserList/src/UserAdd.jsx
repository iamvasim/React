import React, { useState } from 'react';

const UserAdd = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const createUser = async () => {
    console.log(name, age, email);
    const url = "http://localhost:3001/users";
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // ✅ important for POST requests
      },
      body: JSON.stringify({ name, email, age }),
    });
    res = await res.json();
    if (res) {
      alert('New user added');
    }
  };



  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Add New User</h1>

      {/* Name Input */}
      <input
        type="text"
        placeholder="Enter user name"
        onChange={(e) => setName(e.target.value)}
        style={{
          width: '300px',
          padding: '10px 15px',
          border: '2px solid #ccc',
          borderRadius: '5px',
          fontSize: '16px',
          outline: 'none',
          transition: '0.3s',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#007BFF')}
        onBlur={(e) => (e.target.style.borderColor = '#ccc')}
      />
      <br /><br />

      {/* Age Input */}
      <input
        type="number"
        placeholder="Enter user age"
        onChange={(e) => setAge(e.target.value)}
        style={{
          width: '300px',
          padding: '10px 15px',
          border: '2px solid #ccc',
          borderRadius: '5px',
          fontSize: '16px',
          outline: 'none',
          transition: '0.3s',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#007BFF')}
        onBlur={(e) => (e.target.style.borderColor = '#ccc')}
      />
      <br /><br />

      {/* Email Input */}
      <input
        type="email"
        placeholder="Enter user email"
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: '300px',
          padding: '10px 15px',
          border: '2px solid #ccc',
          borderRadius: '5px',
          fontSize: '16px',
          outline: 'none',
          transition: '0.3s',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#007BFF')}
        onBlur={(e) => (e.target.style.borderColor = '#ccc')}
      />
      <br /><br />

      {/* Submit Button */}
      <button
        onClick={createUser} // ✅ fixed (removed function call)
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: '0.3s',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#007BFF')}
      >
        Submit
      </button>

      {/* Display Entered Data */}
      <h1 style={headingStyle}>Name is: {name}</h1>
      <h1 style={headingStyle}>Age is: {age}</h1>
      <h1 style={headingStyle}>Email is: {email}</h1>
    </div>
  );
};

// Reusable heading style
const headingStyle = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '20px 0',
  fontFamily: 'Arial, sans-serif',
};

export default UserAdd;
