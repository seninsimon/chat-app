const jwt = require("jsonwebtoken")
const User = require("../models/user.model")




const protectedRoute = async (req , res , next) =>
{
    try {

        const token = req.cookies.jwt

        if(!token) return res.status(401).json({message : "token not found inavalid authorization"})

        const decoded = jwt.verify(token , process.env.SECRET_KEY)

        if(!decoded) return res.status(401).json({message : "token not valid"})

        const user = await User.findById(decoded.userId).select("-password")

        req.user = user

        next()


        
    } catch (error) {

        console.log("error in protected route" ,error)

        res.status(500).json({message : "internal server error"})
        
    }
}

module.exports = protectedRoute
