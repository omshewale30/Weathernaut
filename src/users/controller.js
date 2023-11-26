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
    const userid = parseInt(req.params.userid);

    pool.query(queries.getUserById, [userid], (error, results) => { // this is a query handler
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}

const createUser = async (req, res) => {
    const {username, email, password} = req.body;

    pool.query(queries.checkifEmailExists, [email], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length > 0) {
            res.status(409).send('Email already exists');
        }
        else {
            pool.query(queries.createUser, [username, email, password], (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(201).send(`User added with ID: ${results.insertId}`);
            });
        }
    });
}


module.exports = {
    getUsers,
    getUserById,
    createUser
};