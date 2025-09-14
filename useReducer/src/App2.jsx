import React, { useReducer } from 'react'
const emptyData={
    name:'', 
    password:'',
    email:'',
    city:'',
    address:''

}
const reducer=(data,action)=>{
return {...data,[action.type]:action.val}

}

const App2 = () => {
    const [state,dispatch,] = useReducer(reducer,emptyData);
  

  return (
    <div>
        <h1>USeReducer second page ------</h1>

        <input type="text" onChange={(e)=>dispatch({val:e.target.value,type:'name'})} placeholder='enter name ' />
        <br /><br />
        <input type="password" onChange={(e)=>dispatch({val:e.target.value,type:'password'})} placeholder='enter password ' />
        <br /><br />
        <input type="email" onChange={(e)=>dispatch({val:e.target.value,type:'email'})} placeholder='enter email ' />
        <br /><br />
        
        <input type="text" onChange={(e)=>dispatch({val:e.target.value,type:'city'})} placeholder='enter city ' />
        <br /><br />
        <input type="text" onChange={(e)=>dispatch({val:e.target.value,type:'address'})} placeholder='enter Address ' />
        <br />
        <br />
        <ul>
            <li>Name:{state.name}</li>
            <li>password:{state.password}</li>
            <li>Email:{state.email}</li>
            <li>City:{state.city}</li>
            <li>Adress:{state.address}</li>

        </ul>
        <button onClick={()=>  console.log(state)}>Add details</button>
    </div>
  )
}

export default App2