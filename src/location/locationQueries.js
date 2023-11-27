const locations= 'SELECT * FROM weather_app.location';
const locationById = 'SELECT * FROM weather_app.location WHERE locationid = $1';

module.exports = {
    locations,
    locationById
}