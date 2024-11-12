import React from 'react'
import { Link } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const EmployeeTable = ({employeeData, pagination, fetchEmployees, updateEmployeeDetails}) => {

    const header = ["Unique Id", "Image", "Name", "Email", "Mobile No", "Designation", "Gender", "course", "Create Date", "Action"];
    const {currentPage, totalPages} = pagination;

    const TableRow = ({employee}) => {
        return <tr>
            <td className='px-4 py-2'>{employee._id}</td>
            <td className='px-4 py-2'><img src= {employee.imgUrl} width={40} className=' rounded-md'/></td>
            <td className='px-4 py-2'>
                <Link to={`/employee/id`} >
                  {employee.name}
                </Link>
            </td>
            <td className='px-4 py-2'>{employee.email}</td>
            <td className='px-4 py-2'>{employee.mobile}</td>
            <td className='px-4 py-2'>{employee.designation}</td>
            <td className='px-4 py-2'>{employee.gender}</td>
            <td className='px-4 py-2'>{employee.course}</td>
            <td className='px-4 py-2'>{employee.createdAt}</td>
            <td className='px-4 py-3  flex'>
                <div className='flex gap-4'>

                {
                    <MdEdit onClick={() => updateEmployeeDetails(employee)} className=' cursor-pointer' />
                }
                {
                    <MdDelete  className=' cursor-pointer'/>
                }

                </div>
            </td>
        </tr>
    }

    const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1);

    function handleNextPage(){
        if(currentPage < totalPages){
            handlePagination(currentPage + 1);
        }
    }

    function handlePrivousPage(){
        if(currentPage > 1){
            handlePagination(currentPage - 1);
        }
    }

    function handlePagination(currtPage){
        fetchEmployees("", currtPage, 5);
    }

    
    return (
        <>
        <table className="min-w-full table-auto border-collapse">
            <thead>
                <tr>
                    {
                        header.map((ele, index) => (
                            <th key={index} className="px-4 py-2 border-b">{ele}</th>
                        ))
                    }
                </tr>
            </thead>

            <tbody>
                {
                    employeeData.map((emp) => {
                       return <TableRow employee = {emp} key ={emp._id}/>
                    })
                }
            </tbody>
        </table>

        <div className='flex justify-between'>
            <span className='bg-blue-500 px-2 py-1 font-semibold rounded-lg flex items-center'>Page {currentPage} of {totalPages}</span>
            <div className='flex gap-2 items-center bg-black px-2 py-1 rounded-md'>

                <button className='cursor-pointer bg-blue-900 px-3 py-2 rounded-lg w-[90px]'
                onClick={() => handlePrivousPage()}
                disabled = {currentPage === 1}>
                    Previous
                </button>
                 
                 {
                   pageNumbers.map((page) => (
                     <button onClick={() => handlePagination(page)}
                     className={`border p-2 rounded-md bg-white text-black hover:bg-blue-700 ${currentPage === page ? "bg-blue-700": ""} transition-all duration-300`}>
                        {page}
                     </button>
                   ))
                 }

                <button className='cursor-pointer bg-blue-900 px-3 py-2 rounded-lg w-[90px]'
                onClick={() => handleNextPage()}
                disabled = {totalPages === currentPage}>
                   Next
                </button>

            </div>
        </div>
    </>
        
    )
}

export default EmployeeTable
