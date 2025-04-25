const express = require("express")

const app = express()

const cookieParser = require("cookie-parser")

const Authroute = require("./src/routes/auth.routes")

const messageroute = require('./src/routes/message.routes')

const mongodbconnect = require("./src/lib/db")

require("dotenv").config()

app.use(express.json())

app.use(express.urlencoded({extended : true}))

app.use(cookieParser())

app.use("/api/auth" , Authroute)

app.use("/api/message" , messageroute)












const PORT = process.env.PORT || 3001

app.listen(PORT , ()=>
{
    console.log("server is running",PORT)
    mongodbconnect()
})