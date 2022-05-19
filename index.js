

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 5000;

app.listen(port,()=>{
    console.log(`It is listening on port : ${port}`);
});

app.use(express.json());

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Database connected");
}).catch((error)=>console.log(error));

app.use("/auth",require("./routers/userRouter"));
