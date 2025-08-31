import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";   // ✅ make sure pool is imported
import jwt from 'jsonwebtoken';



const JWT_Secrate="ezshbjhnzesrxdctfvgbn";
export const registerUser = async (user) => {
  console.log("RegisterUser input:", user);

  try {
    const hashpassword = await bcrypt.hash(user.password, 10);
    const query = `INSERT INTO users(name,email,password) VALUES (?,?,?)`;
    const values = [user.username, user.email, hashpassword];

    await pool.query(query, values);
    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error("Error in registerUser:", error); 
    return { success: false, message: "Registration failed",error:error};
  }
};


export const loginUser=async(email,password)=>{
    try{
      const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
      if(rows.length===0){
      return { success: false, message: "User Not found",error:error};
      }
      const user=rows[0]
      const passwordMatch=await bcrypt.compare(password,user.password);
      if(!passwordMatch){
        return{
        success: false, message: "Passowrd Doesnet match"
      }
      }
      const token=jwt.sign(
        {id:user.id,email:user.email},
        JWT_Secrate,
        {expiresIn: "365d"}
      )
      return{
        success: true, message: "Login Successfull",token:token
      }
    }catch(error){
      return{
        success: false, message: "Login failed",error:error
      }
    }
}



export const getUserFromToken = async (token) => {
  try {
    const trimmedToken = token.trim();
    const decodedToken = jwt.verify(trimmedToken, JWT_Secrate);

    const [rows] = await pool.query(
      `SELECT id, name, email FROM users WHERE email = ?`,
      [decodedToken.email]
    );

    if (rows.length === 0) {
      return { success: false, message: "User not found" };
    }

    return { success: true, data: rows[0] };
  } catch (error) {
    return {
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    };
  }
};
