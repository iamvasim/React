import { useState } from 'react'
import useToggle from './useToggle'


function App() {
 
  const [value,ToggleValue] = useToggle(true)

  const [ data,setData]=useToggle(true);
  

  return (
    <>
    <button onClick={ToggleValue}>Toggle heading </button>
    <button onClick={()=>ToggleValue(false)}>Hide heading </button>
    <button onClick={()=>ToggleValue(true)}>Show heading </button>
     {
      value? <h1 >Custom hook !</h1>:null
     }
     <hr />
     <button onClick={setData}>Toggle heading </button>
    <button onClick={()=>setData(false)}>Hide heading </button>
    <button onClick={()=>setData(true)}>Show heading </button>
     {
      data? <h1 >second Heading  !</h1>:null
     }
    </> 
  )
}

export default App
