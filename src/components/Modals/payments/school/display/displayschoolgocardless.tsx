import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { Row, Col, Card } from 'react-bootstrap' // Replace with your layout library
import CustomModal from '../../../../Modal/CustomModal'
import { PaymentPop } from '../../../../../screens/CreateSchool/AddPaymentSchool/PaymentPop'
import { createPaymentInitialValues } from '../../constant'
import usePayment from '../../../../../hooks/usePayment'
import { AddPaymentMethod } from '../../../../../screens/Franchise/ViewFranchise/styles'

interface StripeKeysModalProps {
    open: boolean
    onClose: (value: string) => void
    id: any
    paymentdetails: any // Define the prop type
}

// const [value, setValue] = useState('')
// const options = useMemo(() => countryList().getData(), [])

// const changeHandler = (value:any) => {
//   setValue(value)

// }
const DisplaygocardlessschoolKeysModal: React.FC<StripeKeysModalProps> = (
    props
) => {
    console.log('Payment Details in StripeKeysModal:', props.paymentdetails)
    const firstPaymentDetail = props.paymentdetails[0]

    const initialValues: createPaymentInitialValues = {
        businessUC: '',
        id: 0,
        publishableKey: '',
        secretKey: '',
        accountName: '',
        paymentMethod: '',
        isActive: false,
        countryName: '',
        accessToken: '',
        clientId: '',
        webhook: '',
        clientSecret: '',
        bankName: '',
        accountHolder: '',
        ibanNumber: '',
        accountNumber: '',
        sortCode: '',
        bic: '',
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [iSModalVisible, setModelVisible] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { create_Payment, loading } = usePayment()

    const handleCreateSubmit = async (): Promise<void> => {
        // const data = await create_bankaccount("SCHOOL", values, props.id);
        // if (data) props.onClose("");
    }

    return (
        <AddPaymentMethod>
            <CustomModal
                width="493px"
                onCancel={() => props.onClose('')}
                isModalVisible={props.open}
                setIsModalVisible={setModelVisible}
            >
                {' '}
                children=
                {
                    <PaymentPop>
                        <h3>GoCardLess</h3>
                        <div>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleCreateSubmit}
                            >
                                {() => {
                                    return (
                                        <Form name="basic" autoComplete="off">
                                            <Card>
                                                <Row>
                                                    <Col
                                                        md="12"
                                                        className="mb-20"
                                                    >
                                                        <div className="list-item">
                                                            <div className="list-item-title">
                                                                Account Title
                                                            </div>
                                                            <div className="list-item-value">
                                                                {
                                                                    firstPaymentDetail.accountName
                                                                }
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        md="12"
                                                        className="mb-20"
                                                    >
                                                        <div className="list-item">
                                                            <div className="list-item-title">
                                                                Access Token
                                                            </div>
                                                            <div className="list-item-value">
                                                                {
                                                                    firstPaymentDetail.accessToken
                                                                }
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        md="12"
                                                        className="mb-20"
                                                    >
                                                        <div className="list-item">
                                                            <div className="list-item-title">
                                                                Client Id
                                                            </div>
                                                            <div className="list-item-value">
                                                                {
                                                                    firstPaymentDetail.clientId
                                                                }
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        md="12"
                                                        className="mb-20"
                                                    >
                                                        <div className="list-item">
                                                            <div className="list-item-title">
                                                                Webhook
                                                            </div>
                                                            <div className="list-item-value">
                                                                {
                                                                    firstPaymentDetail.webhook
                                                                }
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        md="12"
                                                        className="mb-20"
                                                    >
                                                        <div className="list-item">
                                                            <div className="list-item-title">
                                                                Client Secret Id
                                                            </div>
                                                            <div className="list-item-value">
                                                                {
                                                                    firstPaymentDetail.clientSecret
                                                                }
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md="12">
                                                        <Row>
                                                            <Col md="6">
                                                                <div className="list-item">
                                                                    <div className="list-item-title">
                                                                        Country
                                                                    </div>
                                                                    <div className="list-item-value">
                                                                        {
                                                                            firstPaymentDetail.countryName
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col md="6">
                                                                <div className="list-item">
                                                                    <div className="list-item-title">
                                                                        Status
                                                                    </div>
                                                                    <div className="list-item-value">
                                                                        {firstPaymentDetail.isActive ===
                                                                        true
                                                                            ? 'Active'
                                                                            : 'De-Active'}
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                    </PaymentPop>
                }
            </CustomModal>
        </AddPaymentMethod>
    )
}

export default DisplaygocardlessschoolKeysModal
