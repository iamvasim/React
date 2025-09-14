import React from 'react'
import { useState } from 'react';

const Counter = () => {
  const [count ,setCounter]=useState(0);
  return (
    <div className='container'>
      <h1>Value: {count}</h1>
      <button onClick={()=>setCounter(count+1)}>Increament</button>
      <br />
      <br />
      <button onClick={()=>setCounter(count-1)}>Decreament</button>
      <br />
      <br />
      <button onClick={()=>setCounter(0)}>Reset</button>
    </div>
  )
}

export default Counter
