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
import { useParams } from 'react-router-dom'
import useRoom from '../../../hooks/useRoom'
import { useEffect, useState } from 'react'
import { RoomDataType } from '../../../redux/features/Room/RoomSlice'

const UpdateRoom = (): JSX.Element => {
    const { schoolId } = useParams()
    const { branchId } = useParams()
    const { franchiseId } = useParams()
    const { roomId } = useParams()
    console.log('id', schoolId, branchId, franchiseId, roomId)
    console.log('ids', roomId)

    // const { roomId } = useParams()
    const { getbyroomid, handleUpdate, UpdateModal } = useRoom()
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
    const separateHeightValues = (
        height: string | undefined
    ): { feet: number; inches: number } => {
        const defaultValues = { feet: 0, inches: 0 }

        if (!height) {
            return defaultValues
        }

        const match = height.match(/(\d+)'\s*(\d+)"/)

        if (!match) {
            console.error(`Invalid height format: ${height}`)
            return defaultValues
        }

        const feet = parseInt(match[1], 10) || 0
        const inches = parseInt(match[2], 10) || 0

        return { feet, inches }
    }

    const { feet: lFeet, inches: lInch } = separateHeightValues(
        String(Room?.height)
    )

    const { feet: wFeet, inches: wInch } = separateHeightValues(
        String(Room?.width)
    )
    console.log('Width', wFeet, wInch)

    console.log('height', lFeet, lInch)

    const initialValues: CreateRoomInitialValues = {
        roomName: Room ? Room.name : '',
        floorNumber: Room ? Room.floorNumber : '',
        roomNumber: Room ? Room.roomNumber : '',
        height: Room ? Room.height : '',
        width: Room ? Room.width : '',
        useCase: Room ? Room.useCase : '',
        id: Room ? Room.name : '',
        lInch: Room ? Number(lInch) : '',
        lFeet: Room ? Number(lFeet) : '',
        wInch: Room ? Number(wInch) : '',
        wFeet: Room ? Number(wFeet) : '',
        roomId: Room ? Room.roomId : '',
    }
    // await handleUpdate(values)
    const onSubmit = async (values: CreateRoomInitialValues): Promise<void> => {
        if (schoolId) {
            await handleUpdate({
                ...values,
                useCase: 'SCHOOL',
                id: schoolId,
            })
        }
        if (branchId) {
            await handleUpdate({
                ...values,
                useCase: 'BRANCH',
                id: branchId,
            })
        }
        if (franchiseId) {
            await handleUpdate({
                ...values,
                useCase: 'FRANCHISE',
                id: franchiseId,
            })
        }
    }
    return (
        <>
            <Head title="Room Update" />
            <CreateRoomsStyle>
                {UpdateModal().modalComponent}
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {(formik) => {
                        console.log('formik', formik.values)
                        console.log('initial values', initialValues)

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
                                                control="input"
                                                type="text"
                                                name="floorNumber"
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
                                                label="Height"
                                                inchName="lInch"
                                                feetName="lFeet"
                                                name="roomNumber"
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
                                        <Col>
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

export default UpdateRoom
