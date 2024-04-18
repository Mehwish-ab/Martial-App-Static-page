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
    pureDark,
} from '../../../components/GlobalStyle'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { CreateClassStyled } from './styles'
import { CreateClassInitialValues } from '../constant'
import dollar from '../../../assets/images/$.svg'
import Images from '../../Home/OverlayImages/images'
import store, { RootState } from '../../../redux/store'
import useClass from '../../../hooks/useClass'
import { useEffect, useState } from 'react'
import CheckboxesSelect from '../../../components/CustomCheckbox/CheckboxesSelect'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import Head from '../../../components/Head/Head'
import { getInstructorByUserId } from '../../../redux/features/instructor/instructorSlice'
import moment from 'moment'
import {
    RoomDataType,
    getRoomDataByUseCase,
} from '../../../redux/features/Room/RoomSlice'
import useRoom from '../../../hooks/useRoom'

const CreateClass = (): JSX.Element => {
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const {
        dropdowns: { schoolAccommodation, currency },
    } = useSelector((state: RootState) => state.appData.data)
    const convertedAccommodation = schoolAccommodation.map((accommodation) => ({
        ...accommodation,
        id: accommodation.id.toString(),
    }))

    //console.log({ activities })
    const { getLabelByKey } = useScreenTranslation('createClasses')
    const { getLabelByKey: getLegalLabelByKey } = useScreenTranslation('legal')
    const { instructorData } = useSelector(
        (state: RootState) => state.instructorData
    )
    const { schoolData } = useSelector(
        (state: RootState) => state.dashboardData
    )
    const { loginData } = useSelector((state: RootState) => state)
    const { getallRoombyUC, room } = useRoom()
    // eslint-disable-next-line
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
    }, [])

    const { handleCreateSubmit, loading, Createmodal } = useClass()

    const _currency = schoolData?.defaultCurrencyId
    const Attendent = [
        { label: 'Kids', value: true },
        { label: 'Adults', value: false },
    ]

    const initialValues: CreateClassInitialValues = {
        title: '',
        startDate: '',
        endDate: '',
        instructorId: [],
        isKid: false,
        roomId: [],
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
        accommodation: [],
        description: '',
        Agreement: '',
        termCondition: '',
        Liabilitywaivers: '',
        bannerPicture: '',
        useCase: '',
        id: 0,
        timeTableId: 0,
    }

    const [bannerImage, setBannerImage] = useState<File | null>(null)

    const handleSaveBanner = (file: File): void => {
        setBannerImage(file)
    }

    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
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

    const submit = async (values: any): Promise<void> => {
        const schoolid = loginData.data?.schoolId
        // Format other dates similarly

        // Format other dates similarly

        const start = moment(values.startDate, 'dddd, MMM DD, YYYY').format(
            'YYYY-MM-DD'
        )
        const end = moment(values.endDate, 'dddd, MMM DD, YYYY').format(
            'YYYY-MM-DD'
        )
        const bookingstart = moment(
            values.bookingStartDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const bookingEnd = moment(
            values.bookingEndDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const qrCodeStart = moment(
            values.qrCodeStartDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        )
            .utc() // Convert to UTC timezone
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')

        const qrCodeEnd = moment(
            values.qrCodeEndDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        ).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const studentCancel = moment(
            values.allowStudentCancel,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        ).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const refundfee = moment(
            values.refundDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        ).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const bookingCancleStart = moment(
            values.bookingCancelStartDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        ).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const bookingCancleEnd = moment(
            values.bookingCancelEndDate,
            'YYYY-MM-DDTHH:mm:ss.SSS'
        ).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        console.log('data', 'values', { ...values }, values)
        const formattedValues = {
            ...values,
            fee: money + values.fee,
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
            cancellationCharges: money + values.cancellationCharges,
        }
        await handleCreateSubmit(formattedValues, bannerImage)
    }

    const showAccommodation = (_accommodate: string[]): string => {
        const AccommodateName = _accommodate.reduce(
            (a: string, accommodate_id: string) => {
                const index = schoolAccommodation.findIndex(
                    (facts: any) => facts.id === +accommodate_id
                )

                if (index === -1) {
                    return a
                }

                const accommodateLabel = (schoolAccommodation[index] as any)[
                    selectedLanguage
                ]
                return `${a} ${accommodateLabel},`
            },
            ''
        )

        if (AccommodateName.length > 35) {
            return `${AccommodateName.slice(0, 35)}...`
        }

        return AccommodateName || getLabelByKey('selectAccommodationOptions')
    }
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
    console.log('data', activities)
    return (
        <>
            <Head title="Create Class" />
            {Createmodal().modalComponent}
            <CreateClassStyled>
                <Formik initialValues={initialValues} onSubmit={submit}>
                    {(formik) => {
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
                                                                    showTime
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
                                                                    showTime
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
                                                                >
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
                                                                md="12"
                                                                className=""
                                                            >
                                                                <CheckboxesSelect
                                                                    name="activities"
                                                                    label={getLabelByKey(
                                                                        'activities'
                                                                    )}
                                                                    list={
                                                                        activities
                                                                    }
                                                                    showErrorMsgInList={
                                                                        false
                                                                    }
                                                                    placeholder={showActivities(
                                                                        formik
                                                                            .values
                                                                            .activities
                                                                    )}
                                                                />
                                                            </Col>
                                                        </Row>
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
                                                placeholder="Select Room"
                                            >
                                                {room?.data.map((Room: any) => (
                                                    <option
                                                        key={Room.roomId}
                                                        value={Room.roomId}
                                                    >
                                                        {Room.roomNumber}
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
                                                placeholder={getLabelByKey(
                                                    'classFeesPlaceholder'
                                                )}
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
                                                showTime
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
                                                control="dateTime"
                                                type="dateTime"
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
                                                control="dateTime"
                                                type="dateTime"
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
                                                control="dateTime"
                                                type="dateTime"
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
                                                control="dateTime"
                                                type="dateTime"
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
                                                control="dateTime"
                                                type="dateTime"
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
                                                control="dateTime"
                                                type="dateTime"
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
                                                control="dateTime"
                                                type="dateTime"
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
                                                    //value={formik.values.isActive}
                                                    placeholder="Select Status"
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
                                        <Col md="3">
                                            <CheckboxesSelect
                                                name="accommodation"
                                                label={getLabelByKey(
                                                    'accommodate'
                                                )}
                                                list={convertedAccommodation} // Use the converted array here                                                showErrorMsgInList={false}
                                                placeholder={showAccommodation(
                                                    formik.values.accommodation
                                                )}
                                                showErrorMsgInList={false} // value={
                                                //     formik.values.accommodation
                                                // }
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
