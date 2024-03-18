import { Card } from 'antd'
import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import { ViewBranchStyled } from './styles'
import { useParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'
// import AddPaymentBranch from '../AddPaymentBranch/AddPaymentBranch'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import AddPaymentInfo from '../BranchPayment/AddPaymentinfo'
import { useEffect, useState } from 'react'
import useBranch from '../hooks/useBranch'
const ViewBranch = (): JSX.Element => {
    const { branchId } = useParams()

    const { loading } = useSelector((state: RootState) => state.branchData)
    const { getbranchbyid } = useBranch()
    const [Branch, setBranch] = useState<any>()
    useEffect(() => {
        const getbranch = async (): Promise<void> => {
            const data = await getbranchbyid(Number(branchId))
            setBranch(data)
        }
        getbranch()
    }, [branchId])

    const { language, currency } = useSelector(
        (state: RootState) => state.appData.data.dropdowns
    )

    const { selectedLanguage } = useSelector(
        (state: RootState) => state?.selectedLanguage
    )
    const defaultLanguage = language.find(
        (item: DataTypesWithIdAndMultipleLangLabel) =>
            +item.id == +Branch?.defaultLanguageId
    )

    const defaultCurrency = currency.find(
        (item: DataTypesWithIdAndMultipleLangLabel) =>
            +item.id == +Branch?.defaultCurrencyId
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
                        : `${activitiesName},${
                              (facilities[index] as any)[selectedLanguage]
                          }`
            }
        })

        if (activitiesName !== '') return activitiesName
        return '--'
    }
    const activitiesToShow = Branch?.activities || ''
    const facilitiesToShow = Branch?.facilities || ''
    const BranchTypeToShow = Branch?.branchType || ''

    return (
        <ViewBranchStyled>
            <OverlayImages
                backgroundImg={Branch?.bannerPicture || ''}
                overlayImg={Branch?.profilePicture || ''}
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
                        <div className="list-item ">
                            <div className="list-item-title">Phone Number</div>
                            <div className="list-item-value">+923000000000</div>
                        </div>
                    </Col>
                </Row>
            </Card>
            <h3>Branch Information</h3>

            <Card>
                <Row>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">
                                {/* {getLabelByKey("branchName")} */}
                                Branch Name
                            </div>
                            <div className="list-item-value">
                                {Branch?.branchName || '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">
                                Branch Type
                                {/* {getLabelByKey("branchType")} */}
                            </div>
                            <div className="list-item-value">
                                {showBusinessType(BranchTypeToShow as number)}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">
                                Branch Phone Number
                                {/* {getLabelByKey("branchPhoneNumber")} */}
                            </div>
                            <div className="list-item-value">
                                {Branch?.phoneNumber || '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">
                                Address
                                {/* {getLabelByKey("address")} */}
                            </div>
                            <div className="list-item-value">
                                {Branch?.address || '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">
                                {/* {getLabelByKey("defaultLanguage")} */}
                                Default Language
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
                                {/* {getLabelByKey("defaultCurrency")} */}
                                Default Currency
                            </div>
                            <div className="list-item-value">
                                {(defaultCurrency &&
                                    (defaultCurrency as any)[
                                        selectedLanguage
                                    ]) ||
                                    '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="list-item">
                            <div className="list-item-title">
                                {/* {getLabelByKey("activity")} */}
                                Activity
                            </div>
                            <div className="list-item-value">
                                {/* { {const actg=Branch?.activities}} */}
                                {showActivities(activitiesToShow)}
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="list-item">
                            <div className="list-item-title">
                                {/* {getLabelByKey("facilities")} */}
                                Facilities
                            </div>
                            <div className="list-item-value">
                                {showFacilities(facilitiesToShow)}
                            </div>
                        </div>
                    </Col>
                    <Col md="12">
                        <div className="list-item mb-0">
                            <div className="list-item-title">
                                {/* {getLabelByKey("description")} */}
                                Description
                            </div>
                            <div className="list-item-value">
                                {Branch?.description || '--'}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
            {loading && <LoadingOverlay message="" />}

            <AddPaymentInfo />
        </ViewBranchStyled>
    )
}

export default ViewBranch
