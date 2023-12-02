import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../stylesheets/LoginSignUpStyling.css';


import user_signup_icon from '../Assets/person.png';
import email_signup_icon from '../Assets/email.png';
import password_signup_icon from '../Assets/password.png';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const SignUp = () => {
    const [locations, setLocations] = useState([]);
    const [showWeather, setShowWeather] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        locationid: '',
    });

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

    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/');
    }

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
                window.localStorage.setItem("password", formData.password);
                window.localStorage.setItem("locationid", formData.locationid);
                navigate('/WeatherView/'+ formData.locationid);
                console.log("User logged in");
            }
        }catch (error) {
            console.log(error);
            setErrorMessage("An error occurred. Please try again.")
        }
    };
    return (
        <div className="login-container">

            <div className="col-md-6 offset-md-3">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">
                        <img src={user_signup_icon} alt="" className='icon'/>
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
                        <img src={password_signup_icon} alt="" className='icon'/>
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
                    <div className="form-group">
                        <label htmlFor="email">
                        <img src={email_signup_icon} alt="" className='icon'/>
                        Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <Form>
                        <Form.Group controlId="locationSelect">
                            <Form.Label>Select Location:</Form.Label>
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
                    <button type="button" className="btn btn-link" onClick={handleLoginClick}>
                        Go back to Login Page
                    </button>
                </form>
            </div>
        </div>
    );


};

export default SignUp;
