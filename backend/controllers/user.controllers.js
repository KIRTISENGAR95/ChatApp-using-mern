import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ err: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ err: `current user error ${error}` });
  }
};

export const editProfile=async(req,res)=>{
  try{
    let {name}=req.body
    let image;
    if(req.file){
      image = "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg";
      
    }
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, image },
      { new: true }
    );
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  }catch(error){
    console.error("Profile update error:", error);
    return res.status(500).json({message:`profile error ${error.message || error}`})
  }
}

export const getOtherUsers=async(req,res)=>{
  try {
    let users= await User.find({
      _id:{$ne:req.userId}
    }).select("-password")
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({message:`get other users error ${error.message || error}`})
  }
}