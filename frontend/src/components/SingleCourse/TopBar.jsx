import React from 'react'
import { MdLogout } from "react-icons/md";
import ProfileBtn from '../ProfileBtn';

const TopBar = () => {
  return (
    <div className=' w-full flex items-center justify-end py-4 px-8 border-b-2 border-gray-100'>
        <a href='/courses' className=' cursor-pointer font-semibold flex items-center text-sm hover:bg-blue-900 hover:text-white px-4 py-1 rounded-md mr-2'>
            <MdLogout className=' text-lg mr-1.5' />
            Exit
        </a>
        {/* <button className=' px-2.5 py-0.5 text-lg font-semibold text-white bg-purple-900 rounded-full ml-2'>A</button> */}
        <ProfileBtn />
    </div>
  )
}

export default TopBar