import React, { useState } from 'react'
import {Pen, Trash, Star} from "lucide-react"
import AddBook from './AddBook'
import { useEffect } from 'react'
const Books = () => {
  const dialog = React.useRef(null);

  function openDialog() {
    dialog.current.showModal();
  }

  function closeDialog() {
    dialog.current.close();
  }
  const [books, setBooks] = React.useState([]);
  const [filter, setFilter] = React.useState({
    searchQuery: "",
    category: "All Categories",
    sortBy: ""
  });
  const [filtered, setFiltered] = React.useState([]);
  const [buttonClicked, setButtonClicked] = useState("Add")
  const [editedBook, setEditedBook] = useState({})  
    useEffect(() => {
      const savedBooks = async () => {
        try{
          const response = await fetch("http://localhost:3000/api/books", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            setBooks(data);
          } else {
            console.error("Failed to fetch books", response);
          }
        }catch(err){
          console.error("Error fetching books:", err);
        }
      }
        savedBooks();
      }, []);
    
      useEffect(() => {
        let result = [...books];
        if (filter.searchQuery) {
          result = result.filter(book =>
            book.title.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(filter.searchQuery.toLowerCase())
          );
        }
      
        if (filter.category !== "All Categories") {
          result = result.filter(book => book.category === filter.category);
        }
      
        if (filter.sortBy === "Newest Arrivals") {
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
      
        if (filter.sortBy === "A-Z Title") {
          result.sort((a, b) => a.title.localeCompare(b.title));
        }
      
        if (filter.sortBy === "Z-A Title") {
          result.sort((a, b) => b.title.localeCompare(a.title));
        }
        setFiltered(result);
      }, [filter, books]);
      
    const deleteBook = async (bookId) => {
        try{
            console.log("Deleting book with ID:", bookId);
            const response = await fetch(`http://localhost:3000/api/books/${bookId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                console.log("Book deleted successfully");
                setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
            } else {
                console.error("Failed to delete book", response);
            }
        }catch(err){
            console.error("Error deleting book:", err);
        }
    }

    
  return (
    <div className='books'>
        <AddBook dialogRef={dialog} closeDialog={closeDialog} type={buttonClicked} editedBook={editedBook}/>
        <div className='books-header'>
            <div className='books-header-top'>
                <div>
                    <h1>Books Collection</h1>
                    <p>Manage 26 books in your library</p>
                </div>
                <button onClick={openDialog}>+ Add Book</button>
            </div>
            <div className='books-header-bottom'>
                <input type="text" placeholder='Search by title or author...' onChange={(e) => setFilter((prev) => ({...prev, searchQuery:e.target.value}))}/>
                <select name="" id="" onChange={(e) => setFilter((prev) => ({...prev, category:e.target.value}))}>
                    <option value="All Categories">All Categories</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Dystopian">Dystopian</option>
                    <option value="Memoir">Memoir</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Self-Help">Self-Help</option>
                    <option value="Philosiphy">Philosiphy</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Business">Business</option>
                    <option value="Science">Science</option>
                </select>
                <select name="" id="" onChange={(e) => setFilter((prev) => ({...prev, sortBy:e.target.value}))}>
                    <option value="Sort By">Sort By</option>
                    <option value="Newest Arrivals">Newest Arrivals</option>
                    <option value="A-Z Title">A-Z Title</option>
                    <option value="Z-A Title">Z-A Title</option>
                </select>
            </div>
        </div>
        <div className='books-container'>
            {filtered.map((book, index) => (
                <div className='book' key={index}>
                <img src={book.coverImgUrl} alt="" />
                <div className='book-info'>
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <p className='book-info-parag'><span style={{display:"flex", alignItems:"center", gap:"5px"}}><Star style={{color:"red"}}/>{book.rate}</span><span style={{opacity:"0.5"}}>{book.pages} pages</span></p>
                    <hr />
                    <p className='book-info-parag'><span style={{backgroundColor:"#e4eef3", padding:"0.2rem", borderRadius:"5px", color:"#5c8bb1"}}>{book.category}</span><span style={{opacity:"0.5"}}>{book.publishedYear}</span></p>
                    <hr />
                </div>
                <div className='book-stats'>
                    <div className='book-stat1'>
                        <p>Available</p>
                        <p>{book.availableCopies}/{book.totalCopies}</p>
                    </div>
                    <div className='book-stat2'>
                        <p>Status</p>
                        <p>Available</p>
                    </div>
                </div>
                <div className='book-actions'>
                    <button className='edit-btn' onClick={() => {setButtonClicked("Edit"); openDialog(); setEditedBook(book)}}><Pen />Edit</button>
                    <button className='delete-btn' onClick={() => deleteBook(book._id)}><Trash />Delete</button>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Books