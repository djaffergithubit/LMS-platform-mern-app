import React, { useEffect, useState } from 'react'
import { FaBookOpen } from "react-icons/fa";
import StarRating from './StarRating';
import CourseProgress from './CourseProgress';
import { useSelector } from 'react-redux';
import { selectToken } from '../states/authTokenSlice';
import { useProfile } from '../hooks/useProfile';

const CourseCard = ({ course }) => {

  const token = useSelector(selectToken)
  const user = useProfile(token)
  const [currentUser, setCurrentCourse] = useState(user)

  useEffect(() => {
    if (user) {
      setCurrentCourse(user)
    }
  }, [user])

  return (
    <div className=' w-full '>
      <main className={`w-full h-auto relative`}
      >
          <div className=' h-[170px] relative bg-white w-full rounded-md'>
            <a href={`/courses/${course._id}`}>
              <img className=' h-full w-full border-2 border-solid border-gray-100 rounded-md' src={`http://localhost:5000/uploads/${course?.courseImage}`} alt="" />
            </a>
            {/* <span className={` absolute top-0 right-0 m-2 px-3 py-0.5 text-white text-sm font-bold rounded-full ${course.type === 'Hot' ? 'bg-red-400' : course.type === 'Special' ? 'bg-green-500' : 'bg-green-500'}`}>{course.type}</span> */}
          </div>

          <div className='py-4 px-2'>
            <h1 className=' h-10 mb-6 text-base text-blue-950 font-bold'>{(course?.title)?.length <= 62 ? course?.title : `${(course?.title)?.slice(0, 61)}...` }</h1>
            <div className=' flex items-center justify-between'>
                <span className=' text-sm text-gray-400'>{course?.category}</span>
                <div className=' flex items-center '>
                    <div className='bg-blue-200 shadow-xl rounded-full p-1.5  mr-3'>
                        <FaBookOpen className=' text-extraTeal  text-sm' />
                    </div>
                    <span className=' text-sm text-blue-950  font-semibold'>{course?.courseChapters} Chapters</span>
                </div>
            </div>
            <section className=' '>

            <>
              {currentUser?.enrolledCourses?.find((enrolledCourse) => enrolledCourse.courseId === course._id ) ?
                  (
                    <CourseProgress 
                      progress={
                        currentUser?.enrolledCourses.find((enrolledCourse) => enrolledCourse.courseId === course._id ).progress
                      }
                    />
                  )
                  :
                  (
                    <div className=' flex justify-between items-center border-t-2 border-solid border-gray-200 mt-4 py-2'>
                      <div className=' flex items-end gap-1'>
                          <StarRating 
                          rating={parseInt(course?.rating)}
                          />
                          <em className=' text-sm text-gray-400 font-medium'>{course?.rating}</em>
                      </div>
                      <span className=' font-semibold text-blue-950 text-sm'>{course?.Price <= 0 || course?.Price === 'Free' ? 'Free' : `${course?.Price}$`}</span>
                    </div>
                  )
                }
            </>    
            </section>

        </div>
      </main>
    </div>
  )
}

export default CourseCard