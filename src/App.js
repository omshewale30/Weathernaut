import './App.css';
import React from "react";
import UserForm from "./UserForm";
import Homescreen from "./Homescreen";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<UserForm/>} />
                    <Route path="/Homescreen" element={<Homescreen />} />
                    {/* Add other routes as needed */}
                </Routes>
            </div>
        </Router>
    );
};


export default App;
