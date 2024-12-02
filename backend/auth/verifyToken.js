import jwt from 'jsonwebtoken';
import Doctor from '../models/DoctorSchema.js';
import User from '../models/UserSchema.js';

export const authenticate = (req, res, next) => {
  // Get token from headers
  const authToken = req.headers.authorization;

  // Check if token exists
  if (!authToken || !authToken.startsWith('Bearer')) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const token = authToken.split(" ")[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    req.userId = decoded.id;
    req.role = decoded.role;
    next();  // Call the next function
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  try {
    // Find user in either User or Doctor collection
    const user = await User.findById(userId) || await Doctor.findById(userId);

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    // Check if user's role is included in the allowed roles
    if (!roles.includes(user.role)) {
      return res.status(403).json({ success: false, message: "You're not authorized" });
    }

    next();  // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
