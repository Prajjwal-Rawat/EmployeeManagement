const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
       type:String,
       enum: "Admin",
    }
});


module.exports = mongoose.model("AdminModel", adminSchema);