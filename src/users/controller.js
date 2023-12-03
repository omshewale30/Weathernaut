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

const checkIfUserExists = async (req, res) => {
    try {
        const { username, password } = req.params;

        console.log("Username:", username);
        if (!username || !password) {
            return res.status(400).json({ error: 'Please fill all fields' });
        }

        const queryResult = await pool.query(queries.checkIfUserExists, [username, password]);
        if (queryResult.rows.length > 0) {
            const user = queryResult.rows[0]
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password, locationid } = req.body;
        const intlocationid = parseInt(locationid);

        console.log("Username: " + username + "email: " + email + "Password: " + password  + "LocationID: " + locationid);

        // Check if any of the fields are empty
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Please fill all fields' });
        }

        const emailExistsResult = await pool.query(queries.checkIfEmailExists, [email]);

        if (emailExistsResult.rows.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const createUserResult = await pool.query(queries.createUser, [username, email, password, intlocationid]);

        res.status(201).json({ message: 'User added' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// const createUser = async (req, res) => {
//     console.log(req.body);
//     const {username, email, password} = req.body;
//
//     console.log("Username: " + username+ "email: " + email + "Password: " + password);
//
//     pool.query(queries.checkIfEmailExists, [email], (error, results) => {
//         if (results.rows.length) {
//             res.send('Email already exists');
//         }
//         pool.query(queries.createUser, [username, email, password], (error, results) => {
//             if (error) {
//                 throw error;
//             }
//             res.status(201).send(`User added`);
//         }
//         );
//
//     });
// };

const deleteUser = async (req, res) => {
    const username = (req.params.username);

    pool.query(queries.getUserByUserName, [username], (error, results) => {
        if (!results.rows.length) {
            res.send('User does not exist');
        }

        pool.query(queries.deleteUser, [username], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`User deleted with UserName ${username}`);
        });
    });
}

const updateUser = async (req, res) => {
    const { username } = req.params;
    const { locationid } = req.body;

    pool.query(queries.getUserByUserName, [username], (error, results) => {
        if (!results.rows.length) {
            res.send('User does not exist');
        }

        pool.query(queries.updateUser, [username, locationid], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`User modified with userName: ${username}`);
        });
    });

}


module.exports = {
    getUsers,
    getUserById,
    checkIfUserExists,
    createUser,
    deleteUser,
    updateUser
};