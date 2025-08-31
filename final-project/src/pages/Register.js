import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reg() {
    const [formValues, setFormValues] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({});


    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validateForm = () => {
        const errors = {};
        if (!formValues.username) errors.username = "Username is required";
        if (!formValues.email) errors.email = "Email is required";
        if (!formValues.password) errors.password = "Password is required";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues);

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:3100/api/auth/register-user",
                formValues
            );

            if (response.data.success) {
                toast.success(response.data.message || "Registration successful!");
                setFormValues({ username: "", email: "", password: "" });
                setFormErrors({});
            } else {
                toast.error(response.data.message || "Registration failed!");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error(error.response.data.message || error.response.data.message || "Something went wrong.");
        }

    };

    return (
        <div style={{ maxWidth: "300px", margin: "auto", paddingTop: "50px" }}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Username:</label>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={formValues.username}
                        onChange={handleInput}
                    />
                    {formErrors.username && (
                        <p style={{ color: "red" }}>{formErrors.username}</p>
                    )}
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Email:</label>
                    <br />
                    <input
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInput}
                    />
                    {formErrors.email && (
                        <p style={{ color: "red" }}>{formErrors.email}</p>
                    )}
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Password:</label>
                    <br />
                    <input
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={formValues.password}
                        onChange={handleInput}
                    />
                    {formErrors.password && (
                        <p style={{ color: "red" }}>{formErrors.password}</p>
                    )}
                </div>
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
            <Link to="/">bar</Link>
        </div>
    );
}

export default Reg;
