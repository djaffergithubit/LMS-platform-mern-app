import React, { useState } from 'react'
import SearchCourse from './Courses/SearchCourse'
import logo from "../assets/Logo/E-Learn.png"
import { FaBars } from "react-icons/fa";

const Navbar = () => {
    const [hoveredBtn, setHoveredBtn] = useState('')
    // bg-gray-100
  return (
    <nav className={`xl:px-6 py-1.5 fixed top-0 w-full  border-b-2 shadow-md z-10 bg-gray-100`}>
        <div className='flex items-center justify-between mx-12'>
            <h3 className=' text-3xl font-semibold text-teal flex-4 w-full'><a href="/" className=' flex items-center'><img className=' w-12 h-12 mr-2' src={logo} alt="" />E-learn</a></h3>
            <ul className=' flex xl:items-center xl:justify-between items-end flex-8 w-full justify-end'>
                <li className=' xl:block hidden text-base font-semibold text-gray-900  hover:text-teal'>
                    <a href="/">Home</a>
                </li>
                <li className=' xl:block hidden text-base font-semibold text-gray-900  hover:text-teal'>
                    <a href="/courses">Courses</a>
                </li>
                <li className=' xl:block hidden text-base font-semibold text-gray-900  hover:text-teal'>
                    <a href="">About</a>
                </li>
                <li className=' xl:block hidden text-base font-semibold text-gray-900  hover:text-teal'>
                    <a href="">Contact</a>
                </li>

                <li className=' flex justify-end items-end pl-4'>
                    {/* <button className={` px-4 py-1.5 border-2 font-semibold border-teal rounded min-w-[100px] w-full ${hoveredBtn !== 'button2' && hoveredBtn === 'button1' ? 'bg-primary text-teal' : ' bg-teal text-white'} mr-4`} 
                        onMouseEnter={() => setHoveredBtn('button1')}
                        onMouseLeave={() => setHoveredBtn('')}
                    >
                        Login
                    </button>
                    <button className={` px-4 py-1.5 border-2 font-semibold border-teal ${hoveredBtn === 'button1' ? 'text-teal': ' text-white bg-teal'} rounded min-w-[100px] w-full`} 
                        onMouseEnter={() => setHoveredBtn('button2')}
                        onMouseLeave={() => setHoveredBtn('')}
                    >
                        Signup
                    </button> */}
                    <SearchCourse />
                </li>
                <li>
                    <FaBars />
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar