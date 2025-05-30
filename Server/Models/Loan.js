import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';
const AutoIncrement = mongooseSequence(mongoose);

const Schema= new mongoose.Schema({
     'LoanID':{
        type:Number
    },
    'Fullname':{
        type:String,
        required:true
    },
    'DateOfBirth':{
        type:Date,
        required:true
    },
    'Gender':{
        type:String,
        required:true
    },
     'Marital':{
        type:String,
        required:true
    },
     'Father':{
        type:String,
        required:true
    },
     'Mobile':{
        type:Number,
        required:true
    },
     'Email':{
        type:String,
        required:true
    },
     'CurrentAdd':{
        type:String,
        required:true
    },
     'PermAdd':{
        type:String,
        required:true
    },
     'City':{
        type:String,
        required:true
    },
     'State':{
        type:String,
        required:true
    },
     'Pincode':{
        type:String,
        required:true
    },
     'Bank':{
        type:String,
        required:true
    },
     'GoldType':{
        type:String,
        required:true
    },
     'Weight':{
        type:String,
        required:true
    },
     'Purity':{
        type:String,
        required:true
    }
})

Schema.plugin(AutoIncrement, {
    inc_field: "LoanID",
    start_seq: 1000,
    increment_by: 1
})

export default mongoose.model('LoanModel',Schema)