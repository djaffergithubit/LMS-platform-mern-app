import React, { useEffect, useState } from 'react'
import FiltersDash from '../components/Dashboard/FiltersDash'
import CourseCard from '../components/CourseCard'
import { useSelector } from 'react-redux'
import { selectToken } from '../states/authTokenSlice'
import { useProfile } from '../hooks/useProfile'
import { getCourses } from '../api'
import { BeatLoader } from 'react-spinners'

const Dashboard = () => {

  const token = useSelector(selectToken)
  const [loading, setLoading] = useState(true)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [progressStatus, setProgressStatus] = useState('In progress')
  const [displayedCourses, setDisplayedCourses] = useState([])
  const AllCourses = getCourses(token)
  const currentUser = useProfile(token)

  useEffect(() => {
    if (currentUser && AllCourses) {
      AllCourses.forEach((course) => {
        const enrolledCourseFound = currentUser.enrolledCourses.find((enrolledCourse) => enrolledCourse.courseId === course._id)
        if (enrolledCourseFound && !enrolledCourses.includes({course, progress: enrolledCourseFound.progress})) {
          setEnrolledCourses((prevEnrolledCourses) => 
            !prevEnrolledCourses.some((enrolledCourse) => enrolledCourse.course._id === course._id) ?
              [...prevEnrolledCourses, {
                course,
                progress: enrolledCourseFound.progress
              }]
              :
              prevEnrolledCourses
        )
        }
      })
    }
  }, [currentUser, AllCourses])

  useEffect(() => {
    if(enrolledCourses){
      switch (progressStatus) {
        case 'In progress':
          setDisplayedCourses(enrolledCourses.filter((enrolledCourse) => enrolledCourse.progress < 100))
          break;

        case 'Completed':
          setDisplayedCourses(enrolledCourses.filter((enrolledCourse) => enrolledCourse.progress === 100))
          break;
      
        default:
          setDisplayedCourses(enrolledCourses)
          break;
      }
    }
  }, [enrolledCourses, progressStatus])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    
  }, [progressStatus])

  return (
    <main className='xl:px-6 py-20'>
      <div className='xl:mx-12 md:my-9 mx-4'>
        <FiltersDash 
          progressStatus={progressStatus}
          setProgressStatus={setProgressStatus}
          enrolledCourses={enrolledCourses}
          displayedCourses={displayedCourses}        
        />
        <br />
        {!loading ? <section className=' grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-items-stretch gap-4 my-4 p-4 border-2'>
          {
            displayedCourses.map((enrolledCourse, index) => (
              <CourseCard key={index} course={enrolledCourse.course} />
            ))
          }
        </section>
        :
        <div className=' flex justify-center items-center h-96'>
          <BeatLoader 
            color='#016A70'
          />
        </div>
        }
      </div>
    </main>
  )
}

export default Dashboard