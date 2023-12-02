// WelcomeComponent.jsx
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
        <div
            style={{
                textAlign: 'center',
                margin: '20px',
                padding: '20px',
                color: '#FFFFFF',
                backgroundColor: 'rgba(242, 242, 242, 0.2)', // Slightly transparent light gray background color
                borderRadius: '10px',
                fontFamily: 'Courier New, monospace',
            }}
        >
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>Weathernaut</h1>
            <p style={{ fontSize: '1.5rem' }}>Current Date and Time: {currentDateTime}</p>
        </div>
    );
};

export default WelcomeComponent;
