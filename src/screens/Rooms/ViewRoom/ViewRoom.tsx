import { Card } from 'antd'
import Head from '../../../components/Head/Head'
import { ViewRoomStyled } from './styles'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import useRoom from '../../../hooks/useRoom'
import { RoomDataType } from '../../../redux/features/Room/RoomSlice'
import { useEffect, useState } from 'react'

const ViewRoom = (): JSX.Element => {
    const { roomId } = useParams()
    const { getbyroomid } = useRoom()
    const [Room, setRoom] = useState<RoomDataType | undefined>(undefined)
    useEffect(() => {
        const FetchDatd = async (): Promise<void> => {
            const data = await getbyroomid(Number(roomId))
            if (data) {
                setRoom(data)
            }
        }
        FetchDatd()
    }, [])

    return (
        <>
            <Head title="Room Information" />
            <ViewRoomStyled>
                <Card>
                    <h3 style={{ textAlign: 'center' }}>Room Information</h3>
                    <Row>
                        <Col md="12">
                            <div className="list-item">
                                <div className="list-item-title">Room Name</div>
                                <div className="list-item-value">
                                    {Room ? Room.name : '-'}
                                </div>
                            </div>
                        </Col>
                        mzaww5br54{' '}
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Floor Number
                                </div>
                                <div className="list-item-value">
                                    {' '}
                                    {Room ? Room.floorNumber : '-'}{' '}
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Room Number
                                </div>
                                <div className="list-item-value">
                                    {' '}
                                    {Room ? Room.roomNumber : '-'}
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">Height</div>
                                <div className="list-item-value">
                                    {' '}
                                    {Room ? Room.height : '-'}
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">Width</div>
                                <div className="list-item-value">
                                    {' '}
                                    {Room ? Room.width : '-'}{' '}
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
