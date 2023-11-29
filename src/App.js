import './App.css';
import React from "react";
import Login from "./Login";
import Homescreen from "./Homescreen";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from "./SignUp";
import WeatherView from "./WeatherView";


const App = () => {
    const login= window.localStorage.getItem("isLoggedIn");

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/Homescreen" element={<Homescreen />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/WeatherView" element={<WeatherView />} />
                    {/* Add other routes as needed */}
                </Routes>
            </div>
        </Router>
    );
};


export default App;
