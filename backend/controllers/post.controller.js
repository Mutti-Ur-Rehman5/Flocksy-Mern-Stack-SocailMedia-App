import uploadonCloudinary from "../config/cloudinary"
import Post from "../models/post.model";
import User from "../models/user.model";
export const uploadPost=async(req,res)=>{
    try{
        const{caption,mediaType}=req.body
        let media;
        if(req.file){
            media=await uploadonCloudinary(req.file.path)
        }
        else{
            return res.status(400).json({message:"Media is required"})
        }

        const post=await Post.create({
            caption,media,mediaType,author:req.userId
        })
        // Next three lines  is because we have Post array in user model also 
        const user=await User.findById(req.userId)
        user.posts.push(post._id)
        await user.save()

        const populatedPost=await Post.findById(post._id).populate("author","name Username profileImage")
        return res.status(201).json(populatedPost)

    }
    catch(error){
        return res.status(500).json({message:`upload post error ${error}`})

    }
}

export const getAllpost=async(req,res)=>{
    try{
        const posts=await Post.find({author:req.userId}).populate("author","name Username profileImage")
        return res.status(200).json(posts)


    }
    catch(error){
          return res.status(500).json({message:`getall post error ${error}`})

    }
}

export const like=async(req,res)=>{
    try{
        const postId=req.params.postId
        const post=await Post.findById(postId)
        //to push like in post
        if(!post){
             return res.status(400).json({message:"Post not found"})


        }
        // to check post we seen is already liked by user or not

        const alreadyLiked=post.likes.some(id=>id.toString()==req.userId.toString())
        if(alreadyLiked){
            post.likes=post.likes.filter(id=>id.toString()!==req.userId.toString())
        }
        else{
            post.likes.push(req.userId)
        }
        await post.save()
        post.populate("author","name Username profileImage")
        return res.status(200).json(post)

    }
catch(error){
     return res.status(500).json({message:`liked post error ${error}`})
}

}
 export const comment=async(req,res)=>{
    try{
        const {message}=req.body
        const postId=req.params.postId
        const post=await Post.findById(postId)
         if(!post){
             return res.status(400).json({message:"Post not found"})
}
post.comments.push({
    author:req.userId,
    message
})
  await post.save()
  post.populate("author","name Username profileImage")
  post.populate("comments.author")
    return res.status(200).json(post)
    }
    catch(error){
         return res.status(500).json({message:`comment error ${error}`})

    }
 }

export const saved = async (req, res) => {
  try {
    const postId = req.params.postId;
    const user = await User.findById(req.userId);

    const alreadySaved = post.saved.some(
      (id) => id.toString() == req.postId.toString()
    );

    if (alreadySaved) {
      user.saved = user.saved.filter(
        (id) => id.toString() !== req.postId.toString()
      );
    } else {
      user.saved.push(req.postId);
    }

    await user.save();
    user.populate("saved");
    return res.status(200).json(user);
  } catch (error) {
     return res.status(500).json({message:`Saved Post error ${error}`})
    
  }
}
