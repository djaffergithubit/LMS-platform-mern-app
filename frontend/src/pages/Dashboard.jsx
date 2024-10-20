import React from 'react'
import FiltersDash from '../components/Dashboard/FiltersDash'
import CourseCard from '../components/CourseCard'
import image1 from "../assets/Images/photo-1496307042754-b4aa456c4a2d-300x225.jpg"
import image2 from "../assets/Images/minimalism4-300x225.jpg"
import image3 from "../assets/Images/Rectangle-1804-1-300x225.png"
import image4 from "../assets/Images/fhd_cover-1-8-300x225.jpg"

const courses = [
  {
    id: 1,
    image: image1,
    category: 'communication',
    title: 'Enjoy learning React',
    boughtBy: 8927,
    views: 11192,
    rating: 5,
    price: 0.0,
    type: 'Hot' ,
    level: 'Beginner',
    lectures: 9,
    hours: 7,
    description: 'MasterStudy is the best choice for everyone! Masterstudy LMS is a feature-rich WP product from StylemixThemes developed specifi...'
  },
  {
    id: 2,
    image: image2,
    category: 'Programming',
    title: 'Master Nodejs with full guide from 0 to Mastery',
    boughtBy: 77,
    views: 15959,
    rating: 4.1,
    price: 49.99,
    type: 'Special',
    level: 'Advanced',
    lectures: 20,
    hours: 30,
    description: 'MasterStudy is the best choice for everyone! Masterstudy LMS is a feature-rich WP product from StylemixThemes developed specifi...'
  },

  {
    id: 3,
    image: image3,
    category: 'Marketing',
    title: 'Learn how to seduce your clients',
    boughtBy: 1426,
    views: 3099,
    rating: 3.5,
    price: 0.0,
    type: 'Special',
    level: 'Beginner',
    lectures: 10,
    hours: 5,
    description: 'MasterStudy is the best choice for everyone! Masterstudy LMS is a feature-rich WP product from StylemixThemes developed specifi...'
  },

  {
    id: 4,
    image: image4,
    category: 'Programming',
    title: 'Master with us the basics of Python Language',
    boughtBy: 1560,
    views: 25764,
    rating: 5,
    price: 50.33,
    type: 'New',
    level: 'Beginner',
    lectures: 20,
    hours: 10,
    description: 'MasterStudy is the best choice for everyone! Masterstudy LMS is a feature-rich WP product from StylemixThemes developed specifi...'
  }
]

const Dashboard = () => {
  return (
    <main className='xl:px-6 py-20'>
      <div className='xl:mx-12 md:my-9 mx-4'>
        <FiltersDash />
        <br />
        <section className=' grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-items-stretch gap-4 my-4 p-4 border-2'>
          {
            courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          }
        </section>
      </div>
    </main>
  )
}

export default Dashboard