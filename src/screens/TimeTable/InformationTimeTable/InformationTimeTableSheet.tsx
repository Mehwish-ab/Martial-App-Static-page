import React from 'react'
import { Dropdown, Space, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import { useSelector } from 'react-redux'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import DummyData from './dummyData.json'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { TimeTableDataType } from '../../../redux/features/TimeTable/TimeTableSlice'
import { RootState } from '../../../redux/store'
import { ColumnsType } from 'antd/lib/table'
import { InformationTimeTableStyle } from './styles'
const RenderTableTitle = (): JSX.Element => {
    return (
        <>
            <h3 className="timetable-heading">Session Timings by Day</h3>
        </>
    )
}
const InformationTimeTableSheet: React.FC = () => {
    const navigate = useNavigate()

    const { loading } = useSelector((state: RootState) => state.timeTableData)
    const navigation = (
        record: TimeTableDataType,
        redirectTo: string
    ): void => {
        switch (redirectTo) {
            case 'edit':
                navigate(`/timetable/edit/${record.timeTableId}`, {
                    state: {
                        branchToEdit: record as TimeTableDataType,
                    },
                })
                break

            case 'view':
                navigate(`/timetable/view/${record.timeTableId}`, {
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

    const columns: ColumnsType<TimeTableDataType> = [
        {
            title: 'Week Day',
            dataIndex: 'createTimeTableWeekDay',
            key: 'createTimeTableWeekDay',
        },
        {
            title: 'Start Time',
            dataIndex: 'createTimeTableStartDate',
            key: 'createTimeTableStartDate',
            render: (DummyDataa) => {
                return (
                    <div className="list-item mb-0">
                        <div className="list-item-value ms-2">{DummyDataa}</div>
                    </div>
                )
            },
        },
        {
            title: 'End Date',
            dataIndex: 'createTimeTableEndDate',
            key: 'createTimeTableEndDate',
            render: (DummyDatas) => {
                return (
                    <div className="list-item mb-0">
                        <div className="list-item-value ms-2">{DummyDatas}</div>
                    </div>
                )
            },
        },
        {
            title: 'Start Break',
            dataIndex: 'createTimeTableStartBreak',
            key: 'createTimeTableStartBreak',
            render: (DummyDataas) => {
                return (
                    <div className="list-item mb-0">
                        <div className="list-item-value ms-2">
                            {DummyDataas}
                        </div>
                    </div>
                )
            },
        },
        {
            title: 'End Break',
            dataIndex: 'createTimeTableEndBreak',
            key: 'createTimeTableEndBreak',
            render: (DummyDatass) => {
                return (
                    <div className="list-item mb-0">
                        <div className="list-item-value ms-2">
                            {DummyDatass}
                        </div>
                    </div>
                )
            },
        },
        {
            title: 'Status',
            dataIndex: 'createTimeTableStatus',
            key: 'createTimeTableStatus',
            render: (DummyDataass) => {
                return (
                    <div>
                        <button>{DummyDataass}</button>
                        <img src={StatusActiveError as string} alt="images" />
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
            <InformationTimeTableStyle>
                <Table
                    columns={columns}
                    dataSource={DummyData as unknown as TimeTableDataType[]}
                    title={() => <RenderTableTitle />}
                    scroll={{ x: true }}
                    pagination={false}
                />
            </InformationTimeTableStyle>
        </>
    )
}
export default InformationTimeTableSheet
