import React from 'react'
import { TbClockHour5 } from "react-icons/tb";

const FilterElement = () => {
  return (
    <div className=' flex items-center'>
        <div className=' p-1  bg-clr rounded-full text-extraTeal mr-2'>
            <TbClockHour5 className=' text-3xl' />
        </div>
        <div className=' flex flex-col'>
            <span className=' text-sm font-semibold'>In progress</span>
            <p className=' text-sm text-gray-500'>3 courses</p>
        </div>
    </div>
  )
}

export default FilterElement