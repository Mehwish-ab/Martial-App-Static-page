import { Col, Row } from 'react-bootstrap'
import FormControl from '../../FormControl'
import { fontFamilyMedium } from '../../GlobalStyle'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import PaymentMethod from './PaymentMethod'

const PaymentInformation = ({ formik, showPaymentMethods }: any) => {
    const { getLabelByKey } = useScreenTranslation('paymentInformation')
    return (
        <>
            <div className="mt-20">
                {showPaymentMethods && <PaymentMethod formik={formik} />}
                {(!formik.values.schoolStripeMethod ||
                    !formik.values.schoolGclMethod) && (
                    <h3>{getLabelByKey('paymentInformation')}</h3>
                )}
                {!formik.values.schoolStripeMethod && (
                    <>
                        <div className="payment_card mb-5">
                            <h4>{getLabelByKey('stripeKeys')}</h4>
                            <div className="mt-20">
                                <Row>
                                    <Col md="6">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="stripePublishableKey"
                                            label={getLabelByKey(
                                                'publishableKey'
                                            )}
                                            padding="10px"
                                            fontFamily={fontFamilyMedium}
                                            max={6}
                                            border="none"
                                            placeholder={getLabelByKey(
                                                'stripeEnterPublishableKey'
                                            )}
                                            className={
                                                formik.errors
                                                    ?.stripePublishableKey &&
                                                formik.touched
                                                    ?.stripePublishableKey
                                                    ? 'is-invalid'
                                                    : 'customInput'
                                            }
                                        />
                                    </Col>
                                    <Col md="6">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="stripeSecretKey"
                                            label={getLabelByKey('secretKey')}
                                            padding="10px"
                                            fontFamily={fontFamilyMedium}
                                            max={6}
                                            border="none"
                                            placeholder={getLabelByKey(
                                                'stripeEnterSecretKey'
                                            )}
                                            className={
                                                formik.errors
                                                    ?.stripeSecretKey &&
                                                formik.touched?.stripeSecretKey
                                                    ? 'is-invalid'
                                                    : 'customInput'
                                            }
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </>
                )}

                {!formik.values.schoolGclMethod && (
                    <>
                        <div className="payment_card">
                            <h4>{getLabelByKey('goCardLess')}</h4>
                            <div className="mt-20">
                                <Row>
                                    <Col md="6">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="cardAccessToken"
                                            label={getLabelByKey(
                                                'goCardLessAccessToken'
                                            )}
                                            padding="10px"
                                            fontFamily={fontFamilyMedium}
                                            max={6}
                                            border="none"
                                            placeholder={getLabelByKey(
                                                'goCardLessEnterAccessToken'
                                            )}
                                            className={
                                                formik.errors
                                                    ?.cardAccessToken &&
                                                formik.touched?.cardAccessToken
                                                    ? 'is-invalid'
                                                    : 'customInput'
                                            }
                                        />
                                    </Col>
                                    <Col md="6">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="cardClientId"
                                            label={getLabelByKey(
                                                'goCardLessClientId'
                                            )}
                                            padding="10px"
                                            fontFamily={fontFamilyMedium}
                                            max={6}
                                            border="none"
                                            placeholder={getLabelByKey(
                                                'goCardLessEnterClientId'
                                            )}
                                            className={
                                                formik.errors?.cardClientId &&
                                                formik.touched?.cardClientId
                                                    ? 'is-invalid'
                                                    : 'customInput'
                                            }
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <div className="mt-20">
                                <Row>
                                    <Col md="6">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="cardWebHook"
                                            label={getLabelByKey(
                                                'goCardLessWebhook'
                                            )}
                                            padding="10px"
                                            fontFamily={fontFamilyMedium}
                                            max={6}
                                            border="none"
                                            placeholder={getLabelByKey(
                                                'goCardLessEnterWebhook'
                                            )}
                                            className={
                                                formik.errors?.cardWebHook &&
                                                formik.touched?.cardWebHook
                                                    ? 'is-invalid'
                                                    : 'customInput'
                                            }
                                        />
                                    </Col>
                                    <Col md="6">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="cardClientSecret"
                                            label={getLabelByKey(
                                                'goCardLessClientSecret'
                                            )}
                                            padding="10px"
                                            fontFamily={fontFamilyMedium}
                                            max={6}
                                            border="none"
                                            placeholder={getLabelByKey(
                                                'goCardLessClientSecret'
                                            )}
                                            className={
                                                formik.errors
                                                    ?.cardClientSecret &&
                                                formik.touched?.cardClientSecret
                                                    ? 'is-invalid'
                                                    : 'customInput'
                                            }
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default PaymentInformation
