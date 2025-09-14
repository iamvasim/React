import { useState } from 'react'
import UpdatingArray from './UpdatingArray'

function App() {
  const [name,setName]=useState("vasim")
  const [data, setData] = useState({
    name: "vasim",
    age: 22,
    address:{
      city: "mumbai",
    country: "india"

    }
    
  })
  
  
  const handleName=(val)=>{
    setName(val)
    

  } 
   const handleObject=(val)=>{
data.name=val;

setData({...data})
}
const handleCity=(city)=>{
  data.city=city;
  setData({...data})

}
const handleCountry=(country)=>{
  data.country=country;
  setData({...data})

} 
 
 
  return (
    <>
    <h1>Updating Object in State</h1>

    <h2  style={{
    color: "#2e7d32",                     // deep green text
    background: "rgba(255, 255, 0, 0.5)", // transparent yellow background
    width: "220px",
    padding: "12px",
    border: "2px solid rgba(46, 125, 50, 0.6)", // semi-transparent green border
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",   // soft shadow
    backdropFilter: "blur(6px)",               // frosted glass effect
    fontFamily: "Arial, sans-serif",
  }}>{name}</h2>
   <input type="text" placeholder='update name' onChange={(e)=>handleName(e.target.value)} />
   <h2 style={{
    color: "green",
    backgroundColor: "yellow",
    width: "200px",          // fixed width
    padding: "10px",         // inner spacing
    border: "2px solid black", // proper border
    borderRadius: "8px",     // rounded corners
    textAlign: "center"      // center text
  }}>name : {data.name}</h2>
   <input type="text" placeholder='update name' onChange={(e)=>handleObject(e.target.value)} />
   <h2 
  style={{
    color: "green",
    backgroundColor: "yellow",
    width: "200px",          // fixed width
    padding: "10px",         // inner spacing
    border: "2px solid black", // proper border
    borderRadius: "8px",     // rounded corners
    textAlign: "center"      // center text
  }}
>
  city : {data.city}
</h2>

   <input type="text" placeholder='update city' onChange={(e)=>handleCity(e.target.value)} />
   <h2 style={{
    color: "green",
    backgroundColor: "yellow",
    width: "200px",          // fixed width
    padding: "10px",         // inner spacing
    border: "2px solid black", // proper border
    borderRadius: "8px",     // rounded corners
    textAlign: "center"      // center text
  }}> country : {data.country}</h2>
   <input type="text" placeholder='update country' onChange={(e)=>handleCountry(e.target.value)} />
  
    < UpdatingArray/>
    </>
  )
}

export default App
