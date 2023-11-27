const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(cors());
const routes = require('./users/routes');
const location_routes = require('./location/locationRoutes');
const weatherData_routes = require('./weatherData/weatherDataRoutes');




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