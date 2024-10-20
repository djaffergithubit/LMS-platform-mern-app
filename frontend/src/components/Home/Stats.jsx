import React from 'react'

const Stats = () => {
    const stats = [
        {
            data: "35K",
            title: "Customers"
        },
        {
            data: "10K+",
            title: "Downloads"
        },
        {
            data: "40+",
            title: "Countries"
        },
        {
            data: "30M+",
            title: "Total revenue"
        },
    ]

  return (
    <main className=' xl:px-6 '>
        <section className="py-20 xl:mx-12 md:mx-9 mx-4">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 justify-between md:px-8">
                <div className=" max-w-2xl w-full mx-auto text-center">
                    <h3 className=" text-extraTeal text-3xl font-semibold sm:text-4xl">
                        Our Success
                    </h3>
                    <p className="mt-3 text-gray-400 font-medium ">
                        Our success is rooted in dedication, teamwork and a relentless pursuit of excellence. Together, we achieve milestones that define our journey and shape our future.
                    </p>
                </div>
                <div className="mt-12 lg:mt-0">
                    <ul className="gap-x-12 justify-center divide-y sm:divide-y-0 grid md:grid-cols-4 grid-cols-2">
                        {
                            stats.map((item, idx) => (
                                <li key={idx} className="text-center w-full px-4 py-6 sm:w-auto lg:py-4">
                                    <h4 className="text-4xl text-extraTeal font-semibold">{item.data}</h4>
                                    <p className="mt-3 font-medium">{item.title}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    </main>
  )
}

export default Stats