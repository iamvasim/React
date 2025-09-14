import React from 'react'
import { useState } from 'react'


const MultipleCondition = () => {
    const [count , setCount]=useState(-1);

  return ( <div>
    <h1>multipleCondition</h1>
    <h1>{count}</h1>
    <button onClick={()=>setCount(count+1)}>Counter</button>
    {
        count==0 ? <h1>count is zero</h1>
        :count==1 ? <h1>count is one</h1>
        : count>1 ? <h1>count is greater than one= {count}</h1>
       :<h1>count is negative</h1>


    }
    </div>
  )
}

export default MultipleCondition