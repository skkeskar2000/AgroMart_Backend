const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true,
    },  
    productPrice : {
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
});

const order = mongoose.model("order",orderSchema);
module.exports = order;