import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log("token milgaya :",token)

    if (!token) {
      return res.status(401).json({ message: "User Not Authorized" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    console.error("isAuth Error:", error);
    return res.status(500).json({ message: `isAuth Error: ${error.message}` });
  }
};

export default isAuth;
