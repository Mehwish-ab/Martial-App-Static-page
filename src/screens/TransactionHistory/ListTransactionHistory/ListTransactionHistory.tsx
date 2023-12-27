import React from 'react'
import { Dropdown, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ListTransactionStyled, TransactionAccountStyle } from './styles'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { CustomDiv } from './CustomDiv'
import {
    fontFamilyMedium,
    pureDark,
    tertiaryBlue2,
} from '../../../components/GlobalStyle'
import { useNavigate } from 'react-router-dom'
import plusIcon from '../../../assets/icons/ic_plus.svg'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { TransactionDataType } from '../../../redux/features/Transaction/TransactionSlice'
import DummyData from './dummyData.json'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import Download from '../../../assets/icons/ic_download.svg'
import RightArrow from '../../../assets/images/rightArrow.svg'
import LeftArrow from '../../../assets/images/leftArrow.svg'
import DateCalander from '../../../assets/images/dateCalander.svg'
import { Col, Row } from 'react-bootstrap'

const ListTransactionHistory: React.FC = () => {
    const navigate = useNavigate()
    const navigation = (
        record: TransactionDataType,
        redirectTo: string
    ): void => {
        switch (redirectTo) {
            case 'edit':
                navigate(`/Transaction/edit/${record.TransactionID}`, {
                    state: {
                        branchToEdit: record as TransactionDataType,
                    },
                })
                break

            case 'view':
                navigate(`/Transaction/view/${record.TransactionID}`, {
                    state: {
                        branch: record as TransactionDataType,
                    },
                })
                break

            case 'school':
                navigate(`/Transaction/School-profile${record.TransactionID}`, {
                    state: {
                        branch: record as TransactionDataType,
                    },
                })
        }
    }
    const loading = false

    const columns: ColumnsType<TransactionDataType> = [
        {
            title: 'Id',
            dataIndex: 'TransactionID',
            key: 'TransactionID',
        },
        {
            title: 'Invoice',
            dataIndex: 'TransactionInvoice',
            key: 'TransactionInvoice',
        },
        {
            title: 'Amount',
            dataIndex: 'TransactionAmount',
            key: 'TransactionAmount',
        },
        {
            title: 'Billing Date',
            dataIndex: 'TransactionBillingDate',
            key: 'TransactionBillingDate',
        },
        {
            title: 'Member',
            dataIndex: 'TransactionMember',
            key: 'TransactionMember',
        },
        {
            title: 'Status',
            dataIndex: 'TransactionStatus',
            key: 'TransactionStatus',
            render: (DummyDatas) => {
                return (
                    <div>
                        <button>{DummyDatas}</button>
                        <img src={StatusActiveError as string} alt="images" />
                    </div>
                )
            },
        },
        {
            title: 'Download',
            dataIndex: 'TransactionDownload',
            key: 'TransactionDownload',
            render: (DummyDatass) => {
                return (
                    <div>
                        <button>
                            <img src={Download as string} alt="images" />
                            {DummyDatass}
                        </button>
                    </div>
                )
            },
        },
        {
            title: 'Actions',
            key: 'TransactionAction',
            render: (_, record) => {
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
                        label: 'School',
                        onClick: () => navigation(record, 'school'),
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

    console.log('DummyData', DummyData)

    return (
        <>
            {loading && <LoadingOverlay message="" />}
            <ListTransactionStyled>
                <Table
                    columns={columns}
                    dataSource={
                        DummyData.map((item) => ({
                            ...item,
                            key: item.TransactionID,
                        })) as never
                    }
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    title={() => <RenderTableTitle />}
                    pagination={{
                        showTotal: (total, range) => (
                            <span
                                dangerouslySetInnerHTML={{
                                    // eslint-disable-next-line max-len
                                    __html: `Page <span className='paginationVal'>${range[0]}</span> of ${range[1]}`,
                                }}
                            />
                        ),
                    }}
                />
            </ListTransactionStyled>
        </>
    )
}

export default ListTransactionHistory

const RenderTableTitle = (): JSX.Element => {
    const navigate = useNavigate()

    return (
        <>
            <div className="d-flex justify-content-between">
                <h3 className="table-heading">Transactions History</h3>
                <CustomDiv>
                    <div className="instructorDateSection">
                        <div className="mainarrow">
                            <div className="arrowright">
                                <img
                                    src={LeftArrow as string}
                                    alt="Date"
                                    width={18}
                                    height={12}
                                />
                            </div>
                            <div className="arrowleft">
                                <img
                                    src={RightArrow as string}
                                    alt="Date"
                                    width={18}
                                    height={12}
                                />
                            </div>
                        </div>
                        <div className="dateRange">
                            <p>
                                <span>Mon,</span> Sep 11, 2023 -{' '}
                                <span>Thu,</span> Sep 21, 2023
                            </p>
                            <img
                                src={DateCalander as string}
                                alt="Calander"
                                width={21}
                                height={21}
                            />
                        </div>
                        <div className="dateToday">Today</div>
                    </div>
                    <CustomButton
                        bgcolor={tertiaryBlue2}
                        textTransform="Captilize"
                        color={pureDark}
                        padding="6.5px 0px"
                        fontFamily={`${fontFamilyMedium}`}
                        width="40px"
                        type="submit"
                        title=""
                        fontSize="17px"
                        icon={
                            <img
                                src={plusIcon as string}
                                alt="edit icon"
                                width={17}
                                height={17}
                            />
                        }
                        clicked={() => {
                            navigate(`/Transaction/create`)
                        }}
                    />
                </CustomDiv>
            </div>
            <TransactionAccountStyle>
                <Row>
                    <Col md="4">
                        <div className="stripeContainer">
                            <h3>Stripe Account</h3>
                            <div>
                                <p>
                                    Pending Balance <span>$23:00</span>
                                </p>
                                <p>
                                    Available Balance <span>$23:00</span>
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="goCardLessContainer">
                            <h3>GoCardLess Account</h3>
                            <div>
                                <p>
                                    Pending Balance <span>$23:00</span>
                                </p>
                                <p>
                                    Available Balance <span>$23:00</span>
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="CashContainer">
                            <h3>Cash Account</h3>
                            <div>
                                <p>
                                    Pending Balance <span>$23:00</span>
                                </p>
                                <p>
                                    Available Balance <span>$23:00</span>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </TransactionAccountStyle>
        </>
    )
}
