const EmployeeModel = require("../Models/EmployeeModel");
const validate = require("validator");
const { imageUpload } = require("../Utils/imageUpload");




exports.createEmployee = async(req,res) => {
    try{
       const {name, email, mobile, designation, gender, course} = req.body;

       const image = req.files.image;

       if(!name || !email || !mobile || !designation || !gender || !course || !image){
         return res.status(400).json(
            {
                success:false,
                message:"All fields are required, Please provide all the details"
            }
         )
       }

       const isEmailValid = validate.isEmail(email);
       if(!isEmailValid){
        return res.status(400).json(
            {
                success:false,
                message:"Please provide a valid email"
            }
        )
       }

       const imgUploadRes = await imageUpload(image, "Employees Image");

       const employeeDetails = await EmployeeModel.create({
        name,
        email,
        mobile,
        designation,
        gender,
        course,
        imgUrl: imgUploadRes.secure_url
       })

       res.status(201).json(
        {
            success:true,
            data: employeeDetails,
            message:"Employee created successfully"
        }
       )

    }catch(err){
        console.log("Error in creating employee ", err.message);
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Internal Server Error in creating employee details"
            }
        )
    }
}



exports.getAllEmployees = async(req,res) => {
    try{
        const allEmployeesData = await EmployeeModel.find({});
        if(!allEmployeesData){
            return res.status(404).json(
                {
                    success:false,
                    message:"No employee found"
                }
            )
        }

        res.status(200).json(
            {
                success:true,
                data:allEmployeesData,
                message:"All employees are fetched successfully"
            }
        )
    }catch(err){
        console.log("Error in fetching all employees data");
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Error in fetching employees details"
            }
        )
    }
}



exports.getEmployee = async(req,res) => {
    try{
        const {id} = req.params;

        const employee = await EmployeeModel.findById(id);

        if(!employee){
            return res.status(404).json(
                {
                    success:false,
                    message:"Employee not found"
                }
            )
        }

        res.status(200).json(
            {
                success:true,
                data: employee,
                message:"Successfully fetched employee"
            }
        )
    }catch(err){
       console.log("Error in fetching employee by ID", err.message);
       res.status(500).json(
        {
            success:false,
            error:err.message,
            message:"Failure in fetching employee details"
        }
       )
    }
}



exports.deleteEmployee = async(req,res) => {
    try{
        const {id} = req.params;

        const employee = await EmployeeModel.findByIdAndDelete(id);

        if(!employee){
            return res.status(404).json(
                {
                    success:false,
                    message:"Employee not found"
                }
            )
        }

        res.status(200).json(
            {
                success:true,
                data: employee,
                message:"Successfully Deleted Employee Details"
            }
        )
    }catch(err){
        console.log("Got Error while Deleting Employee Details", err.message);
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Internal Error While deleting Employee details"
            }
        )
    }
}