import React from 'react'
import styles from './HeroSection.module.css'
import heroSecImg from '../../../../assets/MartialAppNew/images/availableOn.png'
import homeImage from '../../../../assets/MartialAppNew/images/HomeImage.png'
import fixedimg from '../../../../assets/MartialAppNew/images/fixedimage.png'
import { IoRemoveOutline } from 'react-icons/io5'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

const HeroSection = (): JSX.Element => {
    return (
        <>
            <div className={`${styles.main_container_herosection}`}>
                <div className={styles.HeroContainer}>
                    <div className={styles.left_content}>
                        <div className="row align-items-center g-8 ">
                            <div>
                                <div
                                    className={`py-8 ${styles.navigation_bars}`}
                                >
                                    <IoRemoveOutline
                                        size={80}
                                        color="#4CBDEC"
                                    />
                                    <IoRemoveOutline
                                        size={30}
                                        color="lightgrey"
                                    />
                                    <IoRemoveOutline
                                        size={30}
                                        color="lightgrey"
                                    />
                                </div>

                                <h3
                                    className={` mb-10 py-4 ${styles.headings}`}
                                >
                                    <span>Take Your </span>
                                    <span
                                        style={{
                                            color: '#1795D2',
                                        }}
                                    >
                                        Martial Arts
                                    </span>
                                    <br /> Trainings to New Heights
                                </h3>
                                <p className={styles.para}>
                                    Innovative Management Software for Martial
                                    Arts
                                    <br />
                                    Academies and Business & User Interaction
                                    Worldwide
                                </p>
                                <div className={styles.heroButton}>
                                    <button
                                        type="button"
                                        className="btn btn-sm px-4 me-md-2 "
                                    >
                                        Get Started for FREE
                                    </button>
                                </div>
                                <div className={styles.availbleOn}>
                                    <img src={heroSecImg} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.right_image}>
                        <img
                            src={homeImage}
                            className="d-block mx-lg-auto img-fluid"
                            alt="Martial Student"
                            loading="lazy"
                        />
                    </div>
                    <div className={styles.fixed_img}>
                        <img src={fixedimg} alt="" />
                    </div>
                    <div className={styles.navgation_signs}>
                        <div className={styles.black}>
                            <IoIosArrowForward size={30} color="white" />
                        </div>
                        <div className={styles.white}>
                            <IoIosArrowBack size={30} color="black" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HeroSection
