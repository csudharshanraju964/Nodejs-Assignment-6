const express = require('express');
const bodyParser=require('body-parser');
const app = express();


// Import routes
const blogRoute = require('./routes/blog');

app.use(bodyParser.json());
//Router MIddlewares
app.use(express.json());
app.use('/', blogRoute);

module.exports = app;
