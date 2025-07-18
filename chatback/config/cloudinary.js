import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()


    const uploadONCloudinary = async (filePath)=>{
        
        cloudinary.config({ 
        cloud_name:process.env.CLOUDINNARY_NAME , 
        api_key: process.env.CLOUDINNARY_API_KEY, 
        api_secret:process.env.CLOUDINNARY_SECRET_KEY 
    
    });
        
        try {
            if(!filePath){
                return null
            }
            let result = await cloudinary.uploader.upload(filePath)
            // console.log(result)
            fs.unlinkSync(filePath)
            return  result.secure_url
        } catch (error) {
            fs.unlinkSync(filePath)
            console.log(error)
        }
    
}

export default uploadONCloudinary;