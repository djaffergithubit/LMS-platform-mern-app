import React, { useState } from 'react'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { GoLock } from 'react-icons/go'

const Sidebar = ({ activeBtn, setActiveBtn, courseChapters }) => {
  const [hoveredElement, setHoveredElement] = useState('')

  return (
    <nav className='  max-w-xs w-full flex-4 border-r-2 border-gray-100 h-screen'>
      <div className=''>
        <h1 className=' text-xl font-bold text-blue-950 px-6 pb-7 pt-6'>Yoga For Beginners</h1>
      </div>
      {/* <CourseProgress 
        progress={0}
      /> */}
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
              {!chapter.freePreview ? 
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