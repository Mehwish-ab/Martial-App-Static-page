import React from 'react'
import Header from './Header/Header'
import styles from './MartialAppNew.module.css'
// import MoreAboutUs from './AboutUsSection/AboutUs/MoreAboutUs'
// import StartAFree from './StartAFreeSection/StartAFree'
// import MAFeatures from './AboutUsSection/Members&Academies/MAFeatures'
// import FeaturedScools from './FeaturedSchoolsSection/Section1/FeaturedScools'
// import AllInOneApp from './FeaturedSchoolsSection/Section2/AllInOneApp'
// import ExploreAll from './ExploreAll/ExploreAll'
// import PaymentMethod from './PaymentMethod/PaymentMethod'
// import Footer from './Footer/Footer'

const MartialAppNew = (): JSX.Element => {
    return (
        <div className={styles.martial__App}>
            <Header />
            {/* <StartAFree />
            <MoreAboutUs />
            <MAFeatures />
            <FeaturedScools />
            <AllInOneApp />
            <ExploreAll />
            <PaymentMethod />
            <Footer /> */}
        </div>
    )
}

export default MartialAppNew
