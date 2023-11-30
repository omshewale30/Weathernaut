import './App.css';
import React, {useState} from "react";
import Login from "./Login";
import Homescreen from "./Homescreen";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from "./SignUp";
import WeatherView from "./WeatherView";
import ProfileIcon from "./ProfileIcon";
import ProfilePage from "./ProfilePage";

const App = () => {
    const isLoggedin= JSON.parse(localStorage.getItem("isLoggedIn"));


    return (
        <Router>
            <div>
                {isLoggedin && <ProfileIcon/>}
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Homescreen" element={<Homescreen />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/WeatherView" element={<WeatherView />} />
                    {isLoggedin && <Route path="/ProfilePage" element={<ProfilePage />} />}

                    {/* Add other routes as needed */}
                </Routes>
            </div>
        </Router>
    );
};


export default App;
