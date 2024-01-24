// import { useState } from 'react'
import { Formik } from 'formik'
import { Form } from 'antd'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import FormControl from '../../../components/FormControl'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    primaryColor,
    pureDark,
} from '../../../components/GlobalStyle'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { CreateClassStyled } from './styles'
import { CreateClassInitialValues } from '../constant'
import dollar from '../../../assets/images/$.svg'
// import EnnvisionModal from '../../../components/CustomModals/EnnvisionModal'
// import CustomModal from '../../../components/Modal/CustomModal'
// import { useNavigate } from 'react-router-dom'
import Images from '../../Home/OverlayImages/images'
import store, { RootState } from '../../../redux/store'
import useClass from '../../../hooks/useClass'
import { useEffect, useState } from 'react'
import CheckboxesSelect from '../../../components/CustomCheckbox/CheckboxesSelect'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import Head from '../../../components/Head/Head'
import { getInstructorByUserId } from '../../../redux/features/instructor/instructorSlice'
import { getTimetableByUserId } from '../../../redux/features/TimeTable/TimeTableSlice'
import EnnvisionModal from '../../../components/CustomModals/EnnvisionModal'
import moment from 'moment'
// import PreviewImagesUpload from '../../../components/ImagesUpload/PreviewImageUpload'

const CreateClass = (): JSX.Element => {
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const { getLabelByKey } = useScreenTranslation('createClasses')
    const { getLabelByKey: getLegalLabelByKey } = useScreenTranslation('legal')
    const { instructorData } = useSelector(
        (state: RootState) => state.instructorData
    )
    const { timeTableData } = useSelector(
        (state: RootState) => state.timeTableData
    )
    useEffect(() => {
        store.dispatch(getInstructorByUserId())
        store.dispatch(getTimetableByUserId())
    }, [])
    // console.log();

    // const [isShowModal, setIsShowModal] = useState(false)
    // const navigate = useNavigate()
    // const [isLoading, setIsLoading] = useState(false)
    // const [bannerImage, setBannerImage] = useState(null); // State to manage banner image
    const { ClassData } = useSelector((state: RootState) => state.ClassData)
    const { handleCreateSubmit, loading, Createmodal } = useClass()

    const initialValues: CreateClassInitialValues = {
        title: '',
        startDate: '',
        endDate: '',
        instructorId: [],
        fee: '',
        activities: [],
        capacity: '',
        minimumStudent: '',
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
        useCase: '',
        id: 0,
        timeTableId: 0,
    }
    const [selectedFiles, setSelectedFiless] = useState<FileList | null>(null)
    const { loginData } = useSelector((state: RootState) => state)
    console.log('login data', loginData)

    const handleImagesUpload = (selectedFiless: FileList | null): void => {
        setSelectedFiless(selectedFiless)
    }
    const [bannerImage, setBannerImage] = useState<File | null>(null)
    const [profileImage, setProfileImage] = useState<File | null>(null)

    const handleSaveBanner = (file: File): void => {
        setBannerImage(file)
        // You can perform additional actions here if needed
    }

    const handleSaveProfile = (file: File): void => {
        setProfileImage(file)
        // You can perform additional actions here if needed
    }
    const submit = async (values: any): Promise<void> => {
        console.log('bbb', values)
        const schoolid = loginData.data?.schoolId
        const start = moment(values.startDate, 'dddd, MMM DD, YYYY').format(
            'YYYY-MM-DD'
        )
        const end = moment(values.endDate, 'dddd, MMM DD, YYYY').format(
            'YYYY-MM-DD'
        )
        const bookingstart = moment(
            values.bookingStartDate,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        const bookingEnd = moment(
            values.bookingEndDate,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        const qrCodeStart = moment(
            values.qrCodeStartDate,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        const qrCodeEnd = moment(
            values.qrCodeEndDate,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        const studentCancel = moment(
            values.allowStudentCancel,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        const refundfee = moment(
            values.refundDate,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        const bookingCancleStart = moment(
            values.bookingCancelStartDate,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        const bookingCancleEnd = moment(
            values.bookingCancelEndDate,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        console.log('image', bannerImage, profileImage)

        await handleCreateSubmit(
            {
                ...values,
                id: schoolid,
                startDate: start,
                endDate: end,
                bookingStartDate: bookingstart,
                bookingEndDate: bookingEnd,
                qrCodeStartDate: qrCodeStart,
                qrCodeEndDate: qrCodeEnd,
                allowStudentCancel: studentCancel,
                refundDate: refundfee,
                bookingCancelStartDate: bookingCancleStart,
                bookingCancelEndDate: bookingCancleEnd,
            },
            bannerImage
        )
    }

    const handleImagesSelect = (files: FileList | null): void => {
        // Handle the selected files, for example, you can store them in state
        console.log('Selected Files:', files)
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
        return activitiesName || getLabelByKey('activitiesPlaceholder')
    }
    return (
        <>
            <Head title="Create Class" />
            {Createmodal().modalComponent}
            <CreateClassStyled>
                <Formik initialValues={initialValues} onSubmit={submit}>
                    {(formik) => {
                        console.log('firmik', formik.values)

                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <div className="bg-white form">
                                    <h3>{getLabelByKey('mainTitle')}</h3>
                                    <Row>
                                        <Col md="12">
                                            <Row>
                                                <Col md="6">
                                                    <Col
                                                        md="12"
                                                        className="mt-20"
                                                    >
                                                        <FormControl
                                                            control="input"
                                                            type="text"
                                                            name="title"
                                                            label={getLabelByKey(
                                                                'title'
                                                            )}
                                                            padding="8px 10px"
                                                            fontFamily={
                                                                fontFamilyRegular
                                                            }
                                                            fontSize="16px"
                                                            max={6}
                                                            placeholder={getLabelByKey(
                                                                'titlePlaceholder'
                                                            )}
                                                        />
                                                    </Col>
                                                    <Col md="12">
                                                        <Row>
                                                            <Col
                                                                md="6"
                                                                className="mt-20"
                                                            >
                                                                <FormControl
                                                                    control="date"
                                                                    type="date"
                                                                    name="startDate"
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    label={getLabelByKey(
                                                                        'startDate'
                                                                    )}
                                                                    padding="8px 10px"
                                                                    placeholder={getLabelByKey(
                                                                        'startDatePlaceholder'
                                                                    )}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md="6"
                                                                className="mt-20"
                                                            >
                                                                <FormControl
                                                                    control="date"
                                                                    type="date"
                                                                    name="endDate"
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    label={getLabelByKey(
                                                                        'endDate'
                                                                    )}
                                                                    padding="8px 10px"
                                                                    placeholder={getLabelByKey(
                                                                        'endDatePlaceholder'
                                                                    )}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md="6"
                                                                className="mt-20"
                                                            >
                                                                <FormControl
                                                                    control="select"
                                                                    type="text"
                                                                    name="instructorId"
                                                                    label={getLabelByKey(
                                                                        'instructors'
                                                                    )}
                                                                    padding="8px 10px"
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    fontSize="16px"
                                                                    max={6}
                                                                    placeholder={getLabelByKey(
                                                                        'InstructorsPlaceholder'
                                                                    )}
                                                                >
                                                                    <option
                                                                        value=""
                                                                        label="Select an Instructor"
                                                                    />
                                                                    {instructorData.data.map(
                                                                        (
                                                                            instructor
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    instructor.instructorId
                                                                                }
                                                                                value={
                                                                                    instructor.instructorId
                                                                                }
                                                                            >
                                                                                {
                                                                                    instructor.instructorName
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </FormControl>
                                                            </Col>
                                                            <Col
                                                                md="6"
                                                                className="mt-20"
                                                            >
                                                                <FormControl
                                                                    control="select"
                                                                    type="text"
                                                                    name="timeTableId"
                                                                    // label={getLabelByKey(
                                                                    //     'instructors'
                                                                    // )}
                                                                    label="TimeTable"
                                                                    padding="8px 10px"
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    fontSize="16px"
                                                                    max={6}
                                                                    // placeholder={getLabelByKey(
                                                                    //     'InstructorsPlaceholder'
                                                                    // )}
                                                                    placeholder="Select TimeTable"
                                                                >
                                                                    <option
                                                                        value=""
                                                                        label="Select an Instructor"
                                                                    />
                                                                    {timeTableData.data.map(
                                                                        (
                                                                            timetable
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    timetable.timeTableId
                                                                                }
                                                                                value={
                                                                                    timetable.timeTableId
                                                                                }
                                                                            >
                                                                                {
                                                                                    timetable.title
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </FormControl>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col
                                                        md="12"
                                                        className="mt-20"
                                                    >
                                                        <CheckboxesSelect
                                                            name="activities"
                                                            label={getLabelByKey(
                                                                'activities'
                                                            )}
                                                            list={activities}
                                                            showErrorMsgInList={
                                                                false
                                                            }
                                                            placeholder={showActivities(
                                                                formik.values
                                                                    .activities
                                                            )}
                                                        />
                                                    </Col>
                                                </Col>

                                                <Col md="6" className="mt-20">
                                                    <p className="bannerTitle ">
                                                        {getLabelByKey(
                                                            'bannerImage'
                                                        )}
                                                    </p>
                                                    <Images
                                                        onSaveBanner={
                                                            handleSaveBanner
                                                        }
                                                        isEditable={true} // Set isEditable to true or false based on your requirement
                                                        defaultImage={null}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md="2" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="number"
                                                name="fee"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'classFees'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'classFeesPlaceholder'
                                                )}
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
                                        <Col md="2" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="number"
                                                name="capacity"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'classCapacity'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'classCapacityPlaceholder'
                                                )}
                                            />
                                        </Col>

                                        <Col md="2" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="number"
                                                name="minimumStudent"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'minimumStudent'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'minimumStudentPlaceholder'
                                                )}
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="bookingStartDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'startBooking'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'startBookingPlaceholder'
                                                )}
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="bookingEndDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'endBooking'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'endBookingPlaceholder'
                                                )}
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="qrCodeStartDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'qrCodeAttendanceStart'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'qrCodeAttendanceStartPlaceholder'
                                                )}
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="qrCodeEndDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'qrCodeAttendanceEnd'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'qrCodeAttendanceEndPlaceholder'
                                                )}
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="allowStudentCancel"
                                                label={getLabelByKey(
                                                    'allowToStudentCancel'
                                                )}
                                                padding="8px 10px"
                                                fontFamily={fontFamilyRegular}
                                                fontSize="16px"
                                                max={6}
                                                placeholder={getLabelByKey(
                                                    'allowToStudentCancelPlaceholder'
                                                )}
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="refundDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'refundFeesDate'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'refundFeesDatePlacholder'
                                                )}
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="bookingCancelStartDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'bookingCancellationStart'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'bookingCancellationStartPlaceholder'
                                                )}
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="bookingCancelEndDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'bookingCancellationEnd'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'bookingCancellationEndPlaceholder'
                                                )}
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="number"
                                                name="cancellationCharges"
                                                fontFamily={fontFamilyRegular}
                                                label={
                                                    <>
                                                        {getLabelByKey(
                                                            'cancellationCharge'
                                                        )}{' '}
                                                        <span>
                                                            {getLabelByKey(
                                                                'ifStudentCancel'
                                                            )}
                                                        </span>
                                                    </>
                                                }
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'cancellationChargePlaceholder'
                                                )}
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
                                                label={
                                                    <>
                                                        {getLabelByKey(
                                                            'accommodate'
                                                        )}{' '}
                                                        <span>
                                                            {getLabelByKey(
                                                                'ifSchoolCancel'
                                                            )}
                                                        </span>
                                                    </>
                                                }
                                                fontFamily={fontFamilyRegular}
                                                padding="8px 10px"
                                                fontSize="15px"
                                                max={6}
                                                placeholder={getLabelByKey(
                                                    'selectAccommodationOptions'
                                                )}
                                            />
                                        </Col>

                                        <Col md="12" className="mt-20">
                                            <FormControl
                                                control="textarea"
                                                type="text"
                                                name="description"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'descriptionAndFeatures'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'descriptionAndFeaturesPlaceholder'
                                                )}
                                                height="200px"
                                            />
                                        </Col>

                                        <label htmlFor="termsAndConditions">
                                            <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                                                <FormControl
                                                    control="checkbox"
                                                    type="checkbox"
                                                    id="termsAndConditions"
                                                    name="termsAndConditions"
                                                />
                                                <p
                                                    className="checkBoxPara"
                                                    id="termsAndConditions"
                                                >
                                                    {getLegalLabelByKey(
                                                        'termsAndConditions'
                                                    )}
                                                </p>
                                            </form>
                                        </label>
                                        <label htmlFor="AgreementGuidelines">
                                            <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                                                <FormControl
                                                    control="checkbox"
                                                    type="checkbox"
                                                    id="AgreementGuidelines"
                                                    name="AgreementGuidelines"
                                                />
                                                <p
                                                    className="checkBoxPara"
                                                    id="AgreementGuidelines"
                                                >
                                                    {getLegalLabelByKey(
                                                        'AgreementGuidelines'
                                                    )}
                                                </p>
                                            </form>
                                        </label>
                                        <label htmlFor="liabilityWaivers">
                                            <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                                                <FormControl
                                                    control="checkbox"
                                                    type="checkbox"
                                                    id="liabilityWaivers"
                                                    name="liabilityWaivers"
                                                />
                                                <p
                                                    className="checkBoxPara"
                                                    id="liabilityWaivers"
                                                >
                                                    {getLegalLabelByKey(
                                                        'liabilityWaivers'
                                                    )}
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
                                        fontFamily={`${fontFamilyMedium}`}
                                        width="fit-content"
                                        type="submit"
                                        title={getLabelByKey('primaryButton')}
                                        fontSize="18px"
                                        loading={loading}
                                    />
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </CreateClassStyled>
        </>
    )
}

export default CreateClass
