import React, { useState } from 'react'
import { FaChevronUp, FaSearch } from 'react-icons/fa'
import { FaChevronDown } from "react-icons/fa6";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuCompass } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import ProfileBtn from '../ProfileBtn';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setToken } from '../../states/authTokenSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SearchCourse = () => {

    const [showDetails, setShowDetails] = useState(false)
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const logout = async() => {
      await axios('http://localhost:5000/users/logout')
      .then((response) => {
        dispatch(setToken(''))
        toast.success("You have been logged out successfully", {
          position: 'top-center'
        })

        setTimeout(() => {
          Navigate('/log-in')
        }, 2000)
      })
      .catch((error) => {
        console.log(error);
      }
      )
    }

  return (
    <div className=' flex justify-between items-center'>
        <div className='  relative mr-3 xl:block hidden'>
            <input className=' text-sm px-5  rounded-full outline-none py-2.5 h-full bg-white' placeholder='Search for a Course' type="text" />
            <div className='absolute right-0 top-0 h-full px-2 bg-white rounded-r-full flex items-center justify-center border-l-[1px]'>
                <FaSearch className=' ' />
            </div>
        </div>
        <div className=' flex items-center'>
          <div className=' flex items-center justify-end'>
              <a className='xl:block hidden' href="/user-account/teacher">
                <span className=' cursor-pointer font-semibold text-blue-900 mr-23 px-3 py-1 rounded-md hover:bg-blue-900 hover:text-white text-sm'>Teacher mode</span>
              </a>
              <div className=' px-2 py-1 rounded-full border-[2.5px] cursor-pointer ml-2 relative'>
               <div className='flex items-center ' onClick={() => setShowDetails(!showDetails)}>
                <button className=' px-3 py-2.5 text-sm font-medium text-white bg-purple-900 rounded-full'>DJ</button>

                {!showDetails ? <FaChevronDown className=' ml-2 text-sm' />
                : <FaChevronUp className=' ml-2 text-sm' />}
               </div>
                {showDetails && <ul className=' flex flex-col gap-y-3 absolute top-14 right-0 bg-white px-4 py-2 rounded-lg shadow-2xl  w-[200px]'>
                  <li className=' flex justify-between items-center w-full'>
                    {/* <button className=' px-3 py-2.5 text-sm font-medium text-white bg-purple-900 rounded-full'>DJ</button> */}
                    <ProfileBtn />
                    <h1 className=' text-lg font-semibold'>Djaffar Tadjer</h1>
                  </li>
                  <li className=' ml-2 py-1 text-sm font-semibold text-gray-500'>
                    <a href="/user-account/dashboard" className=' flex items-center '>
                      <MdOutlineSpaceDashboard className=' mr-2 text-xl' />
                      <span>Dashboard</span>
                    </a>
                  </li>
                  <li className=' ml-2 py-1 text-sm font-semibold text-gray-500'>
                    <a href="/courses" className='flex items-center '>
                      <LuCompass className=' mr-2 text-xl' />
                      <span>Browse</span>
                    </a>
                  </li>
                    <li className=' flex items-center ml-2 py-1 text-sm font-semibold text-gray-500' onClick={logout}>
                      <MdLogout className=' mr-2 text-xl' />
                      <span>Log out</span>
                    </li>
                </ul>}
              </div>
          </div>
        </div>
    </div>
  )
}

export default SearchCourse