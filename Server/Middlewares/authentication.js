import { secureHeapUsed } from 'crypto'
import validatetoken from '../Services/authentication.js'
import pkg from 'jsonwebtoken';
const { verify } = pkg;
import dotenv from 'dotenv';
dotenv.config()
const secret=process.env.secret

function checkForAuthAndCookie() {
  return (req, res, next) => {
    const token = req.headers['authorization']; // Use lowercase 'authorization'
    const email = req.headers['email'];
    const pass = req.headers['pass'];

    if (!token) {
      console.log('No token found in headers');
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      const userPayload = verify(token, secret);

      // Optionally check email/pass against token payload
      if (userPayload.email !== email) {
      

        return res.status(403).json({ error: "Email does not match token" });
      }

      req.user = userPayload; 
      
      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      res.status(403).json({ error: "Invalid token" });
    }
  };
}

export default checkForAuthAndCookie;
