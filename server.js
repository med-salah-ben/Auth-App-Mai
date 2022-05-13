const express = require("express");
require("dotenv").config({path:"./config/.env"});
const connectDB = require("./config/connectDB");
const Auth = require('./routes/Auth');

connectDB()

const app = express();
app.use(express.json());
app.use("/api",Auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT,(err)=>{
    err? console.log(err)
    :console.log(`server is running on port ${PORT}`)
})