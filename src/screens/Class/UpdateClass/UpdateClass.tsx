import { useState } from 'react'
import { Formik } from 'formik'
import { Form } from 'antd'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import FormControl from '../../../components/FormControl'
import DateCalander from '../../../assets/images/dateCalander.svg'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    pureDark,
} from '../../../components/GlobalStyle'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { CreateClassStyled } from '../CreateClasses/styles'
import { CreateClassInitialValues } from '../constant'
import dollar from '../../../assets/images/$.svg'
import EnnvisionModal from '../../../components/CustomModals/EnnvisionModal'
import CustomModal from '../../../components/Modal/CustomModal'
import { useNavigate } from 'react-router-dom'
import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import { RootState } from '../../../redux/store'

const CreateClass = () => {
    const [isShowModal, setIsShowModal] = useState(false)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const { ClassData } = useSelector((state: RootState) => state.ClassData)

    const initialValues: CreateClassInitialValues = {
        ClassTitle: '',
        ClassStartDate: '',
        ClassEndDate: '',
        emailAddress: '',
        Classinstructor: [],
        ClassFee: '',
        ClassActivities: '',
        Classcapicity: '',
        MinimumStudents: '',
        startbooking: '',
        endbooking: '',
        QRCodeAttendanceStart: '',
        QRCodeAttendanceEnd: '',
        AllowToStudentCancle: '',
        RefundFeeDate: '',
        BookingCancellationStart: '',
        BookingCancellationEnd: '',
        CancellationCharges: '',
        Accommodate: '',
        Description: '',
        Agreement: '',
        termCondition: '',
        Liabilitywaivers: '',
        bannerPicture: '',
        profilePicture: '',
    }

    const onSubmit = async () => {
        try {
            setIsShowModal(true)
            setTimeout(() => {
                setIsShowModal(false)
                navigate('/membership/list')
            }, 3000)
            setIsLoading(false)
        } catch (error: any) {}
    }
    return (
        <CreateClassStyled>
            <CustomModal
                isModalVisible={isShowModal}
                setIsModalVisible={setIsShowModal}
                showCloseBtn={false}
            >
                <EnnvisionModal
                    doTask={() => {
                        navigate('/branch/list')
                        setIsShowModal(false)
                    }}
                    title="Membership Created Successfully!"
                    description="Congratulations! Your Membership has been successfully Created, ensuring a seamless experience within the Marital "
                />
            </CustomModal>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {(formik) => {
                    return (
                        <Form
                            name="basic"
                            onFinish={formik.handleSubmit}
                            autoComplete="off"
                        >
                            <div className="bg-white form">
                                <h3>Class Information</h3>
                                <Row>
                                    <Row>
                                        <Col md="6">
                                            <Col md="12" className="mt-20">
                                                <FormControl
                                                    control="input"
                                                    type="text"
                                                    name="title"
                                                    label="Title"
                                                    padding="10px"
                                                    fontFamily={
                                                        fontFamilyRegular
                                                    }
                                                    fontSize="16px"
                                                    max={6}
                                                    placeholder="Title"
                                                />
                                            </Col>

                                            <Col md="12">
                                                <Row>
                                                    <Col
                                                        md="6"
                                                        className="mt-20"
                                                    >
                                                        <FormControl
                                                            control="input"
                                                            type="text"
                                                            name="StartDate"
                                                            fontFamily={
                                                                fontFamilyRegular
                                                            }
                                                            label="Start Date"
                                                            padding="10px"
                                                            placeholder="Start Date"
                                                            suffix={
                                                                <img
                                                                    src={
                                                                        DateCalander
                                                                    }
                                                                    alt=""
                                                                    width={25}
                                                                    height={25}
                                                                    //onClick={(type = "date")}
                                                                />
                                                            }
                                                        />
                                                    </Col>
                                                    <Col
                                                        md="6"
                                                        className="mt-20"
                                                    >
                                                        <FormControl
                                                            control="input"
                                                            type="text"
                                                            name="endDate"
                                                            fontFamily={
                                                                fontFamilyRegular
                                                            }
                                                            label="End Date"
                                                            padding="10px"
                                                            placeholder="End Date"
                                                            suffix={
                                                                <img
                                                                    src={
                                                                        DateCalander
                                                                    }
                                                                    alt=""
                                                                    width={25}
                                                                    height={25}
                                                                    //onClick={(type = "date")}
                                                                />
                                                            }
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md="12">
                                                <Row>
                                                    <Col
                                                        md="6"
                                                        className="mt-20"
                                                    >
                                                        <FormControl
                                                            control="select"
                                                            type="text"
                                                            name="Instructors"
                                                            label="Instructors"
                                                            padding="7px"
                                                            fontFamily={
                                                                fontFamilyRegular
                                                            }
                                                            fontSize="16px"
                                                            max={6}
                                                            placeholder="Select Instructors"
                                                        />
                                                    </Col>
                                                    <Col
                                                        md="6"
                                                        className="my-4"
                                                    >
                                                        <FormControl
                                                            control="input"
                                                            type="text"
                                                            name="ClassFee"
                                                            fontFamily={
                                                                fontFamilyRegular
                                                            }
                                                            label="Class Fees"
                                                            padding="10px"
                                                            placeholder="Class Fees"
                                                            suffix={
                                                                <img
                                                                    src={dollar}
                                                                    alt=""
                                                                    width={13}
                                                                    height={27}
                                                                    //onClick={(type = "date")}
                                                                />
                                                            }
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col md="12">
                                                <FormControl
                                                    control="input"
                                                    type="text"
                                                    name="Activities"
                                                    fontFamily={
                                                        fontFamilyRegular
                                                    }
                                                    label="Activities"
                                                    padding="10px"
                                                    placeholder="Select Class Activities"
                                                />
                                            </Col>
                                        </Col>

                                        <Col md="6">
                                            <Col md="12" className="mt-20">
                                                <p className="bannerTitle ">
                                                    Select Banner Image
                                                </p>
                                                <OverlayImages
                                                    backgroundImg={
                                                        ClassData.bannerPicture ||
                                                        ''
                                                    }
                                                    overlayImg={
                                                        ClassData.profilePicture ||
                                                        ''
                                                    }
                                                    isEditable={true}
                                                />
                                            </Col>
                                        </Col>
                                    </Row>

                                    <Col md="3" className="mt-20">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="ClassCapacity"
                                            fontFamily={fontFamilyRegular}
                                            label="Class Capacity"
                                            padding="10px"
                                            placeholder="Enter Capacity of Classroom"
                                        />
                                    </Col>

                                    <Col md="3" className="mt-20">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="MinimumStudent"
                                            fontFamily={fontFamilyRegular}
                                            label="Minimum Student"
                                            padding="10px"
                                            placeholder="Enter Minimum Student Required for Class"
                                        />
                                    </Col>
                                    <Col md="3" className="mt-20">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="StartBooking"
                                            fontFamily={fontFamilyRegular}
                                            label="Start Booking"
                                            padding="10px"
                                            placeholder="Monday, October 27, 2023"
                                            suffix={
                                                <img
                                                    src={DateCalander}
                                                    alt=""
                                                    width={25}
                                                    height={25}
                                                    //onClick={(type = "date")}
                                                />
                                            }
                                        />
                                    </Col>
                                    <Col md="3" className="mt-20">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="EndBooking"
                                            fontFamily={fontFamilyRegular}
                                            label="End Booking"
                                            padding="10px"
                                            placeholder="Monday, October 27, 2023"
                                            suffix={
                                                <img
                                                    src={DateCalander}
                                                    alt=""
                                                    width={25}
                                                    height={25}
                                                    //onClick={(type = "date")}
                                                />
                                            }
                                        />
                                    </Col>
                                    <Col md="3" className="mt-20">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="QRCodeAttendanceStart"
                                            fontFamily={fontFamilyRegular}
                                            label="QR Code Attendance Start"
                                            padding="10px"
                                            placeholder="QR Code Attendance Start"
                                            suffix={
                                                <img
                                                    src={DateCalander}
                                                    alt=""
                                                    width={25}
                                                    height={25}
                                                    //onClick={(type = "date")}
                                                />
                                            }
                                        />
                                    </Col>
                                    <Col md="3" className="mt-20">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="QRCodeAttendanceEnd"
                                            fontFamily={fontFamilyRegular}
                                            label="QR Code Attendance End"
                                            padding="10px"
                                            placeholder="QR Code Attendance End"
                                            suffix={
                                                <img
                                                    src={DateCalander}
                                                    alt=""
                                                    width={25}
                                                    height={25}
                                                    //onClick={(type = "date")}
                                                />
                                            }
                                        />
                                    </Col>

                                    <Col md="3" className=" fill mt-20 ">
                                        <FormControl
                                            control="select"
                                            type="text"
                                            name="AllowtoStudentCancel"
                                            label="Allow to Student Cancel"
                                            padding="7px"
                                            fontFamily={fontFamilyRegular}
                                            fontSize="16px"
                                            max={6}
                                            placeholder="Allow to Student Cancel"
                                        />
                                    </Col>

                                    <Col md="3" className="mt-20">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="RefundFeesDate"
                                            fontFamily={fontFamilyRegular}
                                            label="Refund Fees Date"
                                            padding="10px"
                                            placeholder="Refund Fees Date"
                                            suffix={
                                                <img
                                                    src={DateCalander}
                                                    alt=""
                                                    width={25}
                                                    height={25}
                                                    //onClick={(type = "date")}
                                                />
                                            }
                                        />
                                    </Col>

                                    <Col md="3" className="mt-20">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="BookingCancellationStart"
                                            fontFamily={fontFamilyRegular}
                                            label="Booking Cancellation Start"
                                            padding="10px"
                                            placeholder="Booking Cancellation Start"
                                            suffix={
                                                <img
                                                    src={DateCalander}
                                                    alt=""
                                                    width={25}
                                                    height={25}
                                                    //onClick={(type = "date")}
                                                />
                                            }
                                        />
                                    </Col>

                                    <Col md="3" className="mt-20">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="BookingCancellationEnd"
                                            fontFamily={fontFamilyRegular}
                                            label="Booking Cancellation End"
                                            padding="10px"
                                            placeholder="Booking Cancellation End"
                                            suffix={
                                                <img
                                                    src={DateCalander}
                                                    alt=""
                                                    width={25}
                                                    height={25}
                                                    //onClick={(type = "date")}
                                                />
                                            }
                                        />
                                    </Col>

                                    <Col md="3" className="mt-20">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="Cancellation Charge"
                                            fontFamily={fontFamilyRegular}
                                            label="Cancellation Charge"
                                            padding="10px"
                                            placeholder="20:00"
                                            suffix={
                                                <img
                                                    src={dollar}
                                                    alt=""
                                                    width={13}
                                                    height={27}
                                                    //onClick={(type = "date")}
                                                />
                                            }
                                        />
                                    </Col>

                                    <Col md="3" className=" fill mt-20 ">
                                        <FormControl
                                            control="select"
                                            type="text"
                                            name="Accommodate"
                                            label="Accommodate"
                                            fontFamily={fontFamilyRegular}
                                            fontSize="15px"
                                            max={6}
                                            placeholder="Select Accommodation Options"
                                        />
                                    </Col>

                                    <Col md="12" className="mt-20">
                                        <FormControl
                                            control="textarea"
                                            type="text"
                                            name="description"
                                            fontFamily={fontFamilyRegular}
                                            label="Description & Features"
                                            padding="10px"
                                            placeholder="Description & Features"
                                            height="200px"
                                        />
                                    </Col>

                                    <label htmlFor="termCondition">
                                        <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                                            <FormControl
                                                control="checkbox"
                                                type="checkbox"
                                                id="rememberMe"
                                                name="rememberMe"
                                            />
                                            <p
                                                className="checkBoxPara"
                                                id="termCondition"
                                            >
                                                Terms and conditions
                                            </p>
                                        </form>
                                    </label>
                                    <label htmlFor="agreement">
                                        <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                                            <FormControl
                                                control="checkbox"
                                                type="checkbox"
                                                id="rememberMe"
                                                name="rememberMe"
                                            />
                                            <p
                                                className="checkBoxPara"
                                                id="agreement"
                                            >
                                                Agreement to follow the app's
                                                guidelines and policies
                                            </p>
                                        </form>
                                    </label>
                                    <label htmlFor="liability">
                                        <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                                            <FormControl
                                                control="checkbox"
                                                type="checkbox"
                                                id="rememberMe"
                                                name="rememberMe"
                                            />
                                            <p
                                                className="checkBoxPara"
                                                id="liability"
                                            >
                                                Liability waivers
                                            </p>
                                        </form>
                                    </label>
                                </Row>
                            </div>

                            <div className="mt-20 d-flex justify-content-end">
                                <CustomButton
                                    bgcolor={lightBlue3}
                                    textTransform="Captilize"
                                    color={pureDark}
                                    padding="11px 40.50px"
                                    margin="30px 0px"
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
        </CreateClassStyled>
    )
}

export default CreateClass
