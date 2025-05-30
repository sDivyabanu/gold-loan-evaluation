
import express from "express"
import model from "../Models/Appointments.js"
import transporter from "../Transporter/Transporter.js"

const router = express.Router()

router.post('/', async (req, res) => {
    const { Time, Type, Weight, User, Date } = req.body
    
    const data=await model.find({user:User})
    console.log(data.length)
    if(data.length==0){

        try {
            (async () => {
            const info = await transporter.sendMail({
                from: `"Gold Agency" <niranjanskailas@gmail.com>`,
                to: `${User}`,
                subject: "Appointment",
                text: "Appointment Booking", // plain‑text body
                html: `<b>You Appointment for Gold Checking has been fixed at ${Time}</b>`, // HTML body
            });
            
            console.log("Message sent:", info.messageId);
        })();

        const data = await model.create({
            user: User,
            AppointmentDate: Date,
            Time: Time,
            Type: Type,
            Weight: Weight
        })
        console.log("Successfully added")
        res.status(200).json({ status: "200", message: "Successfully Booked Appointment" });
        
    }
    catch (err) {
        console.log(err)
        res.status(401).send("An Error Occured")
        
    }
}
else{
    res.status(401).json({message:"You already have an appointment"})
}
})



export default router