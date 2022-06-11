

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

const app = express();
const port = 5000;

app.listen(port,()=>{
    console.log(`It is listening on port : ${port}`);
});

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Database connected");
}).catch((error)=>console.log(error));

app.use("/auth",require("./routers/userRouter"));
app.use("/order",require("./routers/orderRouter"));
app.use("/cart",require("./routers/cartRouter"));

