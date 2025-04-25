const jwt = require("jsonwebtoken")

const generateToken = (userId , res) =>
{
    const token = jwt.sign({userId} , process.env.SECRET_KEY , {expiresIn : "7d"})

    res.cookie("jwt" , token , 
        {
            maxAge : 7 * 60 * 24 * 60 * 1000 , //milliseconds 7 days
            httpOnly : true, //prevent xss attack,
            sameSite : "strict", //stop csrf attack
            secure : process.env.NODE.ENV !== "development"
        }
    )

    return token;
}

module.exports = generateToken