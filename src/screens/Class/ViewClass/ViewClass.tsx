import { Col, Row } from 'react-bootstrap'
import { ViewClassStyle } from './styles'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import Head from '../../../components/Head/Head'
import { Card } from 'antd'
import Images from '../../Home/OverlayImages/images'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import FormControl from '../../../components/FormControl'
import { useParams } from 'react-router-dom'
import useClass from '../../../hooks/useClass'
import { useEffect, useState } from 'react'
import useTimetable from '../../../hooks/useTimetable'
import useInstructor from '../../../hooks/useInstructor'
import moment from 'moment'

const ViewClass = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('detailClasses')
    const { getLabelByKey: getLegalLabelByKey } = useScreenTranslation('legal')
    const { ClassData } = useSelector((state: RootState) => state.ClassData)
    const { classId } = useParams()
    const { selectedLanguage } = useSelector(
        (state: RootState) => state?.selectedLanguage
    )
    const { activities } = useSelector(
        (state: RootState) => state.appData.data.statusData
    )
    const { getClassbyid } = useClass()
    const { getTimetableById } = useTimetable()
    const { getInstructorbyid } = useInstructor()
    const [values, setValues] = useState<any>(undefined)
    const [timetable, setTimetable] = useState<any>(undefined)
    const [instructor, setinstructor] = useState<any>(undefined)
    const {
        dropdowns: { schoolAccommodation },
    } = useSelector((state: RootState) => state.appData.data)
    // const showAccommodation = (_accommodate: string[]): string => {
    //     const AccommodateName = _accommodate.reduce(
    //         (a: string, accommodate_id: string) => {
    //             const index = schoolAccommodation.findIndex(
    //                 (facts: any) => facts.id === +accommodate_id
    //             )

    //             if (index === -1) {
    //                 return a
    //             }

    //             const accommodateLabel = (schoolAccommodation[index] as any)[
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
    const convertedAccommodation = schoolAccommodation.map((accommodation) => ({
        ...accommodation,
        id: accommodation.id.toString(),
    }))
    // const showAccommodation = (_accommodate: string[]): string => {
    //     if (!Array.isArray(_accommodate)) {
    //         return getLabelByKey('selectAccommodationOptions')
    //     }
    //     console.log('acc', _accommodate)

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
    //         console.log('acc', AccommodateName)
    //     }
    //     console.log('acc', AccommodateName)

    //     return AccommodateName || getLabelByKey('selectAccommodationOptions')
    // }
    const showAccommodation = (_Facilities: string): string => {
        const activitiesArr = _Facilities.split(',')

        let activitiesName = ''
        activitiesArr.map((accommodation) => {
            const index = convertedAccommodation.findIndex(
                (acc: any) => acc.id === accommodation
            )
            if (index !== -1) {
                activitiesName =
                    activitiesName === ''
                        ? (convertedAccommodation[index] as any)[
                              selectedLanguage
                          ]
                        : `${activitiesName},${
                              (convertedAccommodation[index] as any)[
                                  selectedLanguage
                              ]
                          }`
            }
        })

        if (activitiesName !== '') return activitiesName
        return '--'
    }
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                // Assuming getClass, getInstructorbyid, and getTimetableById are asynchronous functions
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

    const showActivities = (_activities: string): string => {
        const activitiesArr = _activities.split(',')
        let activitiesName = ''
        activitiesArr.map((activity) => {
            const index = activities.findIndex((act) => act.id === activity)
            if (index !== -1) {
                activitiesName =
                    activitiesName === ''
                        ? (activities[index] as any)[selectedLanguage]
                        : `${activitiesName}, ${
                              (activities[index] as any)[selectedLanguage]
                          }`
            }
        })
        if (activitiesName !== '') return activitiesName
        return '--'
    }
    const activitiesToShow = values?.activities || ''
    const accommodationToShow = values?.accommodation || ''

    return (
        <>
            <Head title="Class Information" />
            <ViewClassStyle>
                <h3>{getLabelByKey('mainTitle')}</h3>
                <Card className="mb-5">
                    <Row>
                        <Col md="12">
                            <Row>
                                <Col md="6">
                                    <Row>
                                        <Col md="12">
                                            <div className="list-item">
                                                <div className="list-item-title">
                                                    {getLabelByKey('title')}
                                                </div>
                                                <div className="list-item-value">
                                                    {values?.title}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="list-item">
                                                <div className="list-item-title">
                                                    {getLabelByKey('startDate')}
                                                </div>
                                                <div className="list-item-value">
                                                    {moment(
                                                        moment(
                                                            values?.startDate,
                                                            'YYYY-MM-DD'
                                                        )
                                                    ).format(
                                                        'dddd, MMM DD, YYYY'
                                                    )}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="list-item">
                                                <div className="list-item-title">
                                                    {getLabelByKey('endDate')}
                                                </div>
                                                <div className="list-item-value">
                                                    {moment(
                                                        moment(
                                                            values?.endDate,
                                                            'YYYY-MM-DD'
                                                        )
                                                    ).format(
                                                        'dddd, MMM DD, YYYY'
                                                    )}{' '}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="list-item">
                                                <div className="list-item-title">
                                                    {getLabelByKey(
                                                        'instructors'
                                                    )}
                                                </div>
                                                <div className="list-item-value">
                                                    {instructor
                                                        ? instructor.instructorName
                                                        : '--'}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="list-item">
                                                <div className="list-item-title">
                                                    {/* {getLabelByKey('classFees')} */}
                                                    TimeTable
                                                </div>
                                                <div className="list-item-value">
                                                    {timetable
                                                        ? timetable.results
                                                              .title
                                                        : '--'}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="12">
                                            <div className="list-item">
                                                <div className="list-item-title">
                                                    {getLabelByKey(
                                                        'activities'
                                                    )}
                                                </div>
                                                <div className="list-item-value">
                                                    {showActivities(
                                                        activitiesToShow
                                                    )}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="list-item">
                                                <div className="list-item-title">
                                                    {getLabelByKey('classFees')}
                                                </div>
                                                <div className="list-item-value">
                                                    {values ? values.fee : '--'}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="list-item">
                                                <div className="list-item-title">
                                                    {getLabelByKey(
                                                        'classCapacity'
                                                    )}
                                                </div>
                                                <div className="list-item-value">
                                                    {values
                                                        ? values.capacity
                                                        : '--'}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md="6">
                                    <div className="list-item border-0">
                                        <div className="list-item-title">
                                            {getLabelByKey('bannerImage')}
                                        </div>
                                        <div className="list-item-value">
                                            <Images
                                                // onSaveBanner={null}
                                                isEditable={false}
                                                defaultImage={
                                                    values?.bannerPicture
                                                } // Pass existing banner picture as default image
                                                onSaveBanner={(
                                                    file: File
                                                ) => {}}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('minimumStudent')}
                                </div>
                                <div className="list-item-value">
                                    {values ? values.minimumStudent : '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('startBooking')}
                                </div>
                                <div className="list-item-value">
                                    {moment(
                                        moment(
                                            values?.bookingStartDate,
                                            'YYYY-MM-DD'
                                        )
                                    ).format('dddd, MMM DD, YYYY')}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('endBooking')}
                                </div>
                                <div className="list-item-value">
                                    {moment(
                                        moment(
                                            values?.bookingEndDate,
                                            'YYYY-MM-DD'
                                        )
                                    ).format('dddd, MMM DD, YYYY')}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('qrCodeAttendanceStart')}
                                </div>
                                <div className="list-item-value">
                                    {moment(
                                        moment(
                                            values?.qrCodeStartDate,
                                            'YYYY-MM-DD'
                                        )
                                    ).format('dddd, MMM DD, YYYY')}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('qrCodeAttendanceEnd')}
                                </div>
                                <div className="list-item-value">
                                    {moment(
                                        moment(
                                            values?.qrCodeEndDate,
                                            'YYYY-MM-DD'
                                        )
                                    ).format('dddd, MMM DD, YYYY')}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('allowToStudentCancel')}
                                </div>
                                <div className="list-item-value">
                                    {moment(
                                        moment(
                                            values?.allowStudentCancel,
                                            'YYYY-MM-DD'
                                        )
                                    ).format('dddd, MMM DD, YYYY')}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('refundFeesDate')}
                                </div>
                                <div className="list-item-value">
                                    {moment(
                                        moment(values?.refundDate, 'YYYY-MM-DD')
                                    ).format('dddd, MMM DD, YYYY')}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('bookingCancellationStart')}
                                </div>
                                <div className="list-item-value">
                                    {moment(
                                        moment(
                                            values?.bookingCancelStartDate,
                                            'YYYY-MM-DD'
                                        )
                                    ).format('dddd, MMM DD, YYYY')}
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('bookingCancellationEnd')}
                                </div>
                                <div className="list-item-value">
                                    {moment(
                                        moment(
                                            values?.bookingCancelEndDate,
                                            'YYYY-MM-DD'
                                        )
                                    ).format('dddd, MMM DD, YYYY')}
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {
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
                                </div>
                                <div className="list-item-value">
                                    {' '}
                                    {values ? values.cancellationCharges : '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('activities')}
                                </div>
                                <div className="list-item-value">
                                    {showAccommodation(accommodationToShow)}
                                </div>
                                {/* <div className="list-item-value">
                                    {' showAccommodation'}
                                    {values ? values.accommodation : '--'}
                                </div> */}
                            </div>
                        </Col>

                        <Col md="12">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('descriptionAndFeatures')}
                                </div>
                                <div className="list-item-value">
                                    {' '}
                                    {values ? values.description : '--'}
                                </div>
                            </div>
                        </Col>

                        <label htmlFor="termsAndConditions">
                            <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                                <FormControl
                                    control="checkbox"
                                    type="checkbox"
                                    id="termsAndConditions"
                                    name="termsAndConditions"
                                    checked
                                />
                                <p
                                    className="checkBoxPara"
                                    id="termsAndConditions"
                                >
                                    {getLegalLabelByKey('termsAndConditions')}
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
                                    checked
                                />
                                <p
                                    className="checkBoxPara"
                                    id="AgreementGuidelines"
                                >
                                    {getLegalLabelByKey('AgreementGuidelines')}
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
                                    checked
                                />
                                <p
                                    className="checkBoxPara"
                                    id="liabilityWaivers"
                                >
                                    {getLegalLabelByKey('liabilityWaivers')}
                                </p>
                            </form>
                        </label>
                    </Row>
                </Card>
            </ViewClassStyle>
        </>
    )
}

export default ViewClass
