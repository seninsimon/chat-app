const generateToken = require("../lib/utils.js");
const User = require("../models/user.model.js")
const bcrypt = require("bcryptjs")
const cloudinary = require('../lib/cloudinary.js')

const signup = async (req, res) => {
  

    console.log(req.body)

    const {fullName , email , password} = req.body
    
    try {

    if(!fullName || !email || !password) return res.status(400).json({message : "please fill all the fields"})
    
    if(password.length < 6) return res.status(400).json({message : "password must be atleast 6 length"})
    
    const user = await User.findOne({email})

    if(user) return res.status(400).json({message : "user email already exists"})

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password , salt)

    const newUser = await User.create({
       fullName,
       email,
       password : hashedPassword
    })

    if(newUser)
    {
        generateToken(newUser._id , res)

        res.status(201).json({ 
            _id : newUser._id,
            fullName : newUser.fullName,
            email : newUser.email,
            profilePic : newUser.profilePic

        })
    }
    else
    {
        res.status(400).json({message : "invalid user data"})
    }

    
  } catch (error) {

    console.log("error in creating the user",error)

    res.status(500).json({message : "internal server error"})   
  }
};


// login 

        const login = async (req, res) => {
        
            console.log(req.body)

        const {email , password} = req.body

        try {

            const user = await User.findOne({email})

            if(!user) return res.status(400).json({message : "email doesnt exists"})

            const validPassword = await bcrypt.compare(password , user.password)

            if(!validPassword) return res.status(400).json({message : "password is incorrect"})

            generateToken(user._id , res)

            res.status(200).json({ 
                _id : user._id,
                fullName : user.fullName,
                email : user.email,
                profilePic : user.profilePic
    
            })
            
            
        } catch (error) {
            
            console.log("login error ",error)

            res.status(500).json({message : "internal server error"})

        }


        };







const logout = (req, res) => {
    

    try {

        res.cookie("jwt" ,"" , {maxAge : 0})

        res.status(200).json({message : "user logged out successfully"})

    } catch (error) {

    console.log("error in logout", error)

    res.status(500).json({message : "internal server error"})

        
    }
};



//updateProfile


const updateProfile = async (req , res)=>
{

    const {profilePic} = req.body

    try {

    const userId = req.user._id /// this is from the protected route

    if(!profilePic) return res.status(400).json({message : "profile pic is requied"})

    const uploadResponse = await cloudinary.uploader.upload(profilePic)

    const updatedUser = await User.findByIdAndUpdate(userId , {profilePic : uploadResponse.secure_url} , {new : true})

    res.status(200).json(updatedUser)

    
        
    } catch (error) {

        console.log("error in uploading profile pic")
        res.status(500).json({message : "internal server error"})

        
    }

}

//to check if refereshed

const checkAuth = async (req , res)=>
{
    try {

        const user = req.user
        
        res.status(200).json(user)
    
    } catch (error) {

        res.status(500).json({message : "internal server error"})
    }
}





module.exports = {
    signup , 
    login ,
    logout,
    updateProfile,
    checkAuth
}
