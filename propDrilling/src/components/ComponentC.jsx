import React from "react";
import { useContext } from "react";
import { data } from "../App";
import { data1 } from "../App";
const ComponentC = () => {
   const username= useContext(data);
   const Age = useContext(data1)

   // these are use as context Api
//   return (
// //     <data.Consumer>
// //       {(name)=>{
       
// //         // return <h1>Name :{name}</h1>)
// //         return(
// //             <data1.Consumer>
// //                 {(age)=>{
// //                    return <h1>My Name is :{name} and i am {age} years old</h1>

// //                 }}
// //             </data1.Consumer>
// //         )

// //       }}
      
// //     </data.Consumer>
//   );
// here we impleet for the use context hook 
return(
    <h1>My name is :{username}and I'm {Age} years old </h1>
)

};


export default ComponentC;
