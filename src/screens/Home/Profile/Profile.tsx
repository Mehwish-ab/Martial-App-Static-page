import { ProfileStyled } from './styles'
import OverlayImages from '../OverlayImages/OverlayImages'
import editIcon from '../../../assets/icons/ic_edit.svg'
import dobIcon from '../../../assets/icons/ic_dob.svg'
import emailIcon from '../../../assets/icons/ic_email.svg'
import phoneIcon from '../../../assets/icons/ic_phone.svg'
import joinDateIcon from '../../../assets/icons/ic_Join_date.svg'
import addressIcon from '../../../assets/icons/ic_address.svg'

import { Col, Row } from 'react-bootstrap'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { fontFamilyMedium, pureDark } from '../../../components/GlobalStyle'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { useEffect } from 'react'
import { getSchoolByUserId } from '../../../redux/features/dashboard/dashboardDataSlice'
import useLogout from '../../../hooks/useLogout'
const Profile = (): JSX.Element => {
    const navigate = useNavigate()
    const { logoutHandler } = useLogout()

    const { schoolData, loading, error } = useSelector(
        (state: RootState) => state.dashboardData
    )

    useEffect(() => {
        store.dispatch(getSchoolByUserId())
    }, [])

    useEffect(() => {
        if (error) {
            logoutHandler()
        }
    }, [error, logoutHandler])

    return (
        <ProfileStyled>
            {loading && <LoadingOverlay message={error || ''} />}
            <OverlayImages
                backgroundImg={schoolData.bannerPicture}
                overlayImg={schoolData.profilePicture}
                isEditable={false}
            />

            <div className="bg-white profile_section">
                <Row>
                    <div className="profile">
                        <Row>
                            <Col md="10">
                                <h4>{schoolData.businessName}</h4>
                            </Col>
                            <Col md="2" className="d-flex justify-content-end">
                                <CustomButton
                                    bgcolor={'#ECECEC'}
                                    textTransform="Captilize"
                                    color={pureDark}
                                    padding="5px"
                                    fontFamily={`${fontFamilyMedium}`}
                                    width="fit-content"
                                    type="submit"
                                    // title={getLabelByKey(
                                    //   PASSWORD_SCREEN_LABEL_KEYS.sumbitButton
                                    // )}
                                    title=""
                                    fontSize="17px"
                                    icon={
                                        <img
                                            src={editIcon as string}
                                            alt="edit icon"
                                        />
                                    }
                                    // loading={loading}
                                    clicked={() => {
                                        navigate(
                                            `/school/edit/${
                                                schoolData.schoolId || '-'
                                            }`
                                        )
                                    }}
                                    disabled={!schoolData.schoolId}
                                />
                            </Col>
                        </Row>
                        <Row>
                            {/* <h4>Stevens Wilson</h4> */}
                            <Col
                                md="12"
                                className="d-flex align-items-center mb-3 gap-2"
                            >
                                <img
                                    src={addressIcon as string}
                                    alt="address icon"
                                />
                                <p className="mb-0">
                                    {schoolData.address}
                                    {/* 76 St Maurices Road, Priest Hutton,
                  United Kingdom, LA6 2YZ */}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                md="6"
                                className="d-flex align-items-center mb-3 gap-2"
                            >
                                <img
                                    src={emailIcon as string}
                                    alt="email icon"
                                />
                                <p className="mb-0">
                                    {schoolData.emailAddress}
                                    {/* Stevens.wilson@gmail.com */}
                                </p>
                            </Col>

                            <Col
                                md="6"
                                className="d-flex align-items-center mb-3 gap-2"
                            >
                                <img
                                    src={phoneIcon as string}
                                    alt="phone icon"
                                />
                                <p className="mb-0">
                                    {schoolData.phoneNumber}
                                    {/* +4167045720 */}
                                </p>
                            </Col>

                            <Col
                                md="6"
                                className="d-flex align-items-center mb-3 gap-2"
                            >
                                <img
                                    src={joinDateIcon as string}
                                    alt="join date icon"
                                />
                                <p className="mb-0">
                                    Join From: 13 March, 2023
                                </p>
                            </Col>

                            <Col
                                md="6"
                                className="d-flex align-items-center mb-3 gap-2"
                            >
                                <img
                                    src={dobIcon as string}
                                    alt="date of birth icon"
                                />
                                <p className="mb-0">D.O.B: 13 March, 2001</p>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </div>
        </ProfileStyled>
    )
}

export default Profile
