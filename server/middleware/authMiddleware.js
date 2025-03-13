// Enhanced authMiddleware with detailed logging
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  console.log("Auth middleware called");
  
  // Check if Authorization header exists
  const authHeader = req.header("Authorization");
  console.log("Authorization header:", authHeader ? `${authHeader.substring(0, 15)}...` : "missing");
  
  if (!authHeader) {
    console.log("No Authorization header found");
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  
  // Extract token from Bearer format
  let token;
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
    console.log("Token format: Bearer token");
  } else {
    token = authHeader;
    console.log("Token format: Raw token (no Bearer prefix)");
  }
  
  console.log("Token length:", token.length);
  console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
  
  try {
    console.log("Attempting to verify token...");
    
    // Log token structure without sensitive data
    try {
      const decoded = jwt.decode(token);
      console.log("Token payload structure:", Object.keys(decoded));
      console.log("Token issued at:", new Date(decoded.iat * 1000).toISOString());
      if (decoded.exp) {
        console.log("Token expires at:", new Date(decoded.exp * 1000).toISOString());
        console.log("Token expired:", Date.now() > decoded.exp * 1000);
      }
    } catch (decodeError) {
      console.log("Failed to decode token structure:", decodeError.message);
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token successfully verified");
    console.log("User ID from token:", decoded.id);
    
    req.user = decoded;
    next();
  } catch (error) {
    console.log(" Token verification failed:", error.name, error.message);
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

export default authMiddleware;