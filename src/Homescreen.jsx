import React, {useState, useEffect} from "react";
import Databse from "./database";

const Homescreen = () => {
    // const query = 'SELECT * FROM weather_app.location';
    // const {data,error} = Databse(query);
    // if (error) {
    //     return <div>error</div>
    // }
    return (
        <div>
            <h2>Weather App</h2>
            <h3>Locations</h3>
            <ul>
                <li>Location 1</li>
                {/*{data.map((location) => {*/}
                {/*    return <li key={location.locationid}>{location.city}</li>*/}
                {/*})}*/}
            </ul>
        </div>
    );
};
export default Homescreen;