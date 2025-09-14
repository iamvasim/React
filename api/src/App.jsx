import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [usersData,setUsersdata]=useState([]);
  useEffect(()=>{
    getUsersData();
  },[])
  
  async function getUsersData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      res = await res.json();
  
      setUsersdata(res.users)

    
  }
  console.log(usersData)
  

  return (
    <>
      <h1>Fetch Api !</h1>
      {
        usersData && usersData.map((user)=>{
     
          <ul>
            <li>{user.firstName}</li>
            <li>{user.firstName}</li>
            <li>{user.firstName}</li>
            <li>{user.firstName}</li>
          </ul>

        })
      }
    </>
  )
}

export default App
