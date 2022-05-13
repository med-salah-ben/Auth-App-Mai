const mongoose = require('mongoose');

require("dotenv").config();

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.Mongo_URI);
        console.log("Database connected....")
    } catch (error) {
        console.log(`database failed to connected ${error}`)
    }
}

module.exports = connectDB ;