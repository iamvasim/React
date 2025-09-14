import { useTransition } from 'react';
import { useState } from 'react'


function App() {
  const [pending, startTransition] = useTransition();

 const handleButton= ()=>{
  startTransition (async()=>{
    await new Promise (res=>setTimeout(res,2000));


  })


  
 
  
}

  return (
    <>
      <h1>use transion hook in react js 19</h1>
      {
        pending? 
        <img src="https://imgs.search.brave.com/9IlAkW9I2Gn3xtH1hGayNSEIlSpl7QDcI8DIh_XIUfg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/UmlGc0sxU3lhcDhB/QUFBbS9jc3MtbG9h/ZGVyLndlYnA" alt="" />
        : null
      }
      <button disabled={pending} onClick={handleButton}>submit</button>

    </>
  )
}

export default App
