import React, { useEffect, useState } from 'react'
import CourseCard from '../CourseCard';
import image1 from "../../assets/Images/photo-1496307042754-b4aa456c4a2d-300x225.jpg"
import image2 from "../../assets/Images/minimalism4-300x225.jpg"
import image3 from "../../assets/Images/Rectangle-1804-1-300x225.png"
import image4 from "../../assets/Images/fhd_cover-1-8-300x225.jpg"
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