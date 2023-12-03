
const getUsers= 'SELECT * FROM weather_app."user"';
const getUserById = 'SELECT * FROM weather_app."user" WHERE userid = $1';
const checkIfUserExists = 'SELECT * FROM weather_app."user" WHERE username = $1 AND password = $2';  //check if user exists
const getUserByUserName = 'SELECT * FROM weather_app."user" WHERE username = $1';

const checkIfEmailExists = 'SELECT * FROM weather_app."user" WHERE email = $1';

const createUser = 'INSERT INTO weather_app."user"(username, email, password, locationid) VALUES ($1, $2, $3, $4)';
const deleteUser = 'DELETE FROM weather_app."user" WHERE username = $1';

const updateUser = 'UPDATE weather_app."user" SET  locationid = $2 WHERE username = $1';

module.exports = {
    getUsers,
    getUserById,
    checkIfUserExists,
    checkIfEmailExists,
    createUser,
    deleteUser,
    updateUser,
    getUserByUserName
}