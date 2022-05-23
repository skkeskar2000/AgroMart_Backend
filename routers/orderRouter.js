const express = require("express");
const { find } = require("../model/orderModel");
const order = require("../model/orderModel")
const router =  express.Router();


const app = express();


router.post("/",async(req,res)=>{
    try {
        const {productName ,productPrice,productQuantity,productImageNumber,userId} = req.body;
        // console.log(req.body);

        //validation
        if(!productName || !productPrice || !productQuantity || !productImageNumber || !userId){
            return res.status(400).json({message: "Plese Check all data is proper"});
        };

        const newOrder = new order({
            productName,
            productPrice,
            productQuantity,
            productImageNumber,
            userId,
        });
        const savedOrder = await newOrder.save();
        return res.status(200).json({message : "Order Is Successfull"});

    } catch (error) {
        console.log(error);
        return res.status(200).json({message : "some thing went wrong"});
    }
});

router.get("/getOrder",async(req,res)=>{
    try{
        const userId = req.query.userId;
        
        const findOrder = await order.find({userId : userId});

        if(!findOrder){
            return res.status(200).json({message : "No Order Place"});
        }

        return res.status(200).json(findOrder);
    }catch(error){
        console.log(error);
    }
});

module.exports = router;