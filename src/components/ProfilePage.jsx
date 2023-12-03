import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Form} from "react-bootstrap";
import '../stylesheets/Profile.css';


const ProfilePage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password'); // Replace with actual way to get the password
    const [locations, setLocations] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [formData, setFormData] = useState({
        locationid: '',
    });
    const [showWeather, setShowWeather] = useState(false);
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

    const handleDeleteUser = async () => {
        //pop-up to confirm deletion
        const isConfirmed = window.confirm("Are you sure you want to delete your account?");
        if (isConfirmed){

            try {
                const response = await fetch(`http://localhost:3001/api/v1/users/` + username , {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {

                    console.log('User deleted successfully');
                    // Optionally, clear local storage or perform other actions on successful deletion
                    localStorage.clear();
                    navigate('/');
                } else {
                    const data = await response.json();

                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }

        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Are you sure you want to update your location?");
        if (isConfirmed){
            try {
                const response = await fetch("http://localhost:3001/api/v1/users/" + username, {
                    method: "PUT",
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
                    window.localStorage.setItem("locationid", formData.locationid);
                    navigate('/WeatherView/'+ formData.locationid);
                    console.log("User Updated");
                }
            }catch (error) {
                console.log(error);
                setErrorMessage("An error occurred. Please try again.")
            }
        }
    };

    const handleLocationChange = (event) => {
        setShowWeather(false)
        const selectedLocationId = parseInt(event.target.value);
        console.log(selectedLocationId);
        // Update the locationid in the form data
        setFormData({
            ...formData,
            locationid: selectedLocationId.toString(),
        });

    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/v1/locations");

                if(!response.ok) {
                    throw new Error("HTTP Error! status: " + response.status);
                }
                const data = await response.json();
                setLocations(data);
            }catch (error) {
                console.log(error);
            }
        };
        fetchLocations();
    }, []);


    return (
        <div className="container mt-5 profile-container">
            <div className="col-md-6 offset-md-3">
                <h2 className="profile-header">Profile</h2>
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
                        <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>
                            Delete Account
                        </button>
                        <form onSubmit={handleSubmit}>
                            <Form>
                                <Form.Group controlId="locationSelect">

                                    <Form.Label>Select new preferred location:</Form.Label>
                                    <Form.Control as="select" onChange={handleLocationChange}>
                                        <option value="">Select a location</option>
                                        {locations.map((location) => (
                                            <option key={location.locationid} value={location.locationid}>
                                                {`${location.city}, ${location.country}`}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                            {/* Location selection drop-down */}
                            <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                                Submit
                            </button>
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                        </form>
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
