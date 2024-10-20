import React from 'react'

const Hero = () => {
  return (
    <main className=' xl:px-6 flex items-center flex-grow div-background min-h-screen'>
        {/* my-40 */}
        <div className='w-full ml-12 flex-6 mt-20'>
            <h1 className=' text-5xl font-bold text-gray-900'>Find The Best Course To Grow Your Skills</h1>
            <br />
            <p className=' text-sm font-semibold text-gray-400'>
                Grow your skills with our online courses with expert tutor from any where anytime. Lorem Epsom dollar sit amet consectetur adi piscing elit sed do eiusmod
            </p>
            <br />
            {/* <button className=' px-5 py-1.5 text-white bg-teal rounded text-sm font-medium'>Enroll Now</button> */}
            <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0 xl:justify-start mt-12">
                <a href="/courses" className="flex items-center justify-center gap-x-2 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg md:inline-flex">
                    Browse courses
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                    </svg>
                </a>
                <a href="javascript:void(0)" className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex">
                    Get access
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                    </svg>
                </a>
            </div>
        </div>
        <div className='  w-full flex-6'>
        </div>
    </main>
  )
}

export default Hero