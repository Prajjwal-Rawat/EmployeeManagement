import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = ({adminName, setIsLoggedIn}) => {
  return (
    <div className='w-full bg-slate-800 border-b-[1px] p-3 shadow-sm shadow-white'>
        <div className='flex w-11/12 mx-auto justify-between items-center bg-slate-800 text-white'>

          <NavLink to="/" className='hover:text-slate-500'>
           Home
          </NavLink>
          <NavLink to="/employee-list" className='hover:text-slate-500'>
           Employee List
          </NavLink>

        <p>{adminName}</p>
        <button onClick={setIsLoggedIn} className='hover:text-slate-500'>
        LogOut
        </button>

        </div>
      
    </div>
  )
}

export default NavBar
