const EmployeeModel = require("../Models/EmployeeModel");
const validate = require("validator");
const { imageUpload } = require("../Utils/imageUpload");
require("dotenv").config();




exports.createEmployee = async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, course } = req.body;

        const image = req.files.image;

        if (!name || !email || !mobile || !designation || !gender || !course || !image) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required, Please provide all the details"
                }
            )
        }

        const isEmailValid = validate.isEmail(email);
        if (!isEmailValid) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Please provide a valid email"
                }
            )
        }

        const isEmailAlreadyPresent = await EmployeeModel.findOne({ email });
        if (isEmailAlreadyPresent) {
            return res.status(400).json(
                {
                    success: false,
                    message: "This email is already present"
                }
            )
        }

        const imgUploadRes = await imageUpload(image, process.env.FOLDER_NAME);

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
                success: true,
                data: employeeDetails,
                message: "Employee created successfully"
            }
        )

    } catch (err) {
        console.log("Error in creating employee ", err.message);
        res.status(500).json(
            {
                success: false,
                error: err.message,
                message: "Internal Server Error in creating employee details"
            }
        )
    }
}


// *********************************     getAllEmployeesDetails     *****************************

exports.getAllEmployees = async (req, res) => {
    try {
        let {page, limit, search} = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;

        const skip = (page - 1) * limit;

        let searchParameter = {}
        if(search){
            searchParameter = {
                name:{
                    $regex: search,
                    $options: "i"
                }
            }
        }

        const totalEmployees = await EmployeeModel.countDocuments(searchParameter);

        const allEmployeesData = await EmployeeModel.find(searchParameter)
        .skip(skip)
        .limit(limit)
        .sort({updatedAt: -1});

        const totalPages = Math.ceil(totalEmployees / limit);

        if (!allEmployeesData) {
            return res.status(404).json(
                {
                    success: false,
                    message: "No employee found"
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                data: {
                    employees: allEmployeesData,
                    pagination: {
                        totalEmployees,
                        totalPages,
                        currentPage: page,
                        pageSize: limit
                    }
                },
                message: "All employees are fetched successfully"
            }
        )
    } catch (err) {
        console.log("Error in fetching all employees data");
        res.status(500).json(
            {
                success: false,
                error: err.message,
                message: "Error in fetching employees details"
            }
        )
    }
}


// ************************************     getEmployeeById    ***********************************

exports.getEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await EmployeeModel.findById(id);

        if (!employee) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Employee not found"
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                data: employee,
                message: "Successfully fetched employee"
            }
        )
    } catch (err) {
        console.log("Error in fetching employee by ID", err.message);
        res.status(500).json(
            {
                success: false,
                error: err.message,
                message: "Failure in fetching employee details"
            }
        )
    }
}



// ********************************    Delete Employee      *******************************

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await EmployeeModel.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Employee not found"
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                data: employee,
                message: "Successfully Deleted Employee Details"
            }
        )
    } catch (err) {
        console.log("Got Error while Deleting Employee Details", err.message);
        res.status(500).json(
            {
                success: false,
                error: err.message,
                message: "Internal Error While deleting Employee details"
            }
        )
    }
}


//----------------------------    Updated Employee   ----------------------


exports.updateEmployeeByID = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, mobile, designation, gender, course } = req.body;
        const updatedImg = req.files ? req.files.image : null;

        let updateData = {
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            updatedAt: new Date()
        }

        if (updatedImg) {
            const updatedImgUpload = await imageUpload(updatedImg, process.env.FOLDER_NAME);
            updateData.imgUrl = updatedImgUpload.secure_url
        }

        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, updateData, {new:true});
        if(!updatedEmployee){
            return res.status(404).json(
                {
                    success:false,
                    message:`No Employee found by this ID:${id}`
                }
            )
        }

        res.status(200).json(
            {
                success:true,
                data:updatedEmployee,
                message:"Employee details updated successfully"
            }
        )

    } catch (err) {
        console.log("Got Error in Updating Employee Details", err.message);
        res.status(500).json(
            {
                success: false,
                error: err.message,
                message: "internal Error in Updating Employee Details"
            }
        )
    }
}