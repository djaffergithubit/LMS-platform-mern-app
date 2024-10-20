import React, { useEffect, useState } from 'react'
import { FiTrash } from "react-icons/fi";
import { setCourseStatus } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../../states/authTokenSlice';
import ConfettiEffect from '../../ConfettiEffect';
import { setStatus, status } from '../../../states/statusSlice';

const CourseTopBar = ({ title, currentCourse }) => {

  const [completedFields, setCompletedFields] = useState(0)
  const [loading, setLoading] = useState(false)
  const courseStatus = useSelector(status)
  const dispatch = useDispatch()
  
  const courseAttributes = [
    {
      title: 'Course title',
      completed: currentCourse?.title ? true : false
    },
    {
      title: 'Course description',
      completed: currentCourse?.description.toLowerCase() !== 'no description found' ? true : false
    },
    {
      title: 'Course image',
      completed: currentCourse?.courseImage ? true : false
    },
    {
      title: 'Course category',
      completed: currentCourse?.category ? true : false
    },
    {
      title: 'Course chapter',
      completed: currentCourse?.courseChapters >= 2 ? true : false
    },
    { 
      title: 'Course level',
      completed: currentCourse?.level ? true : false
    },
    {
      title: 'Course Price',
      completed: currentCourse?.Price !== 'Add price' ? true : false
    }
  ]

  const token = useSelector(selectToken)

  useEffect(() => {
    let completed = 0
    courseAttributes.map((attribute) =>{
      completed += attribute.completed ? 1 : 0
    })
    setCompletedFields(completed)
  }, [currentCourse])

  useEffect(() => {
    dispatch(setStatus({ newStatusValue: false }))
  }, [])

  const PublishCourse = async () => {
    setLoading(true)
    await setCourseStatus(dispatch, token, currentCourse._id)
    setLoading(false)
  }


  return (
    <div className=' w-full flex justify-between items-center xl:pl-6 xl:pr-20 lg:px-24 md:px-20 sm:px-14 px-6 pt-12'>
      {courseStatus && <ConfettiEffect />}
        <div className=' flex flex-col'>
            <h4 className=' text-lg font-semibold text-gray-950'>{title}</h4>
            <span className=' text-sm text-gray-500 font-medium'>Complete all fields ({completedFields}/7)</span>
        </div>
        <button type='button' className=' text-gray-400 flex items-center' disabled ={ (completedFields === 7 && !courseStatus && currentCourse.status !== 'Published') ? false : true} onClick={PublishCourse}>
            {!loading  ?
              <>
                Publish
                <div className=' p-2 text-sm text-white bg-gray-950 rounded-md ml-2'>
                    <FiTrash />
                </div>
              </>
              :
              <span>Loading...</span>
            }
        </button>
    </div>
  )
}

export default CourseTopBar