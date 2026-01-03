import React, { useEffect, useState } from 'react'

const AddMember = ({dialogRef, editedMember, type}) => {
  const [member, setMember] = useState({
    fullName:"",
    email:"",
    phone:"",
    joinDate:null,
    fines:0,
    books:0,
    memberShipStatus:"inactive"
  });

  useEffect(() => {
    if(editedMember){
        setMember({fullName:editedMember.fullName,
            email:editedMember.email,
            phone:editedMember.phone,
            joinDate:editedMember.phone,
            fines:editedMember.fines,
            books:editedMember.books,
            memberShipStatus:editedMember.memberShipStatus
        })
      }
    
  }, [type, editedMember])
  const addMember = async() => {
          try{
              const response = await fetch("http://localhost:3000/api/members", {
                  method:"POST",
                  headers:{
                    "Content-type":"application/json",
                },
                  body:JSON.stringify(member)
              })
              if(response.ok){
                  console.log("Members Added successfully")
                  dialogRef.current.close()
              }
          }catch(err){
              console.error("failedd to add the member", err)
          }
        }

  const editMember = async (memberId) => {
          try{
              const respose = await fetch(`http://localhost:3000/api/members/${memberId}`, {
                  method:"PUT",
                  headers:{
                      "Content-type":"application/json",
                  },
                  body: JSON.stringify(member),
              })
              if(respose.ok){
                  console.log("Book Edited successfully")
                  dialogRef.current.close()
              }else{
                  console.log("Failed to edit the book", respose)
              }
          }catch(err){
              console.error("Error Editing the book: ", err)
          }
      }
  return (
    <dialog ref={dialogRef}>
        <div className="dialog-header">
          <h2>Add New Member</h2>
          <button className="close-button" onClick={() => dialogRef.current.close()}>X</button>    
        </div>
        <hr />
        <form method="dialog">
            <label style={{display:"block"}}>Full Name *</label>
            <input type="text" placeholder='Member full name' required className='special-input' value={member.fullName} onChange={(e) => setMember((prev) => ({...prev, fullName:e.target.value}))}/>
            <div className="form-grid">
                <div className="form-group">
                    <label>
                    Email *
                    </label>
                    <input  type="text" name="email" equired placeholder="member@example.com" value={member.email} onChange={(e) => setMember((prev) => ({...prev, email:e.target.value}))}/>
                </div>
                <div className="form-group">
                    <label>
                    Phone *
                    </label>
                    <input  type="tel" name="phone" equired placeholder="+1-555-0000" value={member.phone} onChange={(e) => setMember((prev) => ({...prev, phone:e.target.value}))}/>
                </div>
                <div className="form-group">
                    <label>
                    Join Date  *
                    </label>
                    <input  type="date" name="join-date" equired value={member.joinDate} onChange={(e) => setMember((prev) => ({...prev, joinDate:e.target.value}))}/>
                </div>
                <div className="form-group">
                    <label>
                    Membership Status
                    </label>
                    <select name="" id="" value={member.memberShipStatus} onChange={(e) => setMember((prev) => ({...prev, memberShipStatus:e.target.value}))}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                </div>
                {editedMember &&
                    <div className="form-group">
                    <label>
                    Books Borrowed  
                    </label>
                    <input  type="number" name="books" equired value={member.books} onChange={(e) => setMember((prev) => ({...prev, books:e.target.value}))}/>
                </div>}
                {editedMember &&
                  <div className="form-group">
                  <label>
                  Total fines ($)
                  </label>
                  <input  type="number" name="fines" equired value={member.fines} onChange={(e) => setMember((prev) => ({...prev, fines:e.target.value}))}/>
              </div> 
                }
            </div>
        </form>
        <div className="dialog-actions" style={{padding:"1rem"}}>
          <button className="cancel-button" onClick={() => dialogRef.current.close()}>Cancel</button>
          <button type="submit" className="add-button" onClick={type == "Edit" ? () => editMember(editedMember._id) : () => addMember(member)}>{type} Memebr</button>
        </div>
    </dialog>
  )
}

export default AddMember