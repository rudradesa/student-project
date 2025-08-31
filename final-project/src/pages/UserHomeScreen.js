import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomeScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.get(
        "http://localhost:3100/api/auth/me",   
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUser(response.data.data);  
      } else {
        console.log(response.data.message || "Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      console.log(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <h1>Welcome this is dashboard {user ? user.name : "Guest"}</h1>
      {user && (
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      )}
        <Link to={"/homescrenn"}>User</Link>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
<a href="habit://tracker">Open Habit Tracker</a>


    </div>
  );
}

export default HomeScreen;
