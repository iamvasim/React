import React from 'react'
import { useState } from 'react'

const Checkbox = () => {
    const [skills , setSkills] = useState([]);
    const handleSkills=(event)=>{
        console.log(event.target.value.checked);
        if(event.target.checked){
            setSkills([...skills,event.target.value])
        }
        else{
            setSkills([...skills.filter((item)=>item!=event.target.value)])

        }


    }
  return (
    <div>
        <h3>Select your skills </h3>
        <input onChange={handleSkills} type="checkbox" id='php' value='php' />
        <label htmlFor="php">PHP</label>
<br /> <br />
        <input  onChange={handleSkills} type="checkbox" id='py' value='python' />
        <label htmlFor="py">PYTHON</label>
<br /><br />
        <input onChange={handleSkills} type="checkbox" id='java' value='java' />
        <label htmlFor="java">JAVA</label>
        

        <br /><br />
        <input onChange={handleSkills} type="checkbox" id='nlp' value='nlp' />
        <label htmlFor="nlp">NLP</label>


        <h1>{skills.toString()}</h1>
        
    </div>


    
  )
}

export default Checkbox