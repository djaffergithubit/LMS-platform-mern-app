import React from 'react'
import SaveButton from '../SaveButton'
import { useFormSubmit } from '../../../../utils/useFormSubmit'
import { useSelector } from 'react-redux'
import { selectToken } from '../../../../states/authTokenSlice'

const TitleField = ({ index, courseId, forChapter }) => {

  const token = useSelector(selectToken)
  const {
    handleSubmit,
    register,
    errors,
    onSubmit
  } = useFormSubmit(index, courseId, '', token, forChapter)

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <input className=' bg-white px-6 py-1.5 w-full border-2 rounded-md text-base font-medium text-gray-950 placeholder:text-gray-400 placeholder:text-sm' type="text" placeholder={`.eg.'Course Title`} {
            ...register(`title`, {
                required: 'This field is required'
        })} />
        {errors.title && <p className=' text-xs text-red-600 mt-1'>{errors.title?.message}</p>}
        <SaveButton  content={'Save'} />
    </form>
  )
}

export default TitleField