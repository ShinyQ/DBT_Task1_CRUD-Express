const express = require('express');
const route = require('./routes/route');
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api_v1",route(express));
app.listen(5000, () => {
    console.log('Success running 5000');
});
module.exports = app;