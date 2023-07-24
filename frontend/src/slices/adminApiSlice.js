import { apiSlice } from "./apiSlice";


const ADMIN_URL='/api/users'


export const adminApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/auth`,
                method:'POST',
                body:data
            })
        }),
       
    })
})



export const {useLoginMutation}=adminApiSlice