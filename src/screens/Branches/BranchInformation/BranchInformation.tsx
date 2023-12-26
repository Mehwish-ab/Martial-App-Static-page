import { Card, Dropdown, List, Space, Table } from 'antd'
import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import { InformationBranchStyled } from './styles'
import { useLocation } from 'react-router-dom'
import { BranchDataType } from '../../../redux/features/branch/branchSlice'
import { Col, Row } from 'react-bootstrap'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'
import { useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import { ListBranchStyled } from '../ListBranch/styles'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import CustomButton from '../../../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    pureDark,
    tertiaryBlue2,
} from '../../../components/GlobalStyle'
import plusIcon from '../../../assets/icons/ic_plus.svg'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import { useEffect, useState } from 'react'
import useBranch from '../hooks/useBranch'
import AddPaymentinfo from './AddPaymentinfo'

const BranchInformation: React.FC = () => {
    const navigate = useNavigate()
    const { getLabelByKey } = useScreenTranslation('schoolCreate')
    const { get_bank, getbranchbyid } = useBranch()

    const location = useLocation()
    const branch: BranchDataType = location?.state?.branch

    const branchToEdit: BranchDataType = location?.state?.branchToEdit
    const { language, currency } = useSelector(
        (state: RootState) => state.appData.data.dropdowns
    )
    const [paymentData, setPaymentData] = useState<any[]>([])
    const [branchDatas, setBranchDatas] = useState<any>({})

    // console.log("b", branch);
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    let defaultLanguage = language.find(
        (item: DataTypesWithIdAndMultipleLangLabel) =>
            +item.id == +branch?.defaultLanguageId
    )

    let defaultCurrency = currency.find(
        (item: DataTypesWithIdAndMultipleLangLabel) =>
            +item.id == +branch?.defaultCurrencyId
    )

    const { branchData, loading } = useSelector(
        (state: RootState) => state.branchData
    )
    async function fetchinfo() {
        const data = await getbranchbyid(branch.branchId)
        setBranchDatas(data)
        console.log(' getbranchbyid:', data)
    }
    async function fetchPayment() {
        const data = (await get_bank('BRANCH', branch?.branchId)) as any[]
        setPaymentData(data)
        console.log('>> fetchPayment:', data)
    }

    useEffect(() => {
        fetchPayment()
        fetchinfo()
        // console.log("?????", paymentData);
    }, [])

    const navigation = (record: BranchDataType, redirectTo: string) => {
        switch (redirectTo) {
            case 'edit':
                navigate(`/branch/edit/${record?.branchId}`, {
                    state: {
                        branchToEdit: record as BranchDataType,
                    },
                })
                break

            case 'view':
                navigate(`/branch/view/${record?.branchId}`, {
                    state: {
                        branch: record as BranchDataType,
                    },
                })
        }
    }

    const columns: ColumnsType<BranchDataType> = [
        {
            title: 'Payment Information',
            dataIndex: 'bankName',
            key: 'bankName',
        },
        {
            title: 'Account Nmae',
            dataIndex: 'accountNumber',
            key: 'accountNumber',
        },
        {
            title: 'Country Name',
            dataIndex: 'countryName',
            key: 'countryName',
        },
        {
            title: 'Mode',
            dataIndex: 'mode',
            key: 'mode',
            render: (DummyData) => {
                return (
                    <div className={DummyData}>
                        <button>{DummyData}</button>
                        <img src={StatusActiveError} alt="image" />
                    </div>
                )
            },
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (DummyData) => {
                // console.log(DummyData);
                if (DummyData == true)
                    return (
                        <div className={'Active'}>
                            <button>Active</button>
                            <img src={StatusActiveError} alt="image" />
                        </div>
                    )
                else {
                    return (
                        <div className={'De-Active'}>
                            <button>De-Active</button>
                            <img src={StatusActiveError} alt="image" />
                        </div>
                    )
                }
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (value, record: BranchDataType, index): any => {
                const items = [
                    {
                        key: '1',
                        label: 'View',
                        onClick: () => navigation(record, 'view'),
                    },
                    {
                        key: '2',
                        label: 'Edit',
                        onClick: () => navigation(record, 'edit'),
                    },
                    {
                        key: '3',
                        label: 'Payment',
                        onClick: () => navigation(record, 'payment'),
                    },
                    {
                        key: '4',
                        label: 'Delete',
                        onClick: () => navigation(record, 'delete'),
                    },
                ]

                return (
                    <Space size="middle">
                        <Dropdown menu={{ items }}>
                            <img
                                src={actionMenuTogglerIcon}
                                alt="action menu"
                                style={{ cursor: 'pointer' }}
                            />
                        </Dropdown>
                    </Space>
                )
            },
        },
    ]

    return (
        <InformationBranchStyled>
            <OverlayImages
                overlayImg={branch?.profilePicture || ''}
                backgroundImg={branch?.bannerPicture || ''}
                isEditable={true}
            />
            {/* <OverlayImages backgroundImg={""} overlayImg={""} isEditable={false} /> */}

            <h3>Branch Information</h3>
            <Card>
                <Row>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Branch Name</div>
                            <div className="list-item-value">
                                {branchDatas.branchName || '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Type</div>
                            <div className="list-item-value">
                                {branchDatas?.branchType || '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Phone Number</div>
                            <div className="list-item-value">
                                {branchDatas?.phoneNumber || '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Address</div>
                            <div className="list-item-value">
                                {branchDatas.address || '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Belts</div>
                            <div className="list-item-value">
                                {branchDatas?.rank ? 'Yes' : 'No'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">
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
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Activity</div>
                            <div className="list-item-value">
                                {branchDatas?.activities || '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Facilities</div>
                            <div className="list-item-value">
                                {branchDatas.facilities || '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="12">
                        <div className="list-item">
                            <div className="list-item-title">Description</div>
                            <div className="list-item-value">
                                {branchDatas?.description || '--'}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>

            {loading && <LoadingOverlay message="" />}
            <AddPaymentinfo />
        </InformationBranchStyled>
    )
}

export default BranchInformation

// const RenderTableTitle = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="d-flex justify-content-between align-items-center">
//       <h3 className="table-heading">Branch Information</h3>
//       <CustomButton
//         bgcolor={tertiaryBlue2}
//         textTransform="Captilize"
//         color={pureDark}
//         padding="8px 10px"
//         fontFamily={`${fontFamilyMedium}`}
//         width="fit-content"
//         type="submit"
//         title=""
//         fontSize="17px"
//         icon={<img src={plusIcon} alt="edit icon" />}
//         clicked={() => {
//           navigate(`/branch/create`);
//         }}
//       />
//     </div>
//   );
// };
