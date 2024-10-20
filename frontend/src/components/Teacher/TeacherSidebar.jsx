import React from 'react'
import { FaListUl } from "react-icons/fa6";
import { FiBarChart } from "react-icons/fi";

const TeacherSidebar = () => {
  return (
    <nav className=' bg-gray-50 flex-2 border-r-[1.5px] shadow-xl xl:block hidden'>
        <ul className=' flex flex-col'>
            <li className=' xl:px-6 bg-sky-100 border-r-[5px] border-extraTeal text-cyan-600 font-medium py-2.5 cursor-pointer'>
                <a href='/user-account/teacher' className='flex items-center text-xl mx-12'>
                    <FaListUl className=' text-base mr-2' />
                    Courses
                </a>
            </li>
            <li className=' xl:px-6 py-2.5 cursor-pointer font-medium text-cyan-700'>
                <a href='#' className='flex items-center text-xl mx-12'>
                    <FiBarChart className=' text-xl mr-1.5' />
                    Analytics
                </a>
            </li>
        </ul>
    </nav>
  )
}

export default TeacherSidebar