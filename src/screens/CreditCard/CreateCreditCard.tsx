import { Form, InputNumber } from 'antd'
import { Formik } from 'formik'
import { Col, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { CreditCardStyle } from './style'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import valid from 'card-validator'
import { toast } from 'react-toastify'
import axios from 'axios'
import InputMask from 'react-input-mask'
import FormController from '../../components/FormControl'
import {
    BlackDot,
    primaryColor,
    TertiraryHeading,
    UnderlineRed,
} from '../../components/GlobalStyle'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomMaskInput from '../../components/MaskInput/CustomMaskInput'
import Head from '../../components/Head/Head'
import { add_credit_card_url } from '../../utils/api_urls'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../redux/store'
import CustomModal from '../../components/Modal/CustomModal'
import EnnvisionModal from '../../components/CustomModals/EnnvisionModal'

type createCreditCardTypes = {
    cardHolderName: string
    cardNumber: string
    expiry_month?: string
    expiry_year?: string | null
    cvcNumber: string
}

// "postal_code": "15A 8C5",
// "is_default": false
const initialValues: createCreditCardTypes = {
    cardHolderName: '',
    cardNumber: '',
    expiry_month: '',
    expiry_year: '',
    cvcNumber: '',
}

const validationSchema = Yup.object().shape({
    cardNumber: Yup.string().test(
        'test-number',
        'credit card number is invalid',
        (value) => valid.number(value).isValid
    ),
    cardHolderName: Yup.string().test(
        'test-number',
        'owner name is invalid',
        (value) => valid.cardholderName(value).isValid
    ),
    expiry_month: Yup.string().test(
        'test-number',
        'month is invalid',
        (value) => valid.expirationMonth(value).isValid
    ),
    expiry_year: Yup.string().test(
        'test-number',
        'year is invalid',
        (value) => valid.expirationYear(value).isValid
    ),
    cvcNumber: Yup.string().test(
        'test-number',
        'cvcNumber is invalid',
        (value) => valid.cvv(value).isValid
    ),
})

const CreateCreditCard = () => {
    const [focus, setFocus] = useState<any>('')
    const createCardToastId = useRef<any>(null)
    const [loading, setLoading] = useState(false)
    const { data } = useAppSelector((state: RootState) => state.loginData)
    const { result } = useAppSelector((state: RootState) => state.userLocation)
    const [expiryMonth, setExpiryMonth] = useState('')
    const [isShowModal, setIsShowModal] = useState(false)
    const navigate = useNavigate()

    const { countryName } = useAppSelector((state) => state.appData.data)
    // create credit card promise
    const createCartHandler = async (data: any) => {
        createCardToastId.current = toast('credit card adding...', {
            type: 'info',
        })
        const { data: response } = await axios.post(
            ' Base_Url + credit_card_url',
            {
                a: '1',
            }
        )
        return response.data
    }

    // valid credit card brands

    const creditCardBrands = (cardBrand: string) => {
        switch (cardBrand) {
            case 'Visa':
                return 'VisaCard'
            case 'Mastercard':
                return 'Mastercard'
            default:
                return null
        }
    }

    const onSubmit = async ({
        cardHolderName,
        cardNumber,
        expiry_month,
        expiry_year,
        cvcNumber,
    }: createCreditCardTypes) => {
        const expiryMonthYear = expiry_month! + '/' + expiry_year!
        const { username, phoneNumber } = data?.userDetails!

        const numberValidation = valid.number(cardNumber)
        if (!numberValidation.card) {
            return
        }
        if (!creditCardBrands(numberValidation.card.niceType)) {
            createCardToastId.current = toast('Card Brand Is Invalid', {
                type: 'error',
            })
            return
        }

        const cardValues = {
            userId: data?.userDetails.id,
            countryName: countryName.results.name,
            userName: username,
            brand: creditCardBrands(numberValidation.card.niceType),
            phoneNumber,
            cardHolderName,
            cardNumber,
            cvcNumber,
            expiryMonthYear,
        }
        console.log({ cardValues })
        try {
            setLoading(true)
            const { data: createCardData } = await axios.post(
                add_credit_card_url,
                cardValues,
                {
                    headers: {
                        Authorization: `Bearer ${data?.jwtDetails.token}`,
                    },
                }
            )
            createCardToastId.current = toast('card added successfully', {
                type: 'success',
            })
            setIsShowModal(true)
            setTimeout(() => {
                setIsShowModal(false)
                navigate(-1)
            }, 2000)
            setLoading(false)
            console.log({ createCardData })
        } catch (error: any) {
            createCardToastId.current = toast(
                error.response.data.responseMessage,
                {
                    type: 'error',
                }
            )

            setLoading(false)
        }
    }

    const expiryMonthRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (
            expiryMonth &&
            expiryMonth
                .split('_')
                .filter((item) => item !== '')
                .join().length === 2
        ) {
            expiryMonthRef.current?.focus()
        }
    }, [expiryMonth])

    // when card created move to the main section
    const doTask = () => {
        navigate(-1)
    }

    return (
        <CreditCardStyle>
            <Head title="add-credit-card" />
            <CustomModal
                isModalVisible={isShowModal}
                setIsModalVisible={setIsShowModal}
                showCloseBtn={false}
            >
                <EnnvisionModal
                    title="Card Created"
                    description="Your Card Created Successfully."
                    doTask={doTask}
                />
            </CustomModal>
            <TertiraryHeading>Add Credit Card</TertiraryHeading>
            <div className="d-flex mt-2 mb-3">
                <UnderlineRed />
                <BlackDot />
            </div>
            <div className="inner-container">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => {
                        console.log(formik.values)
                        return (
                            <Form
                                style={{
                                    height: '100%',
                                }}
                                name="basic"
                                onFinish={formik.handleSubmit}
                                // onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <div className="mt-3">
                                    <FormController
                                        control="input"
                                        fontFamily="EnnVisionsMedium"
                                        labelFamily="EnnVisionsMedium"
                                        padding="12px"
                                        label="Card Holder Name"
                                        type="text"
                                        name="cardHolderName"
                                        placeholder="Name on Card"
                                        className={
                                            formik.errors.cardHolderName &&
                                            formik.touched.cardHolderName
                                                ? 'is-invalid'
                                                : 'customInput'
                                        }
                                    />
                                </div>
                                <div className="mt-2">
                                    <CustomMaskInput
                                        type="tel"
                                        mask="9999 9999 9999 9999"
                                        maskChar=""
                                        placeholder="____ ____ ____ ____"
                                        name="cardNumber"
                                        label="Card Number"
                                        setValue={(value) =>
                                            formik.setFieldValue(
                                                'cardNumber',
                                                value
                                                    .split(' ')
                                                    .join(',')
                                                    .replaceAll(/,/g, '')
                                            )
                                        }
                                    />
                                    {formik.errors.cardNumber &&
                                        formik.touched.cardNumber && (
                                            <p className="is-invalid">
                                                {formik.errors.cardNumber}
                                            </p>
                                        )}
                                </div>
                                <Row className="expiry__date">
                                    <Col
                                        md={6}
                                        className="mt-2 expiry__date__section"
                                    >
                                        <label htmlFor="expiry">
                                            Expiry Date
                                        </label>
                                        <div
                                            className="d-flex expiry__date__section__inputs"
                                            id="expiry"
                                        >
                                            <InputMask
                                                type="tel"
                                                mask="99"
                                                placeholder="__"
                                                value={
                                                    formik.values.expiry_month
                                                }
                                                onChange={(e) => {
                                                    setExpiryMonth(
                                                        e.target.value
                                                    )
                                                    formik.setFieldValue(
                                                        'expiry_month',
                                                        e.target.value
                                                    )
                                                }}
                                                maskChar="_"
                                            />

                                            <p className="mb-0 mt-1 me-2 slash">
                                                /
                                            </p>
                                            <InputNumber
                                                className="p-0"
                                                placeholder="___"
                                                maxLength={2}
                                                controls={false}
                                                value={
                                                    formik.values.expiry_year
                                                }
                                                ref={expiryMonthRef}
                                                onChange={(value) =>
                                                    formik.setFieldValue(
                                                        'expiry_year',
                                                        !value
                                                            ? ''
                                                            : value.toString()
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="d-flex">
                                            <div className="me-3">
                                                {formik.errors.expiry_month &&
                                                    formik.touched
                                                        .expiry_month && (
                                                        <p className="is-invalid">
                                                            {
                                                                formik.errors
                                                                    .expiry_month
                                                            }
                                                        </p>
                                                    )}
                                            </div>
                                            {formik.errors.expiry_year &&
                                                formik.touched.expiry_year && (
                                                    <p className="is-invalid">
                                                        {
                                                            formik.errors
                                                                .expiry_year
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                    </Col>
                                    <Col md={6} className="mt-2">
                                        <CustomMaskInput
                                            type="tel"
                                            mask="999"
                                            maskChar="_"
                                            name="cvv"
                                            setValue={(value) =>
                                                formik.setFieldValue(
                                                    'cvcNumber',
                                                    value
                                                )
                                            }
                                            placeholder="___"
                                            label="CVV"
                                        />
                                        {formik.errors.cvcNumber &&
                                            formik.touched.cvcNumber && (
                                                <p className="is-invalid">
                                                    {formik.errors.cvcNumber}
                                                </p>
                                            )}
                                    </Col>
                                </Row>
                                <div className="mt-3 d-flex justify-content-center justify-content-sm-end">
                                    <CustomButton
                                        bgcolor={primaryColor}
                                        color="white"
                                        padding="8px 8px"
                                        width="100%"
                                        type="submit"
                                        title="Add Card"
                                        margin="auto"
                                        fontFamily="EnnVisionsMedium"
                                        fontSize="16px"
                                        loading={loading}
                                    />
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </CreditCardStyle>
    )
}

export default CreateCreditCard
