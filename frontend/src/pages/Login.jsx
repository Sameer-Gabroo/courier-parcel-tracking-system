import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLock, FiMail, FiTruck, FiAlertCircle } from "react-icons/fi";
import "../styles/login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (event) => {

        event.preventDefault();

        // Clear previous error
        setErrorMessage("");


        try {

            const response = await axios.post(
                "https://localhost:7117/api/Auth/login",
                {
                    email: email,
                    password: password
                }
            );


            console.log(response.data);


            if (response.data.success) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data)
                );


                const role = response.data.roles[0];


                if (role === "Customer") {

                    navigate("/Tracking");

                } else {

                    navigate("/dashboard");

                }
            }

        } catch (error) {

            console.error(error);


            // Handle API error response
            if (error.response) {

                // If your API returns:
                // { message: "Invalid email or password." }

                setErrorMessage(
                    error.response.data?.message ||
                    "Invalid email or password."
                );

            } else {

                // Server/network error
                setErrorMessage(
                    "Unable to connect to the server. Please try again."
                );
            }
        }
    };


    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-card-body">


                    {/* Logo / Heading */}

                    <div className="text-center mb-4">

                        <div className="login-logo">
                            <FiTruck />
                        </div>

                        <h2 className="login-title">
                            Courier Tracking
                        </h2>

                        <p className="login-subtitle">
                            Sign in to your account
                        </p>

                    </div>


                    <form onSubmit={handleSubmit}>


                        {/* Email */}

                        <div className="mb-3">

                            <label
                                htmlFor="email"
                                className="form-label"
                            >
                                Email
                            </label>


                            <div className="input-with-icon">

                                <FiMail />

                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                        setErrorMessage("");
                                    }}
                                    required
                                />

                            </div>

                        </div>


                        {/* Password */}

                        <div className="mb-3">

                            <label
                                htmlFor="password"
                                className="form-label"
                            >
                                Password
                            </label>


                            <div className="input-with-icon">

                                <FiLock />

                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                        setErrorMessage("");
                                    }}
                                    required
                                />

                            </div>

                        </div>


                        {/* Error Message */}

                        {errorMessage && (

                            <div
                                className="alert alert-danger d-flex align-items-center"
                                role="alert"
                            >

                                <FiAlertCircle
                                    className="me-2"
                                />

                                <span>
                                    {errorMessage}
                                </span>

                            </div>

                        )}


                        {/* Login Button */}

                        <button
                            type="submit"
                            className="btn btn-primary login-submit w-100"
                        >
                            Sign In
                        </button>


                    </form>

                </div>

            </div>

        </div>
    );
}


export default Login;