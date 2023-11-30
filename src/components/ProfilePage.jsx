import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password'); // Replace with actual way to get the password
    const navigate = useNavigate();
    const isLoggedin= JSON.parse(localStorage.getItem("isLoggedIn"));
    console.log(isLoggedin);


    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleLogout = () => {
        // Clear user information from local storage
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        // Redirect to the login page
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <div className="col-md-6 offset-md-3">
                <h2>Profile</h2>
                {isLoggedin ? (
                    <div>
                        <p>Username: {username}</p>
                        <p>
                            Password: {showPassword ? password : '********'}
                            <span
                                className="toggle-password"
                                onClick={toggleShowPassword}
                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                            >
                {showPassword ? '🙈 Hide' : '👁️ Show'}
              </span>
                        </p>
                        <button className="btn btn-primary" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div>
                        <p>Please log in to view your profile.</p>
                        <button className="btn btn-primary" onClick={() => navigate('/')}>
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
