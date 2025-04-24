const express = require("express")

const app = express()

const Authroute = require("./src/routes/auth.routes")


app.use("/api/auth" , Authroute)














app.listen(3000 , ()=>
{
    console.log("server is running")
})