import mongoose from "mongoose";

const connecttoDb=async ()=>{

    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected')
    }
    catch(error){
        console.log('error')
    }
}

export default connecttoDb