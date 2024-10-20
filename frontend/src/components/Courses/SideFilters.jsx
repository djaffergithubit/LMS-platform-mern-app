import React from 'react'
import { filters } from '../../utils/filterData'
import FilterComponent from './FilterComponent'

const SideFilters = ({currentFilters, setCurrentFilters, setShowResults, showResults, setAll, all }) => {

  return (
    <form className={`sm:flex-3 w-full lg:col-span-3 pb-6 `}>
        {
            filters.map((filter, index) => (
                <FilterComponent 
                  key={index} 
                  filter={filter} 
                  currentFilters={currentFilters}
                  setCurrentFilters={setCurrentFilters}
                  setShowResults={setShowResults}
                  showResults={showResults}
                  setAll={setAll}
                  all={all}
                />
            ))
        }
    </form>
  )
}

export default SideFilters