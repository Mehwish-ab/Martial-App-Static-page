import React from 'react'
import styles from './MoreAboutUs.module.css'
import { FaLongArrowAltRight } from 'react-icons/fa'

import aboutuslogo from '../../../../assets/MartialAppNew/images/about_logo.svg'
//

const MoreAboutUs = (): JSX.Element => {
    return (
        <div className={styles.aboutUsContainer}>
            <div className=" text-center">
                <div className={styles.aboutus_logo_img}>
                    <img
                        className="d-block mx-auto mb-4"
                        src={aboutuslogo}
                        alt=""
                        width="200"
                        height="150"
                    />
                </div>
                <div
                    className={`col-lg-10 mx-auto py-4 ${styles.moreAboutUsP1}`}
                >
                    <p className=" mb-4">
                        Our Mission is to Bring Technology Solutions to the
                        Martial <br /> Arts and Combat Sports Industry
                    </p>
                </div>
                <p className={`py-2 ${styles.moreAboutUsP2}`}>
                    More About Us <FaLongArrowAltRight />
                </p>
            </div>
        </div>
    )
}

export default MoreAboutUs
