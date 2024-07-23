import React from 'react'
import styles from './Footer.module.css'
import paymentimg from '../../../assets/MartialAppNew/images/paymentmethods.png'
import logo from '../../../assets/MartialAppNew/images/footer logo MA Gus.png'
import socialicons from '../../../assets/MartialAppNew/images/social.png'
import availableon from '../../../assets/MartialAppNew/images/availableOn.png'

const Footer = (): JSX.Element => {
    return (
        <div>
            <div className={styles.footer_columns}>
                <div className={styles.footer_logo}>
                    <div className={styles.inner_div1}>
                        <img src={logo} alt="" />
                        <img src={socialicons} alt="" />
                    </div>
                </div>
                <div className={styles.footer_about}>
                    <div className={styles.inner_div2}>
                        <h1 className={styles.heading}>More About Martial</h1>
                        <p className={styles.para}>
                            Discover a World of Martial Arts Experiences. Search
                            Academies, Book Classes,
                            <br /> Chat with instructors. Designed to connect
                            the world of Martial Arts
                        </p>
                        <img src={availableon} alt="" />
                    </div>
                </div>
                <div className={styles.footer_list}>
                    <div className={styles.inner_div3}>
                        <div className={`mb-3 ${styles.navigate_list}`}>
                            <p>Navigate</p>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2">
                                    <a
                                        href="#"
                                        className="nav-link p-0 text-body-secondary"
                                    >
                                        Schools
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a
                                        href="#"
                                        className="nav-link p-0 text-body-secondary"
                                    >
                                        Technology
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a
                                        href="#"
                                        className="nav-link p-0 text-body-secondary"
                                    >
                                        Academies & Trainers
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a
                                        href="#"
                                        className="nav-link p-0 text-body-secondary"
                                    >
                                        Digital Learning
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={`col mb-3 ${styles.support_list}`}>
                            <p>Support</p>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2">
                                    <a
                                        href="#"
                                        className="nav-link p-0 text-body-secondary"
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a
                                        href="#"
                                        className="nav-link p-0 text-body-secondary"
                                    >
                                        Contact Us
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a
                                        href="#"
                                        className="nav-link p-0 text-body-secondary"
                                    >
                                        FAQs
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.payment_img}>
                <img src={paymentimg} alt="" />
            </div>
            <div>
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <p className="col-md-4 mb-0 text-body-secondary">
                        © MartialApp. 2024 All Rights Reserved
                    </p>

                    <ul className="nav col-md-4 justify-content-end">
                        <li className="nav-item">
                            <a
                                href="#"
                                className="nav-link px-2 text-body-secondary"
                            >
                                Terms & Conditions
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                href="#"
                                className="nav-link px-2 text-body-secondary"
                            >
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </footer>
            </div>
        </div>
    )
}

export default Footer
