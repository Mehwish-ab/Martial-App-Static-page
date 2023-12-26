import React from 'react'
import { Col, Row } from 'react-bootstrap'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { Switch } from 'antd'
import { PaymentMethodStyled } from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

const PaymentMethod = ({ formik }: any) => {
    const { getLabelByKey } = useScreenTranslation('paymentInformation')
    const onChangeStripeMethod = (checked: boolean) => {
        formik.setFieldValue('schoolStripeMethod', checked)
        console.log(`switch to ${checked}`)
    }
    const onChangeGclMethod = (checked: boolean) => {
        console.log(`switch to ${checked}`)
        formik.setFieldValue('schoolGclMethod', checked)
    }
    const { branchData } = useSelector((state: RootState) => state.branchData)
    return (
        <PaymentMethodStyled>
            <Row className="mb-3">
                <Col md="6" className="bg-white border-1">
                    <div className="payment_card">
                        <div className="d-flex justify-content-between">
                            <h4>{getLabelByKey('stripeKeys')}</h4>
                            <Switch
                                defaultChecked={
                                    formik.values.schoolStripeMethod
                                }
                                onChange={onChangeStripeMethod}
                            />
                        </div>

                        <p>
                            Explore the benefits of Stripe payment for your
                            branch, offering a seamless experience to purchase
                            memberships and a variety of products.
                        </p>
                    </div>
                </Col>
                <Col md="6" className="bg-white">
                    <div className="payment_card">
                        <div className="d-flex justify-content-between">
                            <h4>{getLabelByKey('goCardLess')}</h4>
                            <Switch
                                defaultChecked={formik.values.schoolGclMethod}
                                onChange={onChangeGclMethod}
                            />
                        </div>
                        <p>
                            Explore the benefits of Stripe payment for your
                            branch, offering a seamless experience to purchase
                            memberships and a variety of products.
                        </p>
                    </div>
                </Col>
            </Row>
        </PaymentMethodStyled>
    )
}

export default PaymentMethod
