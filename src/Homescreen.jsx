import React, {useState, useEffect} from "react";


const Homescreen = () => {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);


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
        const selectedLocationId = event.target.value;
        const location = locations.find((loc) => loc.id === selectedLocationId);
        setSelectedLocation(location);
    };

    return (
        <div>
            <h2>Home Screen</h2>
            <label>
                Select Location:
                <select onChange={handleLocationChange}>
                    <option value="">Select a location</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                            {`${location.city}, ${location.country}`}
                        </option>
                    ))}
                </select>
            </label>

            {selectedLocation && (
                <div>
                    <p>Selected Location: {`${selectedLocation.city}, ${selectedLocation.country}`}</p>
                    {/* Render other components or details based on the selected location */}
                </div>
            )}
        </div>
    );
};
export default Homescreen;