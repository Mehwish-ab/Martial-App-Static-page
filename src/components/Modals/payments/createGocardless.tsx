/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { Row, Col } from 'react-bootstrap' // Replace with your layout library
import CustomModal from '../../Modal/CustomModal'
import FormControl from '../../FormControl'
import { PaymentPop } from '../../../screens/CreateSchool/AddPaymentSchool/PaymentPop'
import { fontFamilyMedium, lightBlue3, pureDark2 } from '../../GlobalStyle'
// import countryList from "react-select-country-list";

import CustomButton from '../../CustomButton/CustomButton'
import { createPaymentInitialValues } from './constant'
import { AddPaymentMethod } from '../../../screens/Franchise/ViewFranchise/styles'
import usePayment from '../../../hooks/usePayment'
interface StripeKeysModalProps {
    open: boolean
    onClose: (value: string) => void
    id: any
}

// const [value, setValue] = useState('')
// const options = useMemo(() => countryList().getData(), [])

// const changeHandler = (value:any) => {
//   setValue(value)

// }
const GocardlessKeysModal: React.FC<StripeKeysModalProps> = (props) => {
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
    // const { selectedLanguage } = useSelector(
    //     (state: RootState) => state.selectedLanguage
    // )
    // const createOptions = (list: DataTypesWithIdAndMultipleLangLabel[]) => {
    //     const options: SelectOptionsDataTypes[] = []
    //     list?.forEach((item) => {
    //         const obj = {
    //             label: (item as any)[selectedLanguage],
    //             value: item.id,
    //         }

    //         options.push(obj)
    //     })

    //     return options
    // }
    const [iSModalVisible, setModelVisible] = useState(false)
    const { create_Payment, loading } = usePayment()
    // const {
    //     statusData: { activities, facilities },
    //     dropdowns: { currency, language, businessTypes, countryName },
    // } = useSelector((state: RootState) => state.appData.data)
    const handleCreateSubmit = async (values: any): Promise<void> => {
        console.log('initial', values)

        // await create_Payment("SCHOOL", values, props.id,props.);
    }

    return (
        <AddPaymentMethod>
            <CustomModal
                width="953px"
                onCancel={() => props.onClose('')}
                isModalVisible={props.open}
                setIsModalVisible={setModelVisible}
            >
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
            </CustomModal>
        </AddPaymentMethod>
    )
}

export default GocardlessKeysModal
