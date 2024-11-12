import React, { useEffect, useState } from 'react'
import EmployeeTable from './EmployeeTable'
import { apiConnector } from '../../Services/ApiConnector'
import { getAllEmployees } from '../../Services/Apis'
import toast from 'react-hot-toast'
import AddEmployee from './AddEmployee'

const EmployeeList = () => {

    const [employeeData, setEmployeeData] = useState([]);
    const [pagination, setPaginaton] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [updateEmpObj, setUpdateEmpObj] = useState(null);

    const fetchEmployees = async(search = "", page = 1, limit = 5) => {
       const toastId = toast.loading("Loading...");
       try{
           const response = await apiConnector("GET", `${getAllEmployees}?page=${page}&limit=${limit}&search=${search}`);
        //    console.log("get all employees", response);
           setEmployeeData(response.data?.data?.employees);
           setPaginaton(response.data?.data?.pagination);
       }catch(err){
        console.log("Error in fetching employees", err);
        toast.error("Failed to fetch employees data");

       }finally{
           toast.dismiss(toastId);
       }
    }
    
    useEffect(() => {
       fetchEmployees();
    }, [])

    const handleShowModal = () => {
        setShowModal(true);
    }

    const updateEmployeeDetails = (empObj) => {
      console.log("employee obj", empObj);
      setUpdateEmpObj(empObj);
      setShowModal(true);
    }
    return (
        <div className='w-screen relative bg-slate-400 p-2 items-center text-white mt-4 justify-center'>
            <div className='flex justify-between mb-3'>
                <button onClick={() => handleShowModal() }
                className='bg-blue-600 p-3 rounded-md font-semibold hover:scale-95 transition-all duration-300 active:scale-100'>
                    Create Employee
                </button>

                <input className='w-[300px] p-2 bg-slate-700 rounded-lg'
                    type="text"
                    placeholder='Search Employees' />
            </div>

            <EmployeeTable employeeData = {employeeData} pagination={pagination} fetchEmployees = {fetchEmployees} updateEmployeeDetails = {updateEmployeeDetails}/>

            <AddEmployee updateEmpObj = {updateEmpObj} showModal = {showModal} setShowModal = {setShowModal} fetchEmployees = {fetchEmployees}/>
        </div>
    )
}

export default EmployeeList
