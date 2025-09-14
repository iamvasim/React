import { useState } from 'react'
import College from './College'
import { SubjectContext } from './ContextData'


function App() {
  const [subject,setSubject]=useState("Math")
 

  return (

    <div style={{backgroundColor:'yellow',padding:10}}>
     <SubjectContext value={subject}>
     <select value={subject} onChange={(e)=>setSubject(e.target.value)} >
     <option value=''>Select subject</option>
     <option value={"Math"}>Math</option>
     <option value={"English"}>English</option>
     <option value={"Hindi"}>Hindi</option>
     <option value={"Physics"}>Physics</option>
     </select>
     <h1>context Api !</h1>
     <button onClick={()=>setSubject('')}>clear subject</button>
     <College/>
     </SubjectContext>
       
    </div>
  )
}

export default App
