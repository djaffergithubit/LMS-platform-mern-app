import React from 'react'
import { FaHeadSideVirus } from "react-icons/fa6";
import { PiCertificateBold } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa6";

const features = [
    {
        icon: <FaHeadSideVirus className=' lg:text-6xl text-5xl text-teal' />,
        title: 'Best Stimulations'
    },

    {
        icon: <FaBookOpen className=' lg:text-6xl text-5xl text-teal' />,
        title: 'Comprehensive Courses'
    },

    {
        icon: <PiCertificateBold className=' lg:text-6xl text-5xl text-teal' />,
        title: 'Certification Programs'
    },

    {
        icon: <FaDollarSign className=' lg:text-6xl text-5xl text-teal' />,
        title: 'Accessibility'
    }
]

const Features = () => {
  return (
   <main className=' sm:px-6 px-2'>
        <div className=' grid md:grid-cols-4 grid-cols-2 place-self-start py-20 xl:mx-12 md:mx-9 mx-4 md:gap-0 gap-y-8'>
            {
                features.map((feature, index) => (
                    <div key={index} className=' flex flex-col justify-center items-center gap-y-4'>
                        <div className=' flex justify-center items-center lg:p-8 p-7 rounded-full bg-gray-200'>
                            {feature.icon}
                        </div>
                        <h3 className=' lg:text-lg md:text-base text-sm font-semibold text-extraTeal'>{feature.title}</h3>
                    </div>
                ))
            }
            
        </div>
   </main>
  )
}

export default Features