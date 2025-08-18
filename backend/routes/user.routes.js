import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { getCurrentUser, suggestedUsers } from "../controllers/user.controller.js"


const userRouter=express.Router()

userRouter.get('/current',isAuth,getCurrentUser)   //isAuth middleware laga diya to current user ki id mil jaye gi jo isAuth
                                                   //  ham ny banaya middleware ma, or getcurrentuser usercontrooler sy mily ga

userRouter.get("/suggested",isAuth,suggestedUsers)

export default userRouter