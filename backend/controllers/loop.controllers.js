import uploadonCloudinary from "../config/cloudinary.js"
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Loop from "../models/loop.model.js";

export const uploadLoop=async(req,res)=>{
    try{
        const{caption}=req.body
        let media;
        if(req.file){
            media=await uploadonCloudinary(req.file.path)
        }
        else{
            return res.status(400).json({message:"Media is required"})
        }

        const loop=await Loop.create({
            caption,media,author:req.userId
        })
        // Next three lines  is because we have Post array in user model also 
        const user=await User.findById(req.userId)
        user.loops.push(loop._id)
        await user.save()

        const populatedLoop=await Loop.findById(loop._id).populate("author","name Username profileImage")
        return res.status(201).json(populatedLoop)

    }
    catch(error){
        return res.status(500).json({message:`upload loop error ${error}`})

    }
}

export const getAllLoops=async(req,res)=>{
    try{
        const loop=await Loop.find({}).populate("author","name Username profileImage").populate("comments.author")
        return res.status(200).json(loop)


    }
    catch(error){
          return res.status(500).json({message:`getall loop error ${error}`})

    }
}

export const like=async(req,res)=>{
    try{
        const loopId=req.params.loopId
        const loop=await Post.findById(loopId)
        //to push like in post
        if(!loop){
             return res.status(400).json({message:"loop not found"})


        }
        // to check post we seen is already liked by user or not

        const alreadyLiked=loop.likes.some(id=>id.toString()==req.userId.toString())
        if(alreadyLiked){
            loop.likes=loop.likes.filter(id=>id.toString()!==req.userId.toString())
        }
        else{
            loop.likes.push(req.userId)
        }
        await loop.save()
        loop.populate("author","name Username profileImage")
        return res.status(200).json(post)

    }
catch(error){
     return res.status(500).json({message:`liked loop error ${error}`})
}

}
 export const comment=async(req,res)=>{
    try{
        const {message}=req.body
        const loopId=req.params.loopId
        const loop=await Loop.findById(loopId)
         if(!loop){
             return res.status(400).json({message:"loop not found"})
}
loop.comments.push({
    author:req.userId,
    message
})
  await loop.save()
  loop.populate("author","name Username profileImage")
  loop.populate("comments.author")
    return res.status(200).json(loop)
    }
    catch(error){
         return res.status(500).json({message:`comment error ${error}`})

    }
 }
