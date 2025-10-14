import User from "../models/user.model.js";
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
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
