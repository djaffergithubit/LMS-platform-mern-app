import React, { useEffect, useState } from 'react'
import CourseTopBar from '../../components/Teacher/CourseSetup/CourseTopBar'
import TeacherSidebar from '../../components/Teacher/TeacherSidebar'
import SetupForm from '../../components/Teacher/CourseSetup/SetupForm'
import { getCourses } from '../../api'
import { useSelector } from 'react-redux'
import { selectToken } from '../../states/authTokenSlice'
import { useParams } from 'react-router-dom'
import { socket } from '../../socket'
import ConfettiEffect from '../../components/ConfettiEffect'
import { toast } from 'react-toastify'

const CourseSetup = () => {

  const [currentCourse, setCurrentCourse] = useState()
  const { courseId } = useParams()
  const token = useSelector(selectToken)
  const [updated, setUpdated] = useState(false)
  const courses = getCourses(token, updated)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('client connected');
    })

    socket.on('courseField change', (message) => {
      toast.success(message, {
        position: "top-center"
      })
      
      setUpdated(!updated)
    })

    if (courses) {
      setCurrentCourse(courses.find(course => course._id == courseId))
    }

    return () => {
      socket.off('connect')
      socket.off('courseField change')
    }
  }, [courses, courseId])

  useEffect(() => {
    setUpdated(!updated)
  }, [])

  return (
    <main className=' flex items-stretch mt-16 min-h-screen h-full bg-white'>
        <TeacherSidebar />
        <section className=' flex-10 bg-white'>
            <CourseTopBar 
              title={"Course creation"}
              currentCourse={currentCourse}
            />
            <br />
            <SetupForm  
              course={currentCourse}
            />
        </section>
    </main>
  )
}

export default CourseSetup