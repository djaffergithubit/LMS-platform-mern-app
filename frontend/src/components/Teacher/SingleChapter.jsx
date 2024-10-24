import React from 'react'
import { BsGrid3X2GapFill } from 'react-icons/bs'
import { GoPencil } from 'react-icons/go'

const SingleChapter = ({ chapter, index, dragChapter, draggedOverChapter, handleSort }) => {
  return (
        <div className=' flex items-center justify-between bg-sky-100 border-[0.5px] py-2 text-gray-950 font-medium px-2.5 rounded cursor-pointer' 
          draggable 
          onDragStart={() => dragChapter.current = index}
          onDragEnter={() => draggedOverChapter.current = index}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
          >
            <div className=' flex items-center text-extraTeal'>
              <BsGrid3X2GapFill className=' mr-2 rotate-90' />
                {chapter.chapterTitle}
            </div>
            <div className=' flex items-center'>
              {chapter.freePreview && <span className=' text-sm center text-gray-900 px-3 rounded-full  font-semibold'>Free</span>}
              <span className=' text-xs text-white px-3 py-1 rounded-full bg-extraTeal font-semibold'>{chapter.status}</span>
              <a href={`/user-account/teacher/single-chapter/${chapter._id}`}>
                <GoPencil className=' ml-2 text-extraTeal' />
              </a>
            </div>
        </div>
  )
}

export default SingleChapter