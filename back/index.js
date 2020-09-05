const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
require('./db');
const port = 5000;
var cors = require('cors');//npm i cors
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
const routes = require('./routes/User');
app.use(routes);

app.listen(port, (req, res) => {
    console.log("Server is running on port " + port)
})