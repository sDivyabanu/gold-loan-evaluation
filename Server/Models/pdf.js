import express from "express"
import mongoose from "mongoose"

const Schema= new mongoose.Schema({
    "user":{
        type:String,
        required:true
    },
    "filepath":{
        type:String,
        required:true
    }
})

const pdfmodel= mongoose.model('Images',Schema)
export default pdfmodel