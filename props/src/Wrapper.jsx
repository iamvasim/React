import React from 'react'

const Wrapper = (children) => {
  return (
    <div style={{color:"green",border:"5px, solid green" , width:"300px" }} >
        :{children.children}
       
    </div>
  )
}

export default Wrapper