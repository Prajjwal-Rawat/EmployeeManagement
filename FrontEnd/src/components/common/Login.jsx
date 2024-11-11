import React, { useState } from 'react'
import { apiConnector } from '../../Services/ApiConnector';
import { loginApi } from '../../Services/Apis';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = ({onLogin}) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({userName: "", password: ""});

    function handleChange(event){
       const {name, value} = event.target;

       setFormData((prev) => (
        {
            ...prev,
            [name]: value
        }
       ))
    }

    const AuthLogin = async(userName, password) => {
        const toastId =  toast.loading("Loading...");
        try{
            const response = await apiConnector("POST", loginApi,{
                userName,
                password
            });
            console.log("login response ", response);
            toast.success("Login Successfull");

        }catch(err){
           console.log("Login Api error", err);
           toast.error("Login Failed");
        }finally{

            toast.dismiss();
        }
    }
    
    function handleSubmit(event){
        event.preventDefault();
        AuthLogin(formData.userName, formData.password);
        onLogin();
        navigate("/");
    }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-5 w-fit h-full m-auto'>
        <label htmlFor="userName" className=' text-white w-full text-[0.875rem] '>User Name <sup className='text-pink-500'>*</sup> 
            <input className="bg-slate-950 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
            type="text"
            onChange={handleChange}
            name='userName'
            value={formData.userName} />
        </label>

        <label htmlFor="password" className=' text-white w-full text-[0.875rem] '> Password <sup className='text-pink-500'>*</sup>
            <input  className="bg-slate-950 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
            type="password"
            onChange={handleChange}
            name='password'
            value={formData.password} />
        </label>

        <button type="submit" className="w-full bg-yellow-50 rounded-[8px] text-black  py-2 mt-8 font-bold hover:bg-yellow-500 active:scale-100 transition-all duration-300 hover:scale-95">
            Login
        </button>
    </form>
  )
}

export default Login
