import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    if(!token) {
        return res.status(400).json({error: "Unauthorized! Please provide an authorized token"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) 

    if(!decoded) {
        return res.status(400).json({error: "Invalid token"})
    }

    const user = await User.findById(decoded._id).select("-password")
    req.auth = user
    next()
  } 
  catch (error) {
    console.log("Error in protectedRoute middleware", error.message)
    res.status(500).json({error: "Internal Server Error"})  
  }
}

export default protectedRoute