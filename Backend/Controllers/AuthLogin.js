const AdminModel = require("../Models/AdminModel");
// const validate = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();



exports.Login = async(req,res) => {
    try{
        const {userName, password} = req.body;

        if(!userName || !password){
            return res.status(400).json(
                {
                    success:false,
                    message:"Please fill all the details"
                }
            )
        }

        // const isValidEmail = validate.isEmail(email);

        // if(!isValidEmail){
        //     return res.status(400).json(
        //         {
        //             success:false,
        //             message:"Please provide a valid email"
        //         }
        //     )
        // }

        const admin = await AdminModel.findOne({userName});

        if(!admin){
            return res.status(404).json(
                {
                    success:false,
                    message:"Admin not found"
                }
            )
        }

        if(await bcrypt.compare(password, admin.password)){

            const payload = {
                userName: admin.userName,
                accountType: admin.accountType,
                id: admin._id
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "3h",
            });

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie("Token", token, options).json(
                {
                    success:true,
                    token,
                    data:{
                     username:admin.userName
                    },
                    message:"Login Successfull"
                }
            )

        }else {
            res.status(400).json(
                {
                    success:false,
                    message:"Password doesn't match"
                }
            )
        }

    }catch(err){
        console.log("Error in login ", err.message);
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Internal Error in Login"
            }
        )
    }
}