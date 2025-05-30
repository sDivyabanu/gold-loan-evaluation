import express from "express";
import model from "../Models/Appointments.js";
import GoldModel from "../Models/GoldEvaluation.js";

const Dashrouter = express.Router();

Dashrouter.get('/', async (req, res) => {
    console.log("This is dashboard router");

    try {
        const userEmail = req.headers.email;
        if (!userEmail) {
            return res.status(400).json({ error: "Missing email in request headers" });
        }

        const appointments = await model.find({ user: userEmail });
        const goldEvaluations = await GoldModel.find({ user: userEmail });

        res.status(200).json({
            appointments,
            goldEvaluations
        });

    } catch (error) {
        console.error("Dashboard route error:", error);
        res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
});

export default Dashrouter;
