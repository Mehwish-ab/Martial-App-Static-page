import React from 'react'
import styles from './MAFeatures.module.css'
import trackingimg from '../../../../assets/MartialAppNew/images/tracking.png'
import img1 from '../../../../assets/MartialAppNew/images/img1.png'
import img3 from '../../../../assets/MartialAppNew/images/img3.png'
import img4 from '../../../../assets/MartialAppNew/images/img4.png'
import img5 from '../../../../assets/MartialAppNew/images/img5.png'
import img6 from '../../../../assets/MartialAppNew/images/img6.png'
import img7 from '../../../../assets/MartialAppNew/images/img7.png'
import fline from '../../../../assets/MartialAppNew/images/fline.png'

const MAFeatures = (): JSX.Element => {
    return (
        <div className={`d-flex ${styles.container}`}>
            <div className={styles.members}>
                <div className={styles.inner_text}>
                    <div>
                        <h1 className="my-5"> For Members</h1>
                        <div className="d-flex">
                            <img
                                className="my-3"
                                src={img1}
                                alt=""
                                height={25}
                            />
                            <p className="mx-3 ">
                                Send promotional messages to customers <br /> &
                                members of your club
                            </p>
                        </div>

                        <div className="d-flex">
                            <img src={trackingimg} alt="" height={25} />
                            <p className="mx-3 ">
                                Tracking member progress & attendance
                            </p>
                        </div>
                        <div className="d-flex">
                            <img src={img3} alt="" height={25} />
                            <p className="mx-3 ">
                                Communicate directly with members
                            </p>
                        </div>
                        <div className="d-flex">
                            <img src={img4} alt="" height={25} />
                            <p className="mx-3 ">
                                Set classed schedules and events
                            </p>
                        </div>
                        <div className="d-flex">
                            <img src={img5} alt="" height={25} />
                            <p className="mx-3 ">Show addressed & directions</p>
                        </div>
                        <div className="d-flex">
                            <img src={img6} alt="" height={25} />
                            <p className="mx-3 ">Bill membership fees.</p>
                        </div>
                        <div className="d-flex">
                            <img src={img7} alt="" height={25} />
                            <p className="mx-3 ">
                                Links to news, music podcast, & other.{' '}
                            </p>
                        </div>
                        <span className="my-4">
                            + Manny other great features!
                        </span>
                    </div>
                </div>

                <img className={styles.line_imgleft} src={fline} alt="" />
            </div>
            <div className={styles.academies}>
                <div className={styles.inner_text}>
                    <div>
                        <h1 className="my-5"> For Academies</h1>
                        <div className="d-flex">
                            <img
                                className="my-3"
                                src={img1}
                                alt=""
                                height={25}
                            />
                            <p className="mx-3 ">
                                Send promotional messages to customers <br /> &
                                members of your club
                            </p>
                        </div>

                        <div className="d-flex">
                            <img src={trackingimg} alt="" height={25} />
                            <p className="mx-3 ">
                                Tracking member progress & attendance
                            </p>
                        </div>
                        <div className="d-flex">
                            <img src={img3} alt="" height={25} />
                            <p className="mx-3 ">
                                Communicate directly with members
                            </p>
                        </div>
                        <div className="d-flex">
                            <img src={img4} alt="" height={25} />
                            <p className="mx-3 ">
                                Set classed schedules and events
                            </p>
                        </div>
                        <div className="d-flex">
                            <img src={img5} alt="" height={25} />
                            <p className="mx-3 ">Show addressed & directions</p>
                        </div>
                        <div className="d-flex">
                            <img src={img6} alt="" height={25} />
                            <p className="mx-3 ">Bill membership fees.</p>
                        </div>
                        <div className="d-flex">
                            <img src={img7} alt="" height={25} />
                            <p className="mx-3 ">
                                Links to news, music podcast, & other.{' '}
                            </p>
                        </div>
                        <span>+ Manny other great features!</span>
                    </div>
                </div>
                <img className={styles.line_imgright} src={fline} alt="" />
            </div>
        </div>
    )
}

export default MAFeatures
