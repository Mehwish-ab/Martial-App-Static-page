import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { Row, Col } from 'react-bootstrap' // Replace with your layout library
import CustomModal from '../../Modal/CustomModal'
import FormControl from '../../FormControl'
import { PaymentPop } from '../../../screens/CreateSchool/AddPaymentSchool/PaymentPop'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    pureDark2,
} from '../../GlobalStyle'
import CustomButton from '../../CustomButton/CustomButton'
import show_password_icon from '../../../assets/icons/ic_show_passcode.svg'
import { createPaymentInitialValues } from './constant'
import usePayment from '../../../hooks/usePayment'
import { AddPaymentMethod } from '../../../screens/Franchise/ViewFranchise/styles'
interface StripeKeysModalProps {
    open: boolean
    onClose: (value: string) => void
    id: any
}
const StripeKeysModal: React.FC<StripeKeysModalProps> = (props) => {
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
        // await create_Stripe("FRANCHISE", values, props.id);
    }

    return (
        <AddPaymentMethod>
            {Createmodal().modalComponent}
            <CustomModal
                width="477px"
                onCancel={() => props.onClose('')}
                isModalVisible={props.open}
                setIsModalVisible={setModelVisible}
            >
                children=
                {
                    <PaymentPop>
                        <h3>Stripe keys</h3>
                        <div>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleCreateSubmit}
                            >
                                {(formik) => {
                                    console.log('formik', formik.values)

                                    return (
                                        <Form name="basic" autoComplete="off">
                                            <Row>
                                                {/* <Col md="12" className="mt-20">
                          <FormControl
                            control="input"
                            type="text"
                            name="accountName"
                            label="Account Title"
                            fontSize="16px"
                            max={6}
                            placeholder="Enter Account Title"
                            // className={
                            //   formik.errors.accountName &&
                            //   formik.touched.accountName
                            //     ? "is-invalid"
                            //     : "customInput"
                            // }
                          />
                        </Col> */}
                                                {/* <Col md="12" className="mt-20"> */}
                                                {/* <FormControl
                            control="select"
                            type="select"
                            name="countryName"
                            label="Country Name"
                            fontSize="16px"
                            max={6}
                            formik={formik}
                            placeholder="Select Country Name"
                            value={formik.values.countryName}
                            handleChange={(val: any) => {
                              formik.setFieldValue("address", val);
                            }}
                            className={
                              formik.errors.countryName &&
                              formik.touched.countryName
                                ? "is-invalid"
                                : "customInput"
                            }
                          /> */}
                                                {/* <PlacesAutoCompleteInput
                            label="Country Name"
                            placeholder="Select Country Name"
                            handleChange={(val: any) => {
                              formik.setFieldValue("countryName", val);
                            }}
                            className={
                              formik.errors.countryName &&
                              formik.touched.countryName
                                ? "is-invalid"
                                : "customInput"
                            }
                            formik={formik}
                            name="countryName"
                            value={formik.values.countryName}
                          /> */}
                                                {/* </Col> */}
                                                <Col md="12" className="mt-20">
                                                    <FormControl
                                                        control="input"
                                                        type="text"
                                                        name="publishableKey"
                                                        label="Publishable Key"
                                                        fontSize="16px"
                                                        max={6}
                                                        placeholder="Enter Publishable Key"
                                                    />
                                                </Col>
                                                <Col md="12" className="mt-20">
                                                    <FormControl
                                                        control="password"
                                                        type="text"
                                                        name="secretKey"
                                                        labelFamily={`${fontFamilyRegular}`}
                                                        labelMarginBottom="7px"
                                                        color={pureDark2}
                                                        label="Secret Key"
                                                        padding="10px"
                                                        placeholder="Enter Secret Key"
                                                        suffix={
                                                            show_password_icon
                                                        }
                                                        className="loginPassword"
                                                    />
                                                </Col>
                                                <Col
                                                    onClick={() =>
                                                        props.onClose('')
                                                    }
                                                    md="12"
                                                    className="mt-20"
                                                >
                                                    <CustomButton
                                                        bgcolor={lightBlue3}
                                                        textTransform="Captilize"
                                                        color={pureDark2}
                                                        padding="12.5px"
                                                        fontFamily={
                                                            fontFamilyMedium
                                                        }
                                                        width="100%"
                                                        type="submit"
                                                        title="Submit"
                                                        fontSize="16px"
                                                        loading={loading}
                                                        // clicked={() =>
                                                        //   // create_Stripe("SCHOOL", formik.values, props.id)
                                                        // }
                                                    />
                                                </Col>
                                            </Row>
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

export default StripeKeysModal
