import React, { useState, useEffect } from 'react'

import { Dropdown, Space, Table } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import { useSelector } from 'react-redux'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import { CreateTimeTableStyled } from './styles'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { TimeTableDataType } from '../../../redux/features/TimeTable/TimeTableSlice'
import { RootState } from '../../../redux/store'
import { ColumnsType } from 'antd/lib/table'
import StartTime from './StartTime'
import StartBreak from './StartBreak'
import EndTime from './Endtime'
import EndBreak from './EndBreak'
import useTimetable from '../../../hooks/useTimetable'

interface TimeEntryProps {
    startTime: string | undefined
    endTime: string | undefined
    startBreak: string | undefined
    endBreak: string | undefined
    dayOfWeek: string
    timeTableId: number
    isActive: boolean
    isRepeated: boolean
}

interface TableDateSourceProps {
    key: string
    date: string
    dayOfWeek: string
    timeEntries: TimeEntryProps[]
}

interface TableDetailProps {
    endDate: string
    isActive: boolean
    isRepeated: boolean
    startDate: string
    timeTableId: number
    title: string
}

const daysOfWeek = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
]

const calculateDaysDifference = (
    startDate: string | number | Date,
    endDate: string | number | Date
): number => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    if (endDate != null) {
        const differenceInTime = end.getTime() - start.getTime() + 1
        const differenceInDays = Math.ceil(
            differenceInTime / (1000 * 3600 * 24)
        )
        return differenceInDays
    } else {
        return 1
    }
}

const RenderTableTitle = (): JSX.Element => {
    return (
        <>
            <h3 className="tableHeading">Session Timings by Day</h3>
        </>
    )
}
const TimeTableSheet: React.FC = () => {
    const { timeTableId } = useParams()
    const { getTimetableById, CreateSlots, Createmodal, setIsShowModal } =
        useTimetable()
    const [StartTimee] = useState<any>()
    const [EndTimee, setEndTime] = useState<any>()
    const [allTimeTableDetail, setAllTimeTableDetail] =
        useState<TableDetailProps>()
    const [StartBreakk, setStartBreak] = useState<any>()
    const [EndBreakk, setEndBreak] = useState<any>()
    // const [newRowIndex, setNewRowIndex] = useState<number>(0)

    const [tableDataSource, setTableDataSource] = useState<
        TableDateSourceProps[]
    >([])
    const navigate = useNavigate()

    const { loading } = useSelector((state: RootState) => state.timeTableData)

    const handleUpdateTableDataSource = (
        _recordIndex: number,
        _key: string,
        _value: undefined | string | boolean | number,
        _timeEntryIndex?: number
    ): void => {
        if (!_timeEntryIndex) {
            const updatedTableDateSource = JSON.parse(
                JSON.stringify(tableDataSource)
            )
            updatedTableDateSource[_recordIndex][_key] = _value
            setTableDataSource(updatedTableDateSource)
            return
        }
        const updatedTableDateSource = JSON.parse(
            JSON.stringify(tableDataSource)
        )
        updatedTableDateSource[_recordIndex].timeEntries[_key] = _value
        setTableDataSource(updatedTableDateSource)
    }

    const addNewSlot = (): any => {
        if (!allTimeTableDetail) {
            return
        }
        const currentDate = new Date(allTimeTableDetail.startDate)
        currentDate.setDate(currentDate.getDate() + tableDataSource.length)

        const newSlotRow: TableDateSourceProps = {
            key: currentDate.toISOString(),
            date: currentDate.toISOString().split('T')[0],
            dayOfWeek: daysOfWeek[currentDate.getDay()],

            timeEntries: [
                {
                    startTime: undefined,
                    endTime: undefined,
                    startBreak: undefined,
                    endBreak: undefined,
                    dayOfWeek: daysOfWeek[currentDate.getDay()],
                    timeTableId: allTimeTableDetail.timeTableId,
                    isActive: allTimeTableDetail.isActive,
                    isRepeated: allTimeTableDetail.isRepeated,
                },
            ],
        }
        console.log('New slot row:', newSlotRow)

        setTableDataSource((prevDataSource) => [...prevDataSource, newSlotRow])
        setIsShowModal(true)
    }

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

    const columns: ColumnsType<any> = [
        {
            title: 'Date',
            dataIndex: 'createTimeTabledate',
            key: 'createTimeTabledate',
            render: (value, record) => {
                return <div>{record.date}</div>
            },
        },
        {
            title: 'Day',
            dataIndex: 'createTimeTableWeekDay',
            key: 'createTimeTableWeekDay',
            render: (value, record) => {
                return <div>{record.dayOfWeek}</div>
            },
        },
        {
            title: 'Start Time',
            dataIndex: 'createTimeTableStartDate',
            key: 'createTimeTableStartDate',
            render: (_, record, recordIndex) => {
                return record.timeEntries.map(
                    (timeEntry: TimeEntryProps, rowIndex: number) => (
                        <StartTime
                            key={`${recordIndex}-${rowIndex}`}
                            recordIndex={recordIndex}
                            rowIndex={rowIndex}
                            startTime={timeEntry.startTime}
                            setStartTime={handleUpdateTableDataSource}
                        />
                    )
                )
            },
        },
        {
            title: 'End Time',
            dataIndex: 'createTimeTableEndDate',
            key: 'createTimeTableEndDate',
            render: (_, record) => {
                return record.timeEntries.map(
                    (timeEntry: TimeEntryProps, index: number) => (
                        <EndTime key={index} setEndTime={setEndTime} />
                    )
                )
            },
        },
        {
            title: 'Start Break',
            dataIndex: 'createTimeTableStartBreak',
            key: 'createTimeTableStartBreak',
            render: (_, record) => {
                return record.timeEntries.map(
                    (timeEntry: TimeEntryProps, index: number) => (
                        <StartBreak key={index} setStartBreak={setStartBreak} />
                    )
                )
            },
        },
        {
            title: 'End Break',
            dataIndex: 'createTimeTableEndBreak',
            key: 'createTimeTableEndBreak',
            render: (_, record) => {
                return record.timeEntries.map(
                    (timeEntry: TimeEntryProps, index: number) => (
                        <EndBreak key={index} setEndBreak={setEndBreak} />
                    )
                )
            },
        },
        {
            title: 'Status',
            dataIndex: 'createTimeTableStatus',
            key: 'createTimeTableStatus',
            render: (_, record) => {
                return (
                    <div>
                        <button>
                            {record.isActivate ? 'Activated' : 'Off'}
                        </button>
                        <img src={StatusActiveError as string} alt="images" />
                    </div>
                )
            },
        },
        {
            title: 'Slot',
            dataIndex: 'createTimeTableSlot',
            key: 'createTimeTableSlot',
            render: () => {
                return (
                    <div>
                        <button
                            onClick={() => {
                                CreateSlots(
                                    timeTableId,
                                    StartTimee,
                                    EndTimee,
                                    StartBreakk,
                                    EndBreakk,
                                    ''
                                )
                                setIsShowModal(true)
                            }}
                        >
                            {'Add'}
                        </button>
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
                    {
                        key: '4',
                        label: 'Add new Slot',
                        onClick: addNewSlot,
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

    console.log('Created timeTable', allTimeTableDetail)
    console.log('timetable id-:', timeTableId)

    // const dummyRows = Array.from({ length: numberOfDays }, (_, index) => ({
    //     key: index.toString(),
    //     // Add other properties as needed for each row
    // }))

    // const dataSource = DummyData as unknown as TimeTableDataType[]
    // const updatedDataSource = [...dates]

    useEffect(() => {
        async function fetchTimeTableById(): Promise<void> {
            const response = await getTimetableById(Number(timeTableId))
            console.log('checking response: ', response)
            if (response.results) {
                setAllTimeTableDetail(response.results)
            }
        }
        fetchTimeTableById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeTableId])

    useEffect(() => {
        if (!allTimeTableDetail) {
            return
        }
        const numberOfDays = calculateDaysDifference(
            allTimeTableDetail.startDate,
            allTimeTableDetail.endDate
        )
        const _tableDataSource: TableDateSourceProps[] = Array.from(
            { length: numberOfDays },
            (_, index) => {
                const currentDate = new Date(allTimeTableDetail.startDate)
                currentDate.setDate(currentDate.getDate() + index)
                const dayOfWeek = daysOfWeek[currentDate.getDay()]

                return {
                    key: index.toString(),
                    date: currentDate.toISOString().split('T')[0],
                    dayOfWeek: dayOfWeek,

                    timeEntries: [
                        {
                            startTime: undefined,
                            endTime: undefined,
                            startBreak: undefined,
                            endBreak: undefined,
                            dayOfWeek: dayOfWeek,
                            timeTableId: allTimeTableDetail.timeTableId,
                            isActive: allTimeTableDetail.isActive,
                            isRepeated: allTimeTableDetail.isRepeated,
                        },
                    ],
                }
            }
        )

        console.log('checking tableDataSource: ', _tableDataSource)
        setTableDataSource(_tableDataSource)
    }, [allTimeTableDetail])

    return (
        <>
            {loading && <LoadingOverlay message="" />}
            {/* {console.log(
                'start time-:',
                StartTimee,
                'End time-:',
                EndTimee,
                StartBreakk,
                EndBreakk
            )} */}
            <CreateTimeTableStyled>
                {Createmodal().modalComponent}
                <Table
                    columns={columns}
                    dataSource={tableDataSource}
                    pagination={false}
                    title={() => <RenderTableTitle />}
                />
            </CreateTimeTableStyled>
        </>
    )
}

export default TimeTableSheet
