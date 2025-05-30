import mongoose from "mongoose";
const Schema= new mongoose.Schema({
    "user":{
        required:true,
        type:String
    },
    "Notification":{
        required:true,
        type:String
    }
})

const notifimodel =mongoose.model("Notification",Schema)

export default  notifimodel