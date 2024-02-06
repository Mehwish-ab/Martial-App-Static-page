import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Form } from 'formik-antd'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'
import FormControl from '../../../components/FormControl'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    pureDark,
} from '../../../components/GlobalStyle'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { CreateClassStyled } from '../../Class/CreateClasses/styles'
import { CreateMembershipInitialValues } from '../constant'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import Head from '../../../components/Head/Head'
import { SelectOptionsDataTypes } from '../../Home/constants'
import CheckboxesSelect from '../../../components/CustomCheckbox/CheckboxesSelect'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'
import * as Yup from 'yup'
import { validationFinder } from '../../../utils/utilities'
import Images from '../../Home/OverlayImages/images'
import { getSchoolByUserId } from '../../../redux/features/dashboard/dashboardDataSlice'

const CreateMembership = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('createMembership')
    const { getLabelByKey: getLegalLabelByKey } = useScreenTranslation('legal')
    // const [isLoading, setIsLoading] = useState(false)
    const [data, setdatas] = useState<CreateMembershipInitialValues>()
    const [bannerImage, setBannerImage] = useState<File | null>(null)
    const {
        dropdowns: {
            schoolAccommodation,
            visibility,
            subscriptionType,
            currency,
        },
    } = useSelector((state: RootState) => state.appData.data)
    const convertedAccommodation = schoolAccommodation.map((accommodation) => ({
        ...accommodation,
        id: accommodation.id.toString(),
    }))

    const handleSaveBanner = (file: File): void => {
        setBannerImage(file)
    }
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )

    const navigate = useNavigate()

    const { schoolData } = useSelector(
        (state: RootState) => state.dashboardData
    )
    useEffect(() => {
        store.dispatch(getSchoolByUserId())
    }, [])
    const _currency = schoolData.defaultCurrencyId
    console.log('defaultCurrencyId', schoolData)
    const { loginData } = useSelector((state: RootState) => state)
    console.log('loginData', loginData.data?.schoolId)

    const CurrencyType = (_CurrencyType: number): string => {
        const index = currency.findIndex(
            (curr: any) => curr.id === _CurrencyType
        )

        if (index !== -1) {
            const currencyInfo = currency[index] as any
            const symbolMap: { [key: number]: string } = {
                1: '€', // Euro
                2: '£', // Pound
                3: '$', // United States Dollar
                4: 'R$', // Brazil
            }

            return symbolMap[_CurrencyType]
        }

        return '--'
    }
    const initialValues: CreateMembershipInitialValues = {
        classIds: '',
        useCase: '',
        id: '',
        title: '',
        startDate: '',
        endDate: '',
        visibility: '',
        subscriptionType: '',
        membershipFee: '',
        minimumStudent: '',
        dailySubsFee: '',
        weeklySubsFee: '',
        monthlySubsFee: '',
        annuallySubsFee: '',
        allowStudentCancel: '',
        refundDate: '',
        bookingCancelStartDate: '',
        bookingCancelEndDate: '',
        cancellationCharges: '',
        accommodation: [],
        description: '',
        bannerPicture: '',
    }
    const title = validationFinder('BUSINESS_NAME')!
    const TitleReg = new RegExp(title.pattern)

    const validationSchema = Yup.object({
        title: Yup.string()
            .required(title.notBlankMsgEn)
            .matches(TitleReg, title.patternMsgEn),
        // address: Yup.string()
        //     .required(address.notBlankMsgEn)
        //     .matches(addressReg, address.patternMsgEn),
        startDate: Yup.string().required('Please select  start Date'),
        endDate: Yup.string().required('Please Select end date'),
        visibility: Yup.string().required('Please select default language'),
        subscriptionType: Yup.string().required(
            'Please select default currency'
        ),
        // belts: Yup.string().required("Please select belts"),
        minimumStudent: Yup.string().required('Please select ranks'),
        membershipFee: Yup.string().required('Please enter membershipFee'),
        dailySubsFee: Yup.string().required('Please enter dailySubsFee'),

        weeklySubsFee: Yup.string().required('Please enter weeklySubsFee'),
        monthlySubsFee: Yup.string().required('Please enter monthlySubsFee'),

        annuallySubsFee: Yup.string().required('Please enter annuallySubsFee'),
        allowStudentCancel: Yup.string().required(
            'Please select allowStudentCancel'
        ),
        refundDate: Yup.string().required('Please select refundDate'),
        bookingCancelStartDate: Yup.string().required(
            'Please select bookingCancelStartDate'
        ),

        bookingCancelEndDate: Yup.string().required(
            'Please select bookingCancelEndDate'
        ),
        cancellationCharges: Yup.string().required(
            'Please  cancellationCharges'
        ),
        accommodation: Yup.array()
            .of(Yup.string().required('Select an accommodation'))
            .min(1, 'Select at least one accommodation'),
        description: Yup.string().required('Please enter description'),
        //   latestCertification: Yup.mixed().test(
        //     'fileType',
        //     'Unsupported File Format',
        //     function (value) {
        //         if (value) {
        //             const allowedTypes = [
        // 'image/jpeg',
        // 'image/png',
        // 'image/webp',
        // 'image/jpg',
        // 'image/bmp',
        // 'image/tiff',
        //             ]
        //             const isAllowedType = allowedTypes.includes(value.type)
        //             return isAllowedType
        //         }
        //         return true
        //     }
        // ),
    })

    const showAccommodation = (_accommodate: string[]): string => {
        const AccommodateName = _accommodate.reduce(
            (a: string, accommodate_id: string) => {
                const index = schoolAccommodation.findIndex(
                    (facts: any) => facts.id === +accommodate_id
                )

                if (index === -1) {
                    return a
                }

                const accommodateLabel = (schoolAccommodation[index] as any)[
                    selectedLanguage
                ]
                return `${a} ${accommodateLabel},`
            },
            ''
        )

        if (AccommodateName.length > 35) {
            return `${AccommodateName.slice(0, 35)}...`
        }

        return AccommodateName || getLabelByKey('selectAccommodationOptions')
    }
    const createOptions = (
        list: DataTypesWithIdAndMultipleLangLabel[]
    ): SelectOptionsDataTypes[] => {
        const options: SelectOptionsDataTypes[] = []
        list.forEach((item) => {
            const obj = {
                label: (item as any)[selectedLanguage],
                value: item.id,
            }

            options.push(obj)
        })

        return options
    }
    const money = CurrencyType(_currency)

    const onSubmit = async (
        values: CreateMembershipInitialValues
    ): Promise<void> => {
        try {
            setdatas(values)
            navigate('/membership/classes', {
                state: {
                    data: {
                        ...values,
                        membershipFee: money + values.membershipFee,
                        dailySubsFee: money + values.dailySubsFee,
                        weeklySubsFee: money + values.weeklySubsFee,
                        monthlySubsFee: money + values.monthlySubsFee,
                        annuallySubsFee: money + values.annuallySubsFee,
                        cancellationCharges: money + values.cancellationCharges,
                    },
                    bannerImages: bannerImage,
                },
            })
        } catch (error: unknown) {}
    }
    return (
        <>
            <Head title="Membership Create" />
            <CreateClassStyled>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => {
                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <div className="bg-white form">
                                    <h3>{getLabelByKey('titleScreen')}</h3>
                                    <Row>
                                        <Col md="12">
                                            <Row>
                                                <Col md="6">
                                                    <Col
                                                        md="12"
                                                        className="mt-20"
                                                    >
                                                        <FormControl
                                                            control="input"
                                                            type="text"
                                                            name="title"
                                                            label={getLabelByKey(
                                                                'title'
                                                            )}
                                                            padding="8px 10px"
                                                            fontFamily={
                                                                fontFamilyRegular
                                                            }
                                                            fontSize="16px"
                                                            max={6}
                                                            placeholder={getLabelByKey(
                                                                'titlePlaceholder'
                                                            )}
                                                        />
                                                    </Col>
                                                    <Col md="12">
                                                        <Row>
                                                            <Col
                                                                md="6"
                                                                className="mt-20"
                                                            >
                                                                <FormControl
                                                                    control="date"
                                                                    type="date"
                                                                    name="startDate"
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    label={getLabelByKey(
                                                                        'startDate'
                                                                    )}
                                                                    padding="8px 10px"
                                                                    placeholder={getLabelByKey(
                                                                        'startDatePlaceholder'
                                                                    )}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md="6"
                                                                className="mt-20"
                                                            >
                                                                <FormControl
                                                                    control="date"
                                                                    type="date"
                                                                    name="endDate"
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    label={getLabelByKey(
                                                                        'endDate'
                                                                    )}
                                                                    padding="8px 10px"
                                                                    placeholder={getLabelByKey(
                                                                        'endDatePlaceholder'
                                                                    )}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md="6"
                                                                className="mt-20"
                                                            >
                                                                <FormControl
                                                                    control="select"
                                                                    type="text"
                                                                    name="visibility"
                                                                    label={getLabelByKey(
                                                                        'visibility'
                                                                    )}
                                                                    padding="8px 10px"
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    fontSize="16px"
                                                                    max={6}
                                                                    placeholder={getLabelByKey(
                                                                        'visibilityPlacehor'
                                                                    )}
                                                                    options={createOptions(
                                                                        visibility
                                                                    )}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md="6"
                                                                className="mt-20"
                                                            >
                                                                <FormControl
                                                                    control="select"
                                                                    type="text"
                                                                    name="subscriptionType"
                                                                    label={getLabelByKey(
                                                                        'subscriptionType'
                                                                    )}
                                                                    padding="8px 10px"
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    fontSize="16px"
                                                                    max={6}
                                                                    placeholder={getLabelByKey(
                                                                        'subscriptionTypePlaceholder'
                                                                    )}
                                                                    options={createOptions(
                                                                        subscriptionType
                                                                    )}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md="6"
                                                                className="mt-20"
                                                            >
                                                                <FormControl
                                                                    control="input"
                                                                    type="number"
                                                                    name="membershipFee"
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    label={getLabelByKey(
                                                                        'membershipFees'
                                                                    )}
                                                                    padding="8px 10px"
                                                                    placeholder={getLabelByKey(
                                                                        'membershipFeesPlaceholder'
                                                                    )}
                                                                    suffix={
                                                                        <span
                                                                            style={{
                                                                                fontSize:
                                                                                    '20px',
                                                                            }}
                                                                        >
                                                                            {CurrencyType(
                                                                                _currency
                                                                            )}
                                                                        </span>
                                                                    }
                                                                />
                                                            </Col>
                                                            <Col
                                                                md="6"
                                                                className="mt-20"
                                                            >
                                                                <FormControl
                                                                    control="input"
                                                                    type="number"
                                                                    name="minimumStudent"
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    label={getLabelByKey(
                                                                        'minimumStudent'
                                                                    )}
                                                                    padding="8px 10px"
                                                                    placeholder={getLabelByKey(
                                                                        'minimumStudentPlaceholder'
                                                                    )}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Col>
                                                <Col md="6" className="mt-20">
                                                    <p className="bannerTitle ">
                                                        {getLabelByKey(
                                                            'bannerImage'
                                                        )}
                                                    </p>
                                                    <Images
                                                        onSaveBanner={
                                                            handleSaveBanner
                                                        }
                                                        isEditable={true} // Set isEditable to true or false based on your requirement
                                                        defaultImage={null}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <h3 className="mt-20">
                                            {getLabelByKey('subscriptionPlan')}
                                        </h3>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="number"
                                                name="dailySubsFee"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'dailySubscriptionFees'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'dailySubscriptionFeesPlaceholder'
                                                )}
                                                suffix={
                                                    <span
                                                        style={{
                                                            fontSize: '20px',
                                                        }}
                                                    >
                                                        {CurrencyType(
                                                            _currency
                                                        )}
                                                    </span>
                                                }
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="number"
                                                name="weeklySubsFee"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'weeklySubscriptionFees'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'weeklySubscriptionFeesPlaceholder'
                                                )}
                                                suffix={
                                                    <span
                                                        style={{
                                                            fontSize: '20px',
                                                        }}
                                                    >
                                                        {CurrencyType(
                                                            _currency
                                                        )}
                                                    </span>
                                                }
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="number"
                                                name="monthlySubsFee"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'monthlySubscriptionFees'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'monthlySubscriptionFeesPlaceholder'
                                                )}
                                                suffix={
                                                    <span
                                                        style={{
                                                            fontSize: '20px',
                                                        }}
                                                    >
                                                        {CurrencyType(
                                                            _currency
                                                        )}
                                                    </span>
                                                }
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="number"
                                                name="annuallySubsFee"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'annuallySubscriptionFees'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'annuallySubscriptionFeesPlaceholder'
                                                )}
                                                suffix={
                                                    <span
                                                        style={{
                                                            fontSize: '20px',
                                                        }}
                                                    >
                                                        {CurrencyType(
                                                            _currency
                                                        )}
                                                    </span>
                                                }
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="date"
                                                type="text"
                                                name="allowStudentCancel"
                                                label={getLabelByKey(
                                                    'allowToStudentCancel'
                                                )}
                                                padding="7px"
                                                fontFamily={fontFamilyRegular}
                                                fontSize="16px"
                                                max={6}
                                                placeholder={getLabelByKey(
                                                    'allowToStudentCancelPlaceholder'
                                                )}
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="refundDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'refundFeesDate'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'refundFeesDatePlaceholder'
                                                )}
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="bookingCancelStartDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'bookingCancellationStart'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'bookingCancellationStartDate'
                                                )}
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="bookingCancelEndDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'bookingCancellationEnd'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'bookingCancellationEndPlaceholder'
                                                )}
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="number"
                                                name="cancellationCharges"
                                                fontFamily={fontFamilyRegular}
                                                label={
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
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'cancellationChargePlaceholder'
                                                )}
                                                suffix={
                                                    <span
                                                        style={{
                                                            fontSize: '20px',
                                                        }}
                                                    >
                                                        {CurrencyType(
                                                            _currency
                                                        )}
                                                    </span>
                                                }
                                            />
                                        </Col>

                                        <Col md="3">
                                            <CheckboxesSelect
                                                name="accommodation"
                                                label={getLabelByKey(
                                                    'accommodate'
                                                )}
                                                list={convertedAccommodation} // Use the converted array here                                                showErrorMsgInList={false}
                                                placeholder={showAccommodation(
                                                    formik.values.accommodation
                                                )}
                                                showErrorMsgInList={false} // value={
                                                //     formik.values.accommodation
                                                // }
                                            />
                                        </Col>

                                        <Col md="12" className="mt-20">
                                            <FormControl
                                                control="textarea"
                                                type="text"
                                                name="description"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'descriptionAndFeatures'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'descriptionAndFeaturesPlaceholder'
                                                )}
                                                height="200px"
                                            />
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
                                                    {getLegalLabelByKey(
                                                        'termsAndConditions'
                                                    )}
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
                                                    {getLegalLabelByKey(
                                                        'AgreementGuidelines'
                                                    )}
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
                                                    {getLegalLabelByKey(
                                                        'liabilityWaivers'
                                                    )}
                                                </p>
                                            </form>
                                        </label>
                                    </Row>
                                </div>

                                <div className="mt-20 d-flex justify-content-end">
                                    <CustomButton
                                        bgcolor={lightBlue3}
                                        textTransform="Captilize"
                                        color={pureDark}
                                        padding="11px 40.50px"
                                        margin="30px 0px"
                                        fontFamily={`${fontFamilyMedium}`}
                                        width="fit-content"
                                        type="submit"
                                        title={getLabelByKey('primaryButton')}
                                        fontSize="18px"
                                    />
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </CreateClassStyled>
        </>
    )
}

export default CreateMembership
