
const getUsers= 'SELECT * FROM weather_app."user"';
const getUserById = 'SELECT * FROM weather_app."user" WHERE userid = $1';

const checkIfEmailExists = 'SELECT * FROM weather_app."user" WHERE email = $1';

const createUser = 'INSERT INTO weather_app."user"(username, email, password) VALUES ($1, $2, $3)';
const deleteUser = 'DELETE FROM weather_app."user" WHERE userid = $1';

const updateUser = 'UPDATE weather_app."user" SET username = $1, email = $2, password = $3 WHERE userid = $4';

module.exports = {
    getUsers,
    getUserById,
    checkIfEmailExists,
    createUser,
    deleteUser,
    updateUser
}