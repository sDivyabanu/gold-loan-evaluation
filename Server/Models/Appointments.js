import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';
const AutoIncrement = mongooseSequence(mongoose);
const Schema = new mongoose.Schema({
    "AppointmentId": { type: Number }
    ,
    "user": {
        type: String,
        required: true,
    },
    "AppointmentDate": {
        type: String,
        required: true
    },
    "Time": {
        type: String,
        required: true
    },
    "Type": {
        type: String,
        required: true
    },
    "Weight": {
        type: String,
        required: true
    },
    "Status":{
        type:String,
        enum:["Pending","Completed"],
        default:"Pending"
    }
})
Schema.plugin(AutoIncrement, {
    inc_field: "AppointmentId",
    start_seq: 1000,
    increment_by: 1
})

export default mongoose.model('Appointment', Schema)

