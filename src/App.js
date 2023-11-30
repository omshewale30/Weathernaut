import './App.css';
import React, {useState} from "react";
import Login from "./components/Login";
import Homescreen from "./components/Homescreen";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from "./components/SignUp";
import WeatherView from "./components/WeatherView";
import ProfileIcon from "./components/ProfileIcon";
import ProfilePage from "./components/ProfilePage";

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
