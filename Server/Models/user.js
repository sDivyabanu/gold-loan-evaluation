import mongoose from 'mongoose'
import { createHmac, randomBytes } from 'node:crypto'



const schema=mongoose.Schema({
    FullName:{
        type:String,
        requiured:true,
        unique:true
        
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    PhoneNumber:{
        type:Number,
        required:true,
        unique:true
    },
    Aadhaar:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    Pass:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    }
},{timestamps:true})

const model=mongoose.model('user',schema)
export default model