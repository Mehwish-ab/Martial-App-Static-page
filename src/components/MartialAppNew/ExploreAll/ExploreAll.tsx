import React from 'react'
import styles from './ExploreAll.module.css'
import image from '../../../assets/MartialAppNew/images/explore.png'

const ExploreAll = (): JSX.Element => {
    return (
        <div>
            <div className={`container-fluid ${styles.container_main}`}>
                <div className={styles.main_Container}>
                    <div className={styles.left_content}>
                        <div className="row align-items-center g-8 ">
                            <div>
                                <h3 className={` mb-10 py-4 ${styles.heading}`}>
                                    <span className={styles.half_heading}>
                                        Search Academies, Book <br />
                                        Classes,{' '}
                                    </span>
                                    <span className={styles.next_half_heading}>
                                        Chat with instructors,
                                        <br /> Digital learning
                                    </span>
                                </h3>
                                <p className={styles.paragraph}>
                                    Connecting sports enthusiasts worldwide,
                                    enhancing the training <br />
                                    experience, making it enjoyable, and easily
                                    shareable.
                                </p>
                                <div className={styles.explore_Button}>
                                    <button
                                        type="button"
                                        className="btn btn-sm px-4 me-md-2 "
                                    >
                                        Explore All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.right_image}>
                        <img
                            src={image}
                            className="d-block mx-lg-auto img-fluid"
                            alt="Martial Student"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExploreAll
