import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { MdClose } from "react-icons/md";
import { apiConnector } from '../../Services/ApiConnector';
import { createEmployee } from '../../Services/Apis';

const AddEmployee = ({ showModal, setShowModal, fetchEmployees, updateEmpObj }) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        course: "",
        image: null

    })

    const handleChange = (event) => {
        const { name, type, checked, value } = event.target;
        setFormData(prev => {
            return {
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }
        })
    }

    const handleFileChange = (e) => {
        setFormData((prev) => (
            {
                ...prev,
                image: e.target.files[0]
            }
        ))
    }

    const resetEmployeeStates = () => {
        setFormData({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        course: "",
        image: null
        })
    }


    const addEmployee = async() => {
        const toastId = toast.loading("Loading..");
        try{
            const formDataToSend = new FormData();
            for(const[key, value] of Object.entries(formData)){
                if(key === "image" && value){
                    formDataToSend.append(key, value);
                }else if(key !== "image"){
                    formDataToSend.append(key, value);
                }
            }


            const token = localStorage.getItem('token'); 

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data' 
            };

            const response = await apiConnector("POST", createEmployee, formDataToSend, {headers});
            toast.success("Employee Added");
            setShowModal(false);
            resetEmployeeStates();
            fetchEmployees();
        }catch(err){
            console.log("Error in creating Employee", err);
            toast.error("Failed to Create Employee")
        }finally{
            toast.dismiss(toastId);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addEmployee();
    }

    const [updateMode, setUpdateMode] = useState(false);
    useEffect(() => {
        if(updateEmpObj){
            setUpdateMode(true);
            setFormData(updateEmpObj);
        }
    }, [updateEmpObj])
    return (
        <div className={`${showModal ? "absolute" : "hidden"} transition-all duration-300 p-4 items-center w-[800px] bg-slate-500 top-2 right-[24%]`}>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-semibold' >{updateMode ? "Update Employee": "Add Employee"}</h1>
                <MdClose onClick={() => setShowModal(false)}
                className='font-bold text-xl cursor-pointer' />
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-5 items-center'>
                <label htmlFor="name" className=' text-white w-full text-[0.875rem]'>Name <sup className='text-pink-500'>*</sup>
                    <input className="bg-slate-950 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[10px] border-b-2 border-richblack-100"
                        type="text"
                        onChange={handleChange}
                        value={formData.name}
                        name='name'
                        required />
                </label>

                <label htmlFor="email" className=' text-white w-full text-[0.875rem]'>Email
                    <input className="bg-slate-950 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[10px] border-b-2 border-richblack-100"
                        type="email"
                        onChange={handleChange}
                        value={formData.email}
                        name='email'
                        required />
                </label>

                <label htmlFor="mobile" className=' text-white w-full text-[0.875rem]'>Mobile No
                    <input className="bg-slate-950 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[10px] border-b-2 border-richblack-100"
                        type="number"
                        onChange={handleChange}
                        value={formData.mobile}
                        name='mobile'
                        required />
                </label>

                <label htmlFor="designation" className=' text-white w-full text-[0.875rem]'>Designation

                    <select className="bg-slate-950 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[10px] border-b-2 border-richblack-100"
                        name="designation" id="designation"
                        onChange={handleChange}
                        value={formData.designation}
                        required>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </label>


                <div className='flex gap-3'>
                    Gender:
                    <div>
                        <input
                            type="radio"
                            name='gender'
                            id='Male'
                            value="Male"
                            onChange={handleChange} />
                        <label htmlFor="Male">Male</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name='gender'
                            id='Female'
                            value="Female"
                            onChange={handleChange} />
                        <label htmlFor="Female">Female</label>
                    </div>
                </div>

                <div className='flex gap-3'>Course
                    <div>
                        <input
                            type="radio"
                            id='BCA'
                            name='course'
                            value="BCA"
                            onChange={handleChange} />
                        <label htmlFor="BCA">BCA</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            id='MCA'
                            name='course'
                            value="MCA"
                            onChange={handleChange} />
                        <label htmlFor="MCA">MCA</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            id='BSC'
                            name='course'
                            value="BSC"
                            onChange={handleChange} />
                        <label htmlFor="BSC">BSC</label>
                    </div>
                </div>

                <label htmlFor="image">Image Upload
                    <input
                        type="file"
                        onChange={handleFileChange}
                        required
                        name='image' />
                </label>

                <button type="submit" className='bg-yellow-400 px-8 py-2 font-semibold text-black'>
                    {updateMode? "Update": "Create"}
                </button>

            </form>
        </div>
    )
}

export default AddEmployee
