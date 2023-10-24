// import express
const express = require('express');
// import db connection
const db = require('./config/connection');
// import routes
const routes = require('./routes');
// create port
const port = process.env.PORT || 3001;
// instantiate express
const app = express();
// use routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


// connect to db and server
db.once('open', () => {
    app.listen(port, () => {
        console.log(`API server running on port ${port}!`);
    });
});