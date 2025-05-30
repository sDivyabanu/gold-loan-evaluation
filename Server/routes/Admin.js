import express from "express";
import notifimodel from "../Models/Notification.js";
import multer from "multer";
import dotenv from "dotenv";
import path, { dirname } from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import fs from "fs";
import GoldDetails from "../Models/GoldDetails.js";
import model from "../Models/Appointments.js"
import Loan from "../Models/Loan.js";
import transporter from "../Transporter/Transporter.js";
import bodyParser from "body-parser";


dotenv.config();
const Adminrouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


Adminrouter.use(cors());
Adminrouter.use(express.urlencoded({ extended: false }))
Adminrouter.use(bodyParser.json())

Adminrouter.get('/',(req,res)=>{
    try{
        
        return res.status(200).json({message:"Success"})
    }
    catch(err){
        return res.status(400).json({error:"Something happened"})

    }
    
})


Adminrouter.post('/SendNotifications', async (req, res) => {
    const user = req.user;
    const body = req.body;

    try {
        const notification = await notifimodel.create({
            user: user,
            Notification: body
        });

        res.status(201).json({ message: "Notification sent successfully" });
    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).json({ message: "Failed to send notification" });
    }
});

// Fix: fs.ensureDirSync doesn't exist in native fs module, we need to create directory manually
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const username = req.headers.email
        const userFolder = path.join(__dirname, "..", "uploads", "reports", username);

        // Create folder if it doesn't exist
        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder, { recursive: true });
        }

        cb(null, userFolder);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const imagestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const username = req.headers.email
        const type = req.body.typeOfGold
        const userFolder = path.join(__dirname, "..", "uploads", "images", username, type);

        // Create folder if it doesn't exist
        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder, { recursive: true });
        }

        cb(null, userFolder);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });


Adminrouter.get('/upload-pdf',async(req,res)=>{
    try {
        const data = await model.find({},{user:true,_id:false})
        console.log(data)
        res.status(200).json({message:"Successfully fetched",data:data})
    } catch (error) {
        res.status(400).json({error:"An Error occured"})
        
    }
})

Adminrouter.post("/upload-pdf", upload.single("file"), async (req, res) => {
    try {
        const username = req.headers.email;

        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Username is required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        res.status(200).json({
            success: true,
            message: `PDF uploaded successfully for ${username}!`,
            file: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size
            }
        });
    } catch (error) {
        console.error("Error in upload-pdf route:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while uploading file",
            error: error.message
        });
    }
});



const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPG, PNG, and PDF are allowed."), false);
    }
};

// Multer middleware for handling multiple file uploads
const upload1 = multer({ storage: imagestorage, fileFilter: fileFilter });

Adminrouter.post("/GoldEvaluation", upload1.array("files", 5), async (req, res) => {
    try {

        const { username, typeOfGold, weight, marketValue, officerName, evaluationDate, remarks } = req.body;
        const files = req.files;
        if (!typeOfGold || !weight || !marketValue || !officerName || !evaluationDate) {
            return res.status(400).json({ message: "Missing required fields." });
        }



        const Golddata = await GoldDetails.create({
            name: username,
            typeOfGold: typeOfGold,
            weight: weight,
            marketValue: marketValue,
            officerName: officerName,
            evaluationDate: evaluationDate,
            remarks: remarks,
            images: files.map((file) => (file.path))
        })
        res.status(200).json({
            message: "Form submitted successfully",
            data: { typeOfGold, weight, marketValue, officerName, evaluationDate, remarks },
            files: files.map((file) => ({ filename: file.filename, path: file.path })),
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

Adminrouter.get('/Appointments', async (req, res) => {
    try {
        const Appointments = await model.find({})
        res.status(200).json({ message: "Successfully Fetch Data", Data: Appointments })
    }
    catch (err) {
        res.status(500).json({ message: "Error Fetching The Data" })
    }
})
Adminrouter.delete('/Appointments', async (req, res) => {
    const { data } = req.body
    try {
        const r = await model.deleteOne({ _id: data })
        res.status(200).json({ message: "Deleted" })


    }
    catch (err) {
        res.status(401).json({ message: "Error Fetching The Data" })
    }
})
Adminrouter.patch('/Appointments', async (req, res) => {
    const { data } = req.body
    console.log(data)
    try {
        const r = await model.findByIdAndUpdate(data, { Status: "Completed" })
        
        res.status(200).json({ message: "Updated" })

    }
    catch (err) {
        res.status(401).json({ message: "Error in Updating" })
    }
})

Adminrouter.get('/loan', async (req, res) => {
    try {
        const loandata = await Loan.find({}, { LoanID: true, Fullname: true, Mobile: true, Email: true })
        res.status(200).json({ Data: loandata })
    }
    catch (err) {
        res.status(400).json({ message: "Error in fetching" })
    }
})

Adminrouter.get('/loan/:id', async (req, res) => {
    try {
        const id = req.params.id
        const LoanData = await Loan.findById(id)
        const files=fs.readdirSync(path.join(__dirname,`../uploads/Loan/${LoanData.Email}`))
        
        res.status(200).json({ Data: LoanData,files:files })
    } catch (error) {
        console.log(error)
        res.status(400).json({ Error:"An Error occured" })

    }
})
Adminrouter.get('/loan/:id/forward', async (req, res) => {
    try {
        const id = req.params.id
        const LoanData = await Loan.findById(id).lean()
        const folderPath = path.join(__dirname, `../uploads/Loan/${LoanData.Email}`); // Your folder path
        const files = fs.readdirSync(folderPath);
        const attachments = files.map(file => ({
            filename: file,
            path: path.join(folderPath, file),
        }));
        Object.entries(LoanData).map(([key, value]) => {
            console.log(key, value)
        })
        const mailOptions = {
            from: 'niranjanskailas@gmail.com',
            to: 'niranjanskailas@gmail.com',
            subject: 'Loan Application Details',
            html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
      <h2 style="color: #4F46E5; text-align: center;">Loan Application Details</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        ${Object.entries(LoanData).map(([key, value]) => `
          <tr>
            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">${key}</td>
            <td style="padding: 8px; border: 1px solid #ccc;">${value}</td>
          </tr>
        `).join('')}
      </table>
      <p style="margin-top: 20px; font-size: 14px; color: #555;">
        Thank you for applying for a gold loan. We will contact you shortly regarding the next steps.
      </p>
    </div>
  `, attachments: attachments
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending mail:', error);
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({message:"Mail Sent"})
            }
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error"})

    }
})

export default Adminrouter;