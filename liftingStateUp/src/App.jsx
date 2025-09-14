import React from 'react'
import { useState } from 'react'
import AddUser from './addUser.jsx'
import DisplayUser from './DisplayUser.jsx'

function App() {
  
  const [user,setUser]=React.useState("");
  return (
    <>
    <AddUser  setUser={setUser} />
    <DisplayUser user={user}/> {/*yha pr hm user ko pass karenge diplay karane ke liye */}

      
    </>
  )
}

export default App
