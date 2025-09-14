import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [counter,setCounter]= useState(15);
  // let counter =60; 
  const addValue=()=>{ 
    
    counter=counter+1; 
    console.log("clicked " ,counter ); 
    setCounter(counter);
  }
  const reamoveValue=()=>{
    setCounter(counter-1);
  }
  return (
    <>
      <h1>wasim</h1>
      <h2>counter Value : {counter}</h2>
      <button

      onClick={addValue}
      
      >Add value {counter}</button>
      <br />
      <button onClick={reamoveValue} >remove value {counter}</button>
    </>
  )
}

export default App
