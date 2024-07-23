import React from 'react'
import styles from './StartAFree.module.css'
import lineimg from '../../../assets/MartialAppNew/images/Line .png'
import image1 from '../../../assets/MartialAppNew/images/image1.png'
import image2 from '../../../assets/MartialAppNew/images/image2.png'
import image3 from '../../../assets/MartialAppNew/images/image3.png'
import image4 from '../../../assets/MartialAppNew/images/image4.png'
import image5 from '../../../assets/MartialAppNew/images/image5.png'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

const StartAFree = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <div className={styles.main__container}>
                <div className={styles['main-image-container']}>
                    <div className={styles.heading}>
                        <h2 className={styles.main__heading1}>
                            A FREE to user Platform for
                        </h2>
                        <h2 className={styles.main__heading2}>
                            Martial Arts Bussinesses and Practitioners
                        </h2>
                    </div>
                    <div className={styles.main__content}>
                        <div className={styles.text__top}>
                            <p>
                                Martial is an OFF-The-Shlef Business
                                <br /> Management Solution
                            </p>
                            <img src={lineimg} alt="" />
                        </div>

                        <div className={styles.image__1}>
                            <img
                                src={image1}
                                alt=""
                                width={1000}
                                height={700}
                            />
                        </div>
                        <div className={styles.image__2}>
                            <img src={image2} alt="" width={450} height={350} />
                        </div>
                        <div className={styles.image__3}>
                            <img src={image3} alt="" width={500} height={450} />
                        </div>
                        <div className={styles.image__4}>
                            <img src={image4} alt="" width={450} height={400} />
                        </div>
                        <div className={styles.pencil_img}>
                            <img src={image5} alt="" />
                        </div>
                    </div>
                </div>
                <div className={styles.bottom_right_text}>
                    <p>
                        <IoMdCheckmarkCircleOutline size={35} color="#4DC9F5" />
                        Manage and Control thier Business in The Cloud
                    </p>
                    <p>
                        <IoMdCheckmarkCircleOutline size={35} color="#4DC9F5" />
                        Receive payments, Upload content.
                    </p>
                    <p>
                        <IoMdCheckmarkCircleOutline size={35} color="#4DC9F5" />
                        A great experience of the user’s martial arts journey.
                    </p>
                    <p>
                        <IoMdCheckmarkCircleOutline size={35} color="#4DC9F5" />
                        Connect with student on a deeper level.
                    </p>
                    <p>
                        <IoMdCheckmarkCircleOutline size={35} color="#4DC9F5" />
                        Multilingual solution
                    </p>
                </div>
            </div>
            <div className={styles.bottom_button}>
                <button type="button"> Start a FREE Account</button>
            </div>
            {/* <div className={`text-center ${styles.btn__StartAFee}`}>
                <button type="button" className="btn btn-sm px-4 me-md-2 ">
                    Start a Free Account
                </button>
            </div> */}
        </div>
    )
}

export default StartAFree
