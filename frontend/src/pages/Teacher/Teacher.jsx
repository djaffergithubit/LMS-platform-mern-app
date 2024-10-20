import React from 'react'
import TeacherSidebar from '../../components/Teacher/TeacherSidebar'
import TeacherCourses from '../../components/Teacher/TeacherCourses'

const Teacher = () => {
  return (
    <div className=' mt-16 flex items-stretch bg-white'>
        <TeacherSidebar />
        <TeacherCourses />
    </div>
  )
}

export default Teacher