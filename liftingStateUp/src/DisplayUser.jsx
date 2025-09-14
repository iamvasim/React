import React from 'react'

function DisplayUser({ user }) {
  return (
    <div>
        <h1>display form another component</h1>
        <h2>{user}</h2>
    </div>
  )
}

export default DisplayUser