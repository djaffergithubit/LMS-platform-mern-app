import React, { useState } from 'react'
import FilterTop from '../components/Courses/FilterTop'
import SideFilters from '../components/Courses/SideFilters'
import AllCourses from '../components/Courses/AllCourses'
import { Outlet } from 'react-router-dom'

const Courses = () => {

  const [activeFilter, setActiveFilter] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [all, setAll] = useState(false)
  const [currentFilters, setCurrentFilters] = useState({
    Category: [],
    Level: [],
    Rating: [],
    Price: [],
    Availability: []
  })

  return (
    <>
      <main className=' xl:px-6 bg-primary py-20'>
          <div className=' xl:mx-12 md:my-9 mx-4'>
              <FilterTop
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
              />
              <div className=' flex lg:flex-row flex-col items-start gap-6'>
                  <SideFilters 
                      currentFilters={currentFilters}
                      setCurrentFilters={setCurrentFilters}
                      setShowResults={setShowResults}
                      showResults={showResults}
                      setAll={setAll}
                      all={all}
                  />
                  <AllCourses 
                      activeFilter={activeFilter}
                      setActiveFilter={setActiveFilter}
                      currentFilters={currentFilters}
                      showResults={showResults}
                      all={all}
                  />
              </div>
          </div>
      </main>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default Courses