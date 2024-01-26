import { useState } from 'react'

import { Formik } from 'formik'
import { Form } from 'formik-antd'

import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'

import FormControl from '../../../components/FormControl'
import doller from '../../../assets/images/$.svg'
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
import dollar from '../../../assets/images/$.svg'
import Head from '../../../components/Head/Head'
import { SelectOptionsDataTypes } from '../../Home/constants'
import CheckboxesSelect from '../../../components/CustomCheckbox/CheckboxesSelect'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'
import Images from '../../Home/OverlayImages/images'

const CreateMembership = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('createMembership')
    const { getLabelByKey: getLegalLabelByKey } = useScreenTranslation('legal')
    const [isLoading, setIsLoading] = useState(false)
    const [data, setdatas] = useState<CreateMembershipInitialValues>()
    const [bannerImage, setBannerImage] = useState<File | null>(null)
    const {
        dropdowns: { schoolAccommodation, visibility, subscriptionType },
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
    const { MembershipData } = useSelector(
        (state: RootState) => state.MembershipData
    )

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
        // bannerPicture: '',
    }

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
    const onSubmit = async (
        values: CreateMembershipInitialValues
    ): Promise<void> => {
        try {
            setdatas(values)
            navigate('/membership/classes', {
                state: { data: values, bannerImages: bannerImage },
            })
        } catch (error: unknown) {}
    }
    return (
        <>
            <Head title="Membership Create" />
            <CreateClassStyled>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                                                                        <img
                                                                            src={
                                                                                dollar
                                                                            }
                                                                            alt=""
                                                                            width={
                                                                                13
                                                                            }
                                                                            height={
                                                                                27
                                                                            }
                                                                            //onClick={(type = "date")}
                                                                        />
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
                                                    <img
                                                        src={doller as string}
                                                        alt=""
                                                        width={13}
                                                        height={27}
                                                    />
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
                                                    <img
                                                        src={doller as string}
                                                        alt=""
                                                        width={13}
                                                        height={27}
                                                    />
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
                                                    <img
                                                        src={doller as string}
                                                        alt=""
                                                        width={13}
                                                        height={27}
                                                    />
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
                                                    <img
                                                        src={doller as string}
                                                        alt=""
                                                        width={13}
                                                        height={27}
                                                    />
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
                                                    <img
                                                        src={doller as string}
                                                        alt=""
                                                        width={13}
                                                        height={27}
                                                    />
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

export default CreateMembership
