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
    const [room, setRoom] = useState<any>([])
    const [instructor, setinstructor] = useState<any>([])
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
                    setinstructor(data.instructorsResponseDTOList)
                    setRoom(data.roomResponseDTOList)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

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
    const [bannerImage, setBannerImage] = useState<File | null>(null)
    const handleSaveBanner = (file: File): void => {
        console.log('iamge file', file)
        setBannerImage(file)
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
        roomId: values?.roomId,
        fee: values?.fee,
        activities: values ? values.activities?.split(',').map(String) : [],
        accommodation: values
            ? values.accommodation?.split(',').map(String)
            : [],

        capacity: values?.capacity,
        minimumStudent: values?.minimumStudent,
        bookingStartDate: moment(
            values?.bookingStartDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        bookingEndDate: moment(
            values?.bookingEndDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        qrCodeStartDate: moment(
            values?.qrCodeStartDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        qrCodeEndDate: moment(values?.qrCodeEndDate, 'YYYY-MM-DDTHH:mm:ss.SSS')
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        allowStudentCancel: moment(
            values?.allowStudentCancel,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        refundDate: moment(values?.refundDate, 'YYYY-MM-DDTHH:mm:ss.SSS')
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        bookingCancelStartDate: moment(
            values?.bookingCancelStartDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        bookingCancelEndDate: moment(
            values?.bookingCancelEndDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
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
        title: Yup.string().required('Please select title'),
        fee: Yup.string().required('Please enter description'),
    })
    const { schoolData } = useSelector(
        (state: RootState) => state.dashboardData
    )
    const {
        dropdowns: { currency },
    } = useSelector((state: RootState) => state.appData.data)
    const _currency = schoolData?.defaultCurrencyId
    const CurrencyType = (_CurrencyType: number): string => {
        const index = currency.findIndex(
            (curr: any) => curr.id === _CurrencyType
        )
        if (index !== -1) {
            const symbolMap: { [key: number]: string } = {
                1: '€', // Euro
                2: '£', // Pound
                3: '$', // United States Dollar
                4: 'R$', // Brazil
            }
            return symbolMap[_CurrencyType]
        }

        return '--'
    }
    const money = CurrencyType(_currency)
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
    useEffect(() => {
        store.dispatch(getInstructorByUserId())
    }, [])
    const onSubmit = async (valuess: any): Promise<void> => {
        console.log('valuessss', valuess)
        const start = valuess.startDate
            ? moment(valuess.startDate, 'dddd, MMM DD, YYYY').format(
                  'YYYY-MM-DD'
              )
            : InitialValues.startDate
        console.log('start', start, InitialValues.startDate)
        const end = moment(valuess.endDate, 'dddd, MMM DD, YYYY').format(
            'YYYY-MM-DD'
        )
        const bookingstart = moment(
            valuess.bookingStartDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const bookingEnd = moment(
            valuess.bookingEndDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const qrCodeStart = moment(
            valuess.qrCodeStartDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const qrCodeEnd = moment(
            valuess.qrCodeEndDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const studentCancel = moment(
            valuess.allowStudentCancel,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const refundfee = moment(valuess.refundDate, 'YYYY-MM-DDTHH:mm:ss.SSS')
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const bookingCancleStart = moment(
            valuess.bookingCancelStartDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const bookingCancleEnd = moment(
            valuess.bookingCancelEndDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const BannerImage = bannerImage
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
            BannerImage
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
                                                                    placeholder={
                                                                        formik
                                                                            .values
                                                                            .startDate
                                                                    }
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
                                                                    placeholder={
                                                                        formik
                                                                            .values
                                                                            .endDate
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
                                                                    {instructor?.map(
                                                                        (
                                                                            instructors: any
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
                                                name="roomId"
                                                label="Rooms"
                                                padding="8px 10px"
                                                fontFamily={fontFamilyRegular}
                                                fontSize="16px"
                                                max={6}
                                                placeholder="Select Rooms"
                                                value={formik.values.roomId}
                                            >
                                                {room.map((r: any) => (
                                                    <option
                                                        key={r.roomId}
                                                        value={r.roomId}
                                                    >
                                                        {r.roomName}
                                                    </option>
                                                ))}
                                            </FormControl>
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
                                                placeholder={formik.values.fee}
                                                suffix={
                                                    <span
                                                        style={{
                                                            fontSize: '20px',
                                                        }}
                                                    >
                                                        {CurrencyType(
                                                            _currency
                                                        )}
                                                    </span>
                                                }
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="number"
                                                name="fees"
                                                fontFamily={fontFamilyRegular}
                                                label="New Class Fees"
                                                padding="8px 10px"
                                                placeholder="Enter New Class Fees"
                                                suffix={
                                                    <span
                                                        style={{
                                                            fontSize: '20px',
                                                        }}
                                                    >
                                                        {CurrencyType(
                                                            _currency
                                                        )}
                                                    </span>
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
                                                control="dateTime"
                                                type="dateTime"
                                                name="bookingStartDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'startBooking'
                                                )}
                                                padding="8px 10px"
                                                placeholder={
                                                    formik.values
                                                        .bookingStartDate
                                                }
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="dateTime"
                                                type="dateTime"
                                                name="bookingEndDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'endBooking'
                                                )}
                                                padding="8px 10px"
                                                placeholder={
                                                    formik.values.bookingEndDate
                                                }
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="dateTime"
                                                type="dateTime"
                                                name="qrCodeStartDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'qrCodeAttendanceStart'
                                                )}
                                                padding="8px 10px"
                                                placeholder={
                                                    formik.values
                                                        .qrCodeStartDate
                                                }
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="dateTime"
                                                type="dateTime"
                                                name="qrCodeEndDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'qrCodeAttendanceEnd'
                                                )}
                                                padding="8px 10px"
                                                placeholder={
                                                    formik.values.qrCodeEndDate
                                                }
                                            />
                                        </Col>

                                        <Col md="3" className=" fill mt-20 ">
                                            <FormControl
                                                control="dateTime"
                                                type="dateTime"
                                                name="allowStudentCancel"
                                                label={getLabelByKey(
                                                    'allowToStudentCancel'
                                                )}
                                                padding="7px"
                                                fontFamily={fontFamilyRegular}
                                                fontSize="16px"
                                                max={6}
                                                placeholder={
                                                    formik.values
                                                        .allowStudentCancel
                                                }
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="dateTime"
                                                type="dateTime"
                                                name="refundDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'refundFeesDate'
                                                )}
                                                padding="8px 10px"
                                                placeholder={
                                                    formik.values.refundDate
                                                }
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="dateTime"
                                                type="dateTime"
                                                name="bookingCancelStartDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'bookingCancellationStart'
                                                )}
                                                padding="8px 10px"
                                                placeholder={
                                                    formik.values
                                                        .bookingCancelStartDate
                                                }
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="dateTime"
                                                type="dateTime"
                                                name="bookingCancelEndDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'bookingCancellationEnd'
                                                )}
                                                padding="8px 10px"
                                                placeholder={
                                                    formik.values
                                                        .bookingCancelEndDate
                                                }
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
                                                placeholder={
                                                    formik.values
                                                        .cancellationCharges
                                                }
                                                suffix={
                                                    <span
                                                        style={{
                                                            fontSize: '20px',
                                                        }}
                                                    >
                                                        {CurrencyType(
                                                            _currency
                                                        )}
                                                    </span>
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
