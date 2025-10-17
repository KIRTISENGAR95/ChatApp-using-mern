import jwt from "jsonwebtoken";
const generateToken = async(userId) => {
    try {
        const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
        return token;
    } catch (error) {
        console.log("Error in generateToken");
    }
};
export default generateToken;