import { useState } from 'react'

import { Formik } from 'formik'
import { Form } from 'antd'

import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'

import FormControl from '../../../components/FormControl'
import doller from '../../../assets/images/$.svg'
import ic_success from '../../../assets/images/ic_success.svg'

import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    pureDark,
} from '../../../components/GlobalStyle'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { CreateClassStyled } from '../../Class/CreateClasses/styles'
import { CreateMembershipInitialValues } from '../constant'
import CustomModal from '../../../components/Modal/CustomModal'
import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import { SchoolSuccessfulModals } from '../../../hooks/PopupModalsStyling'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import dollar from '../../../assets/images/$.svg'
import Head from '../../../components/Head/Head'

const UpdateMembership = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('updateMembership')
    const { getLabelByKey: getLegalLabelByKey } = useScreenTranslation('legal')
    const [isLoading, setIsLoading] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)
    const navigate = useNavigate()
    const { MembershipData } = useSelector(
        (state: RootState) => state.MembershipData
    )

    const initialValues: CreateMembershipInitialValues = {
        classIds: 0,
        useCase: '',
        id: 0,
        title: '',
        startDate: '',
        endDate: '',
        visibility: 0,
        subscriptionType: 0,
        membershipFee: '',
        minimumStudent: 0,
        dailySubsFee: '',
        weeklySubsFee: '',
        monthlySubsFee: '',
        annuallySubsFee: '',
        allowStudentCancel: '',
        refundDate: '',
        bookingCancelStartDate: '',
        bookingCancelEndDate: '',
        cancellationCharges: '',
        accommodation: [],
        description: '',
    }

    const onSubmit = async (): Promise<void> => {
        try {
            setIsShowModal(true)
            setTimeout(() => {
                setIsShowModal(false)
                navigate('/membership/list')
            }, 3000)
            setIsLoading(false)
        } catch (error: unknown) {}
    }
    return (
        <>
            <Head title="Membership Update" />

            <CustomModal
                isModalVisible={isShowModal}
                setIsModalVisible={setIsShowModal}
                showCloseBtn={true}
            >
                <SchoolSuccessfulModals>
                    <div className="mainContainer d-flex flex-column align-items-center">
                        <img
                            src={ic_success}
                            alt="Success Icon"
                            width={79}
                            height={79}
                        />
                        <h3 className="mainContainer-heading text-center">
                            Update Successfully!
                        </h3>
                        <p className="mainContainer-subText text-center">
                            Congratulations! on updating your profile! Your
                            changes have been successfully saved, enhancing your
                            experience within the Marital platform.
                        </p>
                    </div>
                </SchoolSuccessfulModals>
            </CustomModal>
            <CreateClassStyled>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {(formik) => {
                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <div className="bg-white form">
                                    <h3>{getLabelByKey('titleScreen')}</h3>
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
                                                                    name="visibility"
                                                                    label={getLabelByKey(
                                                                        'visibility'
                                                                    )}
                                                                    padding="8px 10px"
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    fontSize="16px"
                                                                    max={6}
                                                                    placeholder={getLabelByKey(
                                                                        'visibilityPlacehor'
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
                                                                    name="subscriptionType"
                                                                    label={getLabelByKey(
                                                                        'subscriptionType'
                                                                    )}
                                                                    padding="8px 10px"
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    fontSize="16px"
                                                                    max={6}
                                                                    placeholder={getLabelByKey(
                                                                        'subscriptionTypePlaceholder'
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
                                                                    name="membershipFees"
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    label={getLabelByKey(
                                                                        'membershipFees'
                                                                    )}
                                                                    padding="8px 10px"
                                                                    placeholder={getLabelByKey(
                                                                        'membershipFeesPlaceholder'
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
                                                            <Col
                                                                md="6"
                                                                className="mt-20"
                                                            >
                                                                <FormControl
                                                                    control="input"
                                                                    type="text"
                                                                    name="minimumStudent"
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    label={getLabelByKey(
                                                                        'minimumStudent'
                                                                    )}
                                                                    padding="8px 10px"
                                                                    placeholder={getLabelByKey(
                                                                        'minimumStudentPlaceholder'
                                                                    )}
                                                                />
                                                            </Col>
                                                        </Row>
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
                                                                MembershipData?.MemberShipPicture ||
                                                                ''
                                                            }
                                                            overlayImg={false}
                                                            isEditable={true}
                                                        />
                                                    </Col>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <h3 className="mt-20">
                                            {getLabelByKey('subscriptionPlan')}
                                        </h3>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="dailySubscriptionFees"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'dailySubscriptionFees'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'dailySubscriptionFeesPlaceholder'
                                                )}
                                                suffix={
                                                    <img
                                                        src={doller as string}
                                                        alt=""
                                                        width={13}
                                                        height={27}
                                                    />
                                                }
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="weeklySubscriptionFees"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'weeklySubscriptionFees'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'weeklySubscriptionFeesPlaceholder'
                                                )}
                                                suffix={
                                                    <img
                                                        src={doller as string}
                                                        alt=""
                                                        width={13}
                                                        height={27}
                                                    />
                                                }
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="monthlySubscriptionFees"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'monthlySubscriptionFees'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'monthlySubscriptionFeesPlaceholder'
                                                )}
                                                suffix={
                                                    <img
                                                        src={doller as string}
                                                        alt=""
                                                        width={13}
                                                        height={27}
                                                    />
                                                }
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="annuallySubscriptionFees"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'annuallySubscriptionFees'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'annuallySubscriptionFeesPlaceholder'
                                                )}
                                                suffix={
                                                    <img
                                                        src={doller as string}
                                                        alt=""
                                                        width={13}
                                                        height={27}
                                                    />
                                                }
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="allowToStudentCancel "
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
                                                name="refundFeesDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'refundFeesDate'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'refundFeesDatePlaceholder'
                                                )}
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="bookingCancellationStart "
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'bookingCancellationStart'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'bookingCancellationStartDate'
                                                )}
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="bookingCancellationEnd "
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
                                                        src={doller as string}
                                                        alt=""
                                                        width={13}
                                                        height={27}
                                                    />
                                                }
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
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
                                                fontSize="16px"
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
                                        margin="30px 0px"
                                        fontFamily={`${fontFamilyMedium}`}
                                        width="fit-content"
                                        type="submit"
                                        title={getLabelByKey('primaryButton')}
                                        fontSize="18px"
                                        loading={isLoading}
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

export default UpdateMembership
