
import UserModel from "../models/userModel.js";
import { loginUser, registerUser,getUserFromToken} from "../services/authServices.js";
import express from "express";

const app = express();
app.use(express.json());   

export const register = async (req, res) => {
  const { username, email, password } = req.body;

 
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const user = new UserModel({ username, email, password });

  try {
    const response = await registerUser(user);

    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    console.error("Error in register controller:", error);
    return res
      .status(500)
      .json({ success: false, message: "Registration failed. Please try again" });
  }
};


export const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res
      .status(400)
      .json({ success: false, message: "All failds are required" });
    }

    try{
        const response=await loginUser(email,password);
         if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
    }catch (error) {
    console.error("Error in register controller:", error);
    return res
      .status(500)
      .json({ success: false, message: "Login failed. Please try again" });
  }
}


export const getUserFromTokenController = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success:false, message:"Token not provided" });
  }

  try {
    const response = await getUserFromToken(token);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    console.error("Error in getUserFromToken controller:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to get data!" });
  }
};