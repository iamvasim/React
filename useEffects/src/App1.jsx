import React, { use, useEffect, useState } from 'react'

const App1 = () => {

    const [counter , setCounter] = useState(0);
    const [ data, setData] = useState(0);
    

    function callOnce(){
        console.log("it will call once");
    }
    useEffect( ()=>{ // it will call once after component mount
        callOnce();
        counterfun();
    },[counter])

     function counterfun(){
        console.log("counter is ", counter);
     }
 
  return (
    <div>
        <h1>use Effect hook</h1>
        <h1>{counter}</h1>
        <button onClick={()=>setCounter(counter+1)}>Counter</button>
        <button onClick={()=>setData(data+1)} >Data {data}</button>
    </div>
    
  )
}

export default App1