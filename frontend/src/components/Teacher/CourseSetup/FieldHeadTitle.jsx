import React from 'react'

const FieldHeadTitle = ({ field }) => {
  return (
    <div className=' flex items-center mb-3'>
        <div className=' mr-2 p-1.5 rounded-full bg-sky-100'>
            {field.icon}
        </div>
        <h5 className=' text-base text-gray-950 font-semibold'>{field.fieldHeadTitle}</h5>
    </div>
  )
}

export default FieldHeadTitle