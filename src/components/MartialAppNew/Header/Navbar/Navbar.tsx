import React from 'react'
import styles from './Navbar.module.css'
import logo from '../../../../assets/MartialAppNew/images/LOGO MA Gus.png'
import { IoChevronDownOutline } from 'react-icons/io5'

import unitedKingdom from '../../../../assets/MartialAppNew/images/united-kingdom.png'

const Navbar = (): JSX.Element => {
    return (
        <>
            <div className={styles.navbar_container}>
                <nav
                    className={`navbar navbar-expand-lg bg-body-tertiary rounded ${styles.navbar}`}
                >
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="" height={'67px'} />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a
                                    className="nav-link "
                                    aria-current="page"
                                    href="#"
                                >
                                    Schools
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="#">
                                    Technology
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="#">
                                    Academies & Trainers
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Digital Learning
                                </a>
                            </li>
                        </ul>
                        <div className={styles.flag}>
                            <img
                                src={unitedKingdom}
                                alt=""
                                width={35}
                                height={35}
                                className="mx-2"
                            />

                            <IoChevronDownOutline color="#4DC9F5" />
                        </div>

                        <div className={`d-flex ${styles.navbarbtn}`}>
                            <button className="btn">Register</button>
                            <span
                                style={{ fontSize: '60px;', marginTop: '5px' }}
                            >
                                &#8739;
                            </span>
                            <button className="btn ">Login</button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar
