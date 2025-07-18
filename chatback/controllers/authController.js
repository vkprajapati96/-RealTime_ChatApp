import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import { generateToken } from "../config/token.js";

// Register
export const signUp = async (req, res) => {
  try {
    const {email, password,username } = req.body;
        
    const checkUserByUserName = await User.findOne({ username });
    if (checkUserByUserName) return res.status(400).json({ message: "User already exists" });


    // Check if user already exists
    const checkUserByEmail = await User.findOne({ email });
    if (checkUserByEmail) return res.status(400).json({ message: "User already exists" });

    // Hash password
    if(password.length  < 6){
    return res.status(400).json({ message: "password must be at least 6 characters" });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      email,
      username,
      password: hashedPassword
    
    });
    
    const token =await generateToken(user._id); // make sure this function is defined
    
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          sameSite: "strict",
          secure: false,
        });
    

    // Send success
    res.status(201).json({ message: "User registered successfully",user });
  } catch (error) {
    res.status(500).json({ message: "Error signup user", error });
  }
};



// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Create token
    const token = generateToken(user._id); // make sure this function is defined
    
  res.cookie("token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          sameSite: "strict",
          secure: false,
        });
           

    // Send user data + token
    res.status(200).json({message: "Login successful",
        user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};


//LogOUt 

export const logOut =async (req,res)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({message:"User LogOUt successfully"})
    } catch (error) {
        res.status(500).json({ message: "Logout Error", error });

    }
}