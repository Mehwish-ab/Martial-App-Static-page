import {
    CreateSchoolStyled,
    StudentViewStyling,
} from '../../CreateSchool/styles'
import { ErrorMessage, Formik } from 'formik'
import { Card, Form } from 'antd'

import { Col, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { RootState } from '../../../redux/store'
import { useLocation, useParams } from 'react-router-dom'
import {
    BELTS_SELECT_OPTIONS,
    SelectOptionsDataTypes,
} from '../../Home/constants'
import { validationFinder } from '../../../utils/utilities'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'
// import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import FormControl from '../../../components/FormControl'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    pureDark,
} from '../../../components/GlobalStyle'
import CustomPhoneInput from '../../../components/CustomPhoneInput/CustomPhoneInput'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { CreateBranchInitialValues } from '../constant'
import { BranchDataType } from '../../../redux/features/branch/branchSlice'
import useBranch from '../hooks/useBranch'
import PlacesAutoCompleteInput from '../../../maps/PlacesAutocomplete'
import CheckboxesSelect from '../../../components/CustomCheckbox/CheckboxesSelect'
import { useEffect, useState } from 'react'
import Head from '../../../components/Head/Head'
// import { Item } from 'react-bootstrap/lib/Breadcrumb'

const EditBranch = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('branchCreate')
    const [branchDatas, setBranchDatas] = useState<any>({})

    const {
        statusData: { activities, facilities },
        dropdowns: { currency, language, businessTypes },
    } = useSelector((state: RootState) => state.appData.data)
    const { schoolData } = useSelector(
        (state: RootState) => state.dashboardData
    )
    const { editSchool, getbranchbyid, UpdateModal } = useBranch()
    const { branchId } = useParams()
    const location = useLocation()
    const branchToEdit: BranchDataType = location.state?.branchToEdit
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )

    const branchName = validationFinder('BUSINESS_NAME')!
    const branchNameReg = new RegExp(branchName.pattern)
    // const address = validationFinder('ADDRESS')!
    // const addressReg = new RegExp(address.pattern)
    const branchPhoneNumber = validationFinder('PHONE_NUMBER')!

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

    useEffect(() => {
        async function fetchinfo(): Promise<void> {
            const data = await getbranchbyid(branchToEdit.branchId)
            setBranchDatas(data)
        }
        fetchinfo()
    }, [])
    console.log('branchDatas', schoolData)

    const handleEditSchool = async (value: any): Promise<void> => {
        if (!value.selectedActivities[0] || !value.selectedFacilities[0]) {
            return
        }
        await editSchool(branchToEdit.branchId, value, schoolData.schoolId)
    }
    const initialValues: CreateBranchInitialValues = {
        branchName: branchDatas.branchName,
        branchType: branchToEdit.branchType,
        address: branchDatas.address,
        branchPhoneNumber: branchDatas.phoneNumber,
        // belts: branchToEdit.belts ? 1 : 2,
        defaultLanguage: branchDatas.defaultLanguageId,
        defaultCurrency: branchDatas.defaultCurrencyId,
        rank: branchDatas.rank ? 1 : 2,
        description: branchDatas.description,
        stripePublishableKey: 'branchDatas.stripePublicKey',
        stripeSecretKey: 'branchDatas.stripeSecretKey',
        cardAccessToken: 'ranchDatas.gclAccessToken',
        cardClientId: 'branchDatas.gclClientId',
        cardWebHook: 'branchDatas.gclWebHook',
        cardClientSecret: 'branchDatas.gclClientSecret',
        selectedActivities: branchDatas
            ? branchDatas?.activities?.split(',').map(String)
            : [],
        selectedFacilities: branchDatas
            ? branchDatas?.facilities?.split(',').map(String)
            : [],
        schoolStripeMethod: branchDatas.schoolStripeMethod || false,
        schoolGclMethod: branchDatas.schoolGclMethod || false,
    }
    const validationSchema = Yup.object({
        branchName: Yup.string()
            .required(branchName.notBlankMsgEn)
            .matches(branchNameReg, branchName.patternMsgEn),
        // address: Yup.string()
        //   .required(address.notBlankMsgEn)
        //   .matches(addressReg, address.patternMsgEn),
        branchType: Yup.string().required('Please select branch type'),
        branchPhoneNumber: Yup.string().required(
            branchPhoneNumber.notBlankMsgEn
        ),
        defaultLanguage: Yup.string().required(
            'Please select default language'
        ),
        defaultCurrency: Yup.string().required(
            'Please select default currency'
        ),
        // belts: Yup.string().required("Please select belts"),
        rank: Yup.string().required('Please select ranks'),
        description: Yup.string().required('Please enter description'),
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
        selectedActivities: Yup.array()
            .of(Yup.string().required('Select an activity'))
            .min(1, 'Select at least one activity'),
        selectedFacilities: Yup.array()
            .of(Yup.string().required('Select an activity'))
            .min(1, 'Select at least one facility'),

        schoolStripeMethod: Yup.boolean(),
        schoolGclMethod: Yup.boolean(),
    })
    const showActivities = (_activities: string[]): string => {
        console.log('_activities', _activities)

        let activitiesName = ''
        _activities?.map((activity: string) => {
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
        _facilities?.map((facility) => {
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
    return (
        <>
            <Head title="branch Update" />
            <StudentViewStyling>
                <Card>
                    <h3>Owner Information</h3>
                    <Row className="mt-20">
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Owner First Name
                                </div>
                                <div className="list-item-value">Adnan</div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Owner Last Name
                                </div>
                                <div className="list-item-value">Qureshi</div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">Email</div>
                                <div className="list-item-value">
                                    adnan@gmail.com
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Phone Number
                                </div>
                                <div className="list-item-value">
                                    +923000000000
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </StudentViewStyling>

            <CreateSchoolStyled>
                {UpdateModal().modalComponent}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnMount
                    onSubmit={(values) => handleEditSchool(values)}
                    enableReinitialize
                >
                    {(formik) => {
                        console.log('checking formik values', formik.values)

                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <div className="bg-white form mt-20">
                                    <h3>Branch Information</h3>

                                    <Row>
                                        <Col md="4" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="branchName"
                                                label={getLabelByKey(
                                                    'branchName'
                                                )}
                                                fontFamily={fontFamilyRegular}
                                                fontSize="16px"
                                                // prefix={<img src={lock_icon} alt="lock_icon" />}
                                                max={6}
                                                // border="none"
                                                placeholder={getLabelByKey(
                                                    'branchName'
                                                )}
                                                className={
                                                    formik.errors.branchName &&
                                                    formik.touched.branchName
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                            />
                                        </Col>
                                        <Col md="4" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="branchType"
                                                fontFamily={fontFamilyRegular}
                                                // prefix={<img src={lock_icon} alt="lock_icon" />}
                                                label={getLabelByKey(
                                                    'branchType'
                                                )}
                                                placeholder={getLabelByKey(
                                                    'branchType'
                                                )}
                                                className={
                                                    formik.errors.branchType &&
                                                    formik.touched.branchType
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                                options={createOptions(
                                                    businessTypes
                                                )}
                                                defaultValue={
                                                    branchId
                                                        ? createOptions(
                                                              businessTypes
                                                          ).find(
                                                              (item) =>
                                                                  item.value ===
                                                                  initialValues.branchType
                                                          )?.value
                                                        : undefined
                                                }
                                            />
                                        </Col>
                                        <Col md="4" className="mt-20">
                                            <CustomPhoneInput
                                                label={getLabelByKey(
                                                    'branchPhoneNumber'
                                                )}
                                                name="branchPhoneNumber"
                                                value={
                                                    formik.values
                                                        .branchPhoneNumber
                                                }
                                                placeholder={getLabelByKey(
                                                    'branchPhoneNumber'
                                                )}
                                                limitMaxLength={true}
                                                handleOnChange={(e: string) => {
                                                    formik.setFieldValue(
                                                        'branchPhoneNumber',
                                                        e
                                                    )
                                                }}
                                            />
                                            <ErrorMessage
                                                name={'branchPhoneNumber'}
                                            >
                                                {(msg) => (
                                                    <div
                                                        className="error-message is-invalid"
                                                        style={{
                                                            color: 'red',
                                                            textAlign: 'start',
                                                            marginLeft: '3px',
                                                            fontSize: '12px',
                                                            letterSpacing:
                                                                '1px',
                                                            fontFamily:
                                                                fontFamilyRegular,
                                                        }}
                                                    >
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
                                                handleChange={(val: any) => {
                                                    formik.setFieldValue(
                                                        'address',
                                                        val.selectedAddress
                                                    )
                                                    formik.setFieldValue(
                                                        'latitude',
                                                        val.latitude
                                                    )
                                                    formik.setFieldValue(
                                                        'longitude',
                                                        val.longitude
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

                                        {/* <Col md="4" className="mt-20">
                                                    <FormControl
                                                        control="select"
                                                        type="text"
                                                        name="rank"
                                                        fontFamily={
                                                            fontFamilyMedium
                                                        }
                                                        label={getLabelByKey(
                                                            'belts'
                                                        )}
                                                        // value={formik.values.rank === 1 ? "Yes" : "No"}
                                                        padding="10px"
                                                        placeholder={getLabelByKey(
                                                            'belts'
                                                        )}
                                                        className={
                                                            formik.errors
                                                                .rank &&
                                                            formik.touched.rank
                                                                ? 'is-invalid'
                                                                : 'customInput'
                                                        }
                                                        options={
                                                            BELTS_SELECT_OPTIONS
                                                        }
                                                        value={
                                                            formik.values
                                                                .rank === 1
                                                                ? 'Yes'
                                                                : 'No'
                                                        }
                                                        //     formik.values
                                                        //         ? BELTS_SELECT_OPTIONS.find(
                                                        //               (item) =>
                                                        //                   item.value ===
                                                        //                   formik
                                                        //                       .values
                                                        //                       .rank
                                                        //           )?.label
                                                        //         : undefined
                                                        // }
                                                    />
                                                </Col> */}
                                        <Col md="4" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="defaultLanguage"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'defaultLanguage'
                                                )}
                                                placeholder={getLabelByKey(
                                                    'defaultLanguage'
                                                )}
                                                className={
                                                    formik.errors
                                                        .defaultLanguage &&
                                                    formik.touched
                                                        .defaultLanguage
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                                options={createOptions(
                                                    language
                                                )}
                                                value={
                                                    formik.values
                                                        .defaultLanguage
                                                }
                                            />
                                        </Col>
                                        <Col md="4" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="defaultCurrency"
                                                fontFamily={fontFamilyRegular}
                                                // prefix={<img src={lock_icon} alt="lock_icon" />}
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
                                                    formik.values
                                                        .defaultCurrency
                                                }
                                            />
                                        </Col>
                                        <Col md="6">
                                            <CheckboxesSelect
                                                list={activities}
                                                name="selectedActivities"
                                                label={getLabelByKey(
                                                    'activity'
                                                )}
                                                placeholder={showActivities(
                                                    formik.values
                                                        .selectedActivities
                                                )}
                                                showErrorMsgInList={false}
                                            />
                                        </Col>

                                        <Col md="6">
                                            <CheckboxesSelect
                                                name="selectedFacilities"
                                                label={getLabelByKey(
                                                    'facilities'
                                                )}
                                                placeholder={showFacilities(
                                                    formik.values
                                                        .selectedFacilities
                                                )}
                                                list={facilities}
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
                                                label={getLabelByKey(
                                                    'description'
                                                )}
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
                                        disabled={!formik.isValid}
                                        loading={false}
                                    />
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </CreateSchoolStyled>
        </>
    )
}

export default EditBranch
