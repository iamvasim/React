import React from 'react'

const ChildComponents = (props) => {
  return (
    <div>
        <hr />
        <h1>ChildComponents</h1>
        <h1>Var: {props.varData}</h1>
        <h1>object :{props.objData.name} and age :{props.objData.age}</h1>
        <h1>Array :{props.arrData.join(" , ")}</h1>
        <hr />
    </div>
  )
}

export default ChildComponents
