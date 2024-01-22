import { Col, Row } from 'react-bootstrap'
import { ViewClassStyle } from '../../Class/ViewClass/styles'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import Head from '../../../components/Head/Head'
import { Card } from 'antd'
import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import FormControl from '../../../components/FormControl'

const ViewMembership = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('detailMembership')
    const { getLabelByKey: getLegalLabelByKey } = useScreenTranslation('legal')
    const { ClassData } = useSelector((state: RootState) => state.ClassData)

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
                                                    --
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="list-item">
                                                <div className="list-item-title">
                                                    {getLabelByKey('startDate')}
                                                </div>
                                                <div className="list-item-value">
                                                    --
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="list-item">
                                                <div className="list-item-title">
                                                    {getLabelByKey('endDate')}
                                                </div>
                                                <div className="list-item-value">
                                                    --
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
                                                    --
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
                                                    --
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
                                                    --
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
                                                    --
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
                                <div className="list-item-value">--</div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('weeklySubscriptionFees')}
                                </div>
                                <div className="list-item-value">--</div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('monthlySubscriptionFees')}
                                </div>
                                <div className="list-item-value">--</div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('annuallySubscriptionFees')}
                                </div>
                                <div className="list-item-value">--</div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('allowToStudentCancel')}
                                </div>
                                <div className="list-item-value">--</div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('refundFeesDate')}
                                </div>
                                <div className="list-item-value">--</div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('bookingCancellationStart')}
                                </div>
                                <div className="list-item-value">--</div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('bookingCancellationEnd')}
                                </div>
                                <div className="list-item-value">--</div>
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
                                <div className="list-item-value">--</div>
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
                                <div className="list-item-value">--</div>
                            </div>
                        </Col>

                        <Col md="12">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('descriptionAndFeatures')}
                                </div>
                                <div className="list-item-value">--</div>
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

export default ViewMembership
