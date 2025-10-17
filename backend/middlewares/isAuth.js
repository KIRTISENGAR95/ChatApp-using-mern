import jwt from "jsonwebtoken";
const isAuth = (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ err: "Token is not found" });
    }

    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifyToken);
    req.userId=verifyToken.userId;
    next()

    return next();
  } catch (error) {
    return res.status(500).json({ err: `isauth error ${error.message}` });
  }
};

export default isAuth;