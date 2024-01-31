import { Card } from 'antd'
import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import { ViewSchoolStyled } from './styles'
import { useNavigate, useParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'
import { useEffect, useState } from 'react'
import CustomButton from '../../../components/CustomButton/CustomButton'
import useSchool from '../../../hooks/useCreateSchool'
import SchoolViewTabs from './SchoolViewTabs'

import {
    lightBlue3,
    fontFamilyMedium,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
import {
    OwnerDataTypes,
    SchoolDataType,
    getSchoolByUserId,
} from '../../../redux/features/dashboard/dashboardDataSlice'
import Head from '../../../components/Head/Head'
import { StudentViewStyling } from '../styles'
const ViewSchool = (): JSX.Element => {
    const navigate = useNavigate()
    const { getLabelByKey } = useScreenTranslation('schoolCreate')
    const { deleteConfirmation, deletemodal, WarningModal, getSchoolbyId } =
        useSchool()
    const { branchData } = useSelector((state: RootState) => state.branchData)
    const { franchiseData } = useSelector(
        (state: RootState) => state.franchiseData
    )
    const [schoolData, setschoolData] = useState<SchoolDataType>()
    const [OwnerData, setOwnerData] = useState<OwnerDataTypes>()

    const { schoolId } = useParams()

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response: any = await getSchoolbyId(Number(schoolId))
                if (response) {
                    setschoolData(response.results)
                    setOwnerData(response.results.ownerData)
                }

                // eslint-disable-next-line @typescript-eslint/no-shadow
            } catch (error) {
            } finally {
            }
        }

        fetchData()
    }, [schoolId])

    // console.log('>>im view school', schoolData)

    // console.log(
    //     '>>DATATA',
    //     branchData?.data?.length,
    //     franchiseData?.data?.length
    // )
    // const { data } = useSelector((state: RootState) => state.loginData)

    const { language, currency } = useSelector(
        (state: RootState) => state.appData.data.dropdowns
    )
    const { activities } = useSelector(
        (state: RootState) => state.appData.data.statusData
    )
    const { facilities } = useSelector(
        (state: RootState) => state.appData.data.statusData
    )
    const { businessTypes } = useSelector(
        (state: RootState) => state.appData.data.dropdowns
    )
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    const defaultLanguage = language.find(
        (item: DataTypesWithIdAndMultipleLangLabel) =>
            +item.id == +Number(schoolData?.defaultLanguageId)
    )
    const defaultCurrency = currency.find(
        (item: DataTypesWithIdAndMultipleLangLabel) =>
            +item.id == +Number(schoolData?.defaultCurrencyId)
    )
    const handleUpdateClick = (): void => {
        navigate(`/school/edit/:${schoolData?.schoolId}`)
    }

    // const handleDeleteClick = async (): Promise<void> => {
    //     Createmodal().modalComponent
    //     // if (schoolData.schoolId > 0) {
    //     //     await deleteSchool(schoolData.schoolId)
    //     //     navigate('/school/create')
    //     // } else navigate('/school/create')
    // }

    // useEffect(() => {
    //     const localStorageData = localStorage.getItem('ennvision-admin:token')
    //     const loginData = JSON.parse(localStorageData as any)
    //     if (!loginData?.schoolId) {
    //         navigate('/school/create')
    //         return
    //     }
    // if (!schoolData || !schoolData.schoolId) {
    //     store.dispatch(getSchoolByUserId())
    // }
    // }, [])

    // const handleDeleteClick = async (): Promise<void> => {
    //     if (schoolData.schoolId > 0) {
    //         await deleteSchool(schoolData.schoolId)
    //         navigate('/school/create')
    //     } else navigate('/school/create')
    // }

    const showBusinessType = (_businessType: number): string => {
        const index = businessTypes.findIndex((business: any) => {
            return business.id === _businessType
        })

        if (index !== -1) {
            return (businessTypes[index] as any)[selectedLanguage]
        }

        return '--'
    }

    const showActivities = (_activities: string): string => {
        const activitiesArr = _activities.split(',')

        let activitiesName = ''
        activitiesArr.map((activity) => {
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
        if (activitiesName !== '') return activitiesName
        return '--'
    }
    const showFacilities = (_Facilities: string): string => {
        const activitiesArr = _Facilities.split(',')

        let activitiesName = ''
        activitiesArr.map((facility) => {
            const index = facilities.findIndex(
                (acts: any) => acts.id === facility
            )
            if (index !== -1) {
                activitiesName =
                    activitiesName === ''
                        ? (facilities[index] as any)[selectedLanguage]
                        : `${activitiesName}, ${
                              (facilities[index] as any)[selectedLanguage]
                          }`
            }
        })

        if (activitiesName !== '') return activitiesName
        return '--'
    }
    // useEffect(() => {
    //     console.log('>>im view school')

    //     store.dispatch(getSchoolByUserId())
    // }, [])
    return (
        <>
            <Head title="School Information" />

            <ViewSchoolStyled>
                {WarningModal().modalComponent}
                {deletemodal().modalComponent}
                {deleteConfirmation(Number(schoolId)).modalComponent}

                <OverlayImages
                    backgroundImg={schoolData?.bannerPicture || ''}
                    overlayImg={schoolData?.profilePicture || ''}
                    isEditable={true}
                />
                <h3>Owner Information</h3>
                <Card>
                    <Row>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Owner First Name
                                </div>
                                <div className="list-item-value">
                                    {' '}
                                    {OwnerData?.firstName || '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Owner Last Name
                                </div>
                                <div className="list-item-value">
                                    {OwnerData?.lastName || '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">Email</div>
                                <div className="list-item-value">
                                    {OwnerData?.emailAddress || '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item ">
                                <div className="list-item-title">
                                    Phone Number
                                </div>
                                <div className="list-item-value">
                                    {OwnerData?.phoneNumber || '--'}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
                <h3>School Informations</h3>
                <Card>
                    <Row>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('businessName')}
                                </div>
                                <div className="list-item-value">
                                    {schoolData?.businessName || '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('businessType')}
                                </div>
                                <div className="list-item-value">
                                    {showBusinessType(
                                        schoolData?.businessType as number
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('businessPhoneNumber')}
                                </div>
                                <div className="list-item-value">
                                    {schoolData?.phoneNumber || '--'}
                                </div>
                            </div>
                        </Col>

                        <Col md="12">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('address')}
                                </div>
                                <div className="list-item-value">
                                    {schoolData?.address || '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="12">
                            <Row>
                                <Col md="4">
                                    <div className="list-item">
                                        <div className="list-item-title">
                                            {getLabelByKey('belts')}
                                        </div>
                                        <div className="list-item-value">
                                            {schoolData?.rank
                                                ? 'Yes'
                                                : schoolData?.rank === false
                                                  ? 'No'
                                                  : '--'}
                                        </div>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="list-item">
                                        <div className="list-item-title">
                                            {getLabelByKey('defaultLanguage')}
                                        </div>

                                        <div className="list-item-value">
                                            {(defaultLanguage &&
                                                (defaultLanguage as any)[
                                                    selectedLanguage
                                                ]) ||
                                                '--'}
                                        </div>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="list-item">
                                        <div className="list-item-title">
                                            {getLabelByKey('defaultCurrency')}
                                        </div>
                                        <div className="list-item-value">
                                            {(defaultLanguage &&
                                                (defaultCurrency as any)[
                                                    selectedLanguage
                                                ]) ||
                                                '--'}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('activity')}
                                </div>
                                <div className="list-item-value">
                                    {showActivities(
                                        String(schoolData?.activities)
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('facilities')}
                                </div>
                                <div className="list-item-value">
                                    {showFacilities(
                                        String(schoolData?.facilities)
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col md="12">
                            <div className="list-item mb-0">
                                <div className="list-item-title">
                                    {getLabelByKey('description')}
                                </div>
                                <div className="list-item-value">
                                    {schoolData?.description || '--'}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
                <div className="mt-20 mb-3 d-flex justify-content-end gap-3">
                    {/* <div>
                        <CustomButton
                            bgcolor={lightBlue3}
                            textTransform="Capitalize"
                            color={maastrichtBlue}
                            padding="11px 40.50px"
                            fontFamily={`${fontFamilyMedium}`}
                            width="fit-content"
                            type="submit"
                            title="Delete Account"
                            fontSize="18px"
                            loading={loading}
                            clicked={() => {
                                if (
                                    franchiseData?.data[0]?.franchiseId > 0 ||
                                    branchData?.data[0]?.branchId !== 0
                                ) {
                                    setIsShowWarningModal(true)
                                } else setIsShowModal(true)
                            }}
                        />
                    </div> */}
                    <CustomButton
                        bgcolor={lightBlue3}
                        textTransform="Capitalize"
                        color={maastrichtBlue}
                        padding="11px 40.50px"
                        fontFamily={`${fontFamilyMedium}`}
                        width="fit-content"
                        type="submit"
                        title="Edit Account"
                        fontSize="18px"
                        clicked={handleUpdateClick}
                    />
                </div>
            </ViewSchoolStyled>
            <SchoolViewTabs />
        </>
    )
}

export default ViewSchool
