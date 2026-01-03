import React from 'react'
import {ChartColumn, BookOpen, UsersRound, IterationCw} from "lucide-react"
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside>
        <div className='sidebar-logo'>
            <img src="https://www.nicepng.com/png/detail/793-7936442_book-logo-png-books-logo-black-png.png" alt="" />
            <div className='logo-text'>
                <h2>LibHub</h2>
                <p>Library Manager</p>
            </div>
        </div>
        <hr />
        <ul className='sidebar-links'>
            <Link style={{textDecoration:"none"}} to="/"><li><button><ChartColumn/>Dashboard</button></li></Link>
            <Link style={{textDecoration:"none"}} to="/books"><li><button><BookOpen />Books</button></li></Link>
            <Link style={{textDecoration:"none"}} to="/members"><li><button><UsersRound />Members</button></li></Link>
            <Link style={{textDecoration:"none"}} to="/borrows"><li><button><IterationCw />Borrow Records</button></li></Link>
        </ul>
    </aside>
  )
}

export default Sidebar