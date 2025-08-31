import axios from "axios";
import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
function Login(){
   
    const navigate=useNavigate();
const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(email,password);
    try{
        const response=await axios.post(
                "http://localhost:3100/api/auth/login-user",
                {email,password:password}
            );
        if(response.data.success){
            toast.success(response.data.message || "login successful")
            const token =response.data.token;
            sessionStorage.setItem("authToken",token);
            navigate("/homescrenn")

        }else{
            toast.error(response.data.message || "login failed")
        }
    }catch(error){
        console.error("error during registration",error.response.data);
        toast.error(error.response.data.message||"something went wrong")
    }
}
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    return(
        <div>
         <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            onChange={e=>setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="enter password"
            onChange={e=>setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
         <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
            <Link to="/">bar</Link>
    </div>
    )
}

export default Login;