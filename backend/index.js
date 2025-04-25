const express = require("express")

const app = express()

const cookieParser = require("cookie-parser")

const Authroute = require("./src/routes/auth.routes")

const messageroute = require('./src/routes/message.routes')

const cors = require("cors")

const mongodbconnect = require("./src/lib/db")

require("dotenv").config()


app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


app.use(cookieParser())

app.use("/api/auth" , Authroute)

app.use("/api/message" , messageroute)












const PORT = process.env.PORT || 3001

app.listen(PORT , ()=>
{
    console.log("server is running",PORT)
    mongodbconnect()
})