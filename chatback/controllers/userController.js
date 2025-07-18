

import uploadONCloudinary from "../config/cloudinary.js";
// import user from "../model/user.js";
import User from "../model/User.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" }); 
    }

    return res.status(200).json(user); 
  } catch (error) {
    console.error("getCurrentUser Error:", error);
   return res.status(500).json({ message: "Server error" });
  }
};



export const editProfile = async (req,res)=>{
    try {
        let {name} = req.body;
        let image;
        if (req.file) {
            image =await uploadONCloudinary(req.file.path)
        }

        let user = await User.findByIdAndUpdate(req.userId,{
            name,
            image
        },{new:true});

        if (!user) {
            return res.status(400).json({message:"user not found"})

        }

       return res.status(200).json(user)

    } catch (error) {
     console.error("Profile Error:", error);
    return res.status(500).json({ message: `profile Error ${error}` });
       
        
    }

}



export const getOtherUsers =async (req,res) => {
  try {
    let users = await User.find({
      _id:{$ne:req.userId}
    }).select("-password")

    return res.status(200).json(users)

  } catch (error) {
    res.status(500).json({ message: `Get Other Users Error: ${error}` });
    
  }
}




export  const search =async (req,res)=>{
  try{

    let {query} =req.query
    if (!query) {
      return res.status(400).json({message:"query is required"})
    }

    let users = await User.find({
      $or:[
        {name:{$regex:query,$options:"i"}},
        {username:{$regex:query,$options:"i"}},

      ] 
    })
   
return res.status(200).json(users)
  }catch(error){
    res.status(500).json({ message: `Search Users Error: ${error}` });
    
  }

}
