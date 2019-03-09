const express = require("express")
const routes = require("./routes/auth")
const bodyParser = require("body-parser")
const path = require("path")

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes)

app.listen(3000);