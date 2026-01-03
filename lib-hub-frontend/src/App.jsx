import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import Books from "./components/Books"
import Members from "./components/Members"
import BorrowedBooks from "./components/BorrowedBooks"
import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
function App() {
  

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>    
      <Route path="/books" element={<Books/>}/>
      <Route path="/members" element={<Members/>}/>
      <Route path="/borrows" element={<BorrowedBooks/>}/>
    </Routes>
      <Sidebar/>
    </BrowserRouter>
  )
}

export default App
