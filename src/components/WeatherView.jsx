import React, { useState, useEffect } from 'react';
import { BsCloud, BsSun, BsCloudRain, BsSunFill, BsCloudLightningRain } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import {Button} from "react-bootstrap";
import '../stylesheets/WeatherView.css';
const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            return <BsSun />;
        case 'cloudy':
            return <BsCloud />;
        case 'rainy':
            return <BsCloudRain />;
        case 'sunny':
            return <BsSunFill />;
        case 'partly cloudy':
            return <BsCloudLightningRain />;
        default:
            return null;
    }
};
const WeatherView = () => {
    const {locationId,city,country} = useParams();
    const [weatherData, setWeatherData] = useState(null);
    console.log(city)

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // Assuming you have an API endpoint to fetch weather data based on locationId
                console.log("http://localhost:3001/api/v1/weatherData/location/"+ locationId);
                const response = await fetch('http://localhost:3001/api/v1/weatherData/location/'+ locationId);

                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }

                const data = await response.json();
                console.log(data);
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        if (locationId) {

            fetchWeatherData();
        }
    }, [locationId]);



    return (
        <div className={`weather-container ${weatherData ? weatherData[0].weather_condition.toLowerCase() : ''}`}>
            <h2>Weather Information for {city},{country} </h2>
            {weatherData ? (
                <div className= "weather-info-container">
                    {weatherData.map((data, index) => (
                        <div key={index} className="weather-info-box">
                            <div className="weather-icon">{getWeatherIcon(data.weather_condition)}</div>
                            <p>Date: {data.date}</p>
                            <p>Weather Condition: {data.weather_condition}</p>
                            <p>Temperature: {data.temperature} C</p>
                            <p>Humidity: {data.humidity} %</p>
                            <p>Precipitation: {data.precipitation} mm</p>
                            <p>Wind Speed: {data.windspeed} mp/h</p>
                            <p>Pressure: {data.pressure} pa</p>
                            <hr />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
            <Button href="/HomeScreen" variant="primary">Change location</Button>
        </div>

    );
};

export default WeatherView;
