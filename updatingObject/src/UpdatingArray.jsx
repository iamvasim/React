import React, { useState } from 'react'

const UpdatingArray = () => {
  const [data,setData]=useState([
    'wasim','samim','mobin'
  ])

  const handleUser=(value)=>{
    const newData = [...data];
    newData[data.length-1]=value
    setData(newData);



  }
const [datadetails,setDetail]=useState([
  {
    name :"wasim",
    age:'22'
  },
  {
    name :"samim",
    age:'21'
  },
  {
    name :"mobin",
    age:'23'
  }

])

const ChangeUserAge=(value)=>{
  const newData = [...datadetails];
  newData[datadetails.length-1].age=value
  setDetail(newData);



}
const ChangeUserName=(value)=>{
  const newData = [...datadetails];
  newData[datadetails.length-1].name=value
  setDetail(newData);



}


  return (
    <div>
      <hr />
      <h1>Upadting the array !</h1>
      <input type="text" placeholder='enter last user :'onChange={(e)=>handleUser(e.target.value)} />

      {
        data.map((item,index)=>(
          <h3 key={index}>{item}</h3>  
        ))
      }   
<hr />
<input type="text" placeholder='enter last user age :'onChange={(e)=>ChangeUserAge(e.target.value)} />
<input type="text" placeholder='enter last user name :'onChange={(e)=>ChangeUserName(e.target.value)} />
{
  datadetails.map((item)=>(
    <h3>{item.name},{item.age}</h3>

  ))
}


    </div>
  )
}

export default UpdatingArray