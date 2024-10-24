import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineEdit } from "react-icons/md";
import { TbCirclePlus } from "react-icons/tb";
import { FaRegImage } from "react-icons/fa6";
import FieldHeadTitle from './FieldHeadTitle';
import { useDispatch, useSelector } from 'react-redux';
import { selectInputFieldValue, setInputField } from '../../../states/showInputFieldSlice';
import { CiVideoOn } from "react-icons/ci";
import SingleChapter from '../SingleChapter';
import { selectToken } from '../../../states/authTokenSlice';
import axios from 'axios';
import { socket } from '../../../socket';
import ReactPlayer from 'react-player';

const CourseField = ({ field, index, course, chapter }) => {
  const [chapters, setChapters] = useState([])
  const inputField = useSelector(selectInputFieldValue)
  const showInputField = inputField[index]
  const token = useSelector(selectToken)
  const dragChapter = useRef(0)
  const draggedOverChapter = useRef(0)
  const dispatch = useDispatch()

  const handleSort = () =>{
    const chaptersClone = [...chapters]
    const temp = chaptersClone[dragChapter.current]
    chaptersClone[dragChapter.current] = chaptersClone[draggedOverChapter.current]
    chaptersClone[draggedOverChapter.current] = temp
    setChapters(chaptersClone)
  }

  const getChaptersApi = async(courseId) => {
    
    await axios.get(`http://localhost:5000/chapters/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      setChapters(response.data)
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    socket.on('new chapter added', (message) => {
      getChaptersApi(course?._id)
    })

    if (course?._id) {
      getChaptersApi(course?._id)
    }

    return () => {
      socket.off('new chapter added')
    }
  }, [course?._id])

  return (
    <main>
      {field.fieldHeadTitle && <FieldHeadTitle field={field} />}
      <div className=' flex flex-col p-4 relative border-[1px] shadow-lg rounded bg-gray-100'>
        <div className=' flex justify-between items-center mb-3.5'>
            <h5 className=' text-base font-semibold text-gray-950'>{field.title}</h5>
            <div className=' flex items-center font-semibold text-sm text-gray-950 cursor-pointer' onClick={() => {
                dispatch(setInputField({ inputFieldIndex: index }))
                }}>
                {!showInputField? <>
                  {!field.fieldPurpose.includes('Add') ? <MdOutlineEdit className=' mr-1' />
                  : <TbCirclePlus className=' mr-1 text-xl' />
                  }
                  {field.fieldPurpose}
                </>
              :  
                'Cancel'
              }
            </div>
        </div>
        {!showInputField && field.title !== 'Course image' && field.title !=='Chapter video'  ? 
          <>
            {field.title === 'Course Chapter' && 
            <section className=' mb-2 flex flex-col gap-y-3'>
              {chapters.length > 0 && chapters?.map((chapter, index) => (
                <SingleChapter 
                  key={index} 
                  chapter={chapter} 
                  index={index} 
                  dragChapter={dragChapter}
                  draggedOverChapter={draggedOverChapter}
                  handleSort={handleSort}
                />
              ))}
            </section>
            }
            <div className={`text-sm text-gray-950 ${field.title === 'Course price' ? 'font-semibold' : 'font-medium'}`}>{field.title === 'Course Chapter' ? (course?.courseChapters === 0 ? field.description : '') : field.description}</div>
          </>
        : 
        !showInputField && field.title === 'Course image' ? 
          <>
            <div className='bg-white w-full h-[210px] border-2 flex items-center justify-center my-5'>{
                course?.courseImage ? 
                <img src={`http://localhost:5000/uploads/${course?.courseImage}`} className='rounded-lg w-full h-[250px]' alt="Amazing image" loading='lazy' /> 
                  : 
                <>
                  <FaRegImage className=' text-4xl' />
                  {/* <div className=' text-sm font-medium text-gray-950'>{field.description}</div> */}
                </>
                }
            </div>
          </>
        :
        !showInputField && field.title === 'Chapter video' ? 
          <>
            {!chapter?.chapterVideo ? 
                <>
                  <div className=' mb-4 w-full h-[210px] bg-gray-50 border-2 flex items-center justify-center'><CiVideoOn className=' text-4xl' /></div> 
                  <div className=' text-sm font-medium text-gray-950'>{field.description}</div>
                </>
                  : 
                  <ReactPlayer
                    url={chapter?.chapterVideo}
                    playing={true} 
                    controls={true} 
                    volume={0.8}
                    muted={false}
                    width='100%'
                    height='100%'
                 />}
          </>
        :
            <div>
              {field.field}
            </div>
        }
    </div>
    </main>
  )
}

export default CourseField