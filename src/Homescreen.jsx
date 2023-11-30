import React, {useState, useEffect} from "react";
import Button from "bootstrap/js/src/button";
import WeatherView from "./WeatherView";


const Homescreen = () => {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showWeather, setShowWeather] = useState(false);


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
        const selectedLocationId = parseInt(event.target.value);
        console.log(selectedLocationId);
        const location = locations.find((loc) => loc.locationid === selectedLocationId);
        setSelectedLocation(location);
        console.log(location);

    };

    const handleShowWeatherClick= () =>{
        setShowWeather(true)

    };

    return (
        <div>
            <h2> Weathernaut </h2>
            <label>
                Select Location:
                <select onChange={handleLocationChange}>
                    <option value="">Select a location</option>
                    {locations.map((location) => (
                        <option key={location.locationid} value={location.locationid}>
                            {`${location.city}, ${location.country}`}
                        </option>
                    ))}
                </select>
            </label>
            <button onClick={handleShowWeatherClick} disabled={!selectedLocation}>
                Show Weather
            </button>

            {selectedLocation && (
                <div>
                    <p>Selected Location: {`${selectedLocation.city}, ${selectedLocation.country}`}</p>
                </div>
            )}
            {showWeather && (
                <WeatherView locationId={selectedLocation.locationid} />
            )}

        </div>
    );
};
export default Homescreen;