import React from 'react'
import styles from './PaymentMethod.module.css'
import paymentmethod from '../../../assets/MartialAppNew/images/paymentmethods.png'
import img from '../../../assets/MartialAppNew/images/imageleft.png'
import infoimg from '../../../assets/MartialAppNew/images/Group 427321278.png'

const PaymentMethod = (): JSX.Element => {
    return (
        <div className={styles.main_box}>
            <div className="px-4 py-5 text-center">
                <h1 className={`text-body-emphasis ${styles.payment_heading}`}>
                    Various Payment <span>Methods</span>
                </h1>
                <p className={styles.payment_para}>
                    Martial App empowers academy owners w ith a simple user
                    experience that frees up the time for <br />
                    them to teach, retain current memberships and find news
                    customers.
                </p>
                <img
                    className="d-block mx-auto mb-4"
                    src={paymentmethod}
                    alt=""
                />
            </div>
            <div className={styles.box}>
                <div className={styles.imagebox}>
                    <img src={img} alt="" />
                </div>
                <div className={styles.overlap_box}>
                    <div className={styles.inner_content}>
                        <h1 className={styles.main_heading}>
                            <span>Our platform</span> is available <br />
                            on any app store
                        </h1>
                        <p>
                            Innovative Management Software for Martial Arts
                            Academies <br /> and Business & User Interaction
                            Worldwide
                        </p>
                        <div className={styles.info_img_box}>
                            <img src={infoimg} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod
