import React, { useEffect } from "react";

export default function AddBook({dialogRef, closeDialog, type, editedBook}) {
  const [formData, setFormData] = React.useState({
    title: "",
    author:"",
    isbn:"",
    category:"",
    totalCopies:1,
    availableCopies:1,
    publishedYear:2025,
    pages:300,
    rating:4.5,
    coverImgUrl:"",
    description:""
  });
  useEffect(() => {
    if (type === "Edit" && editedBook) {
      setFormData({
        title: editedBook.title || "",
        author: editedBook.author || "",
        isbn: editedBook.isbn || "",
        category: editedBook.category || "",
        totalCopies: editedBook.totalCopies || 1,
        availableCopies: editedBook.availableCopies || 1,
        publishedYear: editedBook.publishedYear || 2025,
        pages: editedBook.pages || 300,
        rating: editedBook.rating || 4.5,
        coverImgUrl: editedBook.coverImgUrl || "",
        description: editedBook.description || "",
      });
    }
  }, [type, editedBook]);
  const handleAddBook = async (bookData) => {
    try {
      console.log("Sending request to backend...");
      const response = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
      if (response.ok) {
        console.log("Book added successfully");
        closeDialog();
      } else {
        console.error("Failed to add book", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const editBook = async (bookId) => {
          try{
              const respose = await fetch(`http://localhost:3000/api/books/${bookId}`, {
                  method:"PUT",
                  headers:{
                      "Content-type":"application/json",
                  },
                  body: JSON.stringify(formData),
              })
              if(respose.ok){
                  console.log("Book Edited successfully")
                  closeDialog()
              }else{
                  console.log("Failed to edit the book", respose)
              }
          }catch(err){
              console.error("Error Editing the book: ", err)
          }
      }
  return (
    <>
      <dialog ref={dialogRef}>
        <div className="dialog-header">
          <h2>Add New Book</h2>
          <button className="close-button" onClick={closeDialog}>X</button>
        </div>
        <hr />
      <form method="dialog" className="add-book-form">
        <div className="form-grid">
        <div className="form-group">
        <label>
          Title *
        </label>
        <input onChange={(e) => setFormData((prev) => ({...prev, title:e.target.value}))} type="text" name="title" value={formData.title}  required placeholder="Book title"/>
        </div>
        <div className="form-group">
        <label>
          Author *
        </label>
        <input onChange={(e) => setFormData((prev) => ({...prev, author:e.target.value}))} type="text" name="title" value={formData.author} required placeholder="Author name"/>
        </div>
        <div className="form-group">
        <label>
          ISBN *
        </label>
        <input onChange={(e) => setFormData((prev) => ({...prev, isbn:e.target.value}))} type="text" name="title" value={formData.isbn} required placeholder="ISBN number"/>
        </div>
        <div className="form-group">
        <label>
          Category 
        </label>
        <input onChange={(e) => setFormData((prev) => ({...prev, category:e.target.value}))} type="text" name="title" value={formData.category} placeholder="Fiction"/>
        </div>
        <div className="form-group">
        <label>
          Total Copies *
        </label>
        <input onChange={(e) => setFormData((prev) => ({...prev, totalCopies:e.target.value}))} type="text" name="title" required value={formData.totalCopies}/>
        </div>
        <div className="form-group">
        <label>
          Available Copies 
        </label>
        <input onChange={(e) => setFormData((prev) => ({...prev, availableCopies:e.target.value}))} type="text" name="title"  value={formData.availableCopies}/>
        </div>
        <div className="form-group">
        <label>
          published Year 
        </label>
        <input onChange={(e) => setFormData((prev) => ({...prev, publishedYear:e.target.value}))} type="text" name="title"  value={formData.publishedYear}/>
        </div>
        <div className="form-group">
        <label>
          Pages *
        </label>
        <input onChange={(e) => setFormData((prev) => ({...prev, pages:e.target.value}))} type="text" name="title" required value={formData.pages}/>
        </div>
        <div className="form-group">
        <label>
          Rating(0-5) *
        </label>
        <input onChange={(e) => setFormData((prev) => ({...prev, rating:e.target.value}))} type="text" name="title" required value={formData.rating}/>
        </div>
        <div className="form-group">
        <label>
          Cover Image URL 
        </label>
        <input onChange={(e) => setFormData((prev) => ({...prev, coverImgUrl:e.target.value}))} type="text" name="title" placeholder="https://www.example.com/cover.jpg" value={formData.coverImgUrl}/>
        </div>
        </div>
        
        <div className="form-group">
        <label>
          Description 
        </label>
        <textarea onChange={(e) => setFormData((prev) => ({...prev, description:e.target.value}))} name="" id="" value={formData.description}></textarea>
        </div>
        </form>
        <div className="dialog-actions">
          <button className="cancel-button" onClick={closeDialog}>Cancel</button>
          <button type="submit" className="add-button" onClick={type == "Edit" ? () => editBook(editedBook._id) : () => handleAddBook(formData)}>{type} Book</button>
        </div>
      </dialog>
    </>
  );
}
