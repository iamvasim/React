import React, { useState } from 'react'

const RadioButton = () => {
    const [ gender, setgrnder] = useState('');
    const [ city, setCity] = useState('lko');
  return (
    <div>
        <h1>Handle Radio and dropdown</h1>
        <h4>Select gender</h4>
        <input type="radio"  onChange={(event)=>setgrnder(event.target.value)} name="gender"
        value={"Male"} checked={gender == 'Male'} id='male' />
        <label htmlFor="male">Male</label>
        <input type="radio" onChange={(event)=>setgrnder(event.target.value)} name="gender" 
        value={"Female"} checked={gender == 'Female'} id='female' />
        <label htmlFor="female">Female</label>
        <h2>Selected Gender : {gender}</h2>
        <br /><br />
        <hr />
        <h3>Select City</h3>
        <select onChange={(event)=>setCity(event.target.value)} defaultValue={""}>
            <option value="noida" >Noida</option>
            <option value="delhi">Delhi</option>
            <option value="lko">Lko</option>
            <option value="mumbai">Mumbai</option>
        </select>
        <h2 >Selected City : {city}</h2>
    </div>
  )
}

export default RadioButton