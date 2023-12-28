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
const DislayStripechoolSKeysModal: React.FC<StripeKeysModalProps> = (props) => {
    console.log('Payment Details in StripeKeysModal:', props.paymentdetails)

    const firstPaymentDetail = props.paymentdetails[0]
    console.log('Account Name:', firstPaymentDetail.mode)
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
    const { create_Payment, loading, Createmodal } = usePayment()
    const handleCreateSubmit = async (values: any): Promise<void> => {
        console.log(values)

        // await create_Stripe("SCHOOL", values, props.id);
    }
    return (
        <AddPaymentMethod>
            {Createmodal().modalComponent}
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
                        <h3>Stripe Keys</h3>
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
                                                                Publish Keys
                                                            </div>
                                                            <div className="list-item-value">
                                                                {
                                                                    firstPaymentDetail.publishableKey
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
                                                                Secret Key
                                                            </div>
                                                            <div className="list-item-value">
                                                                {
                                                                    firstPaymentDetail.secretKey
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
                                                                        {firstPaymentDetail
                                                                            ? firstPaymentDetail.countryName
                                                                            : 'NULL'}
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

export default DislayStripechoolSKeysModal
