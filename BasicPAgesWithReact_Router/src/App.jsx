import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import About from './About'
import Navbar from './Navbar'


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      
        
     

      <h1>Basic Pages with React Router!</h1>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
