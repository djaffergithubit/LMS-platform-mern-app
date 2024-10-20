import React, { useState } from 'react'
import TeacherSidebar from '../../components/Teacher/TeacherSidebar'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectToken } from '../../states/authTokenSlice'
import axios from 'axios'

const CreateTitleCourse = () => {
    const [courseId, setCourseId] =useState()
    const token = useSelector(selectToken)
    const Navigate = useNavigate()

    const { 
        register, 
        handleSubmit,
        formState: { errors },
        watch
      } = useForm()

    const onSubmit = async (data) => {
        console.log(watch());
        console.log('data', data.courseTitle);
        await axios.post('http://localhost:5000/courses/add-course', {title: data.courseTitle}, {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json",
            }
        })
        .then((response) => {
            console.log(response.data);
            setCourseId(response.data.id)
            Navigate(`/user-account/teacher/new-course/${response.data.id}`)
        })
        .catch((error) => {
            console.log(error);
        })
    }

  return (
    <main className=' h-screen w-full flex items-stretch mt-16'>
        <TeacherSidebar />
        <section className=' flex-10 bg-white h-screen pt-6 flex justify-center items-center md:px-12 sm:px-6 px-2'>
            <div className=' max-w-lg w-full mx-auto'>
                <h1 className=' text-xl text-gray-950 font-semibold'>Name your course</h1>
                <p className=' text-sm text-gray-500'>What would you like to name your course?Don't worry you can always change this later</p>
                <br />
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className=' flex flex-col w-full'>
                        <label className=' text-base text-gray-950 font-semibold' htmlFor="courseTitle">Course title</label>
                        <input className=' outline-none bg-white border-2 border-gray-900 rounded-lg px-4 py-1.5 w-full text-sm text-gray-950 font-medium' type="text" placeholder={`e.g'Advanced web development'`} {...register('courseTitle', {
                            required: {
                                value: true,
                                message: 'Course title is required'
                            }
                        })} />
                        {errors.courseTitle && <span className=' text-red-600 text-sm'>{errors.courseTitle?.message}</span>}
                        <span className=' text-sm text-gray-500'>What will you teach in this course?</span>
                        <br />
                        <div className=' flex items-center'>
                            <button className=' text-base font-semibold text-gray-950'>cancel</button>
                            <input className=' bg-gray-950 text-white text-base font-medium px-2.5 py-1 rounded-md ml-2' type="submit" value={'Continue'} id="" />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </main>
  )
}

export default CreateTitleCourse