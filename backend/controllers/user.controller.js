
//yeh specific user jo login hoga us ky liye or auth overall controller ha
//this is api

import uploadOnCloudinary from "../config/cloudinary.js"
import { upload } from "../middlewares/multer.js"
import User from "../models/user.model.js"

export const getCurrentUser=async(req,res)=>{

try{
    const userId=req.userId
    const user=await User.findById(userId).populate("posts loops")
    if(!user){
        return res.status(400).json({message:"user not found"})
    }

    return res.status(200).json(user)


}
catch(error){

     
    return res.status(500).json({message:`get current user error ${error}`})

}

}

export const suggestedUsers=async(req,res)=>{

    try{

        const users=await User.find({_id:{$ne:req.userId}}).select("-password")   //_id:$ne... this is because it show all suggested user expect ourself
        return res.status(200).json(users)

    }
    catch(error){
          return res.status(500).json({message:`get suggested user error ${error}`})

    }
}

export const editProfile=async(req,res)=>{

    try{
        const{name,Username,bio,profession,gender}=req.body
        const user=await User.findById(req.userId).select("-password")
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        //to keep username unique
        const sameUserWithUserName=await User.findOne({Username}).select("-password")
        if(sameUserWithUserName && sameUserWithUserName._id!=req.userId)  {
           return res.status(400).json({message:"Username already exist"})
        }
        let profileImage =user.profileImage;
        if(req.file){
            profileImage=await uploadOnCloudinary(req.file.path)
        }
        user.name=name
        user.Username=Username
        user.profileImage=profileImage
        user.bio=bio
        user.gender=gender
        user.profession=profession

        await user.save()
        return res.status(200).json(user)

    }
    catch(error){
         return res.status(500).json({message:`edit profile error ${error}`})

    }
}
// to get profile 
export const getProfile=async(req,res)=>{
    try{

        const Username=req.params.Username
        const user=await User.findOne({Username}).select("-password")
        if(!user){
               return res.status(400).json({message:"User not found"})

        }
         return res.status(200).json(user)

    }
    catch(error){
        
         return res.status(500).json({message:`get profile error ${error}`})

    }
}