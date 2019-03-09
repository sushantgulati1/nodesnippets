const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Make changes as per your DB and collection
mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true})

var user = new Schema ({
    email : String,
    password : String
})

var User = mongoose.model('User', user, 'User')

module.exports = User;