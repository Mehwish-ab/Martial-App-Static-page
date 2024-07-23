import React from 'react'
import styles from './AllInOneApp.module.css'
import mobileimg from '../../../../assets/MartialAppNew/images/mobileimg.png'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import happyusers from '../../../../assets/MartialAppNew/images/happyusers.png'

const AllInOneApp = (): JSX.Element => {
    return (
        <div>
            <div className="container col-xl-10 col-xxl-8 px-4 py-5">
                <div className="row align-items-center g-lg-5 py-5">
                    <div className="col-lg-7 text-center text-lg-start">
                        <h3
                            className={`display-4 my-4 lh-1 text-body-emphasis mb-3 ${styles.heading1}`}
                        >
                            An All-in-one App
                        </h3>
                        <h3
                            className={`display-4  lh-1 mb-3 my-4 ${styles.heading2}`}
                        >
                            For Academy Owners
                        </h3>
                        <p
                            className={`col-lg-10 fs-4 my-5 ${styles.main_para}`}
                        >
                            <span>Martial App </span>empowers academy owners
                            with a simple user experience that frees up time for
                            them to teach, retain current memberships, and find
                            new students.
                        </p>
                        <div className={styles.paras}>
                            <p>
                                <IoMdCheckmarkCircleOutline
                                    size={30}
                                    style={{ color: '#1E9AD5' }}
                                />
                                <span>
                                    Track student progress to see who is up for
                                    promotion.
                                </span>
                            </p>
                            <p>
                                <IoMdCheckmarkCircleOutline
                                    size={30}
                                    style={{ color: '#1E9AD5' }}
                                />
                                <span>
                                    Find students who havent come to train
                                    recently.
                                </span>
                            </p>
                            <p>
                                <IoMdCheckmarkCircleOutline
                                    size={30}
                                    style={{ color: '#1E9AD5' }}
                                />
                                <span> Set classed schedules and events.</span>
                            </p>
                            <p>
                                <IoMdCheckmarkCircleOutline
                                    size={30}
                                    style={{ color: '#1E9AD5' }}
                                />
                                <span>Organize teams for tournaments.</span>
                            </p>
                            <p>
                                <IoMdCheckmarkCircleOutline
                                    size={30}
                                    style={{ color: '#1E9AD5' }}
                                />
                                <span>Resolve any billing issues.</span>
                            </p>
                            <p>
                                <IoMdCheckmarkCircleOutline
                                    size={30}
                                    style={{ color: '#1E9AD5' }}
                                />
                                <span> Bill membership fees.</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-10 mx-auto col-lg-5">
                        <img src={mobileimg} alt="" />
                    </div>
                </div>
            </div>
            <div className="px-4 text-center border-bottom">
                <h1 className={styles.happy_user}>
                    What Our Happy Users <span>Thinks of it?</span>
                </h1>

                <div className="overflow-hidden">
                    <div className=" py-3">
                        <img
                            src={happyusers}
                            className="img-fluid  mb-4 my-4"
                            alt="Example image"
                            width="1600"
                            height="700"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllInOneApp
