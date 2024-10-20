// src/components/DescriptionField.js
import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import SaveButton from '../SaveButton';
import TextEditor from '../../../TextEditor';
import { useFormSubmit } from '../../../../utils/useFormSubmit';
import { htmlToText } from 'html-to-text';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../../states/authTokenSlice';

const DescriptionField = ({ forChapter, courseId, chapterId }) => {
  const token = useSelector(selectToken)
  const { handleSubmit, control, errors, setValue, onSubmit } = useFormSubmit(1, courseId, chapterId, token, forChapter);

  useEffect(() => {
    !forChapter ? setValue('description', '') : setValue('chapterDescription', '');
  }, [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {!forChapter ? (
        <Controller
          name="description"
          control={control}
          rules={{ required: 'This field is required' }}
          render={({ field }) => (
            <textarea
              className='bg-white rounded-xl px-4 py-2 text-sm text-gray-950 w-full border-2 border-gray-950 font-medium'
              rows={2.5}
              placeholder={`e.g. the course is about...`}
              {...field}
            />
          )}
        />
      ) : (
        <Controller
          name="chapterDescription"
          control={control}
          rules={{ required: 'This field is required' }}
          render={({ field }) => (
            <TextEditor 
              value={field.value} 
              onChange={field.onChange}
            />
          )}
        />
      )}
      {errors.description && <p className=' text-xs text-red-600'>{errors.description?.message}</p>}
      {errors.chapterDescription && <p className=' text-xs text-red-600'>{errors.chapterDescription?.message}</p>}
      <SaveButton content={'Save'} />
    </form>
  );
};

export default DescriptionField;
