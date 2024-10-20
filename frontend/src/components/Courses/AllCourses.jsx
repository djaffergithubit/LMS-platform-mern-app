import React, { useEffect, useState } from 'react'
import CourseCard from '../CourseCard'
import { getCourses } from '../../api'
import { useSelector } from 'react-redux'
import { selectToken } from '../../states/authTokenSlice'
import Pagination from '../Pagination'

const AllCourses = ({ activeFilter, setActiveFilter, showResults, currentFilters, all }) => {

  const token = useSelector(selectToken)
  const courses = getCourses(token)
  const [displayedCourses, setDisplayedCourses] = useState(courses)

  useEffect(() => {
    if(activeFilter !== ''){
      const filteredCourses = courses.filter(course => (course.category).toLowerCase().includes(activeFilter.toLowerCase()) && course.status === 'Published')
      setDisplayedCourses(filteredCourses)
    }else{
      console.log('no filter');
    }
  }, [activeFilter])

  useEffect(() => {
      let filteredCourses = courses
      for (const filter in currentFilters) {
        if (currentFilters[filter].length > 0) {
          console.log('length is greater than 0');
          
          if (filter.toLowerCase() == 'rating') {
            filteredCourses = filteredCourses.filter(course => course[filter.toLowerCase()] >= Math.max(...currentFilters[filter]))
          }else{
            filteredCourses = filteredCourses.filter(course => currentFilters[filter].includes(filter.toLowerCase() == 'price' ? (course[filter] === 'Free' || course[filter.toLowerCase()] <= 0 ? 'Free Courses': 'Paid Courses') : course[filter.toLowerCase()]))
          }
        }
        
      }
      setDisplayedCourses(filteredCourses.filter(course => course.status === 'Published'))
      
  }, [showResults])

  useEffect(() => {
    setDisplayedCourses(courses.filter(course => course.status === 'Published'))
    setActiveFilter('')
  }, [all])

  useEffect(() => {
    console.log('courses', displayedCourses);
    
    setDisplayedCourses(courses.filter(course => course.status === 'Published'))
  }, [courses])

  return (
      <Pagination 
        items={displayedCourses}
        // forTeacher={false}
      />
  )
}

export default AllCourses