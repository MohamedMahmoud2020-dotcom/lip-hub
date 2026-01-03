import React, {useEffect, useRef, useState} from 'react'
import {Pen, Trash, Star, UsersRound} from "lucide-react"
import AddMember from './AddMember';
const Members = () => {
    const [type, setType] = useState("Add");
    
    const [filter, setFilter] = useState({
        searchQuery: "",
        status: "All Status",
      });
      const [members, setMembers] = useState([])
      const [editedMember, setEditedMember] = useState(null)
      const [filtered, setFiltered] = React.useState([]);
      const dialog = useRef()
     

      // eslint-disable-next-line react-hooks/exhaustive-deps
      const deleteMember = async(memberId) => {
        try{
          const response = await fetch(`http://localhost:3000/api/members/${memberId}`, {
            method:"DELETE"
          })
          if(response.ok){
            console.log("successfully deleting the member");
          }else{
            console.log("Failed to delete the member")
          }
        }catch(err){
          console.error("error in deleting the member;", err)
        }
      };
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


      useEffect(() => {
              let result = [...members];
              if (filter.searchQuery) {
                result = result.filter(member =>
                  member.fullName.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
                  member.email.toLowerCase().includes(filter.searchQuery.toLowerCase())
                );
              }
            
              if (filter.status !== "All Status") {
                result = result.filter(member => member.memberShipStatus === filter.status);
              }
              setFiltered(result);
            }, [filter, members]);

  return (
    <div className='members-container'>
      <AddMember dialogRef={dialog} editedMember={editedMember} type={type}/>
        <div className='members-header'>
            <div className='members-header-top'>
                <div style={{display:"flex", alignItems:"center", gap:"10px", justifyContent:"center"}}>
                    <UsersRound className='user'/>
                    <div>
                        <h1>Members</h1>
                        <p>Manage library members (5 total)</p>
                    </div>
                </div>
                <button onClick={() => dialog.current.showModal()}>+ Add Member</button>
            </div>
            <div className='members-header-bottom'>
                <input type="text" placeholder='Search by email or name...' onChange={(e) => setFilter((prev) => ({...prev, searchQuery:e.target.value}))}/>
                <select name="" id="" onChange={(e) => setFilter((prev) => ({...prev, status:e.target.value}))}>
                    <option value="All Categories">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
        </div>
        <table class="table">
  <thead style={{backgroundColor:"#e2e9ed"}}>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Join Date</th>
      <th scope="col">Books</th>
      <th scope="col">Fines</th>
      <th scope="col">Status</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filtered.map((member, index) => (
      <tr key={index}>
        <th scope="row">{member.fullName}</th>
        <td style={{color:"#225889"}}>{member.email}</td>
        <td style={{color:"#225889"}}>+{member.phone}</td>
        <td style={{color:"#737476"}}>{new Date(member.joinDate).toLocaleDateString()}</td>
        <td style={{color:"#c77851"}}> <span style={{backgroundColor:"#fbf1ed", padding:"0.5rem", borderRadius:"100%"}}>{member.books}</span></td>
        <td style={{color: member.fines == 0 ? "#1f6432" : "#d50404"}}>${member.fines.toFixed(2)}</td>
        <td style={{color: member.memberShipStatus == "active" ? "#3bad51" : "#3c4148"}}> <span style={{backgroundColor: member.fines == 0 ? "#defce7" : "#f2f4f7", padding:"0.5rem 1.5rem", borderRadius:"20px"}}>{member.memberShipStatus}</span> </td>
        <td>
          <button className='edit-btn' onClick={() => {setEditedMember(member); dialog.current.showModal(); setType("Edit")}}><Pen /></button>
          <button className='delete-btn' onClick={() => deleteMember(member._id)}><Trash /></button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  )
}

export default Members