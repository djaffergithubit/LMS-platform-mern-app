import React, { useEffect } from 'react'
import Hero from '../components/Home/Hero'
import Stats from '../components/Home/Stats'
import PopularCourses from '../components/Home/PopularCourses'
import { Outlet } from 'react-router-dom'
import Features from '../components/Home/Features'
import { TimelineWithIcon } from '../components/Home/Timeline'
import { useSelector } from 'react-redux'
import { selectToken } from '../states/authTokenSlice'

const Home = () => {

  const token = useSelector(selectToken)

  return (
    <>
      <main className=' bg-primary'>
          <Hero />
          <Features />
          <PopularCourses />
          <TimelineWithIcon />
          <Stats />
      </main>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default Home