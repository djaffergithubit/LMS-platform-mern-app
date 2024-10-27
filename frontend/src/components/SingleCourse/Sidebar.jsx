import React, { useState } from 'react'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { GoLock } from 'react-icons/go'
import CourseProgress from '../CourseProgress'

const Sidebar = ({ activeBtn, setActiveBtn, courseChapters, enrolledCourse, courseTitle, currentEnrolledCourse}) => {
  const [hoveredElement, setHoveredElement] = useState('')

  return (
    <nav className='  max-w-xs w-full flex-4 border-r-2 border-gray-100 h-screen'>
      <div className=''>
        <h1 className=' text-lg font-bold text-blue-950 px-6 pb-7 pt-6'>{courseTitle}</h1>
      </div>
      {enrolledCourse && <div className=' px-6 pb-7'>
        <CourseProgress
          progress={currentEnrolledCourse?.progress}
        />
      </div>}
      <ul className=' flex flex-col border-t-2 border-gray-100'>
        {
          courseChapters?.map((chapter, index) => (
            <li 
            key={index}
              className={` flex items-center text-sm ${hoveredElement === `button${index}` || activeBtn === `button${index}` ? 'text-gray-950 bg-slate-50 border-r-4 border-black' : ' text-gray-700' } font-medium cursor-pointer px-6 py-3`}
              onMouseEnter={() => setHoveredElement(`button${index}`)}
              onMouseLeave={() => setHoveredElement('')}
              onClick={() => setActiveBtn(`button${index}`)}
            >
              {!chapter.freePreview && !enrolledCourse ? 
                    <GoLock className=' mr-2 text-xl' />
                  :
                    <AiOutlinePlayCircle className=' mr-2 text-xl' />}
              {chapter?.chapterTitle}
          </li>
          ))
        }
       
      </ul>
    </nav>
  )
}

export default Sidebar