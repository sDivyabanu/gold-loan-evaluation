import express from "express"
import { createHmac } from 'node:crypto';
import cors from "cors"
import bodyParser from "body-parser";
import createTokenforUser from "../Services/authentication.js";
import model from "../Models/user.js";


const AuthRouter= express.Router()
AuthRouter.use(cors())
AuthRouter.use(bodyParser.json());
AuthRouter.post('/Login', async (req, res) => {
    const { Email, Pass } = req.body;
    try {
        const user = await model.findOne({ Email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        else{

            const role=user.role
            const salt = "23MIs1029";
            const userProvidedHash = createHmac('sha256', salt).update(Pass).digest('hex');
            
            if (user.Pass === userProvidedHash) {
                const token = createTokenforUser(user);
                res.status(200).json({ token, Email,role });
            } else {
                res.status(401).json({ error: "Incorrect password" });
            }
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
AuthRouter.post('/Admin/Login', async (req, res) => {
    const { Email, Pass } = req.body;
    try {
        const user = await model.findOne({ Email });
        console.log(user)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if(user.role!="ADMIN"){
           return res.status(403).json({error:"Not an Admin"})
        }
        const role=user.role
        const salt = "23MIs1029";
        const userProvidedHash = createHmac('sha256', salt).update(Pass).digest('hex');

        if (user.Pass === userProvidedHash) {
            const token = createTokenforUser(user);
            res.status(200).json({ token, Email,role });
        } else {
            res.status(401).json({ error: "Incorrect password" });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

AuthRouter.post('/Register', async (req, res) => {
    const { FullName, PhoneNumber, Pass, Email, Aadhaar } = req.body;
    const salt = "23MIs1029";
    const hashedPassword = createHmac('sha256', salt).update(Pass).digest('hex');

    try {
        await model.create({
            FullName,
            Email,
            salt,
            PhoneNumber,
            Aadhaar,
            Pass: hashedPassword,
        });
        res.status(200).send("Successfully registered");
    } catch (error) {
        console.error("Registration Error:", error.keyPattern);
        res.status(500).json({ message: error,code:error.code,key:error.keyPattern });
    }
});

export default AuthRouter