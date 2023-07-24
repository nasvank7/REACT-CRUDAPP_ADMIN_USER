import React from 'react'
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import {toast} from 'react-toastify'
import Loader from '../components/Loader';
import axios from 'axios'
import { ADMIN_URL } from '../../utils/const.js';





const AdminLoginScreen = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const nav=useNavigate()
  const dispatch=useDispatch()

//   const [login,{isLoading}]=useLoginMutation()
  

  const adminHandler=()=>{
    axios.post('/api/admin/adminlog',{email:email,password:password})
    .then((res)=>{
        
        nav('/admindash')
        
    }).catch((err)=>{
        console.log(err,"\\\\");
    })
   
  }

  return (
 <FormContainer>
    <h1>
        Admin LogIn
    </h1>
    <Form action='/adminLogin' method='post'>
      <Form.Group className='my-2' controlId='email'>
        <Form.Label >
             Email Address
        </Form.Label>
        <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}>

        </Form.Control>

      </Form.Group>
      <Form.Group className='my-2' controlId='password'>
        <Form.Label >
            Password
        </Form.Label>
        <Form.Control type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}>

        </Form.Control>

      </Form.Group>
   
      <Button type='button'onClick={adminHandler} variant='primary' className='mt-3'>
        Sign In
      </Button>
     
    </Form>
 </FormContainer>
  )
}

export default AdminLoginScreen