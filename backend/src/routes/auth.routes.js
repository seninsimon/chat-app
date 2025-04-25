const express = require("express")

const { signup, login, logout , updateProfile, checkAuth} = require("../controllers/auth.contoller")
const protectedRoute = require("../middlewares/auth.middleware")

const router = express.Router()


router.post("/signup" , signup)

router.post("/login" , login)

router.post("/logout" , logout)


//profile updation

router.put("/update-profile" , protectedRoute , updateProfile)

router.get("/check" , protectedRoute , checkAuth)

module.exports = router