import React from 'react'
import InstructorCardView from '../InstructorCardView/InstructorCardView'
import ViewInstructor from '../ViewInstructor/ViewInstructor'
import ViewActivity from '../../Activitity/viewActivity'

const InformationInstructor = (): JSX.Element => {
    return (
        <>
            <ViewInstructor />
            <ViewActivity />
            <InstructorCardView />
        </>
    )
}

export default InformationInstructor
