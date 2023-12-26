import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { Row, Col, Card } from 'react-bootstrap' // Replace with your layout library
import CustomModal from '../../../../Modal/CustomModal'
import FormControl from '../../../../FormControl'
import { PaymentPop } from '../../../../../screens/CreateSchool/AddPaymentSchool/PaymentPop'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    pureDark2,
} from '../../../../GlobalStyle'
import CustomButton from '../../../../CustomButton/CustomButton'
import show_password_icon from '../../../assets/icons/ic_show_passcode.svg'
import { createPaymentInitialValues } from '../../constant'
import usePayment from '../../../../../hooks/usePayment'
import { AddPaymentMethod } from '../../../../../screens/Franchise/ViewFranchise/styles'
import PlacesAutoCompleteInput from '../../../../../maps/PlacesAutocomplete'
import { useParams } from 'react-router-dom'
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
    const [iSModalVisible, setModelVisible] = useState(false)
    const { create_Payment, loading, Createmodal } = usePayment()
    const handleCreateSubmit = async (values: any) => {
        console.log(values)

        // await create_Stripe("SCHOOL", values, props.id);
    }
    return (
        <AddPaymentMethod>
            {Createmodal().modalComponent}
            <CustomModal
                width="493px"
                onCancel={() => props.onClose('')}
                children={
                    <PaymentPop>
                        <h3>Stripe Keys</h3>
                        <div>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleCreateSubmit}
                            >
                                {(formik) => {
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
                isModalVisible={props.open}
                setIsModalVisible={setModelVisible}
            />
        </AddPaymentMethod>
    )
}

export default DislayStripechoolSKeysModal
