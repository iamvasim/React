import { useState } from 'react'


function App() {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
  const handleUser = () => {
    setUsers([...users, user]);
  }
  const totalUsers = users.length;
  const lastUser = users[users.length - 1];
  const uniqueUser = [...new Set(users)].length
  return (
    <>
      <h2>Total users:{totalUsers} </h2>
      <h2>last users: {lastUser}</h2>
      <h2> Unique Total users:{uniqueUser} </h2>


      <input type="text" placeholder='enter the name' onChange={(e) => setUser(e.target.value)} />
      <button onClick={handleUser}>Add user</button>
      <h2>List of users</h2>
      {
        users.map((items, index) => (
          <h4 key={index}>{items}</h4>

        ))
      }
    </>
  )
}

export default App
