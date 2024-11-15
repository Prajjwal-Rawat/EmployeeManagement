const jwt = require("jsonwebtoken");
require("cookie-parser");
require("dotenv").config();



exports.auth = async(req,res,next) => {
    try{
        console.log("Token hi nhi mil rha ")
        const token = req.cookies.Token || req.header("Authorization").replace("Bearer ", "")  || req.body.Token;
        console.log("TOken mil gya")
        if(!token){
            return res.status(400).json(
                {
                    success:false,
                    message:"Token is missing "
                }
            )
        }
        console.log("Token -> ", token);

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            console.log("Verified token");
            console.log("Decoded payload -> ", decode);

            req.user = decode;

        }catch(err){
            console.log("Token is not verified", err.message);
            return res.status(401).json(
                {
                    success:false,
                    message:"Invalid Token, Issue in verification of token"
                }
            )
        }

        next();

    }catch(err){
        console.log("error in token verification");
        res.status(500).json(
            {
                success:false,
                error: err.message,
                message:"Error in token validation"
            }
        )
    }
}


exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(400).json(
                {
                    success:false,
                    message:"This is protected route only for admin"
                }
            )
        }

        next();

    }catch(err){
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"User role can not be verified, Please try again"
            }
          )
    }
}