import { Card } from 'antd'
import { MainSettingPageStyle } from './style'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

const MainSettingPage = () => {
    return (
        <MainSettingPageStyle>
            <Card className="MainContainer">
                <h3>Account Settings</h3>
                <p>Manage your experience</p>
                <Row>
                    <Col md="6" className="mt-20 cards">
                        <div className="list-item">
                            <h4 className="list-item-title">
                                Personal details
                            </h4>
                            <p className="list-item-value">
                                Update your information and find out how it’s
                                used.
                            </p>
                            <Link
                                to={'/settings/tabs'}
                                className="list-item-link"
                            >
                                Manage personal details
                            </Link>
                        </div>
                    </Col>
                    <Col md="6" className="mt-20 cards">
                        <div className="list-item">
                            <h4 className="list-item-title">Preferences</h4>
                            <p className="list-item-value">
                                Change your language, currency and accessibility
                                requirements.
                            </p>
                            <Link
                                to={'/settings/tabs'}
                                className="list-item-link"
                            >
                                Manage preferences
                            </Link>
                        </div>
                    </Col>
                    <Col md="6" className="mt-20 cards">
                        <div className="list-item">
                            <h4 className="list-item-title">Security</h4>
                            <p className="list-item-value">
                                Adjust your security settings and set up
                                two-factor authentication.
                            </p>
                            <Link
                                to={'/settings/tabs'}
                                className="list-item-link"
                            >
                                Manage account security
                            </Link>
                        </div>
                    </Col>
                    <Col md="6" className="mt-20 cards">
                        <div className="list-item">
                            <h4 className="list-item-title">Payment details</h4>
                            <p className="list-item-value">
                                Securely add or remove payment methods to make
                                it easier when you book.
                            </p>
                            <Link
                                to={'/settings/tabs'}
                                className="list-item-link"
                            >
                                Manage payment detials
                            </Link>
                        </div>
                    </Col>
                    <Col md="6" className="mt-20 cards">
                        <div className="list-item">
                            <h4 className="list-item-title">Privacy</h4>
                            <p className="list-item-value">
                                Exercise your privacy rights and control how
                                your data is used.
                            </p>
                            <Link
                                to={'/settings/tabs'}
                                className="list-item-link"
                            >
                                Manage privacy
                            </Link>
                        </div>
                    </Col>
                    <Col md="6" className="mt-20 cards">
                        <div className="list-item">
                            <h4 className="list-item-title">
                                Email notifications
                            </h4>
                            <p className="list-item-value">
                                Decide what you want to be notified about, &
                                unsubscribe from what you don't
                            </p>
                            <Link
                                to={'/settings/tabs'}
                                className="list-item-link"
                            >
                                Manage payment detials
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Card>
        </MainSettingPageStyle>
    )
}

export default MainSettingPage
