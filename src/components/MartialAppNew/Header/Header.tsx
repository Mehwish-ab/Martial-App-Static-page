import React from 'react'
import HeroSection from './HeroSection/HeroSection'
import Navbar from './Navbar/Navbar'

const Header = (): JSX.Element => {
    return (
        <>
            <Navbar />
            <HeroSection />
        </>
    )
}

export default Header
