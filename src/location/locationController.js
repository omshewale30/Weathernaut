const pool = require('../db');
const queries = require('./locationQueries');


const getLocation = async (req, res) => {
    pool.query(queries.locations, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const getLocationId = async (req, res) => { // this is a route handler
    const locationid = parseInt(req.params.locationid);

    pool.query(queries.locationById, [locationid], (error, results) => { // this is a query handler
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}


module.exports = {
    getLocation,
    getLocationId
};