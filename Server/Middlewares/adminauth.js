// middleware/isAdmin.js
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()
const secret = process.env.secret

function isAdmin() {
    return (req, res, next) => {
        
        const token = req.headers['authorization'];
        
        
        if (!token) {
            console.log("np")
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }
        
        try {
            const decoded = jwt.verify(token, secret);
            
            if (decoded.role !== 'ADMIN') {
                return res.status(403).json({ error: 'Access denied. Admins only.' });
            }
            
            req.user = decoded; // Attach user info to request
            next();
        } catch (err) {
           return res.status(400).json({ error: 'Invalid or expired token.' });
        }
    }
}

export default isAdmin;
