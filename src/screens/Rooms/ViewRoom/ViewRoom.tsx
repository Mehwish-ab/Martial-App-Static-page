import { Card } from 'antd'
import Head from '../../../components/Head/Head'
import { ViewRoomStyled } from './styles'
import { Col, Row } from 'react-bootstrap'

const ViewRoom = (): JSX.Element => {
    return (
        <>
            <Head title="Room Information" />
            <ViewRoomStyled>
                <h3>Room Information</h3>
                <Card>
                    <Row>
                        <Col md="12">
                            <div className="list-item">
                                <div className="list-item-title">Room Name</div>
                                <div className="list-item-value">--</div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Floor Number
                                </div>
                                <div className="list-item-value">-- </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Room Number
                                </div>
                                <div className="list-item-value">-- </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">Height</div>
                                <div className="d-flex justify-content-around">
                                    <div className="list-item-value">-- </div>
                                    <div className="list-item-value">-- </div>
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">Width</div>
                                <div className="d-flex justify-content-around">
                                    <div className="list-item-value">-- </div>
                                    <div className="list-item-value">-- </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </ViewRoomStyled>
        </>
    )
}

export default ViewRoom
