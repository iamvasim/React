import React from 'react'
import { useEffect } from 'react'


const BasicEffect = () => {
    useEffect(()=>{
        console.log("hello ! wasim")
    },[]);
  return (
    <div>basic use effects</div>
  )
}

export default BasicEffect