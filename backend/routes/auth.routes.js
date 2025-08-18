import express from "express"
import { signup,signIn, sendOtp, verifyOtp, resetPassword} from "../controllers/auth.controller.js"

const authRouter=express.Router()


authRouter.post("/signup",signup)
authRouter.post("/signin",signIn)
authRouter.post("/sendOtp",sendOtp)
authRouter.post("/VerifyOtp",verifyOtp)
authRouter.post("/resetPassword",resetPassword)


export default authRouter