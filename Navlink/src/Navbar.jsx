import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav
      style={{
        display: 'flex',
        gap: '20px',
        padding: '12px 20px',
        backgroundColor: '#f9f9f9',
        borderBottom: '2px solid #ddd',
        justifyContent: 'center',
        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <NavLink
        to="/"
        style={({ isActive }) => ({
          padding: '6px 12px',
          borderRadius: '8px',
          fontWeight: 'bold',
          textDecoration: 'none',
          color: isActive ? '#fff' : '#333',
          backgroundColor: isActive ? '#4CAF50' : 'transparent',
          boxShadow: isActive ? '0px 2px 5px rgba(0,0,0,0.2)' : 'none',
          transition: '0.3s',
        })}
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        style={({ isActive }) => ({
          padding: '6px 12px',
          borderRadius: '8px',
          fontWeight: 'bold',
          textDecoration: 'none',
          color: isActive ? '#fff' : '#333',
          backgroundColor: isActive ? '#FF9800' : 'transparent',
          boxShadow: isActive ? '0px 2px 5px rgba(0,0,0,0.2)' : 'none',
          transition: '0.3s',
        })}
      >
        About
      </NavLink>

      <NavLink
        to="/login"
        style={({ isActive }) => ({
          padding: '6px 12px',
          borderRadius: '8px',
          fontWeight: 'bold',
          textDecoration: 'none',
          color: isActive ? '#fff' : '#333',
          backgroundColor: isActive ? '#2196F3' : 'transparent',
          boxShadow: isActive ? '0px 2px 5px rgba(0,0,0,0.2)' : 'none',
          transition: '0.3s',
        })}
      >
        Login
      </NavLink>
    </nav>
  )
}

export default Navbar
