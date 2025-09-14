import { useRef, useState } from 'react'
import InputField from './InputField';


function App() {
  const inputref= useRef(null);
   const updateInput=()=>{
    inputref.current.focus();
    inputref.current.value=1000;
    inputref.current.style.color="green";
    inputref.current.style.backgroundColor="yellow";
   }



  return (
    <>
      <h1>Forward Ref</h1>
      < InputField ref={inputref}/>
      <button onClick={updateInput}>Update input field</button>
    </>
  )
}

export default App
