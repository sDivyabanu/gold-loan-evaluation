import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./routes/Authorization.js";
import path from "path";
import isAdmin from "./Middlewares/adminauth.js";
import { fileURLToPath } from "url";
import Adminrouter from "./routes/Admin.js";
import checkforAuthandCookie from "./Middlewares/authentication.js";
import UserRouter from "./routes/User.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database is connected"))
    .catch(err => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    });

app.use('/User',checkforAuthandCookie(),UserRouter);
app.use('/Admin',isAdmin(),Adminrouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/User',UserRouter)
app.use('/Admin',Adminrouter)
app.use('/Auth',AuthRouter)
// Root Route
app.get('/', (req, res) => {
    res.status(200).send("Server is running");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


//Test@gmail.com
//Test@123