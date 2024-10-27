import { htmlToText } from 'html-to-text'
import React, { useState } from 'react'
import { GoLock } from 'react-icons/go'
import ReactPlayer from 'react-player'
import { loadStripe } from "@stripe/stripe-js"
import axios from 'axios'
import { getCurrentCourse } from '../../api'
import { useSelector } from 'react-redux'
import { selectToken } from '../../states/authTokenSlice'
import { socket } from '../../socket'
import { FaRegCircleCheck } from "react-icons/fa6";

const CourseContent = ({ currentChapter, courseId, enrolledCourse, currentUser, coursePrice }) => {

    const [loading, setLoading] = useState(false)
    const token = useSelector(selectToken)
    const currentCourse = getCurrentCourse(token, courseId)
    
    const onChapterCompleted = async () => {
        setLoading(true)
        socket.emit('chapter completed', {courseId: courseId, userId: currentUser._id, chapterId: currentChapter._id})
        setLoading(false)
    }

    const enrollFreeCourse = async () => {
        setLoading(true)
        socket.emit('enroll free course', {courseId: courseId, userId: currentUser._id})
        setLoading(false)
    }

    const makePayment = async () =>{
        setLoading(true)
        if (currentCourse !== undefined) {
            const stripe = await loadStripe(`${import.meta.env.VITE_APP_STRIPE_PUBLISHED_KEY}`)
            try {
                const response = await axios.post('http://localhost:5000/courses/checkout-session', {course: currentCourse}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                }
                });

                const session_Id = response.data.id;
                console.log('session', session_Id);
                
                await stripe.redirectToCheckout({
                    sessionId: session_Id
                });
    
                setLoading(false)
            } catch (error) {
                setLoading(false)
                const errorMessage = error.response ? error.response.data.message : 'Une erreur s\'est produite';
            }}
    }

    const content = enrolledCourse ? ((currentUser.enrolledCourses.find(course => course.courseId === courseId)?.completedChapters).includes(currentChapter._id) ? 'Completed' : 'Mark as completed') : (coursePrice === 'Free' || coursePrice === '0') ? `Enroll for Free` : `Enroll for ${coursePrice}$`

  return (
    <div className=' px-6 py-4 max-w-3xl w-full mx-auto'>
        {(currentChapter?.chapterVideo && (currentChapter?.freePreview || enrolledCourse)) ? <ReactPlayer
            url={currentChapter?.chapterVideo}
            playing={true} 
            controls={true} 
            volume={0.8}
            muted={false}
            width='100%'
            height='100%'
            />
            :
            <div className=' bg-gray-800 w-full h-[400px] border-2 flex items-center justify-center text-white'>
                <p className=' text-2xl flex items-center'><GoLock className=' mr-2' /> Video not available</p>
            </div>
        }
        <div className=' flex justify-between items-center py-6 border-b-2 mb-6'>
            <h3 className=' text-xl font-bold'>{currentChapter?.chapterTitle}</h3>
            <button className={`px-5 py-1.5 text-white text-sm font-light  ${content === 'Completed' ? 'flex items-center bg-green-600' : 'bg-extraTeal'}`} onClick={content === 'Mark as completed' ? onChapterCompleted : content === 'Enroll for Free' ? enrollFreeCourse : content === `Enroll for ${coursePrice}$` ? makePayment : ''}>{content === 'Completed' && <FaRegCircleCheck className=' text-xl mr-1.5' />}{loading ? 'Loading...' : content}</button>
        </div>
        <div className=' text-gray-900 text-base'>
            {htmlToText(currentChapter?.chapterDescription)}
        </div>
    </div>
  )
}

export default CourseContent