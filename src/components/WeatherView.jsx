import React, { useState, useEffect } from 'react';

const WeatherView = ({ locationId }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // Assuming you have an API endpoint to fetch weather data based on locationId
                console.log("making an api call with " +locationId);
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
        <div>
            <h2>Weather Information</h2>
            {weatherData ? (
                <div>
                    {weatherData.map((data, index) => (
                        <div key={index}>
                            <p>Pressure: {data.pressure}</p>
                            <p>Precipitation: {data.precipitation}</p>
                            <p>Data ID: {data.dataid}</p>
                            <p>Date: {data.date}</p>
                            <p>Temperature: {data.temperature}</p>
                            <p>Humidity: {data.humidity}</p>
                            <p>Wind Speed: {data.windspeed}</p>
                            <p>Weather Condition: {data.weather_condition}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>

    );
};

export default WeatherView;
