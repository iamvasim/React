// import React, { forwardRef } from 'react'

// const InputField = (props,ref) => {
//   return (   
//     <div>
//         <h2>Input Field Component</h2>
//         <input type="text" ref={ref} />
        
//     </div>
//   )
// }

// export default forwardRef(InputField);




// another way


const InputField= (props)=>{

    return (
        <div>
        <input type="text" ref={props.ref} />
        </div>
    )
}
 export default InputField;
