import { useState } from 'react'
import Counter from './Counter'




function App() {

  const [fruit , setFruits]=useState("Apple");

  const change =()=>{
    setFruits("banana");
 
  }


  return (
    <div>
      <h1>States in react</h1>
      <h1>{fruit}</h1>
      <button on onClick={change}> change fruit name </button>
      <Counter /> 
    </div>

     
  
  )
}

export default App
