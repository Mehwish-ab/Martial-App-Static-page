import { CreateRoomsStyle } from './styles'
import { Formik } from 'formik'
import { Form, Space } from 'antd'
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
import useRoom from '../../../hooks/useRoom'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const initialValues: CreateRoomInitialValues = {
    roomName: '',
    floorNumber: '',
    roomNumber: '',
    lInch: '',
    lFeet: '',
    wInch: '',
    wFeet: '',
    useCase: '',
    id: '',
    width: '',
    height: '',
    roomId: '',
}
const CreateRoom = (): JSX.Element => {
    const { schoolId } = useParams()
    const { branchId } = useParams()
    const { franchiseId } = useParams()
    console.log('id', schoolId, branchId, franchiseId)

    const { handleCreateSubmit, Createmodal, WarningModal } = useRoom()
    const onSubmit = async (values: CreateRoomInitialValues): Promise<void> => {
        if (schoolId) {
            await handleCreateSubmit({
                ...values,
                useCase: 'SCHOOL',
                id: schoolId,
            })
        }
        if (branchId) {
            await handleCreateSubmit({
                ...values,
                useCase: 'BRANCH',
                id: branchId,
            })
        }
        if (franchiseId) {
            await handleCreateSubmit({
                ...values,
                useCase: 'FRANCHISE',
                id: franchiseId,
            })
        }
    }
    return (
        <>
            <Head title="Room Create" />
            {WarningModal().modalComponent}
            {Createmodal().modalComponent}

            <CreateRoomsStyle>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={onSubmit}
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
                                                control="input"
                                                type="text"
                                                name="floorNumber"
                                                label="Floor Number"
                                                fontSize="16px"
                                                max={6}
                                                placeholder="Enter Floor Number"
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
                                                control="input"
                                                type="text"
                                                name="roomNumber"
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
                                                label="height"
                                                inchName="lInch"
                                                feetName="lFeet"
                                                name="height"
                                                inchPlaceholder="Inch"
                                                feetPlaceholder="Feet"
                                                className={
                                                    formik.errors.height &&
                                                    formik.touched.height
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
                                        title="Submit"
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

export default CreateRoom
