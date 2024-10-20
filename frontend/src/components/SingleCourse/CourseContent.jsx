import React from 'react'
import ReactPlayer from 'react-player'

const CourseContent = ({ currentContent }) => {
  return (
    <div className=' px-6 py-4 max-w-3xl w-full mx-auto'>
        {currentContent?.chapterVideo && <ReactPlayer
            url={currentContent?.chapterVideo}
            playing={true} 
            controls={true} 
            volume={0.8}
            muted={false}
            width='100%'
            height='100%'
            />}
        <div className=' flex justify-between items-center py-6 border-b-2 mb-6'>
            <h3 className=' text-xl font-bold'>{currentContent?.chapterTitle}</h3>
            <button className=' px-5 py-1.5 text-white text-sm font-light bg-extraTeal '>Enroll for 15$</button>
        </div>
        <div>
            <p className=' text-base font-medium text-gray-900'>
                Objectives:
                <br />
                   Learn the basics of Python programming
                   Understand the <strong>importance of Python</strong> in the tech industry
                   Learn how to write Python code
                   Learn how to debug Python code
            </p>
        </div>
    </div>
  )
}

export default CourseContent