const cloudinary = require("../lib/cloudinary")
const Message = require("../models/message.model")
const User = require("../models/user.model")



const getUsersForSideBar = async(req , res)=>
{
    try {

        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id : {$ne : loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
        
    } catch (error) {
        console.log("server error infetching side bar users",error)
        res.status(500).json({message : "internal server error"})
    }
}


const getMessages = async (req , res)=>
{
    try {
         
        const {id : senderToRecieverId} = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or : [
                {senderId : myId,recieverId : senderToRecieverId},   
                {recieverId : myId, senderId : senderToRecieverId }
                  ]
        })
    
        res.status(200).json(messages)
    } catch (error) {

        console.log(" server error in finding messages ",error)
        res.status(500).json({message : "internal server error"})
    }
}


const sendMessage = async (req , res)=>
{
    try {

        const {image , text} = req.body
        const myId = req.user._id
        const {id : recieverId} = req.params

        let imageUrl
        const uploadResponse = await cloudinary.uploader.upload(image)
        imageUrl = uploadResponse.secure_url


        const message = await Message.create({
            senderId : myId,
            recieverId ,
            text,
            image : imageUrl    
        })

        //real time funcatuianlity usin g socket io required here

        res.status(200).json(message)
        
    } catch (error) {
        console.log(" server error in sending  messages ",error)
        res.status(500).json({message : "internal server error"})
    }
}


module.exports = {getUsersForSideBar,getMessages,sendMessage}