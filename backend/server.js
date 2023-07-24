import express from 'express'; 
import dotenv  from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
const  port=process.env.PORT || 5000;

import userRoutes from '../backend/routes/userRoutes.js'
import adminRoutes from '../backend/routes/adminRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors'

connectDB();


const app=express()
 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 app.use(cookieParser())
 app.use(cors())
app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)
app.get('/',(req,res)=>res.send('Server is ready'))
app.use(notFound)
app.use(errorHandler)
app.listen(port,()=>console.log(`Server started on port ${port} `))