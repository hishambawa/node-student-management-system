const express = require('express');
const MongoRepository = require('./repository/mongoRepo');
const StudentDao = require('./repository/studentDao');
const addHandlers = require('./handlers/studentHandler');

const app = express();
const port = process.env.PORT || 3000;

// add middleware parse request body as JSON
app.use(express.json());

// add middleware to log the requests
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url} ${JSON.stringify(req.body)}`);
    next();
});

// add error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An error occurred' });
})

// create the database repository
const mongoRepo = new MongoRepository();

// create the DAO
const studentDao = new StudentDao(mongoRepo);

// add handlers
addHandlers(app, studentDao);

// start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});