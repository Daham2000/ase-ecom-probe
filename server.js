const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// CORS Configs...
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    next();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});