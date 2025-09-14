import { useState } from 'react'
import { useFormStatus } from 'react-dom'


function App() {
  
 const handleSubmit= async()=>{
   await new Promise (res=>setTimeout(res,2000));
        console.log("form submitted");

     
    }

  function CustomerForm(){
    const {pending} = useFormStatus();
    return (
      <div>
        <input type="text" placeholder='name'/>
        <br />
        <input type="email" placeholder='email'/>
        <br />
        <input type="password" placeholder='password'/>
        <br />
        <button type='submit' disabled= {pending} >{pending ? 'submitting...' : 'submit'}</button>
      </div>
    )
  }
 
  return (
    <>
      <h1>useForm status hook in react js 19</h1>
      <form action={handleSubmit}>
      <input type="text" placeholder='name'/>
        <br />


        {/* <input type="email" placeholder='email'/>
        <br />
        <input type="password" placeholder='password'/>
        <br />
        <button type='submit'>submit</button> */}



        <CustomerForm/>
        
      </form>
    </>
  )
}

export default App
