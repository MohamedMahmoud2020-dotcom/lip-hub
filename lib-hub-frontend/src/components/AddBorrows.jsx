import React, { useState, useEffect } from 'react'

const AddBorrows = ({closeDialog, dialogRef, type, editedBorrows}) => {
    const [formData, setFormData] = React.useState({
        book: "",
        member:"",
        borrowedDate:null,
        dueDate:null,
        returnDate:null,
        status:"Borrowed",
        fine:0,
      });
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
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
              const savedMembers = async() => {
                try{
                    const response = await fetch("http://localhost:3000/api/members", {
                        method:"GET",
                    })
                    if(response.ok){
                        console.log("Members Got successfully")
                        const data = await response.json()
                        setMembers(data)
            
                    }else{
                        console.error("Failed to fetch Members", response);
                    }
                }catch(err){
                    console.error("Error fetching Members:", err);
                }
              }
              savedMembers()
            }, [])

            const addRecord = async () => {
                try {
                    const response = await fetch("http://localhost:3000/api/borrows",
                        {method:"POST",
                            headers: {
                                "Content-Type": "application/json",
                              },                        
                            body:JSON.stringify(formData),
                        }
                    )
                    if(response.ok){
                        console.log("Successfully adding a book record");
                        closeDialog()
                    }
                } catch (error) {
                    console.error("Failed to add a record", error)
                }
            }

            const editBorrows = async(borrowsId)=>{
              try {
                const response = await fetch(`http://localhost:3000/api/borrows/${borrowsId}`, {
                  method:"PUT",
                  headers:{
                    "Content-type":"application/json",
                },
                  body:JSON.stringify(formData)
                });
                if(response.ok){
                  console.log("successfully editing the borrows");
                  closeDialog()
                }else{
                  console.log("Failed to fetch the editing borrows", response)
                }
              } catch (error) {
                console.log("Error in editing the borrows", error)
              }
            }

            useEffect(() =>{
              if(editBorrows){
                setFormData({
                  book:editedBorrows.book,
                  member:editedBorrows.member,
                  borrowedDate:editedBorrows.borrowedDate,
                  dueDate:editedBorrows.dueDate,
                  returnDate:null,
                  status:"Borrowed",
                  fine:0,
                })
              }
            }, [type])
      
  return (
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
          Book *
        </label>
        <select name="" id="" required onChange={(e) => setFormData((prev) => ({...prev, book:e.target.value}))}>
            <option value=""></option>
            {books.map((book, index) => (
                <option selected={formData.book == book.title} value={book.title} key={index}>{book.title}</option>
            ))}
        </select>
        </div>
        <div className="form-group">
        <label>
          Member *
        </label>
        <select name="" id="" required onChange={(e) => setFormData((prev) => ({...prev, member:e.target.value}))}>
            <option value=""></option>
            {members.map((member, index) => (
                <option selected={formData.member == member.fullName} value={member.fullName} key={index}>{member.fullName}</option>
            ))}
        </select>
        </div>
        <div className="form-group">
        <label>
          Borrow Date *
        </label>
        <input onChange={(e) => setFormData((prev) => ({...prev, borrowedDate:e.target.value}))} type="date" name="borrowedDate" value={formData.borrowedDate} required/>
        </div>
        <div className="form-group">
        <label>
          Due Date 
        </label>
        <input onChange={(e) => setFormData((prev) => ({...prev, dueDate:e.target.value}))} type="date" name="dueDate" value={formData.dueDate}/>
        </div>
        </div>
        </form>
        <div className="dialog-actions">
          <button className="cancel-button" onClick={closeDialog}>Cancel</button>
          <button type="submit" className="add-button" onClick={type == "Add" ? addRecord: () => editBorrows(editedBorrows._id)}>{type == "Edit" ? "Edit" : "Create"} Record</button>
        </div>
    </dialog>
  )
}

export default AddBorrows