const express = require('express');
const route = require('./routes/route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', route(express));

app.listen(5000);

module.exports = app;
