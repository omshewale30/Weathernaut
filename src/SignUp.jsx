import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";



const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState(null);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/v1/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)

            });

            if (response.status === 400) {
                const data = await response.json();
                setErrorMessage(data.error);
            } else if (!response.ok) {
                throw new Error("HTTP Error! status: " + response.status);
            }
            else {
                window.localStorage.setItem("isLoggedIn", true);
                window.localStorage.setItem("username", formData.username);
                navigate('/HomeScreen');
                console.log("User logged in");
            }
        }catch (error) {
            console.log(error);
            setErrorMessage("An error occurred. Please try again.")
        }
    };
    return (
        <div className="container mt-5">
            <div className="col-md-6 offset-md-3">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                </form>
            </div>
        </div>
    );


};

export default SignUp;
