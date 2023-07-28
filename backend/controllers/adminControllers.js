import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'


 const authAdmin=asyncHandler(async(req,res)=>{

  const adminCred={
    email:"admin@gmail.com",
    password:"1234"
  }
  if(adminCred.email===req.body.email){
    if(adminCred.password===req.body.password){
        console.log("/////////////////");
        res.send(200).json({success:true})
    }else{
        res.send({passErr:"Wrong Password"})
        console.log('\\\\\\\\\\\\\\\\\\\\');
    }

  }else{
    res.send({emailErr:"Wrong Mail Id"})
  }

  
 })
 

 const getUser=async(req,res)=>{
    const user=await User.find()
    console.log(user);
    res.status(201).send(user)
 }

 const editUser=asyncHandler(async(req,res)=>{
    console.log("////////");
    const id =req.params.id
    console.log(id);
    const {name,email}=req.body
    const updateUser=await User.findByIdAndUpdate(id,{name,email},{new:true})
   if(!updateUser){
    res.status(404).send("User not found")
   }
   res.status(200).send(updateUser)
 })

 const removeUser=asyncHandler(async(req,res)=>{
    const id=req.params.id
    const user=await User.findByIdAndRemove(id)
    if(!user){
        res.status(404).send("User not found")
    }

    res.status(200).send(" deleted user successfully")
 })
 const searchUser=asyncHandler(async(req,res)=>{
    const name=req.body.name
;
    const users=await User.find({name:{$regex: name, $options: 'i'}})
    res.json(users)
    console.log(users);
 })

 const registerUser=asyncHandler(async(req,res)=>{
   const {name,email,password}=req.body
   const useExits=await User.findOne({email})
   if (useExits) {
     res.status(400)
    throw new Error ('User alredy exits')
    
   }

   const user =await User.create({
    name,
    email,
    password
   })
   if (user) {
 let token=   generateToken( user._id);

    res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
       
        token
    })
    
   }else{
    res.status(400)
    throw new Error ('invalid user data')   

   }
 })
 export{
    authAdmin,
    getUser,
    editUser,
    removeUser,
    searchUser,
    registerUser
 }
