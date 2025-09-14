import React from 'react'
import { useState } from 'react'

const Counter = () => {
    const [ count , setCount]=useState(0);
    const [display , setDisplay]=useState('');
    const [num, updateNum]=useState(0);
    const increment = ()=>{
        setCount(count+1)



    }
    const decrement=()=>{
        setCount(count-1);
    }
    const reset=()=>{
        setCount(0);
    }

  return (

    <div>
        <h1>Counter:{count} </h1>
        <button onClick={increment}> Increment </button>
        <button onClick={decrement}>decrement</button>
        <button onClick={reset}>reset</button>

        <hr />
        <input type="text" onChange={(e)=>setDisplay(e.target.value)} />
        <h2> {display} </h2>
        <input type="number" placeholder='enter any number' onChange={(e)=>updateNum(e.target.value)}/>
        <h3> the number is : {num} </h3>
      
       
    </div>
  

  )
}

export default Counter