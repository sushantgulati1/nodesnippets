const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require('./routes/') //Add route

const app = express()

app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

app.listen(3000, (err) =>{
    if(err) console.log(err)
    console.log("Server running at localhost:3000")
})