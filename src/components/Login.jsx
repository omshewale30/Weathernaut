import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import './LoginSignUpStyling.css';

import user_icon from './Assets/person.png';
import password_icon from './Assets/password.png';


const Login = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSignUpClick = () => {
        navigate('/SignUp');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            setErrorMessage('Please enter username and password');
            return;
        }

        const response = await fetch("http://localhost:3001/api/v1/users/checkIfUserExists/" + formData.username + "/" + formData.password);

        if (response.status === 400) {
            const data= await response.json();
            setErrorMessage(data.error)
        } else if (response.ok) {
            window.localStorage.setItem("isLoggedIn", JSON.stringify(true));


            window.localStorage.setItem("username", formData.username);
            window.localStorage.setItem("password", formData.password);
            navigate('/HomeScreen');
            console.log("User logged in");
        }
        else {
            setErrorMessage("Username or password is incorrect");
        }
    };
    return (
        <div className="login-container">
            <div className="col-md-6 offset-md-3">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">
                        <img src={user_icon} alt="" className='icon'/>
                        Username:</label>
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
                        <label htmlFor="password">
                        <img src={password_icon} alt="" className='icon'/>
                        Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                        Submit
                    </button>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <button type="button" className="btn btn-link" onClick={handleSignUpClick}>
                        Don't have an account? Sign Up
                    </button>
                </form>
            </div>
        </div>
    );


};

export default Login;
