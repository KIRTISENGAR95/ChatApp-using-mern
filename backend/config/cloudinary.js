import 'dotenv/config';
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return uploadResult.secure_url;
  } catch (error) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    const msg = error?.message || error?.error?.message || String(error);
    console.error("Cloudinary upload error:", msg);
    throw new Error(msg);
  }
};

export default uploadOnCloudinary;