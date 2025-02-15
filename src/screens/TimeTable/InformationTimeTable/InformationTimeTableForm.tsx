import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { InformationTimeTableFormStyle } from './styles'
import { useParams } from 'react-router-dom'
import useTimetable from '../../../hooks/useTimetable'
import moment from 'moment'

const InformationTimeTableForm: React.FC = () => {
    const { timeTableId } = useParams()
    const [allTimeTableDetail, setAllTimeTableDetail] = useState<any>()

    const { getTimetableById } = useTimetable()
    useEffect(() => {
        async function fetchTimeTableById(): Promise<void> {
            const response = await getTimetableById(Number(timeTableId))
            console.log('checking response: ', response)
            if (response.results) {
                setAllTimeTableDetail(response.results)
            }
        }
        fetchTimeTableById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeTableId])

    return (
        <>
            <InformationTimeTableFormStyle>
                <h3 className="timetable-heading">Time Table</h3>
                <Row>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Title</div>
                            <div className="list-item-value">
                                {allTimeTableDetail
                                    ? allTimeTableDetail.title
                                    : '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">
                                Repeat Time Table
                            </div>
                            <div className="list-item-value">
                                {' '}
                                {allTimeTableDetail?.isRepeated === false
                                    ? 'No'
                                    : 'Yes'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Start Date</div>
                            <div className="list-item-value">
                                {moment(
                                    moment(
                                        allTimeTableDetail?.startDate,
                                        'YYYY-MM-DD'
                                    )
                                ).format('dddd, MMM DD, YYYY')}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">End Date</div>
                            <div className="list-item-value">
                                {moment(
                                    moment(
                                        allTimeTableDetail?.endDate,
                                        'YYYY-MM-DD'
                                    )
                                ).format('dddd, MMM DD, YYYY')}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Activity</div>
                            <div className="list-item-value">--</div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Rooms</div>
                            <div className="list-item-value">--</div>
                        </div>
                    </Col>
                </Row>
            </InformationTimeTableFormStyle>
        </>
    )
}

export default InformationTimeTableForm
