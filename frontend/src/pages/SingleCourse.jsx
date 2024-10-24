import React, { useEffect, useState } from 'react'
import CourseProgress from '../components/CourseProgress'
import Sidebar from '../components/SingleCourse/Sidebar'
import TopBar from '../components/SingleCourse/TopBar'
import CourseContent from '../components/SingleCourse/CourseContent'
import { AiOutlinePlayCircle } from "react-icons/ai";
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectToken } from '../states/authTokenSlice'
import axios from 'axios'
import { useProfile } from '../hooks/useProfile'

const SingleCourse = () => {
    const [activeBtn, setActiveBtn] = useState('button0')
    const [currentContent, setCurrentContent] = useState(0)
    const { courseId } = useParams()
    const token = useSelector(selectToken)
    const [courseChapters, setCourseChapters] = useState([])
    const user = useProfile(token)
    const [currentUser, setCurrentUser] = useState()
    const [enrolledCourse, setEnrolledCourse] = useState(false)

    const getChaptersApi = async() => {
      await axios.get(`http://localhost:5000/chapters/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        setCourseChapters(response.data)
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }

    useEffect(() => {
        if (user) {
            setCurrentUser(user)
        }
    }, [user])

    useEffect(() => {
        currentUser && currentUser.enrolledCourses.find(course => course.courseId === courseId) && setEnrolledCourse(true)
    }, [currentUser, courseId])
  
    useEffect(() => {
      getChaptersApi()
    }, [courseId])

    useEffect(() => {
        setCurrentContent(activeBtn.toString().slice(-1))
    }, [activeBtn])

    useEffect(() => {
      console.log('courseChapters', courseChapters);
    }, [courseChapters])

  return (
    <main className=' bg-white min-h-screen h-full'>
        <div className=' flex items-start'>
            <Sidebar 
                activeBtn={activeBtn}
                setActiveBtn={setActiveBtn}
                courseChapters={courseChapters}
                enrolledCourse={enrolledCourse}
            />
            <div className=' flex-8'>
                <TopBar />
                <CourseContent 
                    currentContent={courseChapters[currentContent]}
                    courseId={courseId}
                    enrolledCourse={enrolledCourse}
                />
            </div>
        </div>
    </main>
  )
}

export default SingleCourse