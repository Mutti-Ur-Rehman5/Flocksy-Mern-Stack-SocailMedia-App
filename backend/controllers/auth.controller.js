
//this is api

import sendMail from "../config/Mail.js"
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

// otp ka liye controller


// this all for step 1 to get otp
export const sendOtp=async (req,res)=>{
 
    try{
        const {email}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        const otp=Math.floor(1000 + Math.random() *9000).toString()
        user.resetOtp=otp,
        user.otpExpires=Date.now() + 5*60*1000
        user.isOtpVerified=false

        await user.save()
        await sendMail(email,otp)
        return res.status(200).json({message:"email successfully send"})

    }
    catch(error){
        return res.status(500).json({message:`send otp error ${error}`})


    }
}
// step2 otp mil gya ab verify karo

export const verifyOtp=async(req,res)=>{


    try{
        const{email,otp}=req.body
        const user=await User.findOne({email})
        if(!user||user.resetOtp!=otp||user.otpExpires<Date.now()){                 //otp check jo likha jo recieve huwa ya phir expire time guzar gya
    

            return res.status(400).json({message:"Invalid/Expire otp"})

        }                 

        user.isOtpVerified=true
        user.resetOtp=undefined      // undefined is liye kiya ky wo empty ho jaye ab likhne ky bad/verify hone ky bad
        user.otpExpires=undefined
        
        await user.save()
         return res.status(200).json({message:"OTP Verified"})

    }
    catch(error){

         return res.status(500).json({message:`Verify otp error ${error}`})



    }
}


// Now in last step 
//step 3
// Reset password

export const resetPassword=async(req,res)=>{

try{
      const{email,password}=req.body
      const user=await User.findOne({email})

    if(!user||!user.isOtpVerified){

    return res.status(400).json({message:"Otp Verification requored"})
    }

    const hashedPassword=await bcrypt.hash(password,10)
    user.password=hashedPassword                              //ab new reset password a gya
    user.isOtpVerified=false
    await user.save()

    return res.status(200).json({message:"Password reset Successfully"})


}
catch(error){
      return res.status(500).json({message:`reset otp ${error}`})


}
}