const getUsers= 'SELECT * FROM weather_app."user"';
const getUserById = 'SELECT * FROM weather_app."user" WHERE userid = $1';

const checkifEmailExists = 'SELECT * FROM weather_app."user" WHERE email = $1';

const createUser = 'INSERT INTO weather_app."user" (username, email, password) VALUES ($1, $2, $3) RETURNING *';

module.exports = {
    getUsers,
    getUserById,
    checkifEmailExists,
    createUser
}