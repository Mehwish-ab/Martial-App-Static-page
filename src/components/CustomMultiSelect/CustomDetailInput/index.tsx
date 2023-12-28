import React from 'react'
import { CustomDetailInputContainer } from './style'

const index = ({ label, value }: any): JSX.Element => {
    return (
        <CustomDetailInputContainer>
            <p>{label}</p>
            <h4>{value}</h4>
        </CustomDetailInputContainer>
    )
}

export default index
