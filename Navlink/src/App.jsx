import React from 'react'
import Navbar from './Navbar'
import Home from './Home'
import About from './About'
import Login from './Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      {/* ✅ BrowserRouter wraps everything including Navbar */}
      <BrowserRouter>
        <Navbar />

        <h2>Nav link page -----</h2>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h2>Page not found!</h2>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
