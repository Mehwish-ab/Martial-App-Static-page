import { CardViewStyled } from './style'
import profileImg from '../../../assets/images/create_school_user_profile.svg'
import rankbar from '../../../assets/images/rank.png'
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
import { CustomDiv } from '../ListClasses/CustomDiv'
import { Formik } from 'formik'

const StudentJoinedClass = (): JSX.Element => {
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
        {
            id: '1',
            name: 'Marc Wilson',
            time: 'marc.wilson',
            img: profileImg,
        },
        {
            id: '1',
            name: 'Marc Wilson',
            time: 'marc.wilson',
            img: profileImg,
        },
        {
            id: '1',
            name: 'Marc Wilson',
            time: 'marc.wilson',
            img: profileImg,
        },
        {
            id: '1',
            name: 'Marc Wilson',
            time: 'marc.wilson',
            img: profileImg,
        },
        {
            id: '1',
            name: 'Marc Wilson',
            time: 'marc.wilson',
            img: profileImg,
        },
        {
            id: '1',
            name: 'Marc Wilson',
            time: 'marc.wilson',
            img: profileImg,
        },
    ]
    const RenderTableTitle = (): JSX.Element => {
        return (
            <CustomDiv>
                <div className="mainWrapper">
                    <h3 className="table-heading">
                        Student Joined Classess
                        {/* {getLabelByKey('title')} */}
                    </h3>

                    <div className="todayPlusContainer">
                        {/* <div className="dateToday"> */}
                        <p>17 May 2024 10:00 AM - Jiu Jitsu (13/30)</p>
                        {/* </div> */}
                    </div>
                </div>
            </CustomDiv>
        )
    }

    return (
        <div>
            <div> </div>
            <PublicNavBar />

            <CardViewStyled>
                <RenderTableTitle />
                {/* <div className="table-heading">
                    <h4>Schedule</h4>
                </div> */}
                <div className="main-container ">
                    <div className="main-container-card">
                        <Row>
                            {scheduleData.map((item: any) => (
                                <Col
                                    //md={8}
                                    style={{
                                        border: '0.87px solid rgba(213, 213, 213, 1)',
                                        borderRadius: '5px',
                                        padding: '3px',
                                        margin: '0 12px 12px 0',
                                        width: '300px',
                                    }}
                                    key={item.id}
                                >
                                    <div className="d-flex justify-content-start ">
                                        {/* <div className="buton">
                                            {' '}
                                            <img
                                                height={50}
                                                width={50}
                                                src={profileImg}
                                                alt="rank"
                                            />
                                        </div> */}
                                        <img
                                            height={50}
                                            width={50}
                                            src={profileImg}
                                            alt="rank"
                                        />
                                        <div className="time">
                                            <span className="title">
                                                {' '}
                                                {item.name}
                                                {/* <br></br>
                                                {item.time} */}
                                            </span>
                                            <br></br>
                                            {item.time}
                                        </div>
                                        <div className="buton">
                                            {' '}
                                            <img
                                                // width={120}
                                                src={rankbar}
                                                alt="rank"
                                            />
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </CardViewStyled>
        </div>
    )
}

export default StudentJoinedClass
