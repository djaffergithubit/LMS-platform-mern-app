import React, { useEffect, useState } from 'react';
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { SlOptions } from 'react-icons/sl';
import CourseCard from './CourseCard';
import { MdOutlineEdit } from 'react-icons/md';

const Pagination = ({ items, forTeacher, showEditButton, optionClicked }) => {

  const itemsPerPage = !forTeacher ? 9 : 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Determine the items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)

  // Function to handle page change
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='sm:flex-9 w-full sm:max-w-4xl max-w-md sm:mx-0 mx-auto h-full'>
      <div className={!forTeacher && 'w-full grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-stretch gap-1.5 gap-y-6'}>
        {Object.keys(currentItems).length > 0 ?
        ( !forTeacher ?  
            (currentItems.map((item, index) => (
                <CourseCard 
                    key={index}
                    course={item}
                />))
            )


            :

              currentItems.map((item, index) => (
                <ul className=' grid lg:grid-cols-4 grid-cols-6 place-items-center py-3 border-t-[1px] ' key={index}>
                      <li className=' text-sm font-bold text-blue-950 lg:col-span-1 col-span-3'>
                          {item?.title.length <= 25 ? item?.title : `${(item?.title).slice(0, 24)}...`}
                      </li>
                      <li className=' text-sm font-bold text-blue-950 col-span-1'>
                      {item?.Price <= 0 || item?.Price === 'Free' ? 'Free': `${item?.Price} $`}
                      </li>
                      <li className={`text-xs font-medium bg-extraTeal text-white hover:bg-blue-950 ${item?.status === 'Published' ? 'px-2' : 'px-4'} py-1 rounded-full col-span-1`}>{item?.status}</li>
                      <li className=' cursor-pointer text-sm font-bold text-blue-950 relative col-span-1' onClick={() => optionClicked(index)}>
                          <SlOptions />
                          {showEditButton[index] && 
                              <a href={`/user-account/teacher/new-course/${item?._id}`}>
                                  <button className=' absolute top-full right-0 text-sm text-gray-950 font-medium px-2 py-1 w-24 rounded bg-gray-100 shadow-lg flex items-center justify-start'><MdOutlineEdit className=' mr-1'/> Edit</button>
                              </a>
                          }
                      </li>
                  </ul>
              ))
            )
            :
              <h1 className='text-lg text-start w-full text-gray-900 font-bold'>No courses found</h1>
            }
      </div>


      <div className="flex justify-center items-center mt-9">
        <button
            onClick={handlePrevious}
            disabled={currentPage === 1} 
            className={`p-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ' text-gray-800'}`}
            >
            <FaChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleClick(index + 1)}
            className={`${currentPage === index + 1 ? 'active bg-blue-600 px-3 py-1.5 rounded-full text-white' : ' text-gray-900' } mx-1.5 text-sm`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`p-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ' text-gray-800'}`}
        >
            <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
