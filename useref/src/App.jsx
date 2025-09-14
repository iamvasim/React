import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRef } from 'react'

function App() {

 const inputElement= useRef(null);
 const displayElement = useRef(null);
 const [nameVisible, setNameVisible] = useState(false);
const focusInput=()=>{
  inputElement.current.focus();
  inputElement.current.value="wasim";
}
const focusInput2=()=>{
  displayElement.current.focus();
}
const displayName=()=>{
  setNameVisible(true);
}
  return (
   <div>
    <input 
  type="text"  ref={inputElement}/>
    <button onClick={()=>{focusInput()}}>focus & write wasim</button>
    <button onClick={()=>{displayName(),focusInput2()}}>click</button>
    {nameVisible && <h1>hello wasim</h1>}
   </div>
  )
}

export default App
