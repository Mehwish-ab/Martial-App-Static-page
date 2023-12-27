import React from 'react'
import InstructorCardView from '../InstructorCardView/InstructorCardView'
import ViewInstructor from '../ViewInstructor/ViewInstructor'

const InformationInstructor = (): JSX.Element => {
    return (
        <>
            <ViewInstructor />
            <InstructorCardView />
        </>
    )
}

export default InformationInstructor
