const express = require("express");
const router = express.Router();
const User = require("../model/userModel");

router.post("/",async(req,res)=>{
    try{
    
        const {email, password, passwordVerify, name ,phoneNo,address} = req.body;

        console.log(req.body);
        //validation
        if(!email || !password || !passwordVerify || !name || !phoneNo){
            return res.status(400).json({errorMessage: "Plese enter all require fields"});
        }

        if(password.length < 5){
            return res.status(400).json({errorMessage: "Plese enter password more the 6 character"});
        }
                
        if(phoneNo.length < 10){
            return res.status(400).json({errorMessage: "Plese enter phone number 10 digit"});
        }

        if(password !== passwordVerify){
            return res.status(400).json({errorMessage: "Plese enter the same password"});
        }

        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(400).json({errorMessage : "With this user already exists."});
        }

        const newUser = new User({
            email,
            password,
            name,
            phoneNo,
            address
        })

        const savedUser = await newUser.save();
        res.status(200).send(savedUser);
        

    }catch(error){
        console.log(error);
    };
});

router.post("/login",async(req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({errorMessage : "Plese Enter all required filled "});
        }
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(401).json({errorMessage : "Wrong Password or email"});
        }
        
        if(existingUser.password !== password){
            return res.status(401).json({errorMessage : "Wrong Password or email"});
        }
        
        if(existingUser.password === password){
            return res.status(200).json(existingUser);
        }
    }catch(error){
        console.log(error);
    };
})
module.exports = router;