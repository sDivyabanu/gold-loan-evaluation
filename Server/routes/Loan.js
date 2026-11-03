import express from "express"
import Loan from "../Models/Loan.js"
import multer from "multer"
import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url';
import cors from "cors"

const LoanRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
LoanRouter.use(cors())
LoanRouter.use(express.urlencoded({extended:false}))

// Uploads go into a folder named after the authenticated user's email from the token,
// never a path taken from the request body
const safeSegment = (value) => String(value || "").replace(/[^a-zA-Z0-9@._-]/g, "_").replace(/^\.+/, "_")
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"]

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        const email = safeSegment(req.user?.email)
        if (!email) return cb(new Error("Unauthenticated upload"))
        const userFolder = path.join(__dirname, "..", "uploads", "Loan", email);
        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder, { recursive: true });
        }
        return cb(null, userFolder)
    },
    filename: function (req, file, cb) {
                cb(null, `${Date.now()}-${safeSegment(path.basename(file.originalname))}`);
    }
})
 const upload=multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024, files: 20 },
    fileFilter: (req, file, cb) => ALLOWED_TYPES.includes(file.mimetype) ? cb(null, true) : cb(new Error("Unsupported file type"))
 })

LoanRouter.post('/LoanApplication',upload.any(),async (req, res) => {
    try{
        const {fullName,dob,gender,marital,father,mobile,email,currentAddress,permanentAddress,city,state,pincode,selectedBank,goldType,goldPurity,goldWeight}=req.body
        console.log(req.body.fullName)
        await Loan.create({
            Fullname:fullName,
            DateOfBirth:dob,
            Gender:gender,
            Marital:marital,
            Father:father,
            Mobile:mobile,
            Email:email,
            CurrentAdd:currentAddress,
            PermAdd:permanentAddress,
            City:city,
            State:state,
            Pincode:pincode,
            Bank:selectedBank,
            GoldType:goldType,
            Weight:goldWeight,
            Purity:goldPurity
        })
        res.status(200).json("Successfull")
    }
    catch(error){
        console.log(error)
        res.status(400).json("Error")
    }
    
})

export default LoanRouter