import { useState } from 'react'
import AnotherUser from './AnotherUser'
import Clock from './Clock'
import { use } from 'react'



function App() {

  const [color, setColor]=useState('red'); // this is for the clock 

  // const userName = ["wasim","sahil","saurabh","rohit","rahul"];
  // const collegedata=["amity","galgotia","sharda","dtu","jmi"];

  const userData=[
    {
      name : "wasim",
      age : 24,
      city : "lko",
      email:"joinvasim2.0@gmail.com",
      id :1
    },
    {
      name : "samin",
      age : 21,
      city : "lko",
      email:"joinsasim2.0@gmail.com",
      id :12
    },
    {
      name : "sahil",
      age : 25,
      city : "delhi",
      email:"vhbhs45.gmail.com",
      id :13
    },
    {
      name : "rohit",
      age : 29,
      city : "noida",
      email:"rohit45.gmail.com",
      id :14
    },
    
    
  ]
  

  return (
    <div className="App">
      <h1>Loop in Jsx with Map Function</h1>

      <table border={1}>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Age</td>
            <td>City</td>
            <td>email</td>
            
          </tr>
        </thead>

        <tbody>
        {
          userData.map((user)=>(
            <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.city}</td>
            <td>{user.email}</td>
            
          </tr>

          )) 
        }
        </tbody>
      </table>







      <h1 >Dommy Data</h1>
      <table border={1} >

        <thead>
          <tr>
          <td>Id</td>
          <td>Name</td>
          <td>Age</td>
          <td>email</td>
          <td>City</td>

          </tr>
         
          </thead>
          <tbody>
          <tr>
          <td>1</td>
          <td>wasim</td>
          <td>21</td>
          <td>joinvasim2.0@gmail.com</td>
          <td>lko</td>

          </tr>

          <tr>
          <td>1</td>
          <td>wasim</td>
          <td>21</td>
          <td>joinvasim2.0@gmail.com</td>
          <td>lko</td>

          </tr>
          <tr>
          <td>1</td>
          <td>wasim</td>
          <td>21</td>
          <td>joinvasim2.0@gmail.com</td>
          <td>lko</td>

          </tr>
          </tbody>
      </table>

      <h1>Reuse component in loop </h1>
     {
      userData.map((user)=>(
        <div key={user.id} >
     < AnotherUser data={user}/>

        </div>

      ))
     }
      <br />
      <hr />
      <select onChange={(event)=>setColor(event.target.value)}>
        <option value={"red"}>Red</option>
        <option value={"blue"}>Blue</option>
        <option value={"yellow"}>Yellow</option>
        <option value={"green"}>Green</option>
      </select>
      <Clock color={color}/>
     
    </div>
    
  )
}

export default App
