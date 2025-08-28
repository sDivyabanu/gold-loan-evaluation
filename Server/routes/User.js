import express from "express"
import model from "../Models/user.js";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import GoldDetails from "../Models/GoldDetails.js";
import fs from "fs";
import { fileURLToPath } from 'url';

import Adminrouter from "./Admin.js";
import router from "./Appointmen.js";
import NotificationRouter from "./Notifications.js";
import Dashrouter from "./Dashboard.js";
import LoanRouter from "./Loan.js";
import AuthRouter from "./Authorization.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UserRouter=express.Router()
UserRouter.use(cors());
UserRouter.use(bodyParser.json());

UserRouter.use('/Book', router);
UserRouter.use('/Dashboard', Dashrouter);
UserRouter.use('/Admin', Adminrouter);
UserRouter.use('/Notifications', NotificationRouter);
UserRouter.use('/Loan',LoanRouter)


// Login Route
UserRouter.get('/',(req,res)=>{
    try{
        res.status(200)
    }
    catch(err){
        res.status(400)

    }
    
})


UserRouter.get('/Appointments', async (req, res) => {
    try {
        const Email=req.headers.Email
        const Appointments = await model.find({Email:Email})
        console.log("Appointments  ")
        res.status(200).json({ message: "Successfully Fetch Data", Data: Appointments })
    }
    catch (err) {
        res.status(401).json({ message: "Error Fetching The Data" })
    }
})

UserRouter.post('/Book', (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({ message: "Book route hit", data: req.body });
    } catch (error) {
        res.status(500).json({ error: "Failed to process request" });
    }
});
// Static file access
UserRouter.use('/uploads', express.static(path.join(__dirname, 'uploads')));
UserRouter.use('/SliderCheck', express.static(path.resolve(__dirname, 'uploads/Images')));

// Gold Evaluation Route
UserRouter.get('/GoldEvaluation', async (req, res) => {
    const username = req.headers.email;

    try {
        const data = await GoldDetails.find({ name: username });

        const userFolder = path.join(__dirname, "uploads", "images", username);
        if (!fs.existsSync(userFolder)) {
            return res.status(404).json({ message: "No folders found for this user" });
        }

        const folders = fs.readdirSync(userFolder);
        let imagePaths = [];

        folders.forEach(folder => {
            const folderPath = path.join(userFolder, folder);
            if (fs.lstatSync(folderPath).isDirectory()) {
                const innerFiles = fs.readdirSync(folderPath);
                let array = innerFiles.map(file =>
                    path.join('uploads', 'images', username, folder, file).replace(/\\/g, "/")
                );
                imagePaths.push(array);
            }
        });

        res.json({ Image: imagePaths, data });
    } catch (error) {
        console.error("Gold Evaluation Error:", error);
        res.status(500).json({ error: "Error retrieving gold evaluation details" });
    }
});

UserRouter.get("/user-pdfs/:username", async (req, res) => {
    const { username } = req.params;
    const userFolder = path.join(__dirname, "..\\uploads\\reports", username);


    // Check if user folder exists
    if (!fs.existsSync(userFolder)) {

        return res.status(404).json({ message: "No PDFs found for this user" });
    }

    // Read files in user folder
    const files = fs.readdirSync(userFolder);
    const pdfLinks = files.map((file) => `/uploads/reports/${username}/${file}`);
    res.json({ pdfs: pdfLinks });
});

export default UserRouter