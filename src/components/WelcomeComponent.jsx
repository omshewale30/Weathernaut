// WelcomePage.jsx
import React, { useEffect, useState } from 'react';

const WelcomeComponent = () => {
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formattedDateTime = now.toLocaleString(); // Adjust the format as needed
            setCurrentDateTime(formattedDateTime);
        };
        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <div>
            <h1 className="display-4 font-weight-bold">Weathernaut</h1>
            <p>Current Date and Time: {currentDateTime}</p>
        </div>
    );
};

export default WelcomeComponent;