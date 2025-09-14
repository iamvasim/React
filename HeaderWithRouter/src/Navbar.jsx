
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      gap: '15px',
      padding: '10px',
      background: '#f0f0f0'
      ,
      borderBottom: '1px solid #ccc',
      justifyContent:'flex-end',
      backgroundColor:'yellowgreen'
      
    }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/login">Login</Link>
    </nav>
  )
}

export default Navbar