import React, { useEffect, useState } from 'react'
import CourseTopBar from '../../components/Teacher/CourseSetup/CourseTopBar'
import TeacherSidebar from '../../components/Teacher/TeacherSidebar'
import SetupForm from '../../components/Teacher/CourseSetup/SetupForm'
import { useParams } from 'react-router-dom'
import { getAllChapters } from '../../api'
import { useSelector } from 'react-redux'
import { selectToken } from '../../states/authTokenSlice'
import { socket } from '../../socket'

const ChapterSetup = () => {

  const { chapterId } = useParams()
  const token = useSelector(selectToken)
  const [currentChapter, setCurrentChapter] = useState({})
  const [updated, setUpdated] = useState(false)
  const chapters = getAllChapters(token, updated)

  useEffect(() => {
    socket.on('chapterField change', (message) => {
      console.log('chapterField change', message);
      setUpdated(!updated)
    })

    if (chapters) {
      setCurrentChapter(chapters?.find((chapter) => chapter._id == chapterId))
    }

    return () => {
      socket.off('chapterField change')
    }
  }, [chapters, chapterId])

  // useEffect(() => {
  //   if (chapters) {
  //     setCurrentChapter(chapters?.find((chapter) => chapter._id == chapterId))
  //   }
  // }, [chapters])

  return (
    <main className=' flex items-stretch mt-16 min-h-screen h-full bg-white '>
        <TeacherSidebar />
        <section className=' flex-10 bg-gray-50'>
            <CourseTopBar 
              title={"Chapter creation"}
            />
            <br />
            <SetupForm 
                forChapter={true}
                chapter={currentChapter}
            />
        </section>
    </main>
  )
}

export default ChapterSetup