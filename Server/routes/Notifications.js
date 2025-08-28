import express from "express";
import notifimodel from "../Models/Notification.js";

const NotificationRouter = express.Router();

NotificationRouter.get('/', async (req, res) => {
    const userEmail = req.headers.email;
    

    if (!userEmail) {
        return res.status(400).json({ error: "Missing email in request headers" });
    }

    try {
        const data = await notifimodel.find({ user: userEmail });

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No notifications found" });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Notification route error:", error);
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
});

export default NotificationRouter;
