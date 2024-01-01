// import { useState } from 'react'
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
import FileSubmit from '../../../assets/icons/ic_fileSubmit.svg'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { CreateClassStyled } from './styles'
import { CreateClassInitialValues } from '../constant'
import dollar from '../../../assets/images/$.svg'
// import EnnvisionModal from '../../../components/CustomModals/EnnvisionModal'
// import CustomModal from '../../../components/Modal/CustomModal'
// import { useNavigate } from 'react-router-dom'
// import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import { RootState } from '../../../redux/store'
import useClass from '../../../hooks/useClass'
import ImagesUpload from '../../../components/ImagesUpload/ImagesUpload'
import { useState } from 'react'
import CheckboxesSelect from '../../../components/CustomCheckbox/CheckboxesSelect'

const CreateClass = (): JSX.Element => {
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)

    // const [isShowModal, setIsShowModal] = useState(false)
    // const navigate = useNavigate()
    // const [isLoading, setIsLoading] = useState(false)
    // const [bannerImage, setBannerImage] = useState(null); // State to manage banner image
    const { ClassData } = useSelector((state: RootState) => state.ClassData)
    const { handleCreateSubmit, loading } = useClass()
    console.log('asdf', ClassData.data)

    const initialValues: CreateClassInitialValues = {
        title: '',
        startDate: '',
        endDate: '',
        instructorId: [],
        fee: '',
        activities: [],
        capacity: 0,
        minimumStudent: 0,
        bookingStartDate: '',
        bookingEndDate: '',
        qrCodeStartDate: '',
        qrCodeEndDate: '',
        allowStudentCancel: '',
        refundDate: '',
        bookingCancelStartDate: '',
        bookingCancelEndDate: '',
        cancellationCharges: '',
        accommodation: '',
        description: '',
        Agreement: '',
        termCondition: '',
        Liabilitywaivers: '',
        bannerPicture: '',
        profilePicture: '',
        useCase: '',
        id: 0,
    }
    const [selectedFiles, setSelectedFiless] = useState<FileList | null>(null)
    const handleImagesUpload = (selectedFiless: FileList | null): void => {
        setSelectedFiless(selectedFiless)
    }
    const submit = async (values: any): Promise<void> => {
        console.log(values)
        await handleCreateSubmit(values, selectedFiles)
    }
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    const showActivities = (_activities: string[]): string => {
        let activitiesName = ''
        _activities.forEach((activity) => {
            const index = activities.findIndex((act) => act.id === activity)
            if (index !== -1) {
                const activityLabel = (activities[index] as any)[
                    selectedLanguage
                ]
                activitiesName =
                    activitiesName === ''
                        ? activityLabel
                        : `${activitiesName}, ${activityLabel}`
            }
        })
        if (activitiesName.length > 35) {
            return `${activitiesName.slice(0, 35)}...`
        }
        return activitiesName
    }
    return (
        <CreateClassStyled>
            <Formik initialValues={initialValues} onSubmit={submit}>
                {(formik) => {
                    console.log('checking formik', formik.values)
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
                                                            name="startDate"
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
                                                            name="instructorId"
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
                                                        className="mt-20"
                                                    >
                                                        <FormControl
                                                            control="input"
                                                            type="text"
                                                            name="fee"
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

                                            <Col md="12" className="mt-20">
                                                <CheckboxesSelect
                                                    name="activities"
                                                    label="Activity"
                                                    list={activities}
                                                    showErrorMsgInList={false}
                                                    placeholder={showActivities(
                                                        formik.values.activities
                                                    )}
                                                />
                                            </Col>
                                        </Col>

                                        <Col md="6">
                                            <Col md="12" className="mt-20">
                                                <p className="bannerTitle ">
                                                    Select Banner Image
                                                </p>
                                                <FormControl
                                                    control="input"
                                                    type="ImagesUpload"
                                                    name="latestCertification"
                                                    fontFamily={
                                                        fontFamilyRegular
                                                    }
                                                    label={
                                                        'latestCertification'
                                                    }
                                                    src={FileSubmit}
                                                    // onChange={handleChange}
                                                    suffix={
                                                        <ImagesUpload
                                                            onImagesSelect={
                                                                handleImagesUpload
                                                            }
                                                        />
                                                    }
                                                    padding="10px"
                                                    placeholder={
                                                        'PlaceholderLatestCertification'
                                                    }
                                                />
                                                {/* <OverlayImages
                                                    backgroundImg={
                                                        ClassData.bannerPicture ||
                                                        ''
                                                    }
                                                    overlayImg={
                                                        ClassData.profilePicture ||
                                                        ''
                                                    }
                                                    isEditable={true}
                                                /> */}
                                            </Col>
                                        </Col>
                                    </Row>

                                    <Col md="3" className="mt-20">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="capacity"
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
                                            name="minimumStudent"
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
                                            name="bookingStartDate"
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
                                            name="bookingEndDate"
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
                                            name="qrCodeStartDate"
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
                                            name="qrCodeEndDate"
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

                                    <Col md="3" className="mt-20">
                                        <FormControl
                                            control="select"
                                            type="text"
                                            name="allowStudentCancel"
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
                                            name="refundDate"
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
                                            name="bookingCancelStartDate"
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
                                            name="bookingCancelEndDate"
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
                                            name="cancellationCharges"
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
                                            name="accommodation"
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
                                                id="termCondition"
                                                name="termCondition"
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
                                                id="Agreement"
                                                name="Agreement"
                                            />
                                            <p
                                                className="checkBoxPara"
                                                id="agreement"
                                            >
                                                Agreement to follow the
                                                app&apos;s guidelines and
                                                policies
                                            </p>
                                        </form>
                                    </label>
                                    <label htmlFor="liability">
                                        <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                                            <FormControl
                                                control="checkbox"
                                                type="checkbox"
                                                id="Liabilitywaivers"
                                                name="Liabilitywaivers"
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
                                    loading={loading}
                                    clicked={() => submit(formik.values)}
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
