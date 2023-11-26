const express = require('express');
const routes = require('./users/routes');

const app = express();
const port = 3000;

app.use(express.json());     // to support JSON-encoded bodies

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1/users', routes); // this line is going to be our middleware


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});