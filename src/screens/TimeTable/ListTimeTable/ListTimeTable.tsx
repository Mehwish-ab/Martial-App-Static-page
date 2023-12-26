import React, { useState } from 'react'
import { Dropdown, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ListTimeTableStyled } from './styles'
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
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { TimeTableDataType } from '../../../redux/features/TimeTable/TimeTableSlice'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import DummyData from './dummyData.json'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import RightArrow from '../../../assets/images/rightArrow.svg'
import LeftArrow from '../../../assets/images/leftArrow.svg'
import DateCalander from '../../../assets/images/dateCalander.svg'

const ListTimeTable: React.FC = () => {
    const { getLabelByKey } = useScreenTranslation('listTimeTable')

    const navigate = useNavigate()

    const { loading } = useSelector((state: RootState) => state.timeTableData)

    const columns: ColumnsType<TimeTableDataType> = [
        {
            title: 'Id',
            dataIndex: 'timeTableId',
            key: 'timeTableId',
        },
        {
            title: 'Title',
            dataIndex: 'timeTableTitle',
            key: 'timeTableTitle',
        },
        {
            title: 'Start Date',
            dataIndex: 'timeTableStartDate',
            key: 'timeTableStartDate',
        },
        {
            title: 'End Date',
            dataIndex: 'timeTableEndDate',
            key: 'timeTableEndDate',
        },
        {
            title: 'Type',
            dataIndex: 'timeTableType',
            key: 'timeTableType',
        },
        {
            title: 'Status',
            dataIndex: 'timeTableStatus',
            key: 'timeTableStatus',
            render: (DummyData) => {
                return (
                    <div>
                        <button>{DummyData}</button>
                        <img src={StatusActiveError} alt="image" />
                    </div>
                )
            },
        },
        {
            title: 'Actions',
            key: 'timeTableAction',
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
                        label: 'Subscribe',
                        onClick: () => navigation(record, 'subscribe'),
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

    const navigation = (record: TimeTableDataType, redirectTo: string) => {
        switch (redirectTo) {
            case 'edit':
                navigate(`/timetable/edit/${record.timeTableId}`, {
                    state: {
                        branchToEdit: record as TimeTableDataType,
                    },
                })
                break

            case 'view':
                navigate(`/timetable/information/${record.timeTableId}`, {
                    state: {
                        branch: record as TimeTableDataType,
                    },
                })
                break

            case 'subscribe':
                navigate(`/timetable/subscribe/${record.timeTableId}`, {
                    state: {
                        branch: record as TimeTableDataType,
                    },
                })
        }
    }

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [current, setCurrent] = useState(1)

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys)
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const rowSelection = { selectedRowKeys, onChange: onSelectChange }

    return (
        <>
            {loading && <LoadingOverlay message="" />}
            <ListTimeTableStyled>
                <Table
                    columns={columns}
                    dataSource={DummyData as any}
                    title={() => <RenderTableTitle />}
                    pagination={{
                        showTotal: (total, range) => (
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: `Page <span className='paginationVal'>${range[0]}</span> of ${range[1]}`,
                                }}
                            />
                        ),
                    }}
                />
            </ListTimeTableStyled>
        </>
    )
}

export default ListTimeTable

const RenderTableTitle = () => {
    const navigate = useNavigate()
    const { getLabelByKey } = useScreenTranslation('listTimeTable')

    return (
        <div className="d-flex justify-content-between">
            <h3 className="table-heading">Time Table</h3>
            <CustomDiv>
                <div className="instructorDateSection">
                    <div className="mainarrow">
                        <div className="arrowright">
                            <img
                                src={LeftArrow}
                                alt="Date"
                                width={18}
                                height={12}
                            />
                        </div>
                        <div className="arrowleft">
                            <img
                                src={RightArrow}
                                alt="Date"
                                width={18}
                                height={12}
                            />
                        </div>
                    </div>
                    <div className="dateRange">
                        <p>
                            <span>Mon,</span> Sep 11, 2023 - <span>Thu,</span>{' '}
                            Sep 21, 2023
                        </p>
                        <img
                            src={DateCalander}
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
                            src={plusIcon}
                            alt="edit icon"
                            width={17}
                            height={17}
                        />
                    }
                    clicked={() => {
                        navigate(`/timetable/create`)
                    }}
                />
            </CustomDiv>
        </div>
    )
}
