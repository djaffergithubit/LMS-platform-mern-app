import React from 'react'

const CourseProgress = ({ progress }) => {
  return (
    <div>
        <div className=' h-1.5 rounded bg-gray-300 my-3'>
            <div className={`h-full bg-secondary rounded`} style={{ width: `${progress}%` }}></div>
        </div>
        <span className=' text-sm font-semibold text-secondary'>{progress}% Complete</span>
    </div>
  )
}

export default CourseProgress