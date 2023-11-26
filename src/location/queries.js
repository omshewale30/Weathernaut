const getUsers= 'SELECT * FROM weather_app."user"';
const getUserById = 'SELECT * FROM weather_app."user" WHERE userid = $1';

module.exports = {
    getUsers,
    getUserById
}