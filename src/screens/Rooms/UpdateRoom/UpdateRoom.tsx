import { CreateRoomsStyle } from './styles'
import { Formik } from 'formik'
import { Form } from 'antd'
import { CreateRoomInitialValues } from '../constant'
import FormControl from '../../../components/FormControl'
import { Col, Row } from 'react-bootstrap'
import CustomButton from '../../../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    lightBlue3,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
import Head from '../../../components/Head/Head'

const initialValues: CreateRoomInitialValues = {
    roomName: '',
    floorNumber: '',
    roomNumber: '',
    length: [],
    width: [],
}
const handleCreateSubmit = (): void => {}
const UpdateRoom = (): JSX.Element => {
    return (
        <>
            <Head title="Room Update" />
            <CreateRoomsStyle>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={handleCreateSubmit}
                >
                    {(formik) => {
                        console.log('formik', formik.values)
                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <div className="bg-white form mt-20">
                                    <h3>Room Update</h3>

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
                                                    formik.errors.floorNumber &&
                                                    formik.touched.floorNumber
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
                                            <FormControl
                                                control="numberField"
                                                type="number"
                                                label="Length"
                                                inchName="lInch"
                                                feetName="lFeet"
                                                name="length"
                                                inchPlaceholder="Inch"
                                                feetPlaceholder="Feet"
                                                className={
                                                    formik.errors.length &&
                                                    formik.touched.length
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                            />
                                        </Col>
                                        <Col md="6" className="mt-20">
                                            <FormControl
                                                control="numberField"
                                                type="number"
                                                label="Width"
                                                inchName="wInch"
                                                feetName="wFeet"
                                                name="width"
                                                inchPlaceholder="Inch"
                                                feetPlaceholder="Feet"
                                                className={
                                                    formik.errors.width &&
                                                    formik.touched.width
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mt-20 d-flex justify-content-end">
                                    <CustomButton
                                        bgcolor={lightBlue3}
                                        textTransform="Captilize"
                                        color={maastrichtBlue}
                                        padding="11px 40.50px"
                                        fontFamily={`${fontFamilyMedium}`}
                                        width="fit-content"
                                        type="submit"
                                        title="Update"
                                        fontSize="18px"
                                        loading={false}
                                    />
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </CreateRoomsStyle>
        </>
    )
}

export default UpdateRoom
