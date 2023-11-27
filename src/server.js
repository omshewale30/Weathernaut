const express = require('express');
const routes = require('./users/routes');
const location_routes = require('./location/locationRoutes');
const weatherData_routes = require('./weatherData/weatherDataRoutes');


const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1/users', routes); // this line is going to be our middleware
app.use('/api/v1/locations', location_routes); // this line is going to be our middleware
app.use('/api/v1/weatherData', weatherData_routes); // this line is going to be our middleware


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});