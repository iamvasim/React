import React from 'react'

const AddUser = ({ user, setUser }) => {
  return (
    <div>
      <h1>Add User</h1>
      <input 
        type="text" 
        onChange={(e) => setUser(e.target.value)} 
        placeholder="Enter user name" 
      />
       
      <hr />
    </div>
  )
}

export default AddUser
