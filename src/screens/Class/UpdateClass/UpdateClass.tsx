import { useEffect, useState } from 'react'
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
import Images from '../../Home/OverlayImages/images'
import store, { RootState } from '../../../redux/store'
import Head from '../../../components/Head/Head'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import CheckboxesSelect from '../../../components/CustomCheckbox/CheckboxesSelect'
import useClass from '../../../hooks/useClass'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { getTimetableByUserId } from '../../../redux/features/TimeTable/TimeTableSlice'
import { getInstructorByUserId } from '../../../redux/features/instructor/instructorSlice'
import useTimetable from '../../../hooks/useTimetable'
import useInstructor from '../../../hooks/useInstructor'
import { initial } from 'lodash'
import * as Yup from 'yup'

const UpdateClass = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('updateClasses')
    const { getLabelByKey: getLegalLabelByKey } = useScreenTranslation('legal')
    const { classId } = useParams()
    const { loginData } = useSelector((state: RootState) => state)

    const { getClassbyid, loading, UpdateModal, handleUpdate } = useClass()
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const [values, setValues] = useState<any>()
    const [timetable, setTimetable] = useState<any>(undefined)
    const [instructor, setinstructor] = useState<any>(undefined)
    const { getTimetableById } = useTimetable()
    const { getInstructorbyid } = useInstructor()
    const {
        dropdowns: { schoolAccommodation },
    } = useSelector((state: RootState) => state.appData.data)
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    const convertedAccommodation = schoolAccommodation.map((accommodation) => ({
        ...accommodation,
        id: accommodation.id.toString(),
    }))
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const data = await getClassbyid(Number(classId))
                setValues(data)

                if (data) {
                    const datas = await getInstructorbyid(data?.instructorId)
                    setinstructor(datas)
                    const dataa = await getTimetableById(data?.timeTableId)
                    setTimetable(dataa)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])
    const [bannerImage, setBannerImage] = useState<File | null>(null)
    const [bannerImages, setBannerImages] = useState<File | null>(null)

    // const showAccommodation = (_accommodate: string[]): string => {
    //     const AccommodateName = _accommodate.reduce(
    //         (a: string, accommodate_id: string) => {
    //             const index = convertedAccommodation.findIndex(
    //                 (facts: any) => facts.id === +accommodate_id
    //             )

    //             if (index === -1) {
    //                 return a
    //             }

    //             const accommodateLabel = (convertedAccommodation[index] as any)[
    //                 selectedLanguage
    //             ]
    //             return `${a} ${accommodateLabel},`
    //         },
    //         ''
    //     )

    //     if (AccommodateName.length > 35) {
    //         return `${AccommodateName.slice(0, 35)}...`
    //     }

    //     return AccommodateName || getLabelByKey('selectAccommodationOptions')
    // }
    const showAccommodation = (_facilities: string[]): string => {
        let facilitiesName = ''
        _facilities?.map((facility) => {
            const index = convertedAccommodation.findIndex(
                (facts: any) => facts.id === facility
            )
            if (index !== -1) {
                facilitiesName =
                    facilitiesName === ''
                        ? (convertedAccommodation[index] as any)[
                              selectedLanguage
                          ]
                        : `${facilitiesName}, ${
                              (convertedAccommodation[index] as any)[
                                  selectedLanguage
                              ]
                          }`
            }
        })

        if (facilitiesName.length > 40) {
            return `${facilitiesName.slice(0, 40)}...`
        }
        return facilitiesName || getLabelByKey('facilities')
    }
    const handleSaveBanner = (file: File): void => {
        setBannerImage(file)
        setBannerImages(file)
    }

    const InitialValues: CreateClassInitialValues = {
        title: values?.title,
        startDate: moment(values?.startDate, 'YYYY-MM-DD').format(
            'dddd, MMM DD, YYYY'
        ),
        endDate: moment(values?.endDate, 'YYYY-MM-DD').format(
            'dddd, MMM DD, YYYY'
        ),
        instructorId: values?.instructorId,
        fee: values?.fee,
        activities: values ? values.activities?.split(',').map(String) : [],
        accommodation: values
            ? values.accommodation?.split(',').map(String)
            : [],

        capacity: values?.capacity,
        minimumStudent: values?.minimumStudent,
        bookingStartDate: moment(values?.bookingStartDate, 'YYYY-MM-DD').format(
            'dddd, MMM DD, YYYY'
        ),
        bookingEndDate: moment(values?.bookingEndDate, 'YYYY-MM-DD').format(
            'dddd, MMM DD, YYYY'
        ),
        qrCodeStartDate: moment(values?.qrCodeStartDate, 'YYYY-MM-DD').format(
            'dddd, MMM DD, YYYY'
        ),
        qrCodeEndDate: moment(values?.qrCodeEndDate, 'YYYY-MM-DD').format(
            'dddd, MMM DD, YYYY'
        ),
        allowStudentCancel: moment(
            values?.allowStudentCancel,
            'YYYY-MM-DD'
        ).format('dddd, MMM DD, YYYY'),
        refundDate: moment(values?.refundDate, 'YYYY-MM-DD').format(
            'dddd, MMM DD, YYYY'
        ),
        bookingCancelStartDate: moment(
            values?.bookingCancelStartDate,
            'YYYY-MM-DD'
        ).format('dddd, MMM DD, YYYY'),
        bookingCancelEndDate: moment(
            values?.bookingCancelEndDate,
            'YYYY-MM-DD'
        ).format('dddd, MMM DD, YYYY'),
        cancellationCharges: values?.cancellationCharges,
        description: values?.description,
        Agreement: '',
        termCondition: '',
        Liabilitywaivers: '',
        bannerPicture: values?.bannerPicture,
        useCase: 'SCHOOL',
        id: Number(loginData.data?.schoolId),
        timeTableId: values?.timeTableId,
    }
    const validationSchemas = Yup.object({
        // in: Yup.string()
        //     .required(instructorName.notBlankMsgEn)
        //     .matches(franchiseNameReg, instructorName.patternMsgEn),
        // address: Yup.string()
        //     .required(address.notBlankMsgEn)
        //     .matches(addressReg, address.patternMsgEn),
        // emailAddress: Yup.string()
        //     .required(emailAddress.notBlankMsgEn)
        //     .matches(emailAddressReg, emailAddress.patternMsgEn),
        // instructorPhoneNumber: Yup.string().required(
        //     instructorPhoneNumber.notBlankMsgEn
        // ),
        // latestCertification: Yup.mixed().test(
        //     'fileType',
        //     'Unsupported File Format',
        //     function (value) {
        //         if (value) {
        //             const allowedTypes = [
        //                 'image/jpeg',
        //                 'image/png',
        //                 'image/webp',
        //                 'image/jpg',
        //                 'image/bmp',
        //                 'image/tiff',
        //             ]
        //             const isAllowedType = allowedTypes.includes(value.type)

        //             return isAllowedType
        //         }
        //         return true
        //     }
        // ),
        title: Yup.string().required('Please select title'),
        fee: Yup.string().required('Please enter description'),
        // yearsOfExperience: Yup.string().required(
        //     'Please select years Of Experience'
        // ),

        // defaultCurrency: Yup.string().required(
        //     'Please select default currency'
        // ),
        // activities: Yup.array()
        //     .of(Yup.string().required('Select an activity'))
        //     .min(1, 'Select at least one activity'),
        // specializations: Yup.array()
        //     .of(Yup.string().required('Select an specilization'))
        //     .min(1, 'Select at least one specilization'),
    })
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
    const onSubmit = async (valuess: any): Promise<void> => {
        const start = moment(valuess.startDate, 'dddd, MMM DD, YYYY').format(
            'YYYY-MM-DD'
        )
        const end = moment(valuess.endDate, 'dddd, MMM DD, YYYY').format(
            'YYYY-MM-DD'
        )
        const bookingstart = moment(
            valuess.bookingStartDate,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        const bookingEnd = moment(
            valuess.bookingEndDate,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        const qrCodeStart = moment(
            valuess.qrCodeStartDate,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        const qrCodeEnd = moment(
            valuess.qrCodeEndDate,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        const studentCancel = moment(
            valuess.allowStudentCancel,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        const refundfee = moment(
            valuess.refundDate,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        const bookingCancleStart = moment(
            valuess.bookingCancelStartDate,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        const bookingCancleEnd = moment(
            valuess.bookingCancelEndDate,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        const bannerImageToSend = bannerImage
            ? bannerImage
            : InitialValues.bannerPicture

        handleUpdate(
            Number(classId),
            {
                ...valuess,
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
            bannerImageToSend,
            bannerImages
        )
    }
    return (
        <>
            <Head title="Update Class" />
            <CreateClassStyled>
                {UpdateModal().modalComponent}

                <Formik
                    initialValues={InitialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchemas}
                    enableReinitialize
                >
                    {(formik) => {
                        console.log('initial', InitialValues)

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
                                                            // defaultValue={
                                                            //     formik.values
                                                            //         .title
                                                            // }
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
                                                                    labelFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    label={getLabelByKey(
                                                                        'startDate'
                                                                    )}
                                                                    fontSize="16px"
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
                                                                    suffix={
                                                                        <img
                                                                            src={
                                                                                DateCalander
                                                                            }
                                                                            alt=""
                                                                            width={
                                                                                25
                                                                            }
                                                                            height={
                                                                                25
                                                                            }
                                                                            //onClick={(type = "date")}
                                                                        />
                                                                    }
                                                                />
                                                            </Col>
                                                            <Col
                                                                md="12"
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
                                                                    value={
                                                                        formik
                                                                            .values
                                                                            .instructorId
                                                                    } // Set value to the selected instructor ID
                                                                >
                                                                    {instructorData.data.map(
                                                                        (
                                                                            instructors
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    instructors.instructorId
                                                                                }
                                                                                value={
                                                                                    instructors.instructorId
                                                                                }
                                                                            >
                                                                                {
                                                                                    instructors.instructorName
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </FormControl>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md="12">
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
                                                <Col md="6">
                                                    <Col
                                                        md="12"
                                                        className="mt-20"
                                                    >
                                                        <p className="bannerTitle ">
                                                            {getLabelByKey(
                                                                'bannerImage'
                                                            )}
                                                        </p>
                                                        <Images
                                                            onSaveBanner={
                                                                handleSaveBanner
                                                            }
                                                            isEditable={true}
                                                            defaultImage={
                                                                formik.values
                                                                    .bannerPicture
                                                            } // Pass existing banner picture as default image
                                                        />
                                                    </Col>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md="6" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="rooms"
                                                label="Rooms"
                                                padding="8px 10px"
                                                fontFamily={fontFamilyRegular}
                                                fontSize="16px"
                                                max={6}
                                                placeholder="Select Rooms"
                                                value={
                                                    formik.values.timeTableId
                                                }
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
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
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="number"
                                                name="fee"
                                                fontFamily={fontFamilyRegular}
                                                label="New Class Fees"
                                                padding="8px 10px"
                                                placeholder="Enter New Class Fees"
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
                                        <Col md="3" className="mt-20">
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

                                        <Col md="3" className="mt-20">
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

                                        <Col md="3" className=" fill mt-20 ">
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="allowStudentCancel"
                                                label={getLabelByKey(
                                                    'allowToStudentCancel'
                                                )}
                                                padding="7px"
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
                                                        alt="dollar"
                                                        width={13}
                                                        height={27}
                                                        //onClick={(type = "date")}
                                                    />
                                                }
                                            />
                                        </Col>

                                        <Col md="3" className="  ">
                                            <CheckboxesSelect
                                                name="accommodation"
                                                label={getLabelByKey(
                                                    'accommodate'
                                                )}
                                                list={convertedAccommodation}
                                                showErrorMsgInList={false}
                                                placeholder={showAccommodation(
                                                    formik.values.accommodation
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
                                        margin="30px 0px"
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

export default UpdateClass
