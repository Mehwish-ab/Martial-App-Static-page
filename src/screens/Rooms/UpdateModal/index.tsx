import CustomModal from '../../../components/Modal/CustomModal'
import { Formik } from 'formik'
import { Form } from 'antd'
import { Col } from 'react-bootstrap'
import * as Yup from 'yup'
import FormControl from '../../../components/FormControl'
import {
    fontFamilyMedium,
    lightBlue3,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
import CustomButton from '../../../components/CustomButton/CustomButton'
import Head from '../../../components/Head/Head'
import { useEffect, useState } from 'react'
import useRoom from '../../../hooks/useRoom'
import { StatusModalStyle } from './style'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { useLocation, useParams } from 'react-router-dom'
type UpdateRoomStatus = {
    isActive: false
}

const UpdateStatus = ({ closeModal, roomId }: any): JSX.Element => {
    const [isActivityModalVisible, setIsActivityModalVisible] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)

    const { RoomStatus, UpdateStatusModal } = useRoom()
    const initialValuesForEdit: UpdateRoomStatus = {
        isActive: false,
    }
    const { pathname } = useLocation()
    const [, extractedSchool] = pathname.split('/')
    const schoolInUpperCase = extractedSchool.toUpperCase()
    const showStatus = [
        { label: 'Active', value: true },
        { label: 'InActive', value: false },
    ]
    const { schoolId, branchId, franchiseId } = useParams()

    let Id: string
    if (schoolId) {
        Id = schoolId
    } else if (branchId) {
        Id = branchId
    } else if (franchiseId) {
        Id = franchiseId
    }
    const { getLabelByKey } = useScreenTranslation('updateRoomStatus')

    const onSubmit = async (value: any): Promise<void> => {
        // Perform your form submission logic here

        console.log('valuessss', value)
        const payload = {
            roomId,
            isActive: value.isActive,
        }
        console.log('valuessss', payload)
        RoomStatus(payload, Number(Id), schoolInUpperCase)
        console.log('submit values', value)

        // After successful form submission, show the modal
        setIsShowModal(true)
        //setIsActivityModalVisible(true)
        setTimeout(() => {
            setIsShowModal(false)
            setIsActivityModalVisible(false)
            closeModal()
        }, 1000)
        //  await editSchool(Number(loginData?.userDetails.id), values)
    }

    const validationSchema = Yup.object({
        // beltId: Yup.string().required('Please Select Belt'),
    })
    useEffect(() => {
        setIsActivityModalVisible(true)
    }, [])

    return (
        <>
            <CustomModal
                isModalVisible={isActivityModalVisible}
                setIsModalVisible={setIsActivityModalVisible}
                onCancel={closeModal}
            >
                <Head title="Activity" />
                <StatusModalStyle>
                    {/* {Modal().modalComponent} */}
                    {/* {WarningModal().modalComponent} */}
                    {/* <CustomMessageModal
                        isModalVisible={isShowModal}
                        setIsModalVisible={setIsShowModal}
                        description="Congratulations! Your profile has been successfully completed, ensuring a seamless experience within the Marital "
                        title="Register Profile Successfully"
                        imageProp={'success'}
                    /> */}
                    {UpdateStatusModal().modalComponent}
                    <Formik
                        initialValues={initialValuesForEdit}
                        validationSchema={validationSchema}
                        // validateOnMount
                        enableReinitialize
                        onSubmit={(values) => onSubmit(values)}
                    >
                        {(formik) => {
                            return (
                                <Form
                                    name="basic"
                                    onFinish={formik.handleSubmit}
                                    autoComplete="off"
                                >
                                    <div className="mainWrapper">
                                        <h3
                                            className="table-title"
                                            // style={{
                                            //     textAlign: 'center',
                                            // }}
                                        >
                                            {/* Update Status */}
                                            {getLabelByKey('heading')}
                                        </h3>
                                    </div>
                                    <div
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        <p>{getLabelByKey('subheading')}</p>
                                    </div>
                                    <div className="bg-white form">
                                        <Col className="mt-10">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="isActive"
                                                label={getLabelByKey('title')}
                                                fontSize="16px"
                                                max={6}
                                                //value={formik.values.isActive}
                                                placeholder="Select Status"
                                                className={
                                                    formik.errors.isActive &&
                                                    formik.touched.isActive
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                                options={showStatus}
                                            />
                                        </Col>
                                        <Col>{getLabelByKey('note')}</Col>
                                    </div>

                                    <div className="mt-20 ">
                                        <CustomButton
                                            bgcolor={lightBlue3}
                                            textTransform="Captilize"
                                            color={maastrichtBlue}
                                            padding="11px 40.50px"
                                            fontFamily={`${fontFamilyMedium}`}
                                            width="100%"
                                            type="submit"
                                            title="Submit"
                                            fontSize="18px"
                                            loading={false}
                                            clicked={() => {
                                                onsubmit
                                            }}
                                        />
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </StatusModalStyle>
            </CustomModal>
        </>
    )
}

export default UpdateStatus
