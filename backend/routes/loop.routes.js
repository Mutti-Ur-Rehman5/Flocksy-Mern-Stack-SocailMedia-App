import express from "express"
import isAuth from "../middlewares/isAuth.js"

import { upload } from "../middlewares/multer.js"
import { getAllLoops,like,comment, uploadLoop } from "../controllers/loop.controllers.js"



const loopRouter=express.Router()

loopRouter.get('/upload',isAuth,upload.single("media"),uploadLoop)  
loopRouter.get("/getAll",isAuth,getAllLoops) 
                                                 
loopRouter.post("/like/:loopId",isAuth,like)
loopRouter.get("/comment",isAuth,comment)


export default loopRouter