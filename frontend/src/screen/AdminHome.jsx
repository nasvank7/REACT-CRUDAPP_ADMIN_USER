import React, { useState, useEffect } from "react";
import {Table,FormControl} from "react-bootstrap";
import axios from "axios";
import {toast} from 'react-toastify'
function AdminHome() {
  const [users, setUsers] = useState([]);
  const [searchUser,setSearchTerm]=useState('')
  const [showDelete, setShowDelete] = useState({});
 
  useEffect(() => {
    axios.get("/api/admin/userdetails").then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);
 const filteredUser=users.filter((user)=>user.name.toLowerCase().includes(searchUser.toLowerCase()))
  const handleDelete = async(id) => {
    console.log(id);
    const confirmDelete=window.confirm(`Are you sure you want to delete`)
    if(confirmDelete){

   await   axios.delete(`/api/admin/delete/${id}`)
   setUsers((undeletedUser)=>undeletedUser.filter((user)=>user._id!==id))
   toast.success("User deleted successfully")
    }else{
      toast.error("user Not deleted")
    }
       
        
}


  return (
   
    <div>
         <div>
         <FormControl
          type="text"
          placeholder="Search by Username"
          value={searchUser}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

    </div>
 <Table striped bordered hover>
      <thead>
        <tr>
          <th>SI NO</th>

          <th>User Id</th>
          <th>Username</th>
          <th>Email</th>

          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredUser.map((user, i) => (
          <tr>
            <td>{i + 1}</td>

            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <div class="d-flex gap-5">
                <a class="btn btn-primary">Edit</a>

                <a
                  class="delBtn btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
   
  );
}

export default AdminHome;
