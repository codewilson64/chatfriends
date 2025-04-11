import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import { v2 as cloudinary } from 'cloudinary'
import { getReceiverSocketId, io } from "../utils/socket.js"

// Get Sidebar Users
const getSidebarUsers = async (req, res) => {
  const myId = req.auth._id

  try {
    const users = await User.find({_id: {$ne: myId}}).select("-password")

    if(!users) {
      return res.status(400).json({error: "Users not found"})
    }

    res.status(200).json(users)
  } 
  catch (error) {
    console.log("Error in getSidebarUsers controller", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

// Get Messages
const getMessages = async (req, res) => {
  const { id: userToChatId } = req.params
  const myId = req.auth._id

  try {
    const messages = await Message.find({
      $or: [
        {senderId: myId, receiverId: userToChatId},
        {senderId: userToChatId, receiverId: myId}
      ]
    }) 
    res.status(200).json(messages)
  } 
  catch (error) {
    console.log("Error in getMessages controller", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

// Send Messages
const sendMessage = async (req, res) => {
  const { text } = req.body
  let { image } = req.body
  const { id: receiverId } = req.params
  const senderId = req.auth._id

  try {
    if(image) {
      const uploadedResponse = await cloudinary.uploader.upload(image)
      image = uploadedResponse.secure_url
    }

    const message = new Message({
      senderId,
      receiverId,
      text,
      image
    })

    await message.save()

    // socket.io
    const receiverSocketId = getReceiverSocketId(receiverId)
    if(receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message)
    }

    res.status(200).json(message)
  } 
  catch (error) {
    console.log("Error in sendMessage controller", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

export { getSidebarUsers, getMessages, sendMessage }