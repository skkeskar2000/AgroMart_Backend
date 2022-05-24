const { response } = require("express");
const express = require("express");
const router = express.Router();
const cart = require("../model/cartModel")

router.post("/addcart", async (req,res)=>{
    try{
        const {productName ,productPrice,productQuantity,productImageNumber,userId} = req.body;

        // console.log(req.body);

        //validation
        if(!productName || !productPrice || !productQuantity || !productImageNumber || !userId){
            return res.status(400).json({errorMessage: "Plese Check all data is proper"});
        };

        const newCart = new cart({
            productName,
            productPrice,
            productQuantity,
            productImageNumber,
            userId,
        })
        const findCart = await cart.findOne({userId : userId,productName:productName});
        if(findCart){
            price = productPrice + findCart["productPrice"];
            // console.log(price);
            const updateCart = await cart.updateOne({userId : userId,productName:productName},
                {
                    $inc :
                    {
                        "productQuantity" : 1,
                    },   
                },
                // {$set: {"productPrice": price}}
                );
                // console.log(updateCart);
            return res.status(200).send({message : "Added to Cart Successfully"});
        }

        const saveCart = await newCart.save();
        // console.log(saveCart);
        return res.status(200).send({message : "Added to Cart Successfully"});

    }catch(error){
        console.log(error);
        return res.status(400).send({message : "Something went wrong "});

    }
});


router.get("/getcart",async(req,res)=>{
    try{
        const userId = req.query.userId;
        
        const findCart = await cart.find({userId : userId});

        if(!findCart){
            return res.status(200).json({message : "No Order Place"});
        }

        return res.status(200).json(findCart);
    }catch(error){
        console.log(error);
    }
});


router.post("/delete",async(req,res)=>{
    try {
        const {productName , userId} = req.body;
        
        const findCartItem = await cart.findOne({userId : userId,productName : productName});

        if(!findCartItem){
            return res.status(200).send({message : "No item present in cart"})
        }
        
        const deleteCartItem = await cart.deleteOne({userId : userId, productName : productName})
        return res.status(200).send({message : "Deleted Successfully "})

    } catch (error) {
        console.log(error);
        return res.status(400).send({message : "Something went wrong "});
    }
});
module.exports = router;
