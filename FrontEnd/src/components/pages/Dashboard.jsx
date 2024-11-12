import React from 'react'

const Dashboard = ({adminName}) => {
  return (
    <div className='flex items-center justify-center m-auto h-screen'>
      <h1 className='text-white text-2xl'>Welcome {adminName} To Admin Panel</h1>
    </div>
  )
}

export default Dashboard
