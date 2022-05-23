const mongoose = require("mongoose")

const cartSchema =  new mongoose.Schema({
    productName : {
        type : String,
        required : true,
    },  
    productPrice     : {
        type : String,
        required : true
    },
    productQuantity : {
        type : String,
        required : true
    },
    productImageNumber : {
        type : String,
        required : true,
    },
    userId : {
        type : String,
        required : true,
    },
})


const cart = mongoose.model("cart",cartSchema);
module.exports = cart;