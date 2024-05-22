import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Form } from 'antd'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import FormControl from '../../../components/FormControl'
import * as yup from 'yup'
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

import { getInstructorByUserId } from '../../../redux/features/instructor/instructorSlice'
import useRoom from '../../../hooks/useRoom'

const UpdateClass = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('updateClasses')
    const { getLabelByKey: getLegalLabelByKey } = useScreenTranslation('legal')
    const { classId } = useParams()
    const { loginData } = useSelector((state: RootState) => state)

    const { getClassbyid, loading, UpdateModal, handleUpdate, classData } =
        useClass()
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const { getallRoombyUC, room } = useRoom()

    //const [values, setValues] = useState<any>()
    const [roomId, setRoom] = useState<any>([])
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
            store.dispatch(getInstructorByUserId())
            try {
                if (loginData.data?.schoolId) {
                    await getallRoombyUC(
                        Number(loginData.data?.schoolId),
                        'SCHOOL'
                    )
                }
                // eslint-disable-next-line @typescript-eslint/no-shadow
            } catch (error) {
                /// setError('Error fetching data')
            } finally {
                //  setLoading(false)
            }
        }

        fetchData()
    }, [loginData.data?.schoolId])

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                await getClassbyid(Number(classId))
                console.log('Api data response', classData)

                if (classData) {
                    setinstructor(classData.instructorsResponseDTOList)
                    setRoom(classData.roomResponseDTOList)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [classId])

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
        title: classData?.title,
        startDate: moment(classData?.startDate, 'YYYY-MM-DD').format(
            'dddd, MMM DD, YYYY'
        ),
        newFee: classData?.newFee,
        endDate: moment(classData?.endDate, 'YYYY-MM-DD').format(
            'dddd, MMM DD, YYYY'
        ),
        instructorId: classData?.instructorIds,
        isKid: classData?.isKid,
        roomId: classData?.roomIds,
        fee: classData?.fee,
        activities: classData
            ? classData.activities?.split(',').map(String)
            : [],
        accommodation: classData
            ? classData.accommodation?.split(',').map(String)
            : [],

        capacity: classData?.capacity,
        minimumStudent: classData?.minimumStudent,
        bookingStartDate: moment(
            classData?.bookingStartDate,
            'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
        )
            .utc() // Convert to UTC timezone
            .format('DD-MM-YY / h:mm A'),
        bookingEndDate: moment(
            classData?.bookingEndDate,
            'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
        )
            .utc() // Convert to UTC timezone
            .format('DD-MM-YY / h:mm A'),
        qrCodeStartDate: moment(
            classData?.qrCodeStartDate,
            'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
        )
            .utc() // Convert to UTC timezone
            .format('DD-MM-YY / h:mm A'),
        qrCodeEndDate: moment(
            classData?.qrCodeEndDate,
            'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
        )
            .utc() // Convert to UTC timezone
            .format('DD-MM-YY / h:mm A'),
        allowStudentCancel: moment(
            classData?.allowStudentCancel,
            'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
        )
            .utc() // Convert to UTC timezone
            .format('DD-MM-YY / h:mm A'),
        refundDate: moment(classData?.refundDate, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]')
            .utc() // Convert to UTC timezone
            .format('DD-MM-YY / h:mm A'),
        bookingCancelStartDate: moment(
            classData?.bookingCancelStartDate,
            'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
        )
            .utc() // Convert to UTC timezone
            .format('DD-MM-YY / h:mm A'),
        bookingCancelEndDate: moment(
            classData?.bookingCancelEndDate,
            'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
        )
            .utc() // Convert to UTC timezone
            .format('DD-MM-YY / h:mm A'),
        cancellationCharges: classData?.cancellationCharges,
        description: classData?.description,
        Agreement: '',
        termCondition: '',
        Liabilitywaivers: '',
        bannerPicture: classData?.bannerPicture,
        useCase: 'SCHOOL',
        id: Number(loginData.data?.schoolId),
        timeTableId: classData?.timeTableId,
    }
    const Attendent = [
        { label: 'Kids', value: true },
        { label: 'Adults', value: false },
    ]

    const validationHandler = (d: any): any => {
        const originalDateFormat = 'dddd, MMM D, YYYY'

        // Define the desired date format
        const desiredDateFormat = 'DD-MM-YY / h:mm A'

        // Parse the original date string using moment with the original format
        const date = moment(d, originalDateFormat)

        // Convert the date to the desired format
        return date.format(desiredDateFormat)
    }
    const today = moment()
    const validationSchema = yup.object({
        startDate: yup.string().required('Start date is required.'),
        // .test(
        //     'is-not-in-past',
        //     'start date cannot be in the past.',
        //     function (value) {
        //         // Compare with today's date
        //         return moment(value, 'DD-MM-YY / h:mm A').isSameOrAfter(
        //             today
        //         )
        //     }
        // ),
        endDate: yup
            .string()
            .required('End date is required.')
            .test(
                'is-greater-than-start-date',
                'End date must be greater than or equal to start date.',
                function (value) {
                    const { startDate } = this.parent // Accessing parent context

                    if (!startDate || !value) {
                        return true // Skip validation if either date is missing
                    }

                    // Compare dates using moment
                    return (
                        moment(value).isAfter(startDate) ||
                        moment(value).isSame(startDate)
                    )
                }
            ),
        // .test(
        //     'is-not-in-past',
        //     'End date cannot be in the past.',
        //     function (value) {
        //         // Compare with today's date
        //         return moment(value, 'DD-MM-YY / h:mm A').isSameOrAfter(
        //             today
        //         )
        //     }
        // ),
        qrCodeStartDate: yup
            .string()
            .required('QR code start date is required.')
            .test(
                'is-greater-than-bookingStartDate',
                'QR code start date cannot be earlier than the Booking start date.',
                function (value) {
                    const { bookingStartDate } = this.parent
                    return moment(value, 'DD-MM-YY / h:mm A').isSameOrAfter(
                        moment(bookingStartDate, 'DD-MM-YY / h:mm A')
                    )
                }
            ),
        qrCodeEndDate: yup
            .string()
            .required('QR code end date is required.')
            .test(
                'is-less-than-end-date',
                'QR code end date cannot be later than the End date.',
                function (value) {
                    const { endDate } = this.parent

                    return moment(value, 'DD-MM-YY / h:mm A').isSameOrBefore(
                        moment(validationHandler(endDate), 'DD-MM-YY / h:mm A')
                    )
                }
            ),
        bookingStartDate: yup
            .string()
            .required('Booking start date is required.')
            .test(
                'is-less-than-end-date',
                'Booking start date cannot be greater than the End date.',
                function (value) {
                    const { endDate } = this.parent
                    return (
                        moment(value, 'DD-MM-YY / h:mm A').isBefore(
                            moment(
                                validationHandler(endDate),
                                'DD-MM-YY / h:mm A'
                            )
                        ) ||
                        moment(value, 'DD-MM-YY / h:mm A').isSame(
                            moment(
                                validationHandler(endDate),
                                'DD-MM-YY / h:mm A'
                            )
                        )
                    )
                }
            ),
        bookingEndDate: yup
            .string()
            .required('Booking end date is required.')
            .test(
                'is-less-than-end-date',
                'Booking end date cannot be greater than the End date.',
                function (value) {
                    const { endDate } = this.parent
                    return moment(value, 'DD-MM-YY / h:mm A').isSameOrBefore(
                        moment(validationHandler(endDate), 'DD-MM-YY / h:mm A')
                    )
                }
            ),
        bookingCancelStartDate: yup
            .string()
            .required('Booking cancel start date is required.')
            .test(
                'is-greater-than-bookingStartDate',
                'Booking cancel start date must be greater than the Booking start date.',
                function (value) {
                    const { bookingStartDate } = this.parent
                    return moment(value, 'DD-MM-YY / h:mm A').isSameOrAfter(
                        moment(bookingStartDate, 'DD-MM-YY / h:mm A')
                    )
                }
            )
            .test(
                'is-less-than-end-date',
                'Booking cancel start date must be less than the End date.',
                function (value) {
                    const { endDate } = this.parent
                    return moment(value, 'DD-MM-YY / h:mm A').isSameOrBefore(
                        moment(validationHandler(endDate), 'DD-MM-YY / h:mm A')
                    )
                }
            ),
        bookingCancelEndDate: yup
            .string()
            .required('Booking cancel end date is required.')
            .test(
                'is-greater-than-cancelStart',
                'Booking cancel end date must be greater than the cancel start date.',
                function (value) {
                    const { bookingCancelStartDate } = this.parent

                    return moment(value, 'DD-MM-YY / h:mm A').isAfter(
                        moment(bookingCancelStartDate, 'DD-MM-YY / h:mm A')
                    )
                }
            )
            .test(
                'is-greater-than-bookingStartDate',
                'Booking cancel end date must be greater than the Booking start date.',
                function (value) {
                    const { bookingStartDate } = this.parent
                    return moment(value, 'DD-MM-YY / h:mm A').isSameOrAfter(
                        moment(bookingStartDate, 'DD-MM-YY / h:mm A')
                    )
                }
            )
            .test(
                'is-less-than-end-date',
                'Booking cancel end date must be less than the End date.',
                function (value) {
                    const { endDate } = this.parent
                    return moment(value, 'DD-MM-YY / h:mm A').isSameOrBefore(
                        moment(validationHandler(endDate), 'DD-MM-YY / h:mm A')
                    )
                }
            ),
        refundDate: yup
            .string()
            .required('Refund date is required.')
            .test(
                'is-after-bookingStartDate',
                'Refund date must be after the Booking start date.',
                function (value) {
                    const { bookingStartDate } = this.parent
                    return moment(value, 'DD-MM-YY / h:mm A').isAfter(
                        moment(bookingStartDate, 'DD-MM-YY / h:mm A')
                    )
                }
            ),
        allowStudentCancel: yup
            .string()
            .required('Refund date is required.')
            .test(
                'is-after-startDate',
                'Allow StudentCancel must be greater then the  start date.',
                function (value) {
                    const { startDate } = this.parent
                    return moment(value, 'DD-MM-YY / h:mm A').isAfter(
                        moment(
                            validationHandler(startDate),
                            'DD-MM-YY / h:mm A'
                        )
                    )
                }
            )
            .test(
                'is-before-endDate',
                'Allow StudentCancel must be less then the  end date.',
                function (value) {
                    const { endDate } = this.parent
                    return moment(value, 'DD-MM-YY / h:mm A').isBefore(
                        moment(validationHandler(endDate), 'DD-MM-YY / h:mm A')
                    )
                }
            ),

        title: yup.string().required('title is required.'),
        // instructorId: yup.array().required('Instructor is required.'),
        isKid: yup.boolean().required('Attendent is required.'),
        // roomId: yup.array().required('Room is required.'),
        fee: yup.string().required('Fee is required.'),
        activities: yup.array().required('Activity is required.'),
        capacity: yup.string().required('Capacity is required.'),
        minimumStudent: yup.string().required('Student is required.'),
        cancellationCharges: yup
            .string()
            .required('cancellationCharges are required.'),
        accommodation: yup.array().required('Accommodation is required.'),
        description: yup.string().required(' description is required.'),
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
            'DD-MM-YY / h:mm A'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const bookingEnd = moment(valuess.bookingEndDate, 'DD-MM-YY / h:mm A')
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const qrCodeStart = moment(valuess.qrCodeStartDate, 'DD-MM-YY / h:mm A')
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const qrCodeEnd = moment(valuess.qrCodeEndDate, 'DD-MM-YY / h:mm A')
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const studentCancel = moment(
            valuess.allowStudentCancel,
            'DD-MM-YY / h:mm A'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const refundfee = moment(valuess.refundDate, 'DD-MM-YY / h:mm A')
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const bookingCancleStart = moment(
            valuess.bookingCancelStartDate,
            'DD-MM-YY / h:mm A'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const bookingCancleEnd = moment(
            valuess.bookingCancelEndDate,
            'DD-MM-YY / h:mm A'
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
                    validationSchema={validationSchema}
                    enableReinitialize={true}
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
                                                            value={
                                                                formik.values
                                                                    .title
                                                            }
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
                                                                    selectionMode="multiple"
                                                                    placeholder={classData?.instructorsResponseDTOList?.map(
                                                                        (
                                                                            instructors: any
                                                                        ) =>
                                                                            instructors.instructorName
                                                                    )}

                                                                    // Set value to the selected instructor ID
                                                                >
                                                                    {instructorData?.data.map(
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
                                                selectionMode="multiple"
                                                placeholder={classData?.roomResponseDTOList?.map(
                                                    (r: any) => r.roomName
                                                )}
                                                //value={formik.values.roomId}
                                            >
                                                {room?.data.map((r: any) => (
                                                    <option
                                                        key={r.roomId}
                                                        value={r.roomId}
                                                    >
                                                        {r.name}
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
                                                value={formik.values.capacity}
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
                                        <Col md="3">
                                            <Col className="mt-20">
                                                <FormControl
                                                    control="select"
                                                    type="text"
                                                    name="isKid"
                                                    label={getLabelByKey(
                                                        'attendant'
                                                    )}
                                                    fontSize="16px"
                                                    max={6}
                                                    value={formik.values.isKid}
                                                    placeholder={
                                                        formik.values.isKid
                                                    }
                                                    className={
                                                        formik.errors.isKid &&
                                                        formik.touched.isKid
                                                            ? 'is-invalid'
                                                            : 'customInput'
                                                    }
                                                    options={Attendent}
                                                />
                                            </Col>
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
