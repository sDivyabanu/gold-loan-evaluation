import express from "express"
import mongoose from "mongoose"

const Schema=new mongoose.Schema({
    "user":{
        type:String
    },
    "Id":{
        type:String,

    },
    "Status":{type:String}
})


const GoldModel = mongoose.model('Gold Evalution',Schema)
export default GoldModel;