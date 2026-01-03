import React, {useState, useEffect, useRef} from 'react'
import {Pen, Trash, Star, UsersRound} from "lucide-react"
import AddBorrows from './AddBorrows';
const BorrowedBooks = () => {
    const dialog = useRef()
    const [filter, setFilter] = useState({
            searchQuery: "",
            status: "All Status",
          });
    const [filtered, setFiltered] = React.useState([]);
    const [borrowsBooks, setBorrowsBooks] = React.useState([]);
    const [type, editType] = useState("Add")
    const [editedBorrows, setEditedBorrows] = useState({})
    const date = new Date();
    useEffect(() => {
                const savedBorrowsBooks = async () => {
                  try{
                    const response = await fetch("http://localhost:3000/api/borrows", {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    });
                    if (response.ok) {
                      const data = await response.json();
                      setBorrowsBooks(data);
                    } else {
                      console.error("Failed to fetch books", response);
                    }
                  }catch(err){
                    console.error("Error fetching books:", err);
                  }
                }
                savedBorrowsBooks();
                }, []);

          useEffect(() => {
            let results = [...borrowsBooks];
            if (filter.searchQuery) {
              results = results.filter(result =>
                result.book.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
                result.member.toLowerCase().includes(filter.searchQuery.toLowerCase())
              );
            }         
            if (filter.status !== "All Status") {
              results = results.filter(result => result.status === filter.status);
            }
            setFiltered(results);
          }, [filter, borrowsBooks]);

          const deleteBorrows = async(borrowsId) =>{
            try {
              const response = await fetch(`http://localhost:3000/api/borrows/${borrowsId}`, {
                method:"DELETE"
              })
              if(response.ok){
                console.log("successfully deleting the borrows")
                const borrowsAfterDelete = filtered.filter(borrow => borrow._id != borrowsId)
                setFiltered([...borrowsAfterDelete])
                dialog.current.close()
              }
            } catch (error) {
              console.log("Error in deleting the Borrows", error)
            }
          }
          const returnBorrows = async(borrows)=>{
            try {
              const response = await fetch(`http://localhost:3000/api/borrows/${borrows._id}`, {
                method:"PUT",
                headers:{
                  "Content-type":"application/json",
              },
                body:JSON.stringify({...borrows, returnDate:date, status:"returned"})
              });
              if(response.ok){
                console.log("successfully editing the borrows");
              }else{
                console.log("Failed to fetch the editing borrows", response)
              }
            } catch (error) {
              console.log("Error in editing the borrows", error)
            }
          }

  return (
    <div className='borrows-container'>
        <AddBorrows dialogRef={dialog} closeDialog={() => {dialog.current.close(), editType("Add")}} type={type} editedBorrows={editedBorrows}/>
        <div className='members-header'>
            <div className='members-header-top'>
                <div style={{display:"flex", alignItems:"center", gap:"10px", justifyContent:"center"}}>
                    <UsersRound className='user'/>
                    <div>
                        <h1>Borrow Records</h1>
                        <p>Track book borrowing and returns (5 total)</p>
                    </div>
                </div>
                <button onClick={() => dialog.current.showModal()}>+ New Record</button>
            </div>
            <div className='members-header-bottom'>
                <input type="text" placeholder='Search by book or member...' onChange={(e) => setFilter((prev) => ({...prev, searchQuery:e.target.value}))}/>
                <select name="" id="" onChange={(e) => setFilter((prev) => ({...prev, status:e.target.value}))}>
                    <option value="All Status">All Status</option>
                    <option value="Borrowed">Borrowed</option>
                    <option value="Returned">Returned</option>
                    <option value="Overdue">Overdue</option>
                </select>
            </div>
        </div>
        <table class="table">
          <thead style={{backgroundColor:"#e2e9ed"}}>
            <tr>
              <th scope="col">Book</th>
              <th scope="col">Member</th>
              <th scope="col">Borrow Date</th>
              <th scope="col">Due Date</th>
              <th scope="col">Return Date</th>
              <th scope="col">Status</th>
              <th scope="col">Fine</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((borrowed, index) => (
              <tr key={index}>
                <th scope="row">{borrowed.book}</th>
                <td style={{color:"#225889"}}>{borrowed.member}</td>
                <td style={{color:"#737476"}}>{new Date(borrowed.borrowedDate).toLocaleDateString()}</td>
                <td style={{color:"#737476"}}>{new Date(borrowed.dueDate).toLocaleDateString()}</td>
                <td style={{color:"#737476"}}> {borrowed.returnDate == null ? "-" : new Date(borrowed.returnDate).toLocaleDateString()}</td>
                <td style={{color: borrowed.status == "Borrowed" ? "#3bad51" : borrowed.status == "returned" ?"#3c4148" : "#fce2a3"}}> <span style={{backgroundColor: borrowed.fines == 0 ? "#defce7" : "#f2f4f7", padding:"0.5rem 1.5rem", borderRadius:"20px"}}>{borrowed.status}</span> </td>
                <td style={{color: borrowed.fines == 0 ? "#1f6432" : "#d50404"}}>${borrowed.fine}</td>
                <td style={{display:"flex", gap:"10px"}}>
                  <button style={{backgroundColor:"#19417a", color:"white", padding:"0 0.5rem", borderRadius:"5px", cursor:"pointer"}} onClick={() => returnBorrows(borrowed)}>Return</button>
                  <button className='edit-btn' onClick={() => {editType("Edit"), setEditedBorrows(borrowed), dialog.current.showModal()}}><Pen /></button>
                  <button className='delete-btn' onClick={() => deleteBorrows(borrowed._id)}><Trash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default BorrowedBooks