import React from 'react'
import {useContext}from 'react'
import Student from './Student'
import { SubjectContext } from './ContextData'

const Subject = () => {
    const subject=useContext(SubjectContext)
  return (
    <div style={{backgroundColor:'orange',padding:10}}>
        <h1>Subject component</h1>
        <h1>subject is : {subject}</h1>
    </div>
  )
}

export default Subject