import React, {useState, useEffect} from "react";

import WelcomeComponent from "./WelcomeComponent";
import {useNavigate} from "react-router-dom";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../stylesheets/Homescreen.css';


const Homescreen = () => {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showWeather, setShowWeather] = useState(false);
    const navigate = useNavigate();


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
        const location = locations.find((loc) => loc.locationid === selectedLocationId);
        setSelectedLocation(location);
        console.log(location);

    };

    const handleShowWeatherClick= () =>{
        if(selectedLocation){
            setShowWeather(true);
            navigate('/WeatherView/'+ selectedLocation.locationid);

        }
    };
    return (
        <div className="homescreen-container">
            <Container className="mt-5">
                <Row>
                    <WelcomeComponent/>
                </Row>
                <div className = "homescreen-content">
                <Row>
                    <Col md={6} className="offset-md-3">
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
                            <Button variant="primary" onClick={handleShowWeatherClick} disabled={!selectedLocation} className="m-5">
                                Show Weather
                            </Button>
                        </Form>
                    </Col>
                </Row>
                </div>
            </Container>
        </div>

    );
};
export default Homescreen;