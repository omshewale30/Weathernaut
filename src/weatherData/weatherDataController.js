const pool = require('../db');
const queries = require('./weatherDataQueries');
const util = require('util');
const poolQuery = util.promisify(pool.query);

const getWeatherData = async (req, res) => {
    pool.query(queries.getWeatherData, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const getWeatherDataById = async (req, res) => { // this is a route handler
    const weatherDataId = parseInt(req.params.weatherDataId);

    pool.query(queries.getWeatherDataById, [weatherDataId], (error, results) => { // this is a query handler
        if (error) {
            throw error;
        }

        res.status(200).json(results.rows);
    });
}


const getWeatherDataByLocationId = async (req, res) => { // this is a route handler
    const locationId = req.params.locationId;
    pool.query(queries.getWeatherDataByLocationId, [locationId], (error, results) => { // this is a query handler

        if (error) {

            throw error;
        }
        res.status(200).json(results.rows);
    });
}


module.exports = {
    getWeatherData,
    getWeatherDataById,
    getWeatherDataByLocationId
}