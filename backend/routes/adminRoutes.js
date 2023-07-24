import express from  'express'
import { protect } from '../middleware/authMiddleware.js'
import {authAdmin,getUser,editUser ,removeUser,searchUser } from '../controllers/adminControllers.js'
const router=express.Router()

router.post('/adminlog',authAdmin)
router.get('/userdetails',getUser)
router.put('/update/:id',editUser)
router.delete('/delete/:id',removeUser)
router.get('/search',searchUser)


export  default router