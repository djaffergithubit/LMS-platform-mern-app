import React from 'react'
import { AiOutlineUndo } from "react-icons/ai";
import StarRating from '../StarRating';

const FilterComponent = ({ filter, currentFilters, setCurrentFilters, setShowResults, showResults, setAll, all }) => {

    const handleFormChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            if (e.target.checked) {
                setCurrentFilters({
                    ...currentFilters,
                    [name]: [...currentFilters[name], value]
                });
            } else {
                setCurrentFilters({
                    ...currentFilters,
                    [name]: currentFilters[name].filter(item => item !== value)
                });
            }
        } else if (type === 'radio') {
            setCurrentFilters({
                ...currentFilters,
                [name]: [value]
            });
        }
    };

    const scrollUp = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        });
    }

    const handleReset = () => {
        setAll(!all)
        setCurrentFilters({
          Category: [],
          Level: [],
          Rating: [],
          Price: [],
          Availability: []
        })
        scrollUp()
      }

      const handleResults = () => {
        setShowResults(!showResults)
        scrollUp()
      }

    return (
        <div className=' px-6 py-4 border-[1px] border-solid border-gray-300 '>
            <div className=' flex justify-between items-center mb-4'>
                <h4 className=' text-base font-bold text-gray-900'>{filter.type}</h4>
                <div className=' w-4 h-0.5 bg-blue-500'></div>
            </div>
            <ul className=' flex flex-col gap-y-2'>
                {filter.options.map((option, index) => (
                    <li key={index}>
                        <label className="flex items-center cursor-pointer">
                            {filter.type !== 'Rating' && filter.type !== 'Availability' ? (
                                <>
                                    <input
                                        type="checkbox"
                                        name={filter.type} 
                                        value={option}
                                        className="checkbox-input absolute opacity-0"
                                        onChange={handleFormChange}
                                        checked={currentFilters[filter.type]?.includes(option)} 
                                    />
                                    <span className="checkbox-custom"></span>
                                </>
                            ) : (
                                <>
                                    <input
                                        type="radio"
                                        name={filter.type} 
                                        value={option}
                                        className="radio-input absolute opacity-0"
                                        onChange={handleFormChange}
                                        checked={currentFilters[filter.type]?.includes(`${option}`)}
                                    />
                                    <span className="radio-custom"></span>
                                </>
                            )}
                            <span className="ml-2 text-sm text-gray-950 font-medium">
                                {filter.type === 'Rating' && <StarRating rating={option} />} 
                                {filter.type === 'Rating' ? `${option.toString().includes('.') ? option : `${option}.0`} & up` : option}
                            </span>
                        </label>
                    </li>
                ))}
            </ul>
            {filter.type === 'Availability' && (
                <>
                    <div className='w-full mt-8'>
                        <button type='button' className='text-sm text-white bg-blue-700 px-5 py-3 w-full font-medium' onClick={handleResults}>
                            SHOW RESULTS
                        </button>
                    </div>
                    <div className='text-gray-950 text-sm mt-4 hover:text-blue-600 cursor-pointer flex justify-center items-center'>
                        <AiOutlineUndo className='text-xl mr-2' /> 
                        <span className='py-0.5 font-medium border-b-2 border-dotted border-gray-600 hover:border-blue-700' onClick={handleReset}>
                            Reset All
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}

export default FilterComponent;
