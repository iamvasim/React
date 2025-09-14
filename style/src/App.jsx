import { useState } from 'react'
import InlineStyle from './InlineStyle'
import StyledComponent from './StyledComponent'
import styled from 'styled-components'


function App() {
  const Heading= styled.h1`
  color:yellow;
  border:2px solid black;

  background-color:green;
  padding: 10px;
  border-radius:10px;
  `
  const StyleBtn =styled.button({
    backgroundColor:"blue",
    color:"white",
    padding:"10px",
    borderRadius:"10px",
    border:"2 px solid black",
    cursor:"pointer"

  })

  return (
    <div>
      {/* <InlineStyle/> */}
      < StyledComponent/>
      <Heading>This is the styled component</Heading>
      <Heading> hello heading 2</Heading>
      <Heading> hello heading 3</Heading>
      <Heading> hello heading 4</Heading>
      <Heading> hello heading 5</Heading>
      <StyleBtn>click me</StyleBtn>
    </div>
    
  )
}

export default App
