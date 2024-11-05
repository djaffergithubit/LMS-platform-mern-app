import React, { useEffect, useState } from 'react'
import CourseCard from '../CourseCard';
import { getCourses } from '../../api';
import { useSelector } from 'react-redux';
import { selectToken } from '../../states/authTokenSlice';

const PopularCourses = () => {

  const token = useSelector(selectToken)
  const [PopularCourses, setPopularCourses ] = useState([])
  const courses = getCourses(token)

  useEffect(() => {
    if (courses) {
      setPopularCourses(
        courses.filter(course => course.rating >= 3)
      )
    }
  }, [courses])

  return (
    <main className=' xl:px-6'>
        <div className=' xl:mx-12 md:mx-9 mx-4'>
            <h1 className=' sm:text-4xl text-3xl text-center font-bold text-extraTeal text bg-center pb-[25px]'>Popular courses</h1>
            <br />
            <section className=' grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-items-stretch  gap-6'>
                {PopularCourses.map((course, index)=>(
                index <= 3 && <CourseCard key={index} course={course} index={index} />
                ))}
            </section>
        </div>
    </main>
  )
}

export default PopularCourses