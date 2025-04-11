import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import validator from 'validator'
import generateToken from '../utils/generateToken.js'
import cloudinary from '../storage/cloudinary.js'

// Signup
const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body

  try {
    if(!username || !email || !password || !confirmPassword) {
      return res.status(400).json({error: "All field must be filled"})
    }
    if(!validator.isEmail(email)) {
      return res.status(400).json({error: "Please enter a valid email"})
    }
    if(!validator.isStrongPassword(password)) {
      return res.status(400).json({error: "Password is not strong"})
    }

    // Check username & email
    const usernameExists = await User.findOne({username})

    if(usernameExists) {
      return res.status(400).json({error: "Username already exists"})
    }

    const emailExists = await User.findOne({email})

    if(emailExists) {
      return res.status(400).json({error: "Email already exists"})
    }

    if(password !== confirmPassword) {
      return res.status(400).json({error: "Password does not match"})
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hash,
    })

    if(newUser) {
      generateToken(newUser._id, res)  
      await newUser.save()
      res.status(200).json(newUser)
    }
  } 
  catch (error) {
    console.log('Error in signup controller', error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

// Login
const login = async (req, res) => {
  const { username, password } = req.body

  try {
    if(!username || !password) {
      return res.status(400).json({error: "All field must be filled"})
    }  

    // Find username in DB
    const user = await User.findOne({username})
    if(!user) {
      return res.status(400).json({error: "Username does not exist"})
    }

    // Match the password
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
      return res.status(400).json({error: "Password is incorrect"})
    }

    // Generate token
    generateToken(user._id, res) 
    res.status(200).json(user)
  } 
  catch (error) {
    console.log('Error in login controller', error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

// Logout
const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0})
    res.status(200).json({message: "Logout Successful"})  
  } 
  catch (error) {
    console.log('Error in logout controller', error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

// Update user
const updateUser = async (req, res) => {
  let { profileImg } = req.body
  const userId = req.auth._id

  try {
    let user = await User.findById(userId)

    if(profileImg) {
        if(user.profileImg) {
          await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0])
        }
        const uploadedResponse = await cloudinary.uploader.upload(profileImg)
        profileImg = uploadedResponse.secure_url
      }  

      user.profileImg = profileImg || user.profileImg
      user = await user.save()
    
      res.status(200).json(user)
  } 
  catch (error) {
    console.log('Error in updateUser controller', error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

// Check Auth
const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.auth)  
  } 
  catch (error) {
    console.log('Error in checkAuth controller', error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

export { signup, login, logout, updateUser, checkAuth}