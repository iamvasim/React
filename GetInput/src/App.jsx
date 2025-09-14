import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { use } from 'react'

function App() {
  const [value , setValue]=useState("");
  const [name , setName]=useState("");

  const[password , setPassword]=useState("");
  const[email , setEmail]=useState("");


  return (
    <div>
      <h1>Get Input from user</h1>
      <input type="text" value={value} onChange ={(event)=>setValue(event.target.value)} placeholder='enter user name ' />
      <h1>{value}</h1>
      <button onClick={()=>setValue('')}>clear</button>
      <hr />
      <h1>controlled component</h1>
      <form>
      <input type="text" value={name} onChange ={(event)=>setName(event.target.value)} placeholder='enter name ' />
      <h1>{name}</h1>
      <br />
      <input type="password" value={password} onChange ={(event)=>setPassword(event.target.value)} placeholder='enter password ' />
      <h1>{password}</h1>
      <br />
      <input type="email" value={email} onChange ={(event)=>setEmail(event.target.value)} placeholder='enter email ' />
      <h1>{email}</h1>
      <br />
      <button>submit</button>
      <br /> <br />
      <button onClick={()=>{setName(''); setPassword(''); setEmail('')}}>clear</button>
      </form>
      

    </div>
  )
}

export default App
