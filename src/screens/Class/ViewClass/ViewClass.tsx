import { Col, Row } from 'react-bootstrap'
import { ViewClassStyle } from './styles'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import Head from '../../../components/Head/Head'
import { Card } from 'antd'
import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import FormControl from '../../../components/FormControl'
import { useParams } from 'react-router-dom'
import useClass from '../../../hooks/useClass'
import { useEffect, useState } from 'react'
import useTimetable from '../../../hooks/useTimetable'
import useInstructor from '../../../hooks/useInstructor'

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
    const instructorId = values?.instructorId
    const timetableId = values?.timeTableId

    const getClass = async (): Promise<void> => {
        const data = await getClassbyid(Number(classId))
        setValues(data)
    }
    const gettinstructor = async (): Promise<void> => {
        const data = await getInstructorbyid(instructorId)
        setinstructor(data)
    }
    const gettimetable = async (): Promise<void> => {
        const data = await getTimetableById(timetableId)
        setTimetable(data)
    }
    useEffect(() => {
        getClass()
    }, [])

    useEffect(() => {
        gettimetable()
    }, [2000])

    useEffect(() => {
        gettinstructor()
    }, [2000])
    console.log('Class details', instructor)
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
                                                    {values?.startDate}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="list-item">
                                                <div className="list-item-title">
                                                    {getLabelByKey('endDate')}
                                                </div>
                                                <div className="list-item-value">
                                                    {values?.endDate}
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
                                            <OverlayImages
                                                backgroundImg={
                                                    values?.bannerPicture || ''
                                                }
                                                overlayImg={
                                                    values?.bannerPicture || ''
                                                }
                                                isEditable={true}
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
                                    {' '}
                                    {values ? values.bookingStartDate : '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('endBooking')}
                                </div>
                                <div className="list-item-value">
                                    {' '}
                                    {values ? values.bookingEndDate : '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('qrCodeAttendanceStart')}
                                </div>
                                <div className="list-item-value">
                                    {' '}
                                    {values ? values.qrCodeStartDate : '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('qrCodeAttendanceEnd')}
                                </div>
                                <div className="list-item-value">
                                    {' '}
                                    {values ? values.qrCodeEndDate : '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('allowToStudentCancel')}
                                </div>
                                <div className="list-item-value">
                                    {values ? values.allowStudentCancel : '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('refundFeesDate')}
                                </div>
                                <div className="list-item-value">
                                    {' '}
                                    {values ? values.refundDate : '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('bookingCancellationStart')}
                                </div>
                                <div className="list-item-value">
                                    {' '}
                                    {values
                                        ? values.bookingCancelStartDate
                                        : '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('bookingCancellationEnd')}
                                </div>
                                <div className="list-item-value">
                                    {' '}
                                    {values
                                        ? values.bookingCancelEndDate
                                        : '--'}
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
                                    <>
                                        {getLabelByKey('accommodate')}{' '}
                                        <span>
                                            {getLabelByKey('ifSchoolCancel')}
                                        </span>
                                    </>
                                </div>
                                <div className="list-item-value">
                                    {' '}
                                    {values ? values.accommodation : '--'}
                                </div>
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
