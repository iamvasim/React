import { useState } from 'react'
import ChildComponents from './ChildComponents'
import DefaultProps from './DefaultProps';
import Wrapper from './Wrapper';

function Child(props){
  
  return(
  
    <div>
      <hr />
      <h1>Hellow :{props.name}</h1>
      <hr />
    </div>
   
  )
}

function App() {
 
  const  arr = ["wasim","sajid","raju","rahul"];
  const obj ={
      name :"wasim",
      age:21,
      city:"Mirzapur"
  }
  

  return (
   <div>
    <h1>Now we going to learn about Props </h1>
    <Child name ="wasim"/>
    <ChildComponents varData="Hello World" objData={obj} arrData={arr}/>
    <hr />
   < DefaultProps name="wasim"/>
    < DefaultProps />
    <hr />
    <Wrapper>
    <h1>hello everyone </h1>
    </Wrapper>
   
   </div>
  )
}



export default App
