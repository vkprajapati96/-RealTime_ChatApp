
import mongoose from "mongoose";

const connectdb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("db connected successfully")
    
    } catch (error) {
        console.log("mongoose Error:",error)
        process.exit(1)
  
    } 

}

export default connectdb
