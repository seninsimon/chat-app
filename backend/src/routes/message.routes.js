const express = require("express")
const protectedRoute = require("../middlewares/auth.middleware")
const { getUsersForSideBar, getMessages, sendMessage } = require("../controllers/message.controller")
const router = express.Router()




router.get("/users" , protectedRoute , getUsersForSideBar)
router.get("/:id" , protectedRoute , getMessages)

router.put("/send/:id" , protectedRoute , sendMessage)




module.exports = router