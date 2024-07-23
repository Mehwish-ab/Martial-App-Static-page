import React from 'react'
import styles from './FeaturedSchools.module.css'
import featuredframe from '../../../../assets/MartialAppNew/images/featuresframe.png'
import gimg1 from '../../../../assets/MartialAppNew/images/GridImgs/gimg1.png'
import gimg2 from '../../../../assets/MartialAppNew/images/GridImgs/gimg2.png'
import gimg3 from '../../../../assets/MartialAppNew/images/GridImgs/gimg3.png'
import gimg4 from '../../../../assets/MartialAppNew/images/GridImgs/gimg4.png'
import gimg5 from '../../../../assets/MartialAppNew/images/GridImgs/gimg5.png'
import gimg6 from '../../../../assets/MartialAppNew/images/GridImgs/gimg6.png'
import gimg7 from '../../../../assets/MartialAppNew/images/GridImgs/gimg7.png'
import gimg8 from '../../../../assets/MartialAppNew/images/GridImgs/gimg8.png'
import gimg9 from '../../../../assets/MartialAppNew/images/GridImgs/gimg9.png'
import img from '../../../../assets/MartialAppNew/images/Group 427321278.png'

const FeaturedScools = (): JSX.Element => {
    return (
        <div className={styles.main_featured_container}>
            <div className={styles.featured_container}>
                <div className={styles.heading_container}>
                    <h1 className={styles.featured_text}>
                        Our Featured <span>Schools</span>
                    </h1>
                    <div className={styles.heading_button}>
                        <button type="button">Explore all</button>
                    </div>
                </div>

                <img src={featuredframe} alt="" />
            </div>
            <div className={styles.container_2}>
                <div className={styles.left_container}>
                    <h3>
                        <span>More Than Mere</span> Business Associates, <br />
                        Genuine Companions
                        <span>On This Journey</span>
                    </h3>
                    <p>
                        Martial App empowers academy owners with a simple user
                        experience <br /> that frees up time for them to teach,
                        retain current memberships, and <br /> find new
                        students.
                    </p>
                    <img src={img} alt="" />
                </div>

                <div className={styles.right_container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <img src={gimg1} alt="" />
                        </div>
                        <div className={styles.column}>
                            <img src={gimg2} alt="" />
                        </div>
                        <div className={styles.column}>
                            <img src={gimg3} alt="" />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <img src={gimg4} alt="" />
                        </div>
                        <div className={styles.column}>
                            <img src={gimg5} alt="" />
                        </div>
                        <div className={styles.column}>
                            <img src={gimg6} alt="" />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <img src={gimg7} alt="" />
                        </div>
                        <div className={styles.column}>
                            <img src={gimg8} alt="" />
                        </div>
                        <div className={styles.column}>
                            <img src={gimg9} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedScools
