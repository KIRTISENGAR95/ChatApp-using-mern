import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      console.warn("Missing userId in request");
      return res.status(401).json({ err: "Unauthorized: userId not provided" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return res.status(500).json({ err: "Internal server error while fetching current user" });
  }
};

export const editProfile = async (req, res) => {
  try {
    let { name } = req.body;
    let updateData = { name };
    
    if (req.file) {
      try {
        // Save the file locally and store the path
        updateData.image = req.file.path.replace(/\\/g, '/');
        
        // If you want to use Cloudinary instead, uncomment these lines
        const uploadUrl = await uploadOnCloudinary(req.file.path);
        console.log(uploadUrl);
        if (uploadUrl) {
          updateData.image = uploadUrl;
        }
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return res.status(400).json({ message: "Error uploading file" });
      }
    }
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({ message: "Internal server error while updating profile" });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId }
    }).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.error("getOtherUsers error:", error);
    return res.status(500).json({ message: "Internal server error while fetching other users" });
  }
}