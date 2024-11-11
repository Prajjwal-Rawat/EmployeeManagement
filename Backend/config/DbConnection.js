const mongoose = require("mongoose");
require("dotenv").config();



exports.DbConnection = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) => {
        console.log("Error in db Connection", err.message);
        process.exit(1);
    });
}