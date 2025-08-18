import express from "express"
import { signup,signIn, sendOtp, verifyOtp, resetPassword, signout} from "../controllers/auth.controller.js"

const authRouter=express.Router()


authRouter.post("/signup",signup)
authRouter.post("/signin",signIn)
authRouter.post("/sendOtp",sendOtp)
authRouter.post("/VerifyOtp",verifyOtp)
authRouter.post("/resetPassword",resetPassword)
authRouter.get("/signout",signout)


export default authRouter