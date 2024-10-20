import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { HiChevronUpDown } from "react-icons/hi2";
import SaveButton from '../SaveButton';
import { useFormSubmit } from '../../../../utils/useFormSubmit';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../../states/authTokenSlice';

const CategoryField = ({ courseId, forChapter }) => {

    const token = useSelector(selectToken)
    const [showCategoryList, setShowCategoryList] = useState(false)
    const {
        handleSubmit,
        register,
        errors,
        onSubmit
    } = useFormSubmit(3, courseId, '', token, forChapter)
    

  return (
    <form action="" className='' onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className=' relative flex items-center flex-col'>
            <div className=' relative flex items-center w-full'  onClick={() => setShowCategoryList(!showCategoryList)}>
                <input className=' bg-white px-6 py-1.5 outline-none w-full border-2 rounded-md text-base font-medium text-gray-950 placeholder:text-gray-950' type="text" {...register('category', {
                    required: 'This field is required'
                })} placeholder='Select option ...' />
                <HiChevronUpDown className=' absolute right-0 mr-4 text-xl ' />
            </div>
            {errors.category && <p className=' text-xs text-red-600 mt-1'>{errors.category?.message}</p>}
        {showCategoryList && <div className=' rounded-md shadow-inner absolute bg-white bottom-full max-w-[200px] w-full border-2'>
                <div className=' flex items-center relative w-full'>
                    <input className=' px-6 py-1.5 text-base text-green-950 bg-white outline-none border-b-2 w-full' placeholder='Search option...' type="text" name="" id="" />
                    <CiSearch className=' absolute top-0 left-0 text-xl h-full' />
                </div>
                <ul>
                    <li className=' px-6 py-1.5 font-medium text-gray-950'>
                        Accounting
                    </li>
                    <li className=' px-6 py-1.5 font-medium text-gray-950'>
                        Computer science
                    </li>
                    <li className=' px-6 py-1.5 font-medium text-gray-950'>
                        Accounting
                    </li>
                    <li className=' px-6 py-1.5 font-medium text-gray-950'>
                        Accounting
                    </li>
                    <li className=' px-6 py-1.5 font-medium text-gray-950'>
                        Accounting
                    </li>
                    <li className=' px-6 py-1.5 font-medium text-gray-950'>
                        Accounting
                    </li>
                </ul>
            </div>}
        </div>
        <SaveButton content={'Save'} />
    </form>
  )
}

export default CategoryField