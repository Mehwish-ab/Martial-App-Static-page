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
// import EnnvisionModal from '../../../components/CustomModals/EnnvisionModal'
// import CustomModal from '../../../components/Modal/CustomModal'
import { useNavigate } from 'react-router-dom'
import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import { RootState } from '../../../redux/store'
import Head from '../../../components/Head/Head'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import CheckboxesSelect from '../../../components/CustomCheckbox/CheckboxesSelect'

const CreateClass = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('updateClasses')
    const { getLabelByKey: getLegalLabelByKey } = useScreenTranslation('legal')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isShowModal, setIsShowModal] = useState(false)
    const navigate = useNavigate()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, setIsLoading] = useState(false)
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const { ClassData } = useSelector((state: RootState) => state.ClassData)

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
        profilePicture: '',
        useCase: '',
        id: 0,
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

    const onSubmit = async (): Promise<void> => {
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
        <>
            <Head title="Update Class" />
            <CreateClassStyled>
                {/* <CustomModal
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
            </CustomModal> */}
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                                                                    control="input"
                                                                    type="text"
                                                                    name="StartDate"
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
                                                                md="6"
                                                                className="mt-20"
                                                            >
                                                                <FormControl
                                                                    control="select"
                                                                    type="text"
                                                                    name="instructors"
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
                                                                />
                                                            </Col>
                                                            <Col
                                                                md="6"
                                                                className="mt-20"
                                                            >
                                                                <FormControl
                                                                    control="input"
                                                                    type="text"
                                                                    name="classFees"
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    label={getLabelByKey(
                                                                        'classFees'
                                                                    )}
                                                                    padding="8px 10px"
                                                                    placeholder={getLabelByKey(
                                                                        'classFeesPlaceholder'
                                                                    )}
                                                                    suffix={
                                                                        <img
                                                                            src={
                                                                                dollar
                                                                            }
                                                                            alt=""
                                                                            width={
                                                                                13
                                                                            }
                                                                            height={
                                                                                27
                                                                            }
                                                                            //onClick={(type = "date")}
                                                                        />
                                                                    }
                                                                />
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
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="classCapacity"
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
                                                type="text"
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
                                                control="input"
                                                type="text"
                                                name="startBooking"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'startBooking'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'startBookingPlaceholder'
                                                )}
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
                                                name="endBooking"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'endBooking'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'endBookingPlaceholder'
                                                )}
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
                                                name="qrCodeAttendanceStart"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'qrCodeAttendanceStart'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'qrCodeAttendanceStartPlaceholder'
                                                )}
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
                                                name="qrCodeAttendanceEnd"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'qrCodeAttendanceEnd'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'qrCodeAttendanceEndPlaceholder'
                                                )}
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
                                                name="allowToStudentCancel"
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
                                                control="input"
                                                type="text"
                                                name="refundFeesDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'refundFeesDate'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'refundFeesDatePlacholder'
                                                )}
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
                                                name="bookingCancellationStart"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'bookingCancellationStart'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'bookingCancellationStartPlaceholder'
                                                )}
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
                                                name="bookingCancellationEnd"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'bookingCancellationEnd'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'bookingCancellationEndPlaceholder'
                                                )}
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
                                                name="cancellationCharge"
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

                                        <Col md="3" className=" fill mt-20 ">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="accommodate"
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
                                                name="descriptionAndFeatures"
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
                                        loading={false}
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
