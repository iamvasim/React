import { useState } from 'react'
import { useId} from 'react'

function App() {
  const name =useId();
  const password =useId();
  const data =useId();
  const city =useId();

  return (

   
  <>

  <h1>use Id hook</h1>
  <h2>{name}</h2>
  <h2>{password}</h2>
  <h2>{data}</h2>
  <h2>{city}</h2>
  





  </>
  )
}

export default App
