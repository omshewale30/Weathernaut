const pool = require('../db');
const queries = require('./queries');


const getUsers = async (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const getUserById = async (req, res) => { // this is a route handler
    const userid = req.params.userid;

    pool.query(queries.getUserById, [userid], (error, results) => { // this is a query handler
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}


module.exports = {
    getUsers,
    getUserById
};