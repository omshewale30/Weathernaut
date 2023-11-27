
const getWeatherData = 'SELECT * FROM weather_app.weather_data ORDER BY dataid ASC';
const getWeatherDataById = 'SELECT * FROM weather_app.weather_data WHERE dataid = $1';
const getWeatherDataByLocationId = 'SELECT * FROM weather_app.weather_data WHERE locationid = $1';

module.exports = {
    getWeatherData,
    getWeatherDataById,
    getWeatherDataByLocationId

}