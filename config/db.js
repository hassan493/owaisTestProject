const  mongoose = require('mongoose');
const env = require("dotenv");

env.config();

// CONNECT_DB connected the MongoDB with the app.
   const CONNECT_DB = async()=> { try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URL)
   }
   catch (err) {
    console.log('Exiting from thrown error', err);
    process.exit(1)
   }}

module.exports = {
   CONNECT_DB
 };
 