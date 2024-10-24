import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setInputField } from '../states/showInputFieldSlice'
import { addChapter, updateChapter, updateCourse } from '../api'
import { socket } from '../socket'

export const useFormSubmit = ( index, courseId, chapterId, token, forChapter ) => {
  const dispatch = useDispatch()
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch, 
    control,
    setValue
  } = useForm()

  const onSubmit = (data) => {
    dispatch(setInputField({ inputFieldIndex: index }))
    if (!forChapter) {
      if (data['chapterTitle']) {
        console.log(data.chapterTitle);
        
        addChapter(data.chapterTitle, courseId, token)
        socket.emit('new chapter added', 'chapter added')
      }
      else{
        updateCourse(data, courseId, token)
      }
  
      socket.emit('courseField change', 'Here we go')
    }else{      
      updateChapter(data, chapterId, token)
      socket.emit('chapterField change', 'chapter added')
    }
    console.log(watch())
  }

  return {
      handleSubmit,
      register,
      errors,
      onSubmit,
      control,
      setValue,
  }
}