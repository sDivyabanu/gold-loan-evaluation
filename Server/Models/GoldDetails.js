import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    'name':{
        type:String,
        required:true
    },
    'typeOfGold': {
        type:String,
        required:true
    },
    'weight': {
        type:String,
        required:true
    },
   'marketValue': {
        type:String,
        required:true
    },
    'officerName': {
        type:String,
        required:true
    },
    'evaluationDate': {
        type:String,
        required:true
    },
    'remarks': {
        type:String
    },
    "images":{
        type:[String],

    }
},{timestamps:true})

const GoldDetails= mongoose.model('GoldDetails',Schema)
export default GoldDetails