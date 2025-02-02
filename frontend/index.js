const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

// Serve static files
app.use(express.static('public'));

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Started server at http://localhost:${port}`);
});