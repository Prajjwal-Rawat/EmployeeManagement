import './App.css'
import {Navigate, Route, Routes} from "react-router-dom"
import Dashboard from './components/pages/Dashboard'
import Login from './components/common/Login'
import { useState } from 'react'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='w-screen h-screen bg-slate-900'>
        <Routes>
          <Route path='/' element= {isLoggedIn ? <Dashboard/> : <Navigate to= "/login" replace/>}/>
          <Route path='/login' element = {<Login onLogin = {() => setIsLoggedIn(true)}/>}/>
        </Routes>
    </div>
  )
}

export default App
