import React from 'react'
import FilterElement from './FilterElement'
import { TbClockHour5 } from 'react-icons/tb'
import { FiCheckCircle } from "react-icons/fi";

const FiltersDash = ({ progressStatus, setProgressStatus, displayedCourses, enrolledCourses }) => {
  return (
    <div className='grid grid-cols-2 place-items-stretch w-full gap-x-4'>
      <div className={`flex items-center p-4 border-2 cursor-pointer hover:bg-sky-100 ${progressStatus === 'In progress' && ' bg-sky-100'}`} onClick={() => setProgressStatus('In progress')}>
        <div className=' p-1  bg-clr rounded-full text-extraTeal mr-2'>
            <TbClockHour5 className=' text-4xl' />
        </div>
        <div className=' flex flex-col'>
            <span className=' text-sm font-bold'>In progress</span>
            <p className=' text-sm text-gray-500'>{progressStatus === 'In progress' ? displayedCourses?.length : enrolledCourses?.length - displayedCourses?.length} courses</p>
        </div>
    </div>

    <div className={` flex items-center p-4 border-2 cursor-pointer hover:bg-sky-100 ${progressStatus === 'Completed' && ' bg-sky-100'}`} onClick={() => setProgressStatus('Completed')}>
          <div className=' p-1.5 bg-green-200 rounded-full text-green-700 mr-2'>
              <FiCheckCircle className=' text-3xl' />
          </div>
          <div className=' flex flex-col'>
              <span className=' text-sm font-bold'>Completed</span>
              <p className=' text-sm text-gray-500'>{progressStatus === 'Completed' ? displayedCourses?.length : enrolledCourses?.length - displayedCourses?.length} courses</p>
          </div>
      </div>
    </div>
  )
}

export default FiltersDash