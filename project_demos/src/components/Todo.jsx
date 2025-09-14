import React, { useState } from 'react'  

const Todo = () => {
  const [todos, setTodos] = useState([])  
  const [input, setInput] = useState("") 

  const handleSubmit = () => {
    if (input.trim() === "") return; 

    setTodos((prevTodos) => {
      return prevTodos.concat({
        text: input,
        id: Math.floor(Math.random() * 10000), 
      })
    })

    setInput("") 
  }

  
  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id))
  }

  return (
    <div className="container">
      <input
        type="text" 
        placeholder="New Todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>

      <ul>
        {todos.map(({ text, id }) => (
         
         
          <li className="todo" key={id}>
            <span>{text}</span> 
            <button className="close" onClick={() => removeTodo(id)}>
            ⛌
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo
