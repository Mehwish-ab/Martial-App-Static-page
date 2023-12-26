import React from 'react'
import FilterListTimeDateType from './style'
import RightArrow from '../../assets/images/rightArrow.svg'
import LeftArrow from '../../assets/images/leftArrow.svg'
import DateCalander from '../../assets/images/dateCalander.svg'

type FilterListTimeDateProps = {
    // Define your props here if needed
}

const FilterListTimeDate: React.FC<FilterListTimeDateProps> = (props) => {
    // You need to return JSX elements inside the function body, not outside
    return (
        <FilterListTimeDateType>
            <div className="instructorDateSection">
                <div className="mainarrow">
                    <div className="arrowright">
                        <img
                            src={LeftArrow}
                            alt="Date"
                            width={18}
                            height={12}
                        />
                    </div>
                    <div className="arrowleft">
                        <img
                            src={RightArrow}
                            alt="Date"
                            width={18}
                            height={12}
                        />
                    </div>
                </div>
                <div className="dateRange">
                    <p>
                        <span>Mon,</span> Sep 11, 2023 - <span>Thu,</span> Sep
                        21, 2023
                    </p>
                    <img
                        src={DateCalander}
                        alt="Calander"
                        width={21}
                        height={21}
                    />
                </div>
                <div className="dateToday">Today</div>
            </div>
        </FilterListTimeDateType>
    )
}

export default FilterListTimeDate
