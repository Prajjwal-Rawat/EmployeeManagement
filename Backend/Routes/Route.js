const express = require("express");
const route = express.Router();


const {createEmployee, getAllEmployees, getEmployee, deleteEmployee, updateEmployeeByID} = require("../Controllers/EmployeeController");
const {Login} = require("../Controllers/AuthLogin");
const {auth, isAdmin} = require("../Middlewares/Auth");



route.post("/login", Login);
route.post("/createEmployee",  createEmployee);
route.get("/getAllEmployees", getAllEmployees);
route.get("/getEmployee/:id", getEmployee);
route.put("/updateEmployee/:id", updateEmployeeByID);
route.delete("/deleteEmployee/:id", deleteEmployee);

module.exports = route;