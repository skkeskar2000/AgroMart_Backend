const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        requires : true
    },
    name : {
        type : String,
        requires : true
    },
    phoneNo : {
        type : String,
        requires : true
    }
});

const User = mongoose.model("user",userSchema);

module.exports = User;
