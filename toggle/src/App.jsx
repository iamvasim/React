import React from "react"
import { useState } from "react"
import MultipleCondition from "./multipleCondition"

function App() {
  const [ display , setdisplay]=useState(true);
  

  return (
    <div>
      <h1>Togglee in react</h1>
      {
        display ? <h1>jyada haso nhi samjhe</h1> : null
      }
      <button onClick={()=>setdisplay(!display)}>toggle</button>
      < MultipleCondition />
    </div>
  )
}

export default App
