import React from 'react'

const AnotherUser = (data) => {
  return (
    <div style={{border:'1px solid black',
     margin:'10px', 
     padding:'10px',
    width:'300px',
    boxShadow:'2px 2px 10px gray',
    borderRadius:'10px'
     }}>
        <h3>Id:<spane style={{color:'green'}}>{data.data.id}</spane></h3>
        <h3>Name:<spane style={{color:'green'}}>{data.data.name}</spane></h3>
        <h3>Age:<spane style={{color:'green'}}>{data.data.age}</spane></h3>
        <h3>City:<spane style={{color:'green'}}>{data.data.city}</spane></h3>
        <h3>Email:<spane style={{color:'green'}}>{data.data.email}</spane></h3>
        

    </div>
  )
}

export default AnotherUser