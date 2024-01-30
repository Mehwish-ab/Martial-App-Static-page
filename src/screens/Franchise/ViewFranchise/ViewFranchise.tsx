import { Card } from 'antd'
import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import { ViewFranchiseStyled } from './styles'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import useFranchise from '../hooks/useFranchise'
import { RootState } from '../../../redux/store'
// import type { ColumnsType } from 'antd/es/table'
// import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'
// import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import { FranchiseDataType } from '../../../redux/features/franchise/franchiseSlice'
import { useEffect, useState } from 'react'
import AddPaymentFranchise from '../AddPaymentFranchise/AddPaymentFranchise'
import Head from '../../../components/Head/Head'
const ViewFranchise = (): JSX.Element => {
    // const navigate = useNavigate()
    const { schoolData } = useSelector(
        (state: RootState) => state.dashboardData
    )
    const { franchiseId } = useParams()

    const { getFranchisebyid } = useFranchise()
    const [franchisedata, setFranchise] = useState<FranchiseDataType | any>(
        undefined
    )
    console.log(franchiseId, 'ids')
    const { language, currency } = useSelector(
        (state: RootState) => state.appData.data.dropdowns
    )
    const { activities } = useSelector(
        (state: RootState) => state.appData.data.statusData
    )
    const { facilities } = useSelector(
        (state: RootState) => state.appData.data.statusData
    )
    const { selectedLanguage } = useSelector(
        (state: RootState) => state?.selectedLanguage
    )
    const { businessTypes } = useSelector(
        (state: RootState) => state.appData.data.dropdowns
    )
    const defaultLanguage = language.find(
        (item: DataTypesWithIdAndMultipleLangLabel) =>
            +item.id == +franchisedata?.defaultLanguageId
    )
    const defaultCurrency = currency.find(
        (item: DataTypesWithIdAndMultipleLangLabel) =>
            +item.id == +franchisedata?.defaultCurrencyId
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
    useEffect(() => {
        const fetchstripe = async (): Promise<unknown> => {
            const data = await getFranchisebyid(Number(franchiseId))
            setFranchise(data as any)
            return data
        }
        fetchstripe()
    }, [franchiseId])

    console.log('School data', schoolData)
    // const location = useLocation()
    const { getLabelByKey } = useScreenTranslation('franchiseCreate')
    // const navigation = (
    //     record: FranchiseDataType,
    //     redirectTo: string
    // ): void => {
    //     switch (redirectTo) {
    //         case 'edit':
    //             navigate(`/franchise/edit/${record.franchiseId}`, {
    //                 state: {
    //                     franchiseToEdit: record as FranchiseDataType,
    //                 },
    //             })
    //             break

    //         case 'view':
    //             navigate(`/franchise/view/${record.franchiseId}`, {
    //                 state: {
    //                     franchise: record as FranchiseDataType,
    //                 },
    //             })
    //     }
    // }
    // const columns: ColumnsType<FranchiseDataType> = [
    //     {
    //         title: 'Payment Information',
    //         dataIndex: 'paymentMethod',
    //         key: 'paymentMethod',
    //     },
    //     {
    //         title: 'Account Nmae',
    //         dataIndex: 'accountNumber',
    //         key: 'accountNumber',
    //     },
    //     {
    //         title: 'Country Name',
    //         dataIndex: 'countryName',
    //         key: 'countryName',
    //     },
    //     {
    //         title: 'Mode',
    //         dataIndex: 'mode',
    //         key: 'mode',
    //         render: (DummyData) => {
    //             return (
    //                 <div className={DummyData}>
    //                     <button>{DummyData}</button>
    //                     <img src={StatusActiveError} alt="image" />
    //                 </div>
    //             )
    //         },
    //     },
    //     {
    //         title: 'Status',
    //         dataIndex: 'status',
    //         key: 'Staus',
    //         render: (DummyData) => {
    //             return (
    //                 <div className={DummyData}>
    //                     <button>{DummyData}</button>
    //                     <img src={StatusActiveError} alt="image" />
    //                 </div>
    //             )
    //         },
    //     },
    //     {
    //         title: 'Action',
    //         key: 'action',
    //         render: (
    //             value: any,
    //             record: FranchiseDataType,
    //             index: number
    //         ): any => {
    //             const items = [
    //                 {
    //                     key: '1',
    //                     label: 'View',
    //                     onClick: () => navigation(record, 'view'),
    //                 },
    //                 {
    //                     key: '2',
    //                     label: 'Edit',
    //                     onClick: () => navigation(record, 'edit'),
    //                 },
    //                 {
    //                     key: '3',
    //                     label: 'Payment',
    //                     onClick: () => navigation(record, 'payment'),
    //                 },
    //                 {
    //                     key: '4',
    //                     label: 'Delete',
    //                     onClick: () => navigation(record, 'delete'),
    //                 },
    //             ]
    //             return (
    //                 <Space size="middle">
    //                     <Dropdown menu={{ items }}>
    //                         <img
    //                             src={actionMenuTogglerIcon}
    //                             alt="action menu"
    //                             style={{ cursor: 'pointer' }}
    //                         />
    //                     </Dropdown>
    //                 </Space>
    //             )
    //         },
    //     },
    // ]

    // const Franchise: FranchiseDataType = location.state?.branch

    // const { language, currency } = useSelector(
    //     (state: RootState) => state.appData.data.dropdowns
    // )
    // const { selectedLanguage } = useSelector(
    //     (state: RootState) => state.selectedLanguage
    // )
    // const defaultLanguage = language.find(
    //     (item: DataTypesWithIdAndMultipleLangLabel) =>
    //         +item.id == +Franchise?.defaultCurrencyId
    // )

    // const defaultCurrency = currency.find(
    //     (item: DataTypesWithIdAndMultipleLangLabel) =>
    //         console.log(+item.id == +Franchise?.defaultCurrencyId)
    // )
    console.log('data', franchisedata)
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
    const activitiesToShow = franchisedata?.activities || ''
    const facilitiesToShow = franchisedata?.facilities || ''
    const FranchiseTypeToShow = franchisedata?.franchiseType || ''
    return (
        <>
            <Head title="Franchise Information" />
            <ViewFranchiseStyled>
                <OverlayImages
                    backgroundImg={franchisedata?.bannerPicture || ''}
                    overlayImg={franchisedata?.profilePicture || ''}
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
                <h3>Affiliated Schoool Information</h3>
                <Card>
                    <Row>
                        <Col md="4">
                            <div className="list-item mb-0">
                                <div className="list-item-title">
                                    {getLabelByKey('franchiseName')}
                                </div>
                                <div className="list-item-value">
                                    {schoolData.businessName || '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item mb-0">
                                <div className="list-item-title">
                                    {getLabelByKey('franchiseName')}
                                </div>
                                <div className="list-item-value">
                                    {schoolData.address || '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item mb-0">
                                <div className="list-item-title">
                                    {getLabelByKey('franchiseName')}
                                </div>
                                <div className="list-item-value">
                                    {showBusinessType(
                                        schoolData.businessType as number
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
                <h3>Franchise Information</h3>
                <Card>
                    <Row>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('franchiseName')}
                                </div>
                                <div className="list-item-value">
                                    {franchisedata?.franchiseName}
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('franchiseType')}
                                </div>
                                <div className="list-item-value">
                                    {showBusinessType(
                                        FranchiseTypeToShow as number
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('franchisePhoneNumber')}
                                </div>
                                <div className="list-item-value">
                                    {franchisedata?.phoneNumber || '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('address')}
                                </div>
                                <div className="list-item-value">
                                    {franchisedata?.address || '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="8">
                            <Row>
                                <Col md="4">
                                    <div className="list-item">
                                        <div className="list-item-title">
                                            {getLabelByKey('ranking')}
                                        </div>
                                        <div className="list-item-value">
                                            {franchisedata?.rank ? 'Yes' : 'No'}
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
                                            {(defaultCurrency &&
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
                                    {showActivities(activitiesToShow)}
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('facilities')}
                                </div>
                                <div className="list-item-value">
                                    {showFacilities(facilitiesToShow)}
                                </div>
                            </div>
                        </Col>
                        <Col md="12">
                            <div className="list-item">
                                <div className="list-item-title">
                                    {getLabelByKey('description')}
                                </div>
                                <div className="list-item-value">
                                    {franchisedata?.description || '--'}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>

                <h3>Franchise Plans Subscribed</h3>
                <Card>
                    <Row>
                        <Col md="3">
                            <div className="list-item mb-0">
                                <div className="list-item-title">
                                    {getLabelByKey('franchiseName')}
                                </div>
                                <div className="list-item-value">
                                    {'IMAS - Innovative Martial Arts Systems' ||
                                        // branch.branchName
                                        '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item mb-0">
                                <div className="list-item-title">
                                    {/* {getLabelByKey("franchiseName")} */}
                                    Price
                                </div>
                                <div className="list-item-value">
                                    {'Hutton, United Kingdom' ||
                                        // branch.branchName
                                        '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item mb-0">
                                <div className="list-item-title">
                                    {getLabelByKey('franchiseName')}
                                </div>
                                <div className="list-item-value">
                                    {'Monday, 17th October 2023' ||
                                        // branch.branchName
                                        '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="list-item mb-0">
                                <div className="list-item-title">
                                    {getLabelByKey('franchiseName')}
                                </div>
                                <div className="list-item-value">
                                    {'Auto Renew' ||
                                        // branch.branchName
                                        '--'}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
                <AddPaymentFranchise />
                {/* <AddPaymentMethod>
        {loading && <LoadingOverlay message="" />}
        <h3 className="table-heading">Payment Information</h3>
        <Table
          columns={columns}
          dataSource={DummyData as any}
          scroll={{ x: true }}
        />
      </AddPaymentMethod> */}
            </ViewFranchiseStyled>
        </>
    )
}

export default ViewFranchise
