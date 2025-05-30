import pkg from "jsonwebtoken";
const { verify, sign } = pkg;
import dotenv from"dotenv"
dotenv.config()
const secret = process.env.secret

/**
 * Creates a signed JWT for a user.
 */
function createTokenforUser(user) {
  try {
    const payload = {
      _id: user._id,
      email: user.Email,
      role: user.role,
    };
    const token = sign(payload, secret, { expiresIn: '1h' });
    return token;
  } catch (err) {
    console.error("Error creating token:", err);
    return null; 
  }
}


function validatetoken(token) {
  try {
    const payload = verify(token, secret);
    return payload;
  } catch (err) {
    console.error("Invalid or expired token:", err.message);
    return null;
  }
}

export default createTokenforUser;
export { validatetoken };
