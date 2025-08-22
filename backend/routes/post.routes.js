import express from "express"
import isAuth from "../middlewares/isAuth.js"

import { upload } from "../middlewares/multer.js"
import { comment, getAllpost, like, saved, uploadPost } from "../controllers/post.controller.js"


const postRouter=express.Router()

postRouter.get('/upload',isAuth,upload.single("media"),uploadPost)   
                                                 

postRouter.get("/getAll",isAuth,getAllpost)
postRouter.post("/like/:postId",isAuth,like)
postRouter.get("/comment",isAuth,comment)
postRouter.post("/saved/:postId",isAuth,saved)

export default postRouter