import { Col, Row } from 'react-bootstrap'
import { ViewClassStyle } from '../../Class/ViewClass/styles'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import Head from '../../../components/Head/Head'
import { Card } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import FormControl from '../../../components/FormControl'
import { useEffect, useState } from 'react'
import useMembership from '../../../hooks/useMembership'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import Images from '../../Home/OverlayImages/images'

const ViewMembership = (): JSX.Element => {
    const { memberShipPlanId } = useParams()
    const { getLabelByKey } = useScreenTranslation('detailMembership')
    const { getLabelByKey: getLegalLabelByKey } = useScreenTranslation('legal')
    const { getMembershipbyid, memberShipValue } = useMembership()
    const { visibility, subscriptionType } = useSelector(
        (state: RootState) => state.appData.data.dropdowns
    )
    const { selectedLanguage } = useSelector(
        (state: RootState) => state?.selectedLanguage
    )
    const showVisibility = (_Visibility: number): string => {
        const index = visibility.findIndex((business: any) => {
            return business.id === _Visibility
        })
        if (index !== -1) {
            return (visibility[index] as any)[selectedLanguage]
        }

        return '--'
    }
    const showSubscription = (_Subscription: number): string => {
        const index = subscriptionType.findIndex((business: any) => {
            return business.id === _Subscription
        })
        if (index !== -1) {
            return (subscriptionType[index] as any)[selectedLanguage]
        }

        return '--'
    }
    const {
        dropdowns: { schoolAccommodation },
    } = useSelector((state: RootState) => state.appData.data)
    const convertedAccommodation = schoolAccommodation.map((accommodation) => ({
        ...accommodation,
        id: accommodation.id.toString(),
    }))
    const showAccommodation = (_Accommodation: string): string => {
        const activitiesArr = _Accommodation.split(',')

        let AccommodationName = ''
        activitiesArr.map((accommodation) => {
            const index = convertedAccommodation.findIndex(
                (acc: any) => acc.id === accommodation
            )
            if (index !== -1) {
                AccommodationName =
                    AccommodationName === ''
                        ? (convertedAccommodation[index] as any)[
                              selectedLanguage
                          ]
                        : `${AccommodationName},${
                              (convertedAccommodation[index] as any)[
                                  selectedLanguage
                              ]
                          }`
            }
        })

        if (AccommodationName !== '') return AccommodationName
        return '--'
    }

    const Visibility = memberShipValue?.visibility || ''
    const subscription = memberShipValue?.subscriptionType || ''
    const accommodationToShow = memberShipValue?.accommodation || ''

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            if (memberShipPlanId !== undefined) {
                await getMembershipbyid(Number(memberShipPlanId))
                //  setMemberShipValue(data)
            }
        }

        fetchData()
    }, [memberShipPlanId])
    console.log('memship values', memberShipValue)

    return (
        <>
            <Head title="Membership Information" />
            <ViewClassStyle>
                <h3 className="mt-0">{getLabelByKey('titleScreen')}</h3>
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
                                                    {memberShipValue?.title ||
                                                        '--'}
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
                                                            memberShipValue?.startDate,
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
                                                            memberShipValue?.endDate,
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
                                                    {getLabelByKey(
                                                        'visibility'
                                                    )}
                                                </div>
                                                <div className="list-item-value">
                                                    {showVisibility(
                                                        Visibility as number
                                                    )}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="list-item">
                                                <div className="list-item-title">
                                                    {getLabelByKey(
                                                        'subscriptionType'
                                                    )}
                                                </div>
                                                <div className="list-item-value">
                                                    {showSubscription(
                                                        subscription as number
                                                    )}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="list-item">
                                                <div className="list-item-title">
                                                    {getLabelByKey(
                                                        'membershipFees'
                                                    )}
                                                </div>
                                                <div className="list-item-value">
                                                    {memberShipValue?.membershipFee ||
                                                        '--'}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="list-item">
                                                <div className="list-item-title">
                                                    {getLabelByKey(
                                                        'minimumStudent'
                                                    )}
                                                </div>
                                                <div className="list-item-value">
                                                    {memberShipValue?.minimumStudent ||
                                                        '--'}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <h3>
                                                {getLabelByKey(
                                                    'subscriptionPlan'
                                                )}
                                            </h3>
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
                                                isEditable={false}
                                                defaultImage={
                                                    memberShipValue?.bannerPicture
                                                }
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
                                    {getLabelByKey('dailySubscriptionFees')}
                                </div>
                                <div className="list-item-value">
                                    {memberShipValue?.dailySubsFee || '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('weeklySubscriptionFees')}
                                </div>
                                <div className="list-item-value">
                                    {memberShipValue?.weeklySubsFee || '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('monthlySubscriptionFees')}
                                </div>
                                <div className="list-item-value">
                                    {memberShipValue?.monthlySubsFee || '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('annuallySubscriptionFees')}
                                </div>
                                <div className="list-item-value">
                                    {memberShipValue?.annuallySubsFee || '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('allowToStudentCancel')}
                                </div>
                                <div className="list-item-value">
                                    {moment(
                                        moment(
                                            memberShipValue?.allowStudentCancel,
                                            'YYYY-MM-DD'
                                        )
                                    ).format('dddd, MMM DD, YYYY')}
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('refundFeesDate')}
                                </div>
                                <div className="list-item-value">
                                    {moment(
                                        moment(
                                            memberShipValue?.refundDate,
                                            'YYYY-MM-DD'
                                        )
                                    ).format('dddd, MMM DD, YYYY')}
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('bookingCancellationStart')}
                                </div>
                                <div className="list-item-value">
                                    {moment(
                                        moment(
                                            memberShipValue?.bookingCancelStartDate,
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
                                            memberShipValue?.bookingCancelEndDate,
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
                                    {memberShipValue?.cancellationCharges ||
                                        '--'}
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
                                    {/* {memberShipValue?.accommodation || '--'} */}
                                    {showAccommodation(accommodationToShow)}
                                </div>
                            </div>
                        </Col>

                        <Col md="12">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('descriptionAndFeatures')}
                                </div>
                                <div className="list-item-value">
                                    {memberShipValue?.description || '--'}
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

export default ViewMembership
