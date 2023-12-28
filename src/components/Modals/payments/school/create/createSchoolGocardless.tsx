import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { Row, Col } from 'react-bootstrap' // Replace with your layout library
import CustomModal from '../../../../Modal/CustomModal'
import FormControl from '../../../../FormControl'
import { PaymentPop } from '../../../../../screens/CreateSchool/AddPaymentSchool/PaymentPop'
import {
    fontFamilyMedium,
    lightBlue3,
    pureDark2,
} from '../../../../GlobalStyle'
// import countryList from "react-select-country-list";

import CustomButton from '../../../../CustomButton/CustomButton'
import { createPaymentInitialValues } from '../../constant'
import usePayment from '../../../../../hooks/usePayment'
import { AddPaymentMethod } from '../../../../../screens/Franchise/ViewFranchise/styles'

import PlacesAutoCompleteInput from '../../../../../maps/PlacesAutocomplete'
interface StripeKeysModalProps {
    open: boolean
    onClose: (value: string) => void
    id: any
    paymentMethod: any
}

// const [value, setValue] = useState('')
// const options = useMemo(() => countryList().getData(), [])

// const changeHandler = (value:any) => {
//   setValue(value)

// }
const SchoolGocardlessKeysModal: React.FC<StripeKeysModalProps> = (props) => {
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
    const { create_Payment, loading } = usePayment()

    const handleCreateSubmit = async (values: any): Promise<void> => {
        console.log('initial', values)

        const data = await create_Payment(
            'SCHOOL',
            values,
            props.id,
            props.paymentMethod
        )
        if (data) props.onClose('')
    }
    return (
        <AddPaymentMethod>
            <CustomModal
                width="953px"
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
                                {(formik) => {
                                    return (
                                        <Form name="basic" autoComplete="off">
                                            <Row>
                                                <Col md="12">
                                                    <Row>
                                                        <Col
                                                            md="6"
                                                            className="mt-20"
                                                        >
                                                            <FormControl
                                                                control="input"
                                                                type="text"
                                                                name="accountName"
                                                                label="Account Title"
                                                                fontSize="16px"
                                                                max={6}
                                                                placeholder="Enter Account Title"
                                                            />
                                                        </Col>
                                                        <Col
                                                            md="6"
                                                            className="mt-20"
                                                        >
                                                            <PlacesAutoCompleteInput
                                                                label="Country Name"
                                                                placeholder="Select Country Name"
                                                                handleChange={(
                                                                    val: any
                                                                ) => {
                                                                    formik.setFieldValue(
                                                                        'countryName',
                                                                        val
                                                                    )
                                                                }}
                                                                className={
                                                                    formik
                                                                        .errors
                                                                        .countryName &&
                                                                    formik
                                                                        .touched
                                                                        .countryName
                                                                        ? 'is-invalid'
                                                                        : 'customInput'
                                                                }
                                                                formik={formik}
                                                                name="countryName"
                                                                value={
                                                                    formik
                                                                        .values
                                                                        .countryName
                                                                }
                                                            />
                                                            {/* <FormControl
                                control="select"
                                type="text"
                                name="countryName"
                                label="Country Name"
                                fontSize="16px"
                                max={6}
                                placeholder="Select Country Name"
                                className={
                                  formik.errors.countryName &&
                                  formik.touched.countryName
                                    ? "is-invalid"
                                    : "customInput"
                                }
                                // options={options}
                                // value={value}
                                // onChange={changeHandler}
                              /> */}
                                                        </Col>
                                                    </Row>
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
                                                                name="accessToken"
                                                                label="Access Token"
                                                                fontSize="16px"
                                                                max={6}
                                                                placeholder="Enter Access Token"
                                                            />
                                                        </Col>
                                                        <Col
                                                            md="6"
                                                            className="mt-20"
                                                        >
                                                            <FormControl
                                                                control="input"
                                                                type="text"
                                                                name="clientId"
                                                                label="Client Id"
                                                                fontSize="16px"
                                                                max={6}
                                                                placeholder="Enter Client Id"
                                                            />
                                                        </Col>
                                                    </Row>
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
                                                                name="webhook"
                                                                label="Webhook"
                                                                fontSize="16px"
                                                                max={6}
                                                                placeholder="Enter Webhook"
                                                            />
                                                        </Col>
                                                        <Col
                                                            md="6"
                                                            className="mt-20"
                                                        >
                                                            <FormControl
                                                                control="input"
                                                                type="text"
                                                                name="clientSecret"
                                                                label="Client Secret"
                                                                fontSize="16px"
                                                                max={6}
                                                                placeholder="Enter Client Secret"
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md="12">
                                                    <Row>
                                                        <Col
                                                            md="6"
                                                            className="mt-20"
                                                        ></Col>
                                                        <Col
                                                            md="6"
                                                            className="mt-20"
                                                        >
                                                            <CustomButton
                                                                bgcolor={
                                                                    lightBlue3
                                                                }
                                                                textTransform="Captilize"
                                                                color={
                                                                    pureDark2
                                                                }
                                                                padding="12.5px"
                                                                fontFamily={
                                                                    fontFamilyMedium
                                                                }
                                                                width="100%"
                                                                type="submit"
                                                                title="Submit"
                                                                fontSize="16px"
                                                                loading={
                                                                    loading
                                                                }
                                                            />
                                                        </Col>
                                                    </Row>
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

export default SchoolGocardlessKeysModal
