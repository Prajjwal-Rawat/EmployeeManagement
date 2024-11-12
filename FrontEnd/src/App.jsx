import './App.css'
import {Navigate, Route, Routes} from "react-router-dom"
import Dashboard from './components/pages/Dashboard'
import Login from './components/common/Login'
import { useEffect, useState } from 'react'
import NavBar from './components/common/NavBar'
import EmployeeList from './components/common/EmployeeList'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [adminName, setAdminName] = useState(() => {
    return localStorage.getItem("adminName") || "";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("adminName", adminName);
  }, [isLoggedIn, adminName]);


  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setAdminName(name);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setAdminName("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminName");
    localStorage.removeItem("token");
  }

  return (
    <div className='w-screen h-screen bg-slate-900'>
        {
          isLoggedIn && <NavBar adminName={adminName} setIsLoggedIn={handleLogOut}/>
        }
        <Routes>
          <Route path='/' element= {isLoggedIn ? <Dashboard adminName = {adminName}/> : <Navigate to= "/login" replace/>}/>
          <Route path='/login' element = {<Login onLogin = {handleLogin}/>}/>
          <Route path='/employee-list' element = {isLoggedIn ? <EmployeeList/> : <Navigate to="/login" replace/>}/>
        </Routes>
    </div>
  )
}

export default App
