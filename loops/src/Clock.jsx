import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const Clock = ({color}) => {
    const [ time , setTime]= useState(0);
 useEffect(()=>{
    setInterval(()=>{
       setTime(new Date().toLocaleTimeString())
    },1000)

 })

  return (
    <div>
        <h1>Digital Clock </h1>
        <h1 style={{color:color,backgroundColor:'#000',width:'120px',padding:'10px',borderRadius:'5px'}}>{time}</h1>
    </div>
  )
}

export default Clock