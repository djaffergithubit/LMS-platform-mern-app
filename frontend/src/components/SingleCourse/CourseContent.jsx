import { htmlToText } from 'html-to-text'
import React, { useEffect } from 'react'
import { GoLock } from 'react-icons/go'
import ReactPlayer from 'react-player'
import { loadStripe } from "@stripe/stripe-js"
import axios from 'axios'
import { getCurrentCourse } from '../../api'
import { useSelector } from 'react-redux'
import { selectToken } from '../../states/authTokenSlice'
import { socket } from '../../socket'

const CourseContent = ({ currentContent, courseId }) => {

    const token = useSelector(selectToken)
    const currentCourse = getCurrentCourse(token, courseId)

    useEffect(() => {
        console.log('course content', currentCourse);
        
    }, [currentCourse])

    const makePayment = async () =>{
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
    
            } catch (error) {
            const errorMessage = error.response ? error.response.data.message : 'Une erreur s\'est produite';
            
            }}
    }

  return (
    <div className=' px-6 py-4 max-w-3xl w-full mx-auto'>
        {(currentContent?.chapterVideo && currentContent.freePreview) ? <ReactPlayer
            url={currentContent?.chapterVideo}
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
            <h3 className=' text-xl font-bold'>{currentContent?.chapterTitle}</h3>
            <button className=' px-5 py-1.5 text-white text-sm font-light bg-extraTeal ' onClick={makePayment}>Enroll for 15$</button>
        </div>
        <div className=' text-gray-900 text-base'>
            {htmlToText(currentContent?.chapterDescription)}
        </div>
    </div>
  )
}

export default CourseContent