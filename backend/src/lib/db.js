const mongoose = require("mongoose")


const mongodbconnect = async ()=>
{
    try {
         

        await mongoose.connect(process.env.MONGOURI)

        console.log("mongodb database is connected")


    } catch (error) {
        
        console.log( "mongodb is not connected",error)
    }
}


module.exports = mongodbconnect