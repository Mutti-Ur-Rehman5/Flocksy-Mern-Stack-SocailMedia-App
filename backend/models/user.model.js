import mongoose from "mongoose";

const userSchema=new mongoose.Schema({

name:{
    type:String,
    required:true
},
Username:{

    type:String,
    unique:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
profileImage:{
    type:String
},
bio:{
type:String

},
profession:{
type:String

},
gender:{
type:String,
enum:["male","female"]

},
followers:[
    {type:mongoose.Schema.Types.ObjectId,ref:'User'} //user ka jo follower hoga us ka sab kuch info
    
            
],
following:[
    {type:mongoose.Schema.Types.ObjectId,ref:"User"}
],
posts:[

    {type:mongoose.Schema.Types.ObjectId,ref:'Post'}
],
saved:[
    {type:mongoose.Schema.Types.ObjectId,ref:'Post'}
],
loops:[
 {type:mongoose.Schema.Types.ObjectId,ref:'Loop'}
    
],
story:
     {type:mongoose.Schema.Types.ObjectId,ref:'Story'},

resetOtp:{                                                                          //user otp daly ga idr sy match karen gy phir
                                                                                              
    type:String
                                                                       

},
otpExpires:{

    type:Date
},

isOtpVerified:{
    type:Boolean,
    default:false
}



},{timestamps:true})

const User=mongoose.model("User",userSchema)

export default User