import React, { useEffect, useState } from 'react'
import { Dropdown, Space, Table } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { TimeTableDataType } from '../../../redux/features/TimeTable/TimeTableSlice'
import { RootState } from '../../../redux/store'
import { ColumnsType } from 'antd/lib/table'
import { InformationTimeTableStyle } from './styles'
import useTimetable from '../../../hooks/useTimetable'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import moment from 'moment'

const RenderTableTitle = (): JSX.Element => {
    return (
        <>
            <h3 className="timetable-heading">Session Timings by Day</h3>
        </>
    )
}

const EditTimeTableSheet: React.FC = () => {
    const navigate = useNavigate()
    const { getTimetableSlot } = useTimetable()
    const [allSlotDetail, setAllSlotDetail] = useState<any>([])
    const { timeTableId } = useParams()
    console.log('id', timeTableId)

    useEffect(() => {
        async function fetchTimeTableSlots(): Promise<void> {
            try {
                const data = await getTimetableSlot(Number(timeTableId))

                if (data) {
                    console.log(data, ' results')

                    setAllSlotDetail(data)
                }
            } catch (error) {
                console.error('Error fetching timetable slots:', error)
            }
        }
        fetchTimeTableSlots()
    }, [])

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

    const Slots = Object.values(allSlotDetail).flatMap((dayArray: any) =>
        dayArray.map((item: any, index: number) => ({
            ...item,
            dayOfWeek: item.dayOfWeek.toUpperCase(),
            showDayOfWeek:
                dayArray.findIndex(
                    (d: any) => d.dayOfWeek === item.dayOfWeek
                ) === index,
        }))
    )

    const columns: ColumnsType<TimeTableDataType> = [
        {
            title: 'Week Day',
            dataIndex: 'dayOfWeek',
            key: 'dayOfWeek',
            render: (dayOfWeek, record) => {
                return record.showDayOfWeek && dayOfWeek
            },
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (startTime) => {
                return (
                    <div className="list-item mb-0">
                        <div className="list-item-value ms-2">
                            {moment(startTime, 'HH:mm:ss').format('hh:mm A') ||
                                ''}
                        </div>
                    </div>
                )
            },
        },
        {
            title: 'End Date',
            dataIndex: 'endTime',
            key: 'endTime',
            render: (endTime) => {
                return (
                    <div className="list-item mb-0">
                        <div className="list-item-value ms-2">
                            {moment(endTime, 'HH:mm:ss').format('hh:mm A') ||
                                ''}
                        </div>
                    </div>
                )
            },
        },
        {
            title: 'Start Break',
            dataIndex: 'startBreak',
            key: 'startBreak',
            render: (startBreak) => {
                return (
                    <div className="list-item mb-0">
                        <div className="list-item-value ms-2">
                            {' '}
                            {moment(startBreak, 'HH:mm:ss').format('hh:mm A') ||
                                ''}
                        </div>
                    </div>
                )
            },
        },
        {
            title: 'End Break',
            dataIndex: 'endBreak',
            key: 'endBreak',
            render: (endBreak) => {
                return (
                    <div className="list-item mb-0">
                        <div className="list-item-value ms-2">
                            {moment(endBreak, 'HH:mm:ss').format('hh:mm A') ||
                                ''}
                        </div>
                    </div>
                )
            },
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (DummyDataa) => {
                if (DummyDataa === true) {
                    return (
                        <div className={'Active'}>
                            <button>Active</button>
                            <img src={StatusActiveError} alt="image" />
                        </div>
                    )
                } else {
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

    console.log('DummyData', allSlotDetail)
    console.log('after', Slots)

    return (
        <>
            {loading && <LoadingOverlay message="" />}
            <InformationTimeTableStyle>
                <Table
                    columns={columns}
                    dataSource={Slots}
                    title={() => <RenderTableTitle />}
                    scroll={{ x: true }}
                    pagination={false}
                />
            </InformationTimeTableStyle>
        </>
    )
}

export default EditTimeTableSheet
