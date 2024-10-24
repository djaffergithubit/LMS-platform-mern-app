import React, { useEffect } from 'react'
import CourseField from './CourseField'
import { LuListChecks } from "react-icons/lu";
import { LuCircleDollarSign } from "react-icons/lu";
import { CiFileOn } from "react-icons/ci";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import ImageField from './setupFields/ImageField';
import TitleField from './setupFields/TitleField';
import PriceField from './setupFields/PriceField';
import CategoryField from './setupFields/CategoryField';
import DescriptionField from './setupFields/DescriptionField';
import ChapterField from './setupFields/ChapterField';
import VideoField from './setupFields/VideoField';
import LevelField from './setupFields/LevelField';
import { htmlToText } from 'html-to-text';

const SetupForm = ({ forChapter, course, chapter }) => {

  const courseFields = [
    {
      icon: <HiOutlineSquaresPlus className=' text-2xl text-extraTeal' />,
      title: 'Course title',
      description: course?.title,
      field: <TitleField 
        forChapter={forChapter}
        courseId={course?._id}
        index={0}
      />,
      fieldPurpose: 'Edit title',
      fieldHeadTitle: 'Customize your course',
    },
    {
      title: 'Course description',
      description: course?.description,
      field: <DescriptionField
        forChapter={forChapter}
        courseId={course?._id}
       />,
      fieldPurpose: 'Edit description',
    },
    {
      title: 'Course image',
      description: 'Upload course image',
      field: <ImageField 
        courseId={course?._id}
      />,
      fieldPurpose: 'Add an image',
    },
    {
      title: 'Course category',
      description: course?.category !== '' ? course?.category : 'No category',
      field: <CategoryField 
        forChapter={forChapter}
        courseId={course?._id}
      />,
      fieldPurpose: 'Edit category',
    },
    {
      icon: <LuListChecks className=' text-2xl text-extraTeal' />,
      title: 'Course Chapter',
      description: 'Add new chapter',
      field: <ChapterField 
        forChapter={forChapter}
        chapterId={chapter?._id}
        courseId={course?._id}
        index={4}
      />,
      fieldPurpose: 'Add a chapter',
      fieldHeadTitle: 'Course chapters',
    },
    {
      icon: <LuCircleDollarSign className=' text-2xl text-extraTeal' />,
      title: 'Course level',
      description: course?.level ? course?.level : 'No level yet',
      field: <LevelField 
        forChapter={forChapter}
        courseId={course?._id}
      />,
      fieldPurpose: 'Edit level',
      fieldHeadTitle: 'Course Level'
    },
    {
      icon: <LuCircleDollarSign className=' text-2xl text-extraTeal' />,
      title: 'Course price',
      description: course?.Price <= 0 || course?.Price === 'Free' ? 'Free': `${course?.Price} $`,
      field: <PriceField 
        forChapter={forChapter}
        courseId={course?._id}
      />,
      fieldPurpose: 'Edit price',
      fieldHeadTitle: 'Sell your course'
    },
  ]

  const chapterFields = [
    {
      icon: <HiOutlineSquaresPlus className=' text-2xl text-extraTeal' />,
      title: 'Chapter title',
      description: chapter?.chapterTitle,
      field: <ChapterField 
        forChapter={forChapter}
        courseId={course?._id}
        index={0}
        chapterId={chapter?._id}
      />,
      fieldPurpose: 'Edit chapter',
      fieldHeadTitle: 'Customize your Chapter',
    },
    {
      // 'a.g the course is about...'
      title: 'Chapter description',
      description: htmlToText(chapter?.chapterDescription),
      field: <DescriptionField 
        forChapter={forChapter}
        chapterId={chapter?._id}
      />,
      fieldPurpose: 'Edit description',
    },
    {
      icon: <LuCircleDollarSign className=' text-2xl text-extraTeal' />,
      title: 'Free preview chapter',
      description: chapter?.freePreview ? 'chapter is free' : 'chapter is not free',
      field: <PriceField
        forChapter={forChapter}
        chapterId={chapter?._id}
       />,
      fieldPurpose: 'Edit access setting',
      fieldHeadTitle: 'Access settings'
    },
    {
      icon: <LuCircleDollarSign className=' text-2xl text-extraTeal' />,
      title: 'Chapter video',
      description: 'Upload Chapter video',
      field: <VideoField
        chapterId={chapter?._id}
      />,
      fieldPurpose: 'Add a video',
      fieldHeadTitle: 'Add a video'
    },
    
  ]

  const indexMax = forChapter ? 2 : 3

  useEffect(() => {
    console.log("forChapter", forChapter);
  }, [forChapter])

  return (
    <main className=' xl:pl-6 xl:pr-20 lg:px-24 md:px-20 sm:px-14 px-6 grid lg:grid-cols-2 place-items-stretch gap-4 pb-12' >
          <div className=' flex flex-col gap-y-6'>
            {(!forChapter ? courseFields : chapterFields).map((field, index) => (
              index <= indexMax && 
              <CourseField
                course={course}
                key={index}
                index={index}
                field={field}
              />
            ))}
          </div>

          <div className=' flex flex-col gap-y-4'>
          {(!forChapter ? courseFields : chapterFields).map((field, index) => (
              index > indexMax && 
              <CourseField
                course={course}
                key={index}
                index={index}
                field={field}
                chapter={chapter}
              />
            ))}
          </div>
        
    </main>
  )
}

export default SetupForm