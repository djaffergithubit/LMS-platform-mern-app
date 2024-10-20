import React from 'react'
import { FaChartSimple } from "react-icons/fa6";
import { MdPhotoCamera } from "react-icons/md";
import { FcFilmReel } from "react-icons/fc";
import { PiComputerTowerDuotone, PiMusicNoteFill } from 'react-icons/pi'
import { TbRun } from 'react-icons/tb'
import { FcEngineering } from "react-icons/fc";

const filterElements = [
    {
        name: 'Accounting',
        icon: <FaChartSimple className=' text-gold ' />
    },
    {
        name: 'Computer science',
        icon: <PiComputerTowerDuotone className=' ' />
    },
    {
        name: 'Engineering',
        icon: <FcEngineering className=' text-xl' />
    },
    {
        name: 'Filming',
        icon: <FcFilmReel className=' text-xl' />
    },
    {
        name: 'Fitness',
        icon: <TbRun className=' text-xl' />
    },
    {
        name: 'Music',
        icon: <PiMusicNoteFill className=' text-xl text-red-600' />
    },
    {
        name: 'Photography',
        icon: <MdPhotoCamera className=' text-purple-950 text-xl' />
    }

]

const FilterTop = ({ activeFilter, setActiveFilter }) => {

  return (
    <div className=' my-20 flex xl:flex-row flex-col gap-y-4'>
        <h1 className=' text-4xl text-blue-950 font-bold '>Courses</h1>
        <ul className=' flex items-stretch xl:justify-end flex-wrap w-full gap-y-3'>
            {filterElements.map((element, index) => (
                <li 
                    key={index}
                    className={`flex items-center px-3 py-0.5 border-2 rounded-xl xl:ml-2 xl:mr-0 mr-2 cursor-pointer ${activeFilter === element.name ? 'bg-blue-700 text-white' : 'text-blue-950'}`}
                    onClick={() => setActiveFilter(`${element.name}`)}
                >
                    {element.icon}
                    <span className=' ml-1 text-sm font-medium'>{element.name}</span>
                </li>
            ))
            }
        </ul>
    </div>
  )
}

export default FilterTop