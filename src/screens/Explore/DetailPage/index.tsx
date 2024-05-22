import { CardViewStyled } from './style'

import schoolImg from '../../../assets/images/schoolDetailPublicImage.png'
import act3 from '../../../assets/images/activity.png'
import act2 from '../../../assets/images/activity1.png'
import act1 from '../../../assets/images/activity2.png'
import act from '../../../assets/images/activity4.png'
import ame2 from '../../../assets/images/Group (2).png'
import ame3 from '../../../assets/images/Group (3).png'
import ame4 from '../../../assets/images/Group (4).png'
import ame5 from '../../../assets/images/Group (5).png'
import ame6 from '../../../assets/images/Group (6).png'
import ame7 from '../../../assets/images/Group (7).png'
import ame8 from '../../../assets/images/Group (8).png'
import ame9 from '../../../assets/images/Group (9).png'
import ame10 from '../../../assets/images/Group (10).png'
import ame11 from '../../../assets/images/Group (11).png'
import ame12 from '../../../assets/images/Group (12).png'
import ame13 from '../../../assets/images/Group (13).png'
import ame14 from '../../../assets/images/Group (14).png'
import ame15 from '../../../assets/images/Group (15).png'
import ame16 from '../../../assets/images/Group (16).png'
import ame17 from '../../../assets/images/Group (17).png'
import ame18 from '../../../assets/images/Group (18).png'
import ame19 from '../../../assets/images/Group (19).png'
import ame20 from '../../../assets/images/Group (20).png'
import ame21 from '../../../assets/images/Group (21).png'
import ame22 from '../../../assets/images/Group (22).png'
import ame23 from '../../../assets/images/Group (23).png'
import ame24 from '../../../assets/images/Group (24).png'
import ame25 from '../../../assets/images/Group (25).png'
import location from '../../../assets/images/location.png'
import instagram from '../../../assets/images/instagram.png'
import facebook from '../../../assets/images/facebook.png'
import msg from '../../../assets/images/msg.png'
import phone from '../../../assets/images/phone.png'
import link from '../../../assets/images/link.png'
import Head from '../../../components/Head/Head'
import PublicNavBar from '../../../components/Navbar/PublicNavbar/index'
import { useState } from 'react'
import useCreateSchool from '../../../hooks/useCreateSchool'
import { useParams } from 'react-router-dom'
import { Col, Row } from 'antd'
import CustomButton from '../../../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    lightBlue3,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
import Map from '../../Dashboard/GoogleMap'

const DetailPage = (): JSX.Element => {
    const { getSchoolbyId } = useCreateSchool()
    const { schoolData, setschoolData } = useState() as any
    const { SchoolId } = useParams()
    // useEffect(() => {
    //     const fetchData = async (): Promise<void> => {
    //         try {
    //             const response: any = await getSchoolbyId(Number(SchoolId))
    //             setschoolData(response)

    //             console.log('response of', response)

    //             // eslint-disable-next-line @typescript-eslint/no-shadow
    //         } catch (error) {
    //             // setError('Error fetching data')
    //         } finally {
    //             // setLoading(false)
    //         }
    //     }

    //     fetchData()
    // }, [])
    const scheduleData = [
        { id: '1', name: 'Jiu Jitsu', time: ' 10:00 AM PST 90 min' },
        { id: '2', name: 'Jiu Jitsu', time: ' 10:00 AM PST 90 min' },

        { id: '3', name: 'Jiu Jitsu', time: ' 10:00 AM PST 90 min' },

        { id: '4', name: 'Jiu Jitsu', time: ' 10:00 AM PST 90 min' },
        { id: '5', name: 'Jiu Jitsu', time: ' 10:00 AM PST 90 min' },
        { id: '6', name: 'Jiu Jitsu', time: ' 10:00 AM PST 90 min' },
    ]
    const activitiesData = [
        { id: '1', title: 'fitness', img: act },
        { id: '1', title: 'fitness', img: act1 },
        { id: '1', title: 'fitness', img: act2 },
        { id: '1', title: 'fitness', img: act3 },
    ]
    const contactData = [
        {
            id: '1',
            title: 'Calle Polifemo, 3, Málaga, España',
            img: location,
        },
        { id: '2', title: '+34665988898', img: phone },
        { id: '3', title: 'www.rogergraciemalaga.com', img: link },
        { id: '4', title: 'rogergraciemalaga@gmail.com', img: msg },
        { id: '5', title: '@rogergraciemalaga', img: instagram },
        { id: '6', title: '@rogergraciemalaga', img: facebook },
    ]
    const amenitiesData = [
        { id: '1', title: 'Jiu Jitsu', img: ame2 },
        { id: '1', title: 'Jiu Jitsu', img: ame3 },
        { id: '1', title: 'Jiu Jitsu', img: ame4 },
        { id: '1', title: 'Jiu Jitsu', img: ame5 },
        { id: '1', title: 'Jiu Jitsu', img: ame6 },
        { id: '1', title: 'Jiu Jitsu', img: ame7 },
        { id: '1', title: 'Jiu Jitsu', img: ame8 },
        { id: '1', title: 'Jiu Jitsu', img: ame9 },
        { id: '1', title: 'Jiu Jitsu', img: ame10 },
        { id: '1', title: 'Jiu Jitsu', img: ame11 },
        { id: '1', title: 'Jiu Jitsu', img: ame12 },
        { id: '1', title: 'Jiu Jitsu', img: ame13 },
        { id: '1', title: 'Jiu Jitsu', img: ame14 },
        { id: '1', title: 'Jiu Jitsu', img: ame15 },
        { id: '1', title: 'Jiu Jitsu', img: ame16 },
        { id: '1', title: 'Jiu Jitsu', img: ame17 },
        { id: '1', title: 'Jiu Jitsu', img: ame18 },
        { id: '1', title: 'Jiu Jitsu', img: ame19 },
        { id: '1', title: 'Jiu Jitsu', img: ame20 },
        { id: '1', title: 'Jiu Jitsu', img: ame21 },
        { id: '1', title: 'Jiu Jitsu', img: ame22 },
        { id: '1', title: 'Jiu Jitsu', img: ame23 },
        { id: '1', title: 'Jiu Jitsu', img: ame24 },
        { id: '1', title: 'Jiu Jitsu', img: ame25 },
    ]

    return (
        <div>
            <div> </div>
            <PublicNavBar />
            <CardViewStyled>
                <Head title="User List" />
                <div className="main-container overflow-auto">
                    <div className="main-container-card">
                        <img
                            className="image"
                            src={
                                schoolData?.profileImg
                                    ? `https://fistastore.com:444${schoolData?.profileImg}`
                                    : schoolImg
                            }
                        />
                        <div className="title">
                            <h5>Sacaba Beach Box</h5>
                        </div>
                        <div className="description">
                            <p>
                                box planner is a All In One Gym Management
                                Plattform Log your workout results and improve
                                your fitness performance together with your
                                friends. Schedule classes in your local gym and
                                with your favorite coaches. It can be used by
                                gym owners, trainers and members. box planner is
                                a community for athletes.
                                <br />
                                <br />
                                All basic features are FREE up to a certain box
                                size and will stay FREE. Sign up without any
                                costs. Gym Owners will have to pay a basic fee
                                once reaching more than 10 members.
                                Optional premium features are charged
                                additional. Everyone can use box planner: single
                                athletes, CrossFit™ athletes, gym owners,
                                fitness centers, personal trainers. EVERYONE
                            </p>
                        </div>
                    </div>
                </div>
            </CardViewStyled>
            <CardViewStyled>
                <div className="table-heading">
                    <h4>Schedule</h4>
                </div>
                <div className="main-container ">
                    <div className="main-container-card">
                        <Row>
                            {scheduleData.map((item: any) => (
                                <Col
                                    style={{
                                        border: '0.87px solid rgba(213, 213, 213, 1)',
                                        borderRadius: '5px',
                                        padding: '3px',
                                        margin: '0 12px 12px 0',
                                        width: '280px',
                                    }}
                                    key={item.id}
                                >
                                    <div className="d-flex justify-content-start ">
                                        <div className="time">
                                            <span className="title">
                                                {' '}
                                                {item.name}
                                            </span>
                                            <br></br>
                                            {item.time}
                                        </div>
                                        <div className="buton">
                                            {' '}
                                            <CustomButton
                                                bgcolor={lightBlue3}
                                                color={maastrichtBlue}
                                                padding="5px 27px"
                                                fontFamily={`${fontFamilyMedium}`}
                                                width="135px"
                                                type="button"
                                                title="BOOK NOW"
                                                fontSize="14px"
                                                loading={false}
                                                margin="5px"
                                                // clicked={() => {
                                                //     navigate('/class/list')
                                                // }}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </CardViewStyled>
            <CardViewStyled>
                <div className="table-heading">
                    <h4>Activities</h4>
                </div>
                <div className="main-container ">
                    <div className="main-container-card">
                        <Row>
                            {activitiesData.map((item: any) => (
                                <Col
                                    key={item.id}
                                    style={{
                                        marginLeft: '5px',
                                        marginBottom: '5px',
                                    }}
                                >
                                    <img src={item.img} />
                                    <div style={{ textAlign: 'center' }}>
                                        {item.title}
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </CardViewStyled>
            <CardViewStyled>
                <div className="table-heading">
                    <h4>Amenties</h4>
                </div>
                <div className="main-container ">
                    <div className="main-container-card">
                        <Row>
                            {amenitiesData.map((item: any) => (
                                <Col
                                    key={item.id}
                                    style={{
                                        marginLeft: '5px',
                                        marginBottom: '5px',
                                    }}
                                >
                                    <img src={item.img} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </CardViewStyled>

            <div
                style={{
                    maxWidth: '900px',
                    flexDirection: 'column',
                    borderRadius: '6px',
                    width: '100%',
                    margin: 'auto',
                    padding: '10px 0px',
                }}
            >
                <Row>
                    <Col md={16} style={{ height: '400px' }}>
                        {' '}
                        <Map />
                    </Col>
                    <Col md={8}>
                        {' '}
                        <CardViewStyled>
                            <div className="main-container ">
                                <div
                                    style={{ padding: '0px 0px 0px 15px' }}
                                    className="main-container-card"
                                >
                                    <div
                                        style={{
                                            border: '0.87px solid rgba(213, 213, 213, 1)',
                                            borderRadius: '5px',
                                            padding: '3px',
                                            margin: '0 12px 12px 0',
                                            width: '280px',
                                        }}
                                    >
                                        {contactData
                                            .splice(0, 6)
                                            .map((item: any) => (
                                                <>
                                                    <div
                                                        className="contact d-flex"
                                                        key={item.id}
                                                    >
                                                        {' '}
                                                        <img
                                                            src={item.img}
                                                            height={21}
                                                            width={21}
                                                        />
                                                        <p>{item.title}</p>
                                                    </div>
                                                    <div className="divider"></div>
                                                </>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </CardViewStyled>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default DetailPage
