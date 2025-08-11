import mongoose from "mongoose";

const postSchema=new mongoose.Schema({



    author:
        {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
     
    mediaType:{
        type:String,
        enum:["image","video"],
        required:true
    },
    media:{
        type:String,
        required:true
    },
    caption:{
        type:string
    },
    likes:[
         {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}

    ],
    comments:[
         {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
    ]  


    
},{timestamp:true})

const Post=mongoose.model("Post",postSchema)
export default Post