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
    const {username, email, password} = req.body[0];
    console.log("Username: " + username+ "email: " + email + "Password: " + password);

    pool.query(queries.checkIfEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.send('Email already exists');
        }
        pool.query(queries.createUser, [username, email, password], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(201).send(`User added`);
        }
        );

    });
};

const deleteUser = async (req, res) => {
    const userid = parseInt(req.params.userid);

    pool.query(queries.getUserById, [userid], (error, results) => {
        if (!results.rows.length) {
            res.send('User does not exist');
        }

        pool.query(queries.deleteUser, [userid], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`User deleted with ID: ${userid}`);
        });
    });
}

const updateUser = async (req, res) => {
    const userid = parseInt(req.params.userid);
    const {username, email, password} = req.body[0];

    pool.query(queries.getUserById, [userid], (error, results) => {
        if (!results.rows.length) {
            res.send('User does not exist');
        }

        pool.query(queries.updateUser, [username, email, password, userid], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`User modified with ID: ${userid}`);
        });
    });

}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
};