import { CreateRoomsStyle } from './styles'
import { Formik } from 'formik'
import { Form, Space } from 'antd'
import { CreateRoomInitialValues } from '../constant'
import FormControl from '../../../components/FormControl'
import { Col, Row } from 'react-bootstrap'

const initialValues: CreateRoomInitialValues = {
    roomName: '',
}
const handleCreateSubmit = (): void => {}
const CreateRoom = (): JSX.Element => {
    return (
        <>
            <CreateRoomsStyle>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={handleCreateSubmit}
                >
                    {(formik) => {
                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <div className="bg-white form mt-20">
                                    <h3>Room Create</h3>

                                    <Row>
                                        <Col md="12" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="roomName"
                                                label="Room Name"
                                                fontSize="16px"
                                                max={6}
                                                placeholder="Enter Room Name"
                                                className={
                                                    formik.errors.roomName &&
                                                    formik.touched.roomName
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                            />
                                        </Col>
                                        <Col md="6" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="roomName"
                                                label="Floor Number"
                                                fontSize="16px"
                                                max={6}
                                                placeholder="Select Floor Number"
                                                className={
                                                    formik.errors.roomName &&
                                                    formik.touched.roomName
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                            />
                                        </Col>
                                        <Col md="6" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="roomName"
                                                label="Room Number"
                                                fontSize="16px"
                                                max={6}
                                                placeholder="Select Room Number"
                                                className={
                                                    formik.errors.roomName &&
                                                    formik.touched.roomName
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                            />
                                        </Col>
                                        <Col md="6" className="mt-20">
                                            <Space direction="vertical">
                                                <Space.Compact size="large">
                                                    <FormControl
                                                        control="input"
                                                        type="number"
                                                        name="asda"
                                                        label="Room Number"
                                                        fontSize="16px"
                                                        max={6}
                                                        placeholder="Select Room Number"
                                                        className={
                                                            formik.errors
                                                                .roomName &&
                                                            formik.touched
                                                                .roomName
                                                                ? 'is-invalid'
                                                                : 'customInput'
                                                        }
                                                    />
                                                    <FormControl
                                                        control="input"
                                                        type="number"
                                                        name="fbfg"
                                                        label="Room Number"
                                                        fontSize="16px"
                                                        max={6}
                                                        placeholder="Select Room Number"
                                                        className={
                                                            formik.errors
                                                                .roomName &&
                                                            formik.touched
                                                                .roomName
                                                                ? 'is-invalid'
                                                                : 'customInput'
                                                        }
                                                    />
                                                </Space.Compact>
                                            </Space>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </CreateRoomsStyle>
        </>
    )
}

export default CreateRoom
