import React from 'react'
import SaveButton from '../SaveButton'
import { useFormSubmit } from '../../../../utils/useFormSubmit'
import { selectToken } from '../../../../states/authTokenSlice'
import { useSelector } from 'react-redux'

const LevelField = ({ courseId, forChapter }) => {
    const token = useSelector(selectToken)
    const {
      handleSubmit,
      register,
      errors,
      onSubmit
    } = useFormSubmit(5, courseId, '', token, forChapter)
    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <select className=' bg-white px-6 py-1.5 w-full border-2 rounded-md text-base font-medium text-gray-950 placeholder:text-gray-950' name="level" id="" {...register('level', {
            required: 'This field is required'
        })}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
        </select>
        <SaveButton content={'Save'} />
      </form>
    )
  }

export default LevelField