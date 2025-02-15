/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dropdown, Space, Table } from 'antd'
// import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import { AddPaymentMethod } from './styles'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { FranchiseDataType } from '../../../redux/features/franchise/franchiseSlice'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import type { ColumnsType } from 'antd/es/table'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'

import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import { useEffect, useState } from 'react'
import usePayment from '../../../hooks/usePayment'
import StripeKeysModal from '../../../components/Modals/payments/createStripeKeys'
import BankaccountKeysModal from '../../../components/Modals/payments/school/create/createSchoolBankAccount'
import GocardlessKeysModal from '../../../components/Modals/payments/createGocardless'
const AddPaymentFranchise: React.FC = () => {
    const location = useLocation()
    const { franchiseId } = useParams()

    const branch: FranchiseDataType | undefined = location?.state?.branch
    console.log(location)

    const {
        get_stripe,
        get_gocard,
        get_bank,
        get_paypal,
        get_cash,
        deletePayment,
        deletemodal,
    } = usePayment()

    const [stripepayment, setStripepayment] = useState<any[]>([])
    const [bankpayment, setBankpayment] = useState<any[]>([])
    const [paypalpayment, setPaypalpayment] = useState<any[]>([])
    const [Gocardlesspayment, setGocardlesspayment] = useState<any[]>([])
    const [cashpayment, setCash] = useState<any[]>([])
    const [isStripeKeysModalVisible, setIsStripeKeysModalVisible] =
        useState(false)
    const [isGocardlessKeysModalVisible, setIsGocardlessKeysModalVisible] =
        useState(false)
    const [isPayPalModalVisible, setIsPayPalKeysModalVisible] = useState(false)
    const [isBankAccountModalVisible, setisBankAccountModalVisible] =
        useState(false)
    const [isCashModalVisible, setisCashModalVisible] = useState(false)
    const [paymentMethod, setpaymentMethod] = useState('')
    const openModal = (paymentType: string, paymentData: any): void => {
        console.log('openModal called', paymentData, paymentType)

        switch (paymentType) {
            case 'Stripe':
                console.log('clicked')

                setIsStripeKeysModalVisible(true)
                setpaymentMethod(paymentType)
                break
            case 'Gocardless':
                setIsGocardlessKeysModalVisible(true)

                break
            case 'PayPal':
                setIsGocardlessKeysModalVisible(true)
                break
            case 'BankAccount':
                setisBankAccountModalVisible(true)
                break
            case 'Cash':
                setIsGocardlessKeysModalVisible(true)
                break
            default:
                break
        }
    }
    useEffect(() => {
        console.log('hi use effect')

        fetchstripe()
        async function fetchstripe(): Promise<void> {
            if (branch) {
                const data = (await get_stripe(
                    'FRANCHISE',
                    Number(franchiseId)
                )) as any[]
                setStripepayment(data)
            }
        }

        fetchbank()
        async function fetchbank(): Promise<void> {
            // Check if branch is truthy before accessing its properties
            if (branch) {
                const data = (await get_bank(
                    'FRANCHISE',
                    Number(franchiseId)
                )) as any[]
                setBankpayment(data)
            }
        }
        fetchPaypal()
        async function fetchPaypal(): Promise<void> {
            if (branch) {
                const data = (await get_paypal(
                    'FRANCHISE',
                    Number(franchiseId)
                )) as any[]
                setPaypalpayment(data)
            }
        }
        fetchgocard()
        async function fetchgocard(): Promise<void> {
            if (branch) {
                const data = (await get_gocard(
                    'FRANCHISE',
                    Number(franchiseId)
                )) as any[]
                setGocardlesspayment(data)
            }
        }
        fetchCash()
        async function fetchCash(): Promise<void> {
            if (branch) {
                const data = (await get_cash(
                    'FRANCHISE',
                    Number(franchiseId)
                )) as any[]
                setCash(data)
            }
        }

        // if (branchToEdit && branchToEdit.branchId) {
        //   fetchPayment();
        // }
    }, [])

    const navigate = useNavigate()
    const { getLabelByKey } = useScreenTranslation('schoolCreate')

    const handleDelete = (_paymentMethod: any, record: any): void => {
        deletePayment(_paymentMethod, record)
    }

    const { franchiseData, loading } = useSelector(
        (state: RootState) => state?.franchiseData
    )

    console.log('stripe', stripepayment)

    if (!loading && !franchiseData) {
        return <div>No data</div>
    }

    const navigation = (
        record: FranchiseDataType,
        redirectTo: string
    ): void => {
        switch (redirectTo) {
            case 'detail':
                navigate(`/branch/detail/${record?.franchiseId}`, {
                    state: {
                        branchToEdit: record as FranchiseDataType,
                    },
                })
                break

            case 'edit':
                navigate(`/branch/edit/${record?.franchiseId}`, {
                    state: {
                        branch: record as FranchiseDataType,
                    },
                })
                break
            case 'delete':
                navigate(`/branch/delete/${record?.franchiseId}`, {
                    state: {
                        branch: record as FranchiseDataType,
                    },
                })
        }
    }
    const columns: ColumnsType<FranchiseDataType> = [
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
            render: (DummyData) => {
                if (DummyData[0] === 'Test') {
                    return (
                        <div className={'Test'}>
                            <button>Test</button>
                            <img
                                src={StatusActiveError as string}
                                alt="image"
                            />
                        </div>
                    )
                } else if (DummyData[0] === 'Live') {
                    return (
                        <div className={'Live'}>
                            <button>Live</button>
                            <img
                                src={StatusActiveError as string}
                                alt="image"
                            />
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
            render: (DummyData, record) => {
                if (DummyData === 'Add') {
                    return (
                        <div className={'Add'}>
                            <button
                                onClick={() =>
                                    openModal(record.paymentMethod, record)
                                }
                            >
                                Add
                            </button>
                            <img
                                src={StatusActiveError as string}
                                alt="image"
                            />
                        </div>
                    )
                    // return (
                    //   <div className={"Add"}>
                    //     <button>Add</button>
                    //     <img src={StatusActiveError} alt="image" />
                    //   </div>
                    // );
                } else if (DummyData[0] == false) {
                    return (
                        <div className={'De-Active'}>
                            <button>De-Active</button>
                            <img
                                src={StatusActiveError as string}
                                alt="image"
                            />
                        </div>
                    )
                } else if (DummyData[0] === true) {
                    return (
                        <div className={'Active'}>
                            <button>Active</button>
                            <img
                                src={StatusActiveError as string}
                                alt="image"
                            />
                        </div>
                    )
                }
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (value: any, record: any, index: number): any => {
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
                                src={actionMenuTogglerIcon as string}
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
            {/* Render modals based on conditions */}
            {isStripeKeysModalVisible && (
                <StripeKeysModal
                    open={isStripeKeysModalVisible}
                    onClose={() => setIsStripeKeysModalVisible(false)}
                    id={franchiseId}
                />
            )}
            {isBankAccountModalVisible && (
                <BankaccountKeysModal
                    open={isBankAccountModalVisible}
                    onClose={() => setisBankAccountModalVisible(false)}
                    id={franchiseId}
                    paymentMethod={paymentMethod}
                />
            )}
            {isGocardlessKeysModalVisible && (
                <GocardlessKeysModal
                    open={isGocardlessKeysModalVisible}
                    onClose={() => setIsGocardlessKeysModalVisible(false)}
                    id={franchiseId}
                />
            )}
        </AddPaymentMethod>
    )
}

export default AddPaymentFranchise
