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
interface TimeTableFormProps {
    setNewTimetable: React.Dispatch<React.SetStateAction<any>>
}

interface TimeEntryProps {
    startTime: Date | undefined
    endTime: Date | undefined
    startBreak: Date | undefined
    endBreak: Date | undefined
    dayOfWeek: string
    timeTableId: 8
}

interface TableDateSourceProps {
    key: string
    date: string
    dayOfWeek: string
    timeEntries: TimeEntryProps[]
}

const TimeTableSheet: React.FC<TimeTableFormProps> = ({
    setNewTimetable,
}: any) => {
    const { timeTableId } = useParams()
    const { getTimetablebyId, CreateSlots, Createmodal, setIsShowModal } =
        useTimetable()
    const [StartTimee, setStartTime] = useState<any>()
    const [EndTimee, setEndTime] = useState<any>()
    const [AllTimetable, setAllTimetable] = useState<any>()
    const [StartBreakk, setStartBreak] = useState<any>()
    const [EndBreakk, setEndBreak] = useState<any>()
    const [dayOfWeekk, setdayOfWeek] = useState<any>()
    // const [newRowIndex, setNewRowIndex] = useState<number>(0)

    const [tableDataSource, setTableDataSource] = useState<
        TableDateSourceProps[]
    >([])
    const navigate = useNavigate()

    // useEffect(() => {
    //     console.log('use effect')
    //     const Timetables = async (): Promise<void> => {
    //         const data = await getTimetablebyId(Number(timeTableId))
    //         setAllTimetable(data)
    //         console.log('data', data)
    //     }
    //     Timetables()
    //     getTimetablebyId(Number(timeTableId))
    //     // const dates = getDaysBetweenDates(
    //     //     setNewTimetable?.endDate,
    //     //     setNewTimetable?.startDate
    //     // )
    //     // console.log('dates', dates)
    //     // GetUserid()
    // }, [getTimetablebyId, timeTableId])
    useEffect(() => {
        async function fetchinfo(): Promise<void> {
            const data = await getTimetablebyId(Number(timeTableId))
            setAllTimetable(data)
        }
        fetchinfo()
    }, [])

    console.log('Created timeTable', AllTimetable)
    console.log('timetable id-:', timeTableId)

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

    // const dummyRows = Array.from({ length: numberOfDays }, (_, index) => ({
    //     key: index.toString(),
    //     // Add other properties as needed for each row
    // }))

    // const dataSource = DummyData as unknown as TimeTableDataType[]
    // const updatedDataSource = [...dates]

    const { loading } = useSelector((state: RootState) => state.timeTableData)
    const addNewSlot = (): any => {
        const currentDate = new Date(setNewTimetable.startDate)
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
                    timeTableId: setNewTimetable.timeTableId,
                },
            ],
        }
        console.log('New slot row:', newSlotRow)

        setTableDataSource((prevDataSource) => [...prevDataSource, newSlotRow])
        setIsShowModal(true)
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
                setdayOfWeek(record.dayOfWeek)
                return <div>{record.dayOfWeek}</div>
            },
        },
        {
            title: 'Start Time',
            dataIndex: 'createTimeTableStartDate',
            key: 'createTimeTableStartDate',
            render: (_, record) => {
                return record.timeEntries.map(
                    (timeEntry: TimeEntryProps, index: number) => (
                        <StartTime key={index} setStartTime={setStartTime} />
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
            render: () => {
                return (
                    <div>
                        <button>{'Off'}</button>
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
                                    dayOfWeekk
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

    useEffect(() => {
        if (!setNewTimetable) {
            return
        }
        const numberOfDays = calculateDaysDifference(
            setNewTimetable.startDate,
            setNewTimetable.endDate
        )
        const _tableDataSource: TableDateSourceProps[] = Array.from(
            { length: numberOfDays },
            (_, index) => {
                const currentDate = new Date(setNewTimetable?.startDate)
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
                            timeTableId: setNewTimetable.timeTableId,
                        },
                    ],
                }
            }
        )

        console.log('checking tableDataSource: ', _tableDataSource)
        setTableDataSource(_tableDataSource)
    }, [setNewTimetable])

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
