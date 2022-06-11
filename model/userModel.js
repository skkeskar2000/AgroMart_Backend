const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    phoneNo : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true,
    }
});

const User = mongoose.model("user",userSchema);

module.exports = User;
