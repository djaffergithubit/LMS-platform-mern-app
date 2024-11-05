import React from 'react'
import { TbArrowLeft } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {

  const Navigate = useNavigate()

  return (
    <div className=' h-screen bg-primary flex flex-col justify-center items-center'>
      <h1 className=' text-9xl font-medium text-navyBlue'>404</h1>
      <p className=' text-lg font-semibold text-navyBlue text-center py-1.5'>Oops😴, the page you are looking for is not available.</p>
      <span className=' text-center text-sm text-gray-400 font-medium max-w-sm w-full tracking-wider'>
        We are sorry for the inconvenience, The page you are trying to access has been removed or never been existed.
      </span>
      <button className=' text-xs font-semibold text-white p-2 rounded bg-purple-700 flex items-center mt-14' onClick={() => Navigate('/')}>
        <TbArrowLeft className=' mr-1 text-base' /> 
        BACK TO HOME
      </button>
    </div>
  )
}

export default NotFoundPage