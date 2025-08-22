import express from 'express'
import dotenv from "dotenv"
dotenv.config()

import cookieParser from 'cookie-parser'
import connecttoDb from './config/db.js'
const app=express()
import cors from "cors"
import authRouter from './routes/auth.routes.js';

import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import loopRouter from './routes/loop.routes.js'
import storyRouter from './routes/story.routes.js'


const port=process.env.PORT ||5000 //IF 8000 NOT WORKING THEN 5000
 
app.use(express.json()) //this middleware is use to parse username and password
app.use(cookieParser()) //this middle ware is use to parse cookie
app.use(cors({                               //frontend connection
    origin:"http://localhost:5173",

    credentials: true     //yeh token cookie parse karne ky liye sai tra
                            
}))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
app.use("/api/loop",loopRouter)
app.use("api/story/",storyRouter)


app.listen(port,()=>{
    connecttoDb()
    console.log('server started')
     console.log(`🚀 Server started on port ${port}`);
})


