import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Form } from 'antd'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import FormControl from '../../../components/FormControl'
import ic_success from '../../../assets/images/ic_success.svg'
import * as Yup from 'yup'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    pureDark,
} from '../../../components/GlobalStyle'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { CreateClassStyled } from '../../Class/CreateClasses/styles'
import {
    CreateMembershipInitialValues,
    UpdateMembershipInitialValues,
} from '../constant'
import CustomModal from '../../../components/Modal/CustomModal'
import { SchoolSuccessfulModals } from '../../../hooks/PopupModalsStyling'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import Head from '../../../components/Head/Head'
import useMembership from '../../../hooks/useMembership'
import moment from 'moment'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'
import { SelectOptionsDataTypes } from '../../Home/constants'
import CheckboxesSelect from '../../../components/CustomCheckbox/CheckboxesSelect'
import Images from '../../Home/OverlayImages/images'

const UpdateMembership = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('updateMembership')
    const { getLabelByKey: getLegalLabelByKey } = useScreenTranslation('legal')
    const [isLoading, setIsLoading] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)
    const navigate = useNavigate()
    const [bannerImage, setBannerImage] = useState<File | null>(null)
    const { schoolData } = useSelector(
        (state: RootState) => state.dashboardData
    )
    const { getMembershipbyid, memberShipValue } = useMembership()
    const { memberShipPlanId } = useParams()
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
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
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                if (memberShipPlanId) {
                    //   console.log('uajl', memberShipValue)
                    await getMembershipbyid(Number(memberShipPlanId))
                }

                // eslint-disable-next-line @typescript-eslint/no-shadow
            } catch (error) {
                // setError('Error fetching data')
            } finally {
                // setLoading(false)
            }
        }

        fetchData()
    }, [memberShipPlanId])
    const showAccommodation = (_accommodate: string[]): any => {
        console.log('_accomodation', _accommodate)
        if (_accommodate) {
            const AccommodateName = _accommodate?.reduce(
                (a: string, accommodate_id: string) => {
                    const index = schoolAccommodation.findIndex(
                        (facts: any) => facts.id === +accommodate_id
                    )

                    if (index === -1) {
                        return a
                    }

                    const accommodateLabel = (
                        schoolAccommodation[index] as any
                    )[selectedLanguage]
                    return `${a} ${accommodateLabel},`
                },
                ''
            )
            if (AccommodateName.length > 35) {
                return `${AccommodateName.slice(0, 35)}...`
            }

            return (
                AccommodateName || getLabelByKey('selectAccommodationOptions')
            )
        } else {
            return 'Select Accomodation'
        }
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

    const handleSaveBanner = (file: File): void => {
        setBannerImage(file)
    }

    console.log(memberShipPlanId, memberShipValue)
    const initialValues: UpdateMembershipInitialValues = {
        classIds: memberShipValue ? memberShipValue.classIds : '--',
        useCase: '',
        id: 0,
        title: memberShipValue ? memberShipValue.title : '--',
        startDate: memberShipValue
            ? moment(memberShipValue?.startDate, 'YYYY-MM-DD').format(
                  'dddd, MMM DD, YYYY'
              )
            : '',
        endDate: memberShipValue
            ? moment(memberShipValue?.endDate, 'YYYY-MM-DD').format(
                  'dddd, MMM DD, YYYY'
              )
            : '',
        visibility: memberShipValue ? memberShipValue.visibility : '--',
        subscriptionType: memberShipValue
            ? memberShipValue.subscriptionType
            : '--',
        membershipFee: memberShipValue ? memberShipValue.membershipFee : '--',
        minimumStudent: memberShipValue ? memberShipValue.minimumStudent : '--',
        dailySubsFee: memberShipValue ? memberShipValue.dailySubsFee : '--',
        weeklySubsFee: memberShipValue ? memberShipValue.weeklySubsFee : '--',
        monthlySubsFee: memberShipValue ? memberShipValue.monthlySubsFee : '--',
        annuallySubsFee: memberShipValue
            ? memberShipValue.annuallySubsFee
            : '--',
        allowStudentCancel: memberShipValue
            ? moment(memberShipValue?.allowStudentCancel, 'YYYY-MM-DD').format(
                  'dddd, MMM DD, YYYY'
              )
            : '',
        refundDate: memberShipValue
            ? moment(memberShipValue?.refundDate, 'YYYY-MM-DD').format(
                  'dddd, MMM DD, YYYY'
              )
            : '',
        bookingCancelStartDate: memberShipValue
            ? moment(
                  memberShipValue?.bookingCancelStartDate,
                  'YYYY-MM-DD'
              ).format('dddd, MMM DD, YYYY')
            : '',
        bookingCancelEndDate: memberShipValue
            ? moment(
                  memberShipValue?.bookingCancelEndDate,
                  'YYYY-MM-DD'
              ).format('dddd, MMM DD, YYYY')
            : ' ',
        cancellationCharges: memberShipValue
            ? memberShipValue.cancellationCharges
            : '',
        accommodation: memberShipValue
            ? memberShipValue.accommodation?.split(',').map(String)
            : [],
        description: memberShipValue ? memberShipValue.description : '',
        bannerPicture: memberShipValue ? memberShipValue.bannerPicture : '--',
    }

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

    const _currency = schoolData.defaultCurrencyId
    console.log('defaultCurrencyId', schoolData)
    const validationSchema = Yup.object({
        title: Yup.string().required('title is required'),

        // address: Yup.string()
        //     .required(address.notBlankMsgEn)
        //     .matches(addressReg, address.patternMsgEn),
        startDate: Yup.string().required('Start date is required.'),
        endDate: Yup.string()
            .required('End date is required.')
            .test(
                'is-greater-than-start-date',
                'End date must be greater than or equal to start date.',
                function (value) {
                    const { startDate } = this.parent // Accessing parent context

                    if (!startDate || !value) {
                        return true // Skip validation if either date is missing
                    }

                    // Compare dates using moment
                    return (
                        moment(value).isAfter(startDate) ||
                        moment(value).isSame(startDate)
                    )
                }
            ),
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
        bookingCancelStartDate: Yup.string()
            .required('Booking cancel start date is required.')
            .test(
                'is-greater-than-bookingStartDate',
                'Booking cancel start date must be greater than the  start date.',
                function (value) {
                    const { startDate } = this.parent // Accessing parent context

                    if (!startDate || !value) {
                        return true // Skip validation if either date is missing
                    }

                    // Compare dates using moment
                    return (
                        moment(value).isAfter(startDate) ||
                        moment(value).isSame(startDate)
                    )
                }
            ),
        bookingCancelEndDate: Yup.string()
            .required('Booking cancel end date is required.')
            .test(
                'is-greater-than-cancelStart',
                'Booking cancel end date must be greater than the cancel start date.',
                function (value) {
                    const { bookingCancelStartDate, bookingCancelEndDate } =
                        this.parent
                    console.log(
                        'booking cancel start date',
                        bookingCancelStartDate,
                        bookingCancelEndDate
                    )
                    return moment(value).isAfter(moment(bookingCancelStartDate))
                }
            )
            .test(
                'is-less-than-end-date',
                'Booking cancel end date must be less than the End date.',
                function (value) {
                    const { endDate } = this.parent
                    return moment(value).isSameOrBefore(moment(endDate))
                }
            ),
        refundDate: Yup.string()
            .required('Refund date is required.')
            .test(
                'is-after-bookingStartDate',
                'Refund date must be after the Booking start date.',
                function (value) {
                    const { bookingCancelStartDate } = this.parent
                    return moment(value).isAfter(moment(bookingCancelStartDate))
                }
            ),
        allowStudentCancel: Yup.string()
            .required('Refund date is required.')
            .test(
                'is-after-startDate',
                'Allow StudentCancel must be greater then the  start date.',
                function (value) {
                    const { startDate } = this.parent
                    return moment(value).isAfter(moment(startDate))
                }
            )
            .test(
                'is-before-endDate',
                'Allow StudentCancel must be less then the  end date.',
                function (value) {
                    const { endDate } = this.parent
                    return moment(value).isBefore(moment(endDate))
                }
            ),

        cancellationCharges: Yup.string().required(
            'Please  cancellationCharges'
        ),
        accommodation: Yup.array()
            .of(Yup.string().required('Select an accommodation'))
            .min(1, 'Select at least one accommodation'),
        description: Yup.string().required('Please enter description'),
    })

    const onSubmit = async (
        values: CreateMembershipInitialValues
    ): Promise<void> => {
        try {
            console.log('data sending to next screen', values)
            navigate('/membership/classes', {
                state: {
                    data: {
                        ...values,
                        memberShipPlanId: memberShipPlanId,
                    },
                    bannerImages: bannerImage,
                },
            })
        } catch (error: unknown) {}
    }
    return (
        <>
            <Head title="Membership Update" />
            <CreateClassStyled>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => {
                        console.log(
                            'formik . initail',
                            formik.values,
                            initialValues
                        )
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
                                                            value={
                                                                formik.values
                                                                    .title
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
                                                                    placeholder={
                                                                        formik
                                                                            .values
                                                                            .startDate
                                                                    }
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
                                                                    placeholder={
                                                                        formik
                                                                            .values
                                                                            .endDate
                                                                    }
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
                                                                    value={
                                                                        formik
                                                                            .values
                                                                            .visibility
                                                                    }
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
                                                                    value={
                                                                        formik
                                                                            .values
                                                                            .subscriptionType
                                                                    }
                                                                    options={createOptions(
                                                                        subscriptionType
                                                                    )}
                                                                    placeholder={getLabelByKey(
                                                                        'subscriptionTypePlaceholder'
                                                                    )}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md="6"
                                                                className="mt-20"
                                                            >
                                                                <FormControl
                                                                    control="input"
                                                                    type="text"
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
                                                                    value={
                                                                        formik
                                                                            .values
                                                                            .membershipFee
                                                                    }
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
                                                                    type="text"
                                                                    name="minimumStudent"
                                                                    fontFamily={
                                                                        fontFamilyRegular
                                                                    }
                                                                    label={getLabelByKey(
                                                                        'minimumStudent'
                                                                    )}
                                                                    value={
                                                                        formik
                                                                            .values
                                                                            .minimumStudent
                                                                    }
                                                                    padding="8px 10px"
                                                                    placeholder={getLabelByKey(
                                                                        'minimumStudentPlaceholder'
                                                                    )}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Col>
                                                <Col md="6">
                                                    <Col
                                                        md="12"
                                                        className="mt-20"
                                                    >
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
                                                            defaultImage={
                                                                formik.values
                                                                    .bannerPicture
                                                            }
                                                        />

                                                        {/* <OverlayImages
                                                            backgroundImg={
                                                                formik.values
                                                                    .bannerPicture ||
                                                                ''
                                                            }
                                                            overlayImg={false}
                                                            isEditable={true}
                                                        /> */}
                                                    </Col>
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
                                                type="text"
                                                name="dailySubsFee"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'dailySubscriptionFees'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'dailySubscriptionFeesPlaceholder'
                                                )}
                                                value={
                                                    formik.values.dailySubsFee
                                                }
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
                                                // suffix={
                                                //     <img
                                                //         src={doller as string}
                                                //         alt=""
                                                //         width={13}
                                                //         height={27}
                                                //     />
                                                // }
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="weeklySubsFee"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'weeklySubscriptionFees'
                                                )}
                                                padding="8px 10px"
                                                placeholder={getLabelByKey(
                                                    'weeklySubscriptionFeesPlaceholder'
                                                )}
                                                value={
                                                    formik.values.weeklySubsFee
                                                }
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
                                                type="text"
                                                name="monthlySubsFee"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'monthlySubscriptionFees'
                                                )}
                                                value={
                                                    formik.values.monthlySubsFee
                                                }
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
                                                type="text"
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
                                                type="date"
                                                name="allowStudentCancel"
                                                label={getLabelByKey(
                                                    'allowToStudentCancel'
                                                )}
                                                padding="7px"
                                                fontFamily={fontFamilyRegular}
                                                fontSize="16px"
                                                max={6}
                                                placeholder={
                                                    formik.values
                                                        .allowStudentCancel
                                                }
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
                                                placeholder={
                                                    formik.values.refundDate
                                                }
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
                                                placeholder={
                                                    formik.values
                                                        .bookingCancelStartDate
                                                }
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
                                                placeholder={
                                                    formik.values
                                                        .bookingCancelEndDate
                                                }
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="text"
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

                                        <Col md="6">
                                            <CheckboxesSelect
                                                name="accommodation"
                                                label={getLabelByKey(
                                                    'accommodate'
                                                )}
                                                list={convertedAccommodation} // Use the converted array here                                                showErrorMsgInList={false}
                                                placeholder={showAccommodation(
                                                    formik.values?.accommodation
                                                )}
                                                showErrorMsgInList={false}
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
                                                value={
                                                    formik.values.description
                                                }
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
                                        loading={isLoading}
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

export default UpdateMembership
