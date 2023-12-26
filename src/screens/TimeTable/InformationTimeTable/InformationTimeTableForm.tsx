import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { InformationTimeTableFormStyle } from './styles'

const InformationTimeTableForm: React.FC = () => {
    return (
        <>
            <InformationTimeTableFormStyle>
                <h3 className="timetable-heading">Time Table</h3>
                <Row>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Title</div>
                            <div className="list-item-value">
                                Karate Classes Schudle
                            </div>
                        </div>
                    </Col>
                    <Col md="8">
                        <Row>
                            <Col md="4">
                                <div className="list-item">
                                    <div className="list-item-title">
                                        Repeat Time Table
                                    </div>
                                    <div className="list-item-value">Yes</div>
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="list-item">
                                    <div className="list-item-title">
                                        Start Date
                                    </div>
                                    <div className="list-item-value">
                                        Monday, October 27, 2023
                                    </div>
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="list-item">
                                    <div className="list-item-title">
                                        End Date
                                    </div>
                                    <div className="list-item-value">
                                        Monday, October 27, 2023
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </InformationTimeTableFormStyle>
        </>
    )
}

export default InformationTimeTableForm
