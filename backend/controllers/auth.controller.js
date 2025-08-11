
//this is api

import gentoken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup=async(req,res)=>{

    try{
        const{name,email,password,Username}=req.body
        const findByEmail=await User.findOne({email})
        if(findByEmail){
            return res.status(400).json({message:"Email already exist!!!"})
        }
          const findByUsername=await User.findOne({Username})
        if(findByUsername){
            return res.status(400).json({message:"Username already exist!!"})
        }
        if(password.length<6){
             return res.status(400).json({message:"Password must be at least6 charachter!!"})
            
        }

        //password hashing

        const hashedPassword= await bcrypt.hash(password,10)

        const user=await User.create({

            name,Username,email,password:hashedPassword
        })

        const token=await gentoken(user._id)                        //token ma store ho jaye ga "token",token
        res.cookie('token',token,{
            httponly:true,
            maxage:10*365*24*60*60*1000,
            secure:false,
            sameSite:"Strict"


     } ) 
     return res.status(201).json(user)


      
        }
    catch(error){
        return res.status(500).json({message:`signup error ${error}`})

       
    }
}



//         FOR LOGIN


export const signIn=async(req,res)=>{

    try{
        const{password,Username}=req.body
      
          const user=await User.findOne({Username})
        if(!user){
            return res.status(400).json({message:"Username not found!!"})
        }

        //password hashing

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
              return res.status(400).json({message:"incorrect passowrd!!"})
        }


        const token=await gentoken(user._id)                        
        res.cookie('token',token,{
            httponly:true,
            maxage:10*365*24*60*60*1000,
            secure:false,
            sameSite:"Strict"


     } ) 
     return res.status(200).json(user)


      
        }
    catch(error){
        return res.status(500).json({message:`signin error ${error}`})

       
    }
} 

     //   This is for Sign out
     // Token wali cookie hata do logout simple

export const signout=async(req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"sign out successfully"})

    }
    catch(error){
         
             return res.status(500).json({message:`sigout error ${error}`})


    }
}