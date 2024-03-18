import { Col, Row } from 'react-bootstrap'
import { DashboardStyle } from './style'
import { Link } from 'react-router-dom'
import Head from '../../components/Head/Head'
import ActionIcon from '../../assets/icons/ic_action_menu_toggler.svg'
import Pic from '../../assets/images/3dPic.png'
import school from '../../assets/images/school.jpg'
import branch from '../../assets/images/branch.jpg'
import ic_world from '../../assets/icons/ic_world.svg'
import VerticalBarDemo from './VerticalChart'
import Map from './GoogleMap'
import { Progress } from 'antd'

const Dashboard = (): JSX.Element => {
    const conicColors = { '0%': '#87d068', '50%': '#ffe58f', '100%': '#ffccc7' }

    return (
        <>
            <Head title="Dashboard" />
            <DashboardStyle>
                <Row>
                    <Col md="8" className="mt-20">
                        <div className="BoxDiv d-flex align-items-center">
                            <div className="col-8">
                                <h3 className="title">
                                    Congratulations <span>Umar!</span> &#127881;
                                </h3>
                                <p>
                                    You have done 72% more sales today. Check
                                    your new badge in your profile.
                                </p>
                                <Link to="/dashboard">View Badge</Link>
                            </div>
                            <div className="col-4">
                                <img
                                    src={Pic}
                                    alt="Pic"
                                    width={200}
                                    height={135}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md="2" className="mt-20">
                        <div className="boxes">
                            <div className="d-flex align-items-center justify-content-between">
                                <img
                                    src={school}
                                    alt="school"
                                    width={40}
                                    height={40}
                                />
                                <img
                                    src={ActionIcon}
                                    className="threeDots"
                                    alt="ActionIcon"
                                />
                            </div>
                            <h3 className="boxes-title">School</h3>
                            <p className="totalSchool">Total:</p>
                            <p className="totalSchool_users">2001</p>
                        </div>
                    </Col>
                    <Col md="2" className="mt-20">
                        <div className="boxes">
                            <div className="d-flex align-items-center justify-content-between">
                                <img
                                    src={branch}
                                    alt="branch"
                                    width={40}
                                    height={40}
                                />
                                <img
                                    src={ActionIcon}
                                    className="threeDots"
                                    alt="ActionIcon"
                                />
                            </div>
                            <h3 className="boxes-title">Branch</h3>
                            <p className="totalSchool">Total:</p>
                            <p className="totalSchool_users">66</p>
                        </div>
                    </Col>
                    <Col md="8" className="mt-20">
                        <div className="BoxDiv">
                            <VerticalBarDemo />
                        </div>
                    </Col>
                    <Col md="4">
                        <Row>
                            <Col md="6" className="mt-20">
                                <div className="boxes">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <img
                                            src={branch}
                                            alt="branch"
                                            width={40}
                                            height={40}
                                        />
                                        <img
                                            src={ActionIcon}
                                            className="threeDots"
                                            alt="ActionIcon"
                                        />
                                    </div>
                                    <h3 className="boxes-title">Franchise</h3>
                                    <p className="totalSchool">Total:</p>
                                    <p className="totalSchool_users">200</p>
                                </div>
                            </Col>
                            <Col md="6" className="mt-20">
                                <div className="boxes">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <img
                                            src={school}
                                            alt="school"
                                            width={40}
                                            height={40}
                                        />
                                        <img
                                            src={ActionIcon}
                                            className="threeDots"
                                            alt="ActionIcon"
                                        />
                                    </div>
                                    <h3 className="boxes-title">Instructor</h3>
                                    <p className="totalSchool">Total:</p>
                                    <p className="totalSchool_users">2055</p>
                                </div>
                            </Col>
                            <Col md="12" className="mt-20 h-100">
                                <div className="BoxDiv">
                                    <h2 className="title">Martial App</h2>
                                    <div className="py-2 d-flex align-items-center justify-content-between">
                                        <div>
                                            <h2>4322</h2>
                                            <p>Total Users</p>
                                        </div>
                                        <div>
                                            <Progress
                                                size="default"
                                                type="dashboard"
                                                percent={93}
                                                strokeColor={conicColors}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="12">
                        <Row>
                            <Col md="3" className="mt-20">
                                <div className="BoxDiv">
                                    <div className="d-flex align-items-center justify-content-center gap-4">
                                        <img src={ic_world} alt="ic_world" />
                                        <div>
                                            <p>
                                                Total:{' '}
                                                <span className="sub-text">
                                                    Subscription
                                                </span>
                                            </p>
                                            <h3>3000</h3>
                                        </div>
                                    </div>
                                    <p className="bottom-text">
                                        48% From Last 24 Hours
                                    </p>
                                </div>
                            </Col>
                            <Col md="3" className="mt-20">
                                <div className="BoxDiv">
                                    <div className="d-flex align-items-center justify-content-center gap-4">
                                        <img src={ic_world} alt="ic_world" />
                                        <div>
                                            <p>
                                                Total:{' '}
                                                <span className="sub-text">
                                                    Subscription
                                                </span>
                                            </p>
                                            <h3>3000</h3>
                                        </div>
                                    </div>
                                    <p className="bottom-text">
                                        48% From Last 24 Hours
                                    </p>
                                </div>
                            </Col>
                            <Col md="3" className="mt-20">
                                <div className="BoxDiv">
                                    <div className="d-flex align-items-center justify-content-center gap-4">
                                        <img src={ic_world} alt="ic_world" />
                                        <div>
                                            <p>
                                                Total:{' '}
                                                <span className="sub-text">
                                                    Subscription
                                                </span>
                                            </p>
                                            <h3>3000</h3>
                                        </div>
                                    </div>
                                    <p className="bottom-text">
                                        48% From Last 24 Hours
                                    </p>
                                </div>
                            </Col>
                            <Col md="3" className="mt-20">
                                <div className="BoxDiv">
                                    <div className="d-flex align-items-center justify-content-center gap-4">
                                        <img src={ic_world} alt="ic_world" />
                                        <div>
                                            <p>
                                                Total:{' '}
                                                <span className="sub-text">
                                                    Subscription
                                                </span>
                                            </p>
                                            <h3>3000</h3>
                                        </div>
                                    </div>
                                    <p className="bottom-text">
                                        48% From Last 24 Hours
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="12" className="mt-20">
                        <div className="BoxDiv">
                            <Map />
                        </div>
                    </Col>
                </Row>
            </DashboardStyle>
        </>
    )
}

export default Dashboard
