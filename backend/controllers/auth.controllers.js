import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signUp = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const checkUserByUserName = await User.findOne({ userName });
        if (checkUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const checkUserByEmail = await User.findOne({ email });
        if (checkUserByEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const user = await User.create({
            userName,
            email,
            password:hashedPassword
        })
        
        const token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge:7 * 24 * 60 * 60 * 1000,
            sameSite:"None",
            secure:false,
        })

        return res.status(201).json(user)


    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user doesn't exists" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        
        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge:7 * 24 * 60 * 60 * 1000,
            sameSite:"None",
            secure:false,
        })

        return res.status(200).json(user)


    } catch (error) {
        res.status(500).json({ message: "login error" });
    }
}
