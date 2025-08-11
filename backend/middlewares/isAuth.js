// to check current user details

//to check current user is authenticated

import jwt from "jsonwebtoken"

const isAuth=async(req,res,next)=>{

    try{

         //token sy userid nikal lo agar na howa token to no user
         const token=req.cookies.token
         if(!token){
            return res.status(400).json({message:"token is not found"})
         }
         // agar token mil gya to is tra userid ly gy

         const verifyToken=await jwt.verify(token,process.env.JWT_SECRET)

         req.userId=verifyToken.userId             //userid is object we create like req.userId
         next()
    }
    catch(error){
        return res.status(500).json({message:`is auth error ${error}`})

    }
}

export default isAuth