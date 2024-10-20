import React from 'react'
import SaveButton from '../SaveButton'
import { useFormSubmit } from '../../../../utils/useFormSubmit'
import { selectToken } from '../../../../states/authTokenSlice'
import { useSelector } from 'react-redux'

const PriceField = ({ forChapter, courseId, chapterId }) => {
  const token = useSelector(selectToken)
  const {
    handleSubmit,
    register,
    errors,
    onSubmit
  } = useFormSubmit(6, courseId, chapterId, token, forChapter)

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {!forChapter ? <input className=' bg-white px-6 py-1.5 w-full border-2 rounded-md text-base font-medium text-gray-950 placeholder:text-gray-950' type="number" placeholder='Select option ...' {...register('Price', {
            required: 'This field is required'
        })} />
        :
        <div className=' text-xs font-semibold text-gray-500 px-5 py-2.5 rounded-md border-2 flex items-center bg-white'>
          <input type="checkbox" className=' mr-2 cursor-pointer bg-red-500' {...register('chapterAccess')}  />
          <label htmlFor='chapterAccess'>Check this box if you want to make this chapter free for preview</label>
        </div>}
        <SaveButton content={'Save'} />
    </form>
  )
}

export default PriceField