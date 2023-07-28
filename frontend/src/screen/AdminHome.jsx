import React, { useState, useEffect } from "react";
import {Table,FormControl} from "react-bootstrap";
import axios from "axios";
import {toast} from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormContainer from "../components/FormContainer";
import {Form} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
function AdminHome() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [email,setEmail]=useState('')
  const [name,setName]=useState('')
  const [id,setId]=useState('')
  const [searchUser,setSearchTerm]=useState('')
  const [showDelete, setShowDelete] = useState({});
  const handleClose = () => setShow(false);
  const nav=useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    console.log('sdjfjh');
    axios.put(`/api/admin/update/${id}`,{name:name,email:email}).then((res)=>{
      setId("")
      setName("");
      setEmail("")
     handleClose()
     setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user._id === id) {
          return {
            ...user,
            name: name,
            email: email,
          };
        }
        return user;
      });
    })
    toast.success("Updated")
    }).catch((err)=>{
      toast.error("Not updated")
    })
  }

  
   
 
  useEffect(() => {
    axios.get("/api/admin/userdetails/").then((res) => {
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
const editUser=async(id,name,email)=>{
  setId(id)
  setName(name);
  setEmail(email)
  setShow(true)
}




  return (
    <>
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
                <a class="btn btn-primary" onClick={()=>editUser(user._id,user.name,user.email)}>Edit</a>

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
    <a className="btn btn-warning" onClick={()=>nav('AdminAddUser')}>add user</a>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="d-flex justify-content-center align-items-center">
        
   
   <Form onSubmit={submitHandler}>
   <Form.Group className='my-2' controlId='email'>
       <Form.Label >
            Name
       </Form.Label>
       <Form.Control type='name' placeholder='Enter Email' value={name} onChange={(e)=>setName(e.target.value)}>

       </Form.Control>

     </Form.Group>
     <Form.Group className='my-2' controlId='email'>
       <Form.Label >
            Email Address
       </Form.Label>
       <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}>

       </Form.Control>

     </Form.Group>
   
 
     <Button type='submit' variant='primary' className='mt-3'>
       Edit User
     </Button>
    
   </Form>

        </div>

        </Modal.Body>

      
      </Modal>

  
  </>
  );
}

export default AdminHome;
