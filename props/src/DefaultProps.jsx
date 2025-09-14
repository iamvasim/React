import React from 'react'


const DefaultProps = ({name="w"}) => {// default props
  return (
    <div>
        <h1>default Props</h1>
        <h1> name:{name}</h1>
    </div>
  )
}

export default DefaultProps;