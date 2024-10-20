import React, { useEffect, useState } from 'react'
import { LuArrowDownUp } from 'react-icons/lu'
import { FiPlusCircle } from "react-icons/fi";
import { getCourses } from '../../api';
import { useSelector } from 'react-redux';
import { selectToken } from '../../states/authTokenSlice';
import { useForm } from 'react-hook-form';
import { useProfile } from '../../hooks/useProfile';
import Pagination from '../Pagination';

const TeacherCourses = () => {

    const token = useSelector(selectToken)
    const user = useProfile(token)
    const courses = getCourses(token)
    const [teacherCourses, setTeacherCourses] = useState([])
    const [searchTitle, setSearchTitle] = useState('')
    const [displayedCourses, setDisplayedCourses] = useState(teacherCourses)
    const [showEditButton, setShowEditButton] = useState(Array(teacherCourses?.length).fill(false))
    const {
        register,
        watch
    } = useForm('')

    useEffect(() => {
        if (user !== undefined && courses.length > 0) {
            setTeacherCourses(courses?.filter(course => course?.teacherId._id == user?._id));   
        }
    }, [user, courses])

    useEffect(() => {
        if (teacherCourses) {
            setDisplayedCourses(teacherCourses)
            setShowEditButton(Array(teacherCourses?.length).fill(false))
        }
    }, [teacherCourses])

    useEffect(() => {
        watch((data) => setSearchTitle(data['searchTitle']))
    }, [])

    useEffect(() => {
        let filteredCourses = [...teacherCourses]
        if (searchTitle !== '') {
            filteredCourses = filteredCourses.filter((course) => (course?.title).toLowerCase().includes(searchTitle.toLowerCase()))
            setDisplayedCourses(filteredCourses)
        }else{
            setDisplayedCourses(teacherCourses)
        }
    }, [searchTitle])

    const optionClicked = (index) => {
        setShowEditButton((prevShowEditButtons) => {
            const prevState = [...prevShowEditButtons]
            prevState[index] = !prevState[index]
            return prevState
        })
    }

  return (
   <main className={`  flex-10 w-full py-6 min-h-screen h-full flex flex-col`}>
        <div className=' xl:px-0 md:px-10 sm:px-5 px-2'>
            <div className=' max-w-4xl mx-auto flex justify-between items-center'>
                <input className=' px-4 py-1 bg-white outline-none border-2' placeholder='Filter courses...' type="text" {...register('searchTitle')} />
                <a href="/user-account/teacher/new-course">
                    <button className=' text-sm text-white px-3 py-1.5 rounded-md bg-extraTeal flex items-center'>
                        <FiPlusCircle className=' mr-1 text-xl' />
                        New course
                    </button>
                </a>
            </div>
        </div>
        <br />
        {displayedCourses.length > 0 ? 
            <div className=' xl:px-0 md:px-10 sm:px-5 px-2'>
                <div className=' max-w-4xl w-full mx-auto border-[1px]'>
                    <ul className=' grid lg:grid-cols-4 grid-cols-6 place-items-center py-2 border-b-[1px]'>
                        <li className=' flex items-center text-sm text-gray-400 font-semibold lg:col-span-1 col-span-3'>
                            Title
                            <LuArrowDownUp className=' ml-1' />
                        </li>
                        <li className=' flex items-center text-sm text-gray-400 font-semibold col-span-1'>
                            Price
                            <LuArrowDownUp className=' ml-1' />
                        </li>
                        <li className=' flex items-center text-sm text-gray-400 font-semibold col-span-1'>
                            Status
                            <LuArrowDownUp className=' ml-1' />
                        </li>
                        <li className=' flex items-center text-sm text-gray-400 font-semibold col-span-1'>
                        </li>
                    </ul>
                    <Pagination 
                        items={displayedCourses}
                        forTeacher={true}
                        showEditButton={showEditButton}
                        optionClicked={optionClicked}
                    /> 
                </div> 
            </div>
        : 
        <div className=' text-lg text-extraTeal font-medium flex justify-start items-center px-24'>
            No course found
        </div>
        }
   </main>
  )
}

export default TeacherCourses