import React from 'react'
import {Bell, Settings, User, Moon} from "lucide-react"

const Navbar = () => {
  return (
    <nav>
        <div className='nav-info'>
            <h1>Library Dashboard</h1>
            <p>Welcome back! Here's your library overview</p>
        </div>
        <div className='nav-icons'>
            <button><Bell /></button>
            <button><Settings /></button>
            <button><Moon /></button>
            <button><User /></button>
        </div>
    </nav>
  )
}

export default Navbar