import { Card, Dropdown, List, Space, Table } from 'antd'
import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import { AddPaymentMethod } from '../AddPaymentBranch/styles'
import { useLocation } from 'react-router-dom'
import { BranchDataType } from '../../../redux/features/branch/branchSlice'
import { Col, Row } from 'react-bootstrap'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'
import { useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import CustomButton from '../../../components/CustomButton/CustomButton'
import DummyData from './dummyData.json'
import {
    fontFamilyMedium,
    pureDark,
    tertiaryBlue2,
} from '../../../components/GlobalStyle'
import plusIcon from '../../../assets/icons/ic_plus.svg'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import getPayment from '../../../redux/features/branch/branchSlice'
import useBranch from '../hooks/useBranch'
import { useEffect, useState } from 'react'

const AddPaymentinfo: React.FC = () => {
    const navigate = useNavigate()
    const { getLabelByKey } = useScreenTranslation('schoolCreate')
    const {
        get_stripe,
        get_gocard,
        get_bank,
        get_paypal,
        get_cash,
        deletePayment,
        deletemodal,
    } = useBranch()
    const handleDelete = (paymentMethod: any, record: any) => {
        console.log('hi', record, paymentMethod)

        deletePayment(paymentMethod, record)
    }

    const location = useLocation()
    //const branch: BranchDataType = location?.state?.branchToEdit;

    const branch: BranchDataType = location.state?.branch
    const [stripepayment, setStripepayment] = useState<any[]>([])
    const [bankpayment, setBankpayment] = useState<any[]>([])
    const [paypalpayment, setPaypalpayment] = useState<any[]>([])
    const [Gocardlesspayment, setGocardlesspayment] = useState<any[]>([])
    const [cashpayment, setCash] = useState<any[]>([])

    const { branchData, loading } = useSelector(
        (state: RootState) => state?.branchData
    )
    useEffect(() => {
        fetchstripe()
        async function fetchstripe() {
            const data = (await get_stripe('BRANCH', branch?.branchId)) as any[]
            setStripepayment(data)
            console.log('>> date:', data)
        }
        fetchbank()
        async function fetchbank() {
            const data = (await get_bank('BRANCH', branch?.branchId)) as any[]
            setBankpayment(data)
            console.log('fetchbank:', data)
        }
        fetchPaypal()
        async function fetchPaypal() {
            const data = (await get_paypal('BRANCH', branch?.branchId)) as any[]
            setPaypalpayment(data)
            console.log('fetchPaypal:', data)
        }
        fetchgocard()
        async function fetchgocard() {
            const data = (await get_gocard('BRANCH', branch?.branchId)) as any[]
            setGocardlesspayment(data)
            console.log('fetchgocard:', data)
        }
        fetchCash()
        async function fetchCash() {
            const data = (await get_cash('BRANCH', branch?.branchId)) as any[]
            setCash(data)
            console.log('fetchCash:', data)
        }
        // if (branchToEdit && branchToEdit.branchId) {
        //   fetchPayment();
        // }
    }, []) // Add branchToEdit to the dependency array
    if (!loading && !branchData) {
        return <div>No data</div>
    }
    //console.log("id", branchToEdit.branchId);
    // const [dataSource, setDataSource] = useState<any[]>([]);

    const navigation = (record: BranchDataType, redirectTo: string) => {
        switch (redirectTo) {
            case 'detail':
                navigate(`/branch/detail/${record?.branchId}`, {
                    state: {
                        branchToEdit: record as BranchDataType,
                    },
                })
                break

            case 'edit':
                navigate(`/branch/edit/${record?.branchId}`, {
                    state: {
                        branch: record as BranchDataType,
                    },
                })
                break
            case 'delete':
                navigate(`/branch/delete/${record?.branchId}`, {
                    state: {
                        branch: record as BranchDataType,
                    },
                })
        }
    }
    const columns: ColumnsType<BranchDataType> = [
        {
            title: 'Payment Information',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
        },
        {
            title: 'Account Name',
            dataIndex: 'accountName',
            key: 'accountName',
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
            render: (DummyData: any) => {
                console.log('mode', DummyData as any)
                if (DummyData[0] === 'Test') {
                    return (
                        <div className={'Test'}>
                            <button>Test</button>
                            <img src={StatusActiveError} alt="image" />
                        </div>
                    )
                } else if (DummyData[0] === 'Live') {
                    return (
                        <div className={'Live'}>
                            <button>Live</button>
                            <img src={StatusActiveError} alt="image" />
                        </div>
                    )
                } else {
                    return <button>--</button>
                }
                // return (
                //   <div className={DummyData}>
                //     <button>{DummyData}</button>
                //     <img src={StatusActiveError} alt="image" />
                //   </div>
                // );
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (DummyData: any) => {
                console.log('statussss', DummyData[0])

                if (DummyData === 'Add') {
                    return (
                        <div className={'Add'}>
                            <button>Add</button>
                            <img src={StatusActiveError} alt="image" />
                        </div>
                    )
                } else if (DummyData[0] == false) {
                    return (
                        <div className={'De-Active'}>
                            <button>De-Active</button>
                            <img src={StatusActiveError} alt="image" />
                        </div>
                    )
                } else if (DummyData[0] === true) {
                    return (
                        <div className={'Active'}>
                            <button>Active</button>
                            <img src={StatusActiveError} alt="image" />
                        </div>
                    )
                }
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (value: any, record: any, index: number): any => {
                console.log('g', record)

                const items = [
                    {
                        key: '1',
                        label: 'detail',
                        onClick: () => navigation(record, 'detail'),
                    },
                    {
                        key: '2',
                        label: 'Edit',
                        onClick: () => navigation(record, 'edit'),
                    },
                    {
                        key: '4',
                        label: 'Delete',
                        onClick: () => {
                            handleDelete(record?.paymentMethod, record?.id[0])
                        },
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

    const rowsWithButtons = [
        {
            paymentMethod: 'Gocardless',
            accountName:
                Gocardlesspayment?.length === 0
                    ? '--'
                    : Gocardlesspayment?.map((e) => {
                          return e.accountName
                      }),
            countryName:
                Gocardlesspayment?.length === 0
                    ? '--'
                    : Gocardlesspayment?.map((e) => {
                          return e.countryName
                      }),
            mode:
                Gocardlesspayment?.length === 0
                    ? '--'
                    : Gocardlesspayment?.map((e) => {
                          return e.mode
                      }),
            status:
                Gocardlesspayment?.length === 0
                    ? 'Add'
                    : Gocardlesspayment?.map((e) => {
                          return e.isActive
                      }),
            id:
                Gocardlesspayment?.length === 0
                    ? 'Add'
                    : Gocardlesspayment?.map((e) => {
                          return e.id
                      }),
        },
        {
            paymentMethod: 'PayPal',
            accountName:
                paypalpayment?.length === 0
                    ? '--'
                    : paypalpayment?.map((e) => {
                          return e.accountName
                      }),
            countryName:
                paypalpayment?.length === 0
                    ? '--'
                    : paypalpayment?.map((e) => {
                          return e.countryName
                      }),
            mode:
                paypalpayment?.length === 0
                    ? '--'
                    : paypalpayment?.map((e) => {
                          return e.mode
                      }),
            status:
                paypalpayment?.length === 0
                    ? 'Add'
                    : paypalpayment?.map((e) => {
                          return e.isActive
                      }),
            id:
                paypalpayment?.length === 0
                    ? '0'
                    : paypalpayment?.map((e) => {
                          return e.id
                      }),
        },
        {
            paymentMethod: 'Stripe',
            accountName:
                stripepayment?.length === 0
                    ? '--'
                    : stripepayment?.map((e) => {
                          return e.accountName
                      }),
            countryName:
                stripepayment?.length === 0
                    ? '--'
                    : stripepayment?.map((e) => {
                          return e.countryName
                      }),
            mode:
                stripepayment?.length === 0
                    ? '--'
                    : stripepayment?.map((e) => {
                          return e.mode
                      }),
            status:
                stripepayment?.length === 0
                    ? 'Add'
                    : stripepayment?.map((e) => {
                          return e.isActive
                      }),
            id:
                stripepayment?.length === 0
                    ? '0'
                    : stripepayment?.map((e) => {
                          return e.id
                      }),
        },
        {
            paymentMethod: 'BankAccount',
            accountName:
                bankpayment?.length === 0
                    ? '--'
                    : bankpayment?.map((e) => {
                          return e.accountName
                      }),
            countryName:
                bankpayment?.length === 0
                    ? '--'
                    : bankpayment?.map((e) => {
                          return e.countryName
                      }),
            mode:
                bankpayment?.length === 0
                    ? '--'
                    : bankpayment?.map((e) => {
                          return e.mode
                      }),
            status:
                bankpayment?.length === 0
                    ? 'Add'
                    : bankpayment?.map((e) => {
                          console.log('bankaccount', e.isActive)

                          return e.isActive
                      }),
            id:
                bankpayment?.length === 0
                    ? '0'
                    : bankpayment?.map((e) => {
                          return e.id
                      }),
        },
        {
            paymentMethod: 'Cash',
            accountName:
                cashpayment?.length === 0
                    ? '--'
                    : cashpayment?.map((e) => {
                          return e.accountName
                      }),
            countryName:
                cashpayment?.length === 0
                    ? '--'
                    : cashpayment?.map((e) => {
                          return e.countryName
                      }),
            mode:
                cashpayment?.length === 0
                    ? '--'
                    : cashpayment?.map((e) => {
                          return e.mode
                      }),
            status:
                cashpayment?.length === 0
                    ? 'Add'
                    : cashpayment?.map((e) => {
                          return e.isActive
                      }),
            id:
                cashpayment?.length === 0
                    ? 'Add'
                    : cashpayment?.map((e) => {
                          return e.id
                      }),
        },
    ]

    return (
        <AddPaymentMethod>
            {deletemodal().modalComponent}

            {loading && <LoadingOverlay message="" />}
            <h3 className="table-heading">Payment Information</h3>
            {rowsWithButtons.length > 0 ? (
                <Table columns={columns} dataSource={rowsWithButtons as any} />
            ) : (
                <div>No data available</div>
            )}
        </AddPaymentMethod>
    )
}

export default AddPaymentinfo
