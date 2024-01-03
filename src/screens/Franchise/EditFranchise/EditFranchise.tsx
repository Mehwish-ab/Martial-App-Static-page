import { CreateSchoolStyled } from '../../CreateSchool/styles'
import { ErrorMessage, Formik } from 'formik'
import { Form } from 'antd'

import { Col, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { RootState } from '../../../redux/store'
import { useParams } from 'react-router-dom'
import {
    BELTS_SELECT_OPTIONS,
    SelectOptionsDataTypes,
} from '../../Home/constants'
import { validationFinder } from '../../../utils/utilities'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'
import FormControl from '../../../components/FormControl'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    pureDark,
} from '../../../components/GlobalStyle'
import CustomPhoneInput from '../../../components/CustomPhoneInput/CustomPhoneInput'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { CreateFranchiseInitialValues } from '../constant'
import { useEffect, useState } from 'react'
import useFranchise from '../hooks/useFranchise'
import PlacesAutoCompleteInput from '../../../maps/PlacesAutocomplete'
import CheckboxesSelect from '../../../components/CustomCheckbox/CheckboxesSelect'
import { FranchiseDataType } from '../../../redux/features/franchise/franchiseSlice'

const EditFranchise = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('franchiseUpdate')
    const {
        statusData: { activities, facilities },
        dropdowns: { currency, language, businessTypes },
    } = useSelector((state: RootState) => state.appData.data)

    // const { data: franchiseData } = useSelector(
    //   (state: RootState) => state.franchiseData.franchiseData
    // );
    const { loading, editFranchise, getFranchisebyid, UpdateModal } =
        useFranchise()
    const { franchiseId } = useParams()
    // const [franchiseToEdit, setfranchiseToEdit] = useState({});
    // const handleSubmit = () => {};
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    const [franchiseDatas, setfranchiseDatas] = useState<
        FranchiseDataType | undefined
    >()
    const franchiseName = validationFinder('BUSINESS_NAME')!
    const franchiseNameReg = new RegExp(franchiseName.pattern)
    const franchisePhoneNumber = validationFinder('PHONE_NUMBER')!

    const handleEditSchool = async (
        value: CreateFranchiseInitialValues
    ): Promise<void> => {
        console.log('zamisha', value)

        await editFranchise(Number(franchiseId), value)
    }

    const createOptions = (
        list: DataTypesWithIdAndMultipleLangLabel[]
    ): SelectOptionsDataTypes[] => {
        const options: SelectOptionsDataTypes[] = []
        list.forEach((item) => {
            const obj = {
                label: (item as unknown as string)[Number(selectedLanguage)],
                value: item.id,
            }

            options.push(obj)
        })

        return options
    }

    useEffect(() => {
        const fetchinfo = async (): Promise<void> => {
            const data = await getFranchisebyid(Number(franchiseId))
            setfranchiseDatas(data as any)
        }
        fetchinfo()
    }, [])

    const showActivities = (_activities: string[]): string => {
        let activitiesName = ''
        _activities.map((activity) => {
            const index = activities.findIndex((act) => act.id === activity)
            if (index !== -1) {
                activitiesName =
                    activitiesName === ''
                        ? (activities[index] as any)[selectedLanguage]
                        : `${activitiesName}, ${
                              (activities[index] as any)[selectedLanguage]
                          }`
            }
        })
        if (activitiesName.length > 40) {
            return `${activitiesName.slice(0, 40)}...`
        }
        return activitiesName || getLabelByKey('activity')
    }
    const showFacilities = (_facilities: string[]): string => {
        let facilitiesName = ''
        _facilities.map((facility) => {
            const index = facilities.findIndex(
                (facts: any) => facts.id === facility
            )
            if (index !== -1) {
                facilitiesName =
                    facilitiesName === ''
                        ? (facilities[index] as any)[selectedLanguage]
                        : `${facilitiesName}, ${
                              (facilities[index] as any)[selectedLanguage]
                          }`
            }
        })

        if (facilitiesName.length > 40) {
            return `${facilitiesName.slice(0, 40)}...`
        }
        return facilitiesName || getLabelByKey('facilities')
    }
    const initialValues: CreateFranchiseInitialValues = {
        franchiseName: franchiseDatas ? franchiseDatas.franchiseName : '--',
        franchiseType: franchiseDatas ? franchiseDatas.franchiseType : '--',
        address: franchiseDatas ? franchiseDatas?.address : '--',
        franchisePhoneNumber: franchiseDatas
            ? franchiseDatas?.phoneNumber
            : '--',
        rank: franchiseDatas?.rank ? 1 : 2,
        description: franchiseDatas ? franchiseDatas?.description : '--',
        selectedActivities: franchiseDatas
            ? franchiseDatas?.activities?.split(',').map(String)
            : [],
        selectedFacilities: franchiseDatas
            ? franchiseDatas?.facilities?.split(',').map(String)
            : [],
        defaultLanguage: franchiseDatas
            ? franchiseDatas.defaultLanguageId
            : '--',
        defaultCurrency: franchiseDatas
            ? franchiseDatas.defaultCurrencyId
            : '--',
        stripePublishableKey: '',
        stripeSecretKey: '',
        cardAccessToken: '',
        cardClientId: '',
        cardWebHook: '',
        cardClientSecret: '',
        schoolStripeMethod: false,
        schoolGclMethod: false,
    }
    const validationSchema = Yup.object({
        branchName: Yup.string()
            .required(franchiseName?.notBlankMsgEn)
            .matches(franchiseNameReg, franchiseName?.patternMsgEn),
        // address: Yup.string()
        //   .required(address.notBlankMsgEn)
        //   .matches(addressReg, address?.patternMsgEn),
        branchType: Yup.string().required('Please select franchise type'),
        branchPhoneNumber: Yup.string().required(
            franchisePhoneNumber?.notBlankMsgEn
        ),
        rank: Yup.string().required('Please select ranks'),
        description: Yup.string().required('Please enter description'),
        selectedActivities: Yup.array()
            .of(Yup.string().required('Select an activity'))
            .min(1, 'Select at least one activity'),
        selectedFacilities: Yup.array()
            .of(Yup.string().required('Select an activity'))
            .min(1, 'Select at least one facility'),
        // defaultLanguage: Yup.string().required("Please select default language"),
        // defaultCurrency: Yup.string().required("Please select default currency"),
        // stripePublishableKey: Yup.string().when("schoolStripeMethod", {
        //   is: false,
        //   then: Yup.string().required("Please enter stripe publishable key"),
        //   otherwise: Yup.string().notRequired(),
        // }),
        // stripeSecretKey: Yup.string().when("schoolStripeMethod", {
        //   is: false,
        //   then: Yup.string().required("Please enter stripe secret key"),
        //   otherwise: Yup.string().notRequired(),
        // }),
        // cardAccessToken: Yup.string().when("schoolGclMethod", {
        //   is: false,
        //   then: Yup.string().required("Please enter card access token"),
        //   otherwise: Yup.string().notRequired(),
        // }),
        // cardClientId: Yup.string().when("schoolGclMethod", {
        //   is: false,
        //   then: Yup.string().required("Please enter card client id"),
        //   otherwise: Yup.string().notRequired(),
        // }),
        // cardWebHook: Yup.string().when("schoolGclMethod", {
        //   is: false,
        //   then: Yup.string().required("Please enter card web hook"),
        //   otherwise: Yup.string().notRequired(),
        // }),
        // cardClientSecret: Yup.string().when("schoolGclMethod", {
        //   is: false,
        //   then: Yup.string().required("Please enter card client secret"),
        //   otherwise: Yup.string().notRequired(),
        // }),

        // schoolStripeMethod: Yup.boolean(),
        // schoolGclMethod: Yup.boolean(),
    })

    return (
        <CreateSchoolStyled>
            {UpdateModal().modalComponent}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleEditSchool}
                enableReinitialize
            >
                {(formik) => {
                    return (
                        <Form
                            name="basic"
                            onFinish={formik.handleSubmit}
                            autoComplete="off"
                        >
                            <div className="bg-white form">
                                <h3>Franchise Information</h3>

                                <Row>
                                    <Col md="4" className="mt-20">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="franchiseName"
                                            label={getLabelByKey(
                                                'franchiseName'
                                            )}
                                            fontFamily={fontFamilyRegular}
                                            fontSize="16px"
                                            // prefix={<img src={lock_icon} alt="lock_icon" />}
                                            max={6}
                                            placeholder={getLabelByKey(
                                                'franchiseName'
                                            )}
                                            className={
                                                formik.errors.franchiseName &&
                                                formik.touched.franchiseName
                                                    ? 'is-invalid'
                                                    : 'customInput'
                                            }
                                        />
                                    </Col>
                                    <Col md="4" className="mt-20">
                                        <FormControl
                                            control="select"
                                            type="text"
                                            name="franchiseType"
                                            fontFamily={fontFamilyRegular}
                                            // prefix={<img src={lock_icon} alt="lock_icon" />}
                                            label={getLabelByKey(
                                                'franchiseType'
                                            )}
                                            placeholder={getLabelByKey(
                                                'franchiseType'
                                            )}
                                            className={
                                                formik.errors.franchiseType &&
                                                formik.touched.franchiseType
                                                    ? 'is-invalid'
                                                    : 'customInput'
                                            }
                                            options={createOptions(
                                                businessTypes
                                            )}
                                            defaultValue={
                                                franchiseId
                                                    ? createOptions(
                                                          businessTypes
                                                      ).find(
                                                          (item) =>
                                                              item.value ===
                                                              formik.values
                                                                  .franchiseType
                                                      )?.label
                                                    : undefined
                                            }
                                        />
                                        {
                                            console.log(
                                                'hello',
                                                initialValues.franchiseType
                                            ) as any
                                        }
                                    </Col>
                                    <Col md="4" className="mt-20">
                                        <CustomPhoneInput
                                            label={getLabelByKey(
                                                'franchisePhoneNumber'
                                            )}
                                            name="franchisePhoneNumber"
                                            value={
                                                formik.values
                                                    .franchisePhoneNumber
                                            }
                                            placeholder={getLabelByKey(
                                                'franchisePhoneNumber'
                                            )}
                                            limitMaxLength={true}
                                            handleOnChange={(e: string) => {
                                                formik.setFieldValue(
                                                    'franchisePhoneNumber',
                                                    e
                                                )
                                            }}
                                        />
                                        <ErrorMessage
                                            name={'franchisePhoneNumber'}
                                        >
                                            {(msg) => (
                                                <div className="error-message is-invalid">
                                                    {msg}
                                                </div>
                                            )}
                                        </ErrorMessage>
                                    </Col>
                                    <Col md="4" className="mt-20">
                                        <PlacesAutoCompleteInput
                                            label={getLabelByKey('address')}
                                            placeholder={getLabelByKey(
                                                'enterCompleteAddress'
                                            )}
                                            handleChange={(val: unknown) => {
                                                formik.setFieldValue(
                                                    'address',
                                                    val
                                                )
                                            }}
                                            className={
                                                formik.errors.address &&
                                                formik.touched.address
                                                    ? 'is-invalid'
                                                    : 'customInput'
                                            }
                                            formik={formik}
                                            name="address"
                                            value={formik.values.address}
                                        />
                                    </Col>
                                    <Col md="8">
                                        <Row>
                                            <Col md="4" className="mt-20">
                                                <FormControl
                                                    control="select"
                                                    type="text"
                                                    name="rank"
                                                    fontFamily={
                                                        fontFamilyRegular
                                                    }
                                                    // prefix={<img src={lock_icon} alt="lock_icon" />}
                                                    label={getLabelByKey(
                                                        'ranks'
                                                    )}
                                                    // defaultValue={formik.values.rank === 1 ? "Yes" : "No"}
                                                    placeholder={getLabelByKey(
                                                        'ranks'
                                                    )}
                                                    className={
                                                        formik.errors.rank &&
                                                        formik.touched.rank
                                                            ? 'is-invalid'
                                                            : 'customInput'
                                                    }
                                                    options={
                                                        BELTS_SELECT_OPTIONS
                                                    }
                                                    defaultValue={
                                                        franchiseId
                                                            ? BELTS_SELECT_OPTIONS.find(
                                                                  (item) =>
                                                                      item.value ===
                                                                      initialValues.rank
                                                              )?.label
                                                            : undefined
                                                    }
                                                />
                                            </Col>
                                            <Col md="4" className="mt-20">
                                                <FormControl
                                                    control="select"
                                                    type="text"
                                                    name="defaultLanguage"
                                                    fontFamily={
                                                        fontFamilyRegular
                                                    }
                                                    label={getLabelByKey(
                                                        'defaultLanguage'
                                                    )}
                                                    placeholder={getLabelByKey(
                                                        'defaultLanguage'
                                                    )}
                                                    className={
                                                        formik?.errors
                                                            ?.defaultLanguage &&
                                                        formik?.touched
                                                            ?.defaultLanguage
                                                            ? 'is-invalid'
                                                            : 'customInput'
                                                    }
                                                    options={createOptions(
                                                        language
                                                    )}
                                                    value={
                                                        franchiseId
                                                            ? createOptions(
                                                                  language
                                                              ).find(
                                                                  (item) =>
                                                                      item.value ===
                                                                      formik
                                                                          .values
                                                                          .defaultLanguage
                                                              )?.label
                                                            : undefined
                                                    }
                                                />
                                            </Col>
                                            <Col md="4" className="mt-20">
                                                <FormControl
                                                    control="select"
                                                    type="text"
                                                    name="defaultCurrency"
                                                    fontFamily={
                                                        fontFamilyRegular
                                                    }
                                                    label={getLabelByKey(
                                                        'defaultCurrency'
                                                    )}
                                                    placeholder={getLabelByKey(
                                                        'defaultCurrency'
                                                    )}
                                                    className={
                                                        formik.errors
                                                            .defaultCurrency &&
                                                        formik.touched
                                                            .defaultCurrency
                                                            ? 'is-invalid'
                                                            : 'customInput'
                                                    }
                                                    options={createOptions(
                                                        currency
                                                    )}
                                                    value={
                                                        franchiseId
                                                            ? createOptions(
                                                                  currency
                                                              ).find(
                                                                  (item) =>
                                                                      item.value ===
                                                                      formik
                                                                          .values
                                                                          .defaultCurrency
                                                              )?.label
                                                            : undefined
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md="6">
                                        <CheckboxesSelect
                                            name="selectedActivities"
                                            label="Activity"
                                            placeholder={showActivities(
                                                formik.values.selectedActivities
                                            )}
                                            showErrorMsgInList={false}
                                            list={activities}
                                        />
                                    </Col>

                                    <Col md="6">
                                        <CheckboxesSelect
                                            name="selectedFacilities"
                                            label="Facility"
                                            list={facilities}
                                            placeholder={showFacilities(
                                                formik.values.selectedFacilities
                                            )}
                                            showErrorMsgInList={false}
                                        />
                                    </Col>

                                    <div className="mt-20">
                                        <FormControl
                                            control="textarea"
                                            type="text"
                                            name="description"
                                            fontFamily={fontFamilyRegular}
                                            // prefix={<img src={lock_icon} alt="lock_icon" />}
                                            label={getLabelByKey('description')}
                                            padding="10px"
                                            placeholder={getLabelByKey(
                                                'description'
                                            )}
                                            className={
                                                formik.errors.description &&
                                                formik.touched.description
                                                    ? 'is-invalid'
                                                    : 'customInput'
                                            }
                                            height="200px"
                                        />
                                    </div>

                                    {/* <PaymentInformation formik={formik} showPaymentMethods={true} /> */}
                                </Row>
                            </div>

                            <div className="mt-20 d-flex justify-content-end">
                                <CustomButton
                                    bgcolor={lightBlue3}
                                    textTransform="Captilize"
                                    color={pureDark}
                                    padding="11px 40.50px"
                                    fontFamily={`${fontFamilyMedium}`}
                                    width="fit-content"
                                    type="submit"
                                    title={getLabelByKey('primaryButton')}
                                    fontSize="17px"
                                    // clicked={() =>
                                    //     handleEditSchool(formik.values)
                                    // }
                                    disabled={!formik.isValid}
                                    loading={loading}
                                />
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </CreateSchoolStyled>
    )
}

export default EditFranchise
