import User from "../models/user.model.js"
import Story from "../models/story.model.js"
import uploadOnCloudinary from "../config/cloudinary.js"

export const uploadStory=async(req,res)=>{

try{
    // only story allow if new story add prev will be deleted

    const user=await User.findById(req.userId)
    if(user.story){

        await Story.findByIdAndDelete(user.story)
        user.story=null
    }

    const {mediaType}=req.body
    let media;
    if(req.file){
        media=await uploadOnCloudinary(req.file.path)
    }
    else{
        return res.status(400).json({message:"media is required"})
    }
    const story=await Story.create({
        author:req.userId,mediaType,media
    })
    user.story=story._id
    await user.save()
    const populatedStory=await Story.findById(story._id)
    .populate("author","name Username profileImage").populate("viewvers","name Username profileImage")
    return res.status(200).json(populatedStory)

}
catch(error){
        return res.status(500).json({message:` story upload error ${error}`})

}

}

//story view controler now apny viewers wali 

export const viewStory=async(req,res)=>{
    try{
        const storyId=req.params.storyId
        const story=await Story.findById(storyId)
        if(!story){
             return res.status(400).json({message:"story not found"})

        }
        // if story view 1st time then only id not second or third time
        const viewersIds=story.map(id=>id.toString())
    if(!viewersIds.includes(req.userId.toString())){

    story.viewers.push(req.userId)

    await story.save()
    const populatedStory=await Story.findById(story._id)
    .populate("author","name Username profileImage").populate("viewvers","name Username profileImage")
    return res.status(200).json(populatedStory)


        }

    }
    catch(error){
            return res.status(500).json({message:` story view error ${error}`})

    }
}

// ab kisi ki story dekhne ky liye

export const getStoryByUsername=async (req,res)=>{
    try{

    const Username=req.params.Username
    const user=await User.findOne({Username})
    if(!user){
          return res.status(400).json({message:"user not found"})

    }
    const story=await Story.find({
        author:user._id
    }).populate("viewers author")
        return res.status(200).json(story)
}
catch(error){
      return res.status(500).json({message:` story find error ${error}`})

}


}