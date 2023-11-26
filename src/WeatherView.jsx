// WeatherView.jsx
import React, { useState, useEffect } from 'react';

const WeatherView = ({ selectedLocation }) => {
    const [weatherDetails, setWeatherDetails] = useState(null);

    useEffect(() => {
        // Fetch weather details based on the selectedLocation
        // Replace the following with your actual API call to fetch weather details

        // For demonstration purposes, using dummy data
        const dummyWeatherDetails = {
            pressure: 1015,
            precipitation: 0.5,
            date: '2023-11-24',
            temperature: 20,
            humidity: 60,
            windspeed: 10,
            weather_condition: 'Clear',
        };

        setWeatherDetails(dummyWeatherDetails);
    }, [selectedLocation]);

    return (
        <div>
            <h2>Weather Details</h2>
            {weatherDetails ? (
                <div>
                    <p>Pressure: {weatherDetails.pressure} hPa</p>
                    <p>Precipitation: {weatherDetails.precipitation} mm</p>
                    <p>Date: {weatherDetails.date}</p>
                    <p>Temperature: {weatherDetails.temperature} °C</p>
                    <p>Humidity: {weatherDetails.humidity}%</p>
                    <p>Wind Speed: {weatherDetails.windspeed} km/h</p>
                    <p>Weather Condition: {weatherDetails.weather_condition}</p>
                </div>
            ) : (
                <p>Loading weather details...</p>
            )}
        </div>
    );
};

export default WeatherView;
