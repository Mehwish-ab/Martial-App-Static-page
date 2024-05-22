import React, { useState, useEffect } from 'react'

import { Dropdown, Space, Table } from 'antd'

import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import { CreateTimeTableStyled } from './styles'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
// import { TimeTableDataType } from '../../../redux/features/TimeTable/TimeTableSlice'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import { RootState } from '../../../redux/store'
import { ColumnsType } from 'antd/lib/table'
import StartTime from './StartTime'
import StartBreak from './StartBreak'
import EndTime from './Endtime'
import EndBreak from './EndBreak'
import useTimetable from '../../../hooks/useTimetable'
import { cloneDeep } from 'lodash'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import moment from 'moment'
import { toast } from 'react-toastify'
interface TimeEntryProps {
    startTime: string | undefined
    endTime: string | undefined
    startBreak: string | undefined
    endBreak: string | undefined
    dayOfWeek: string
    timeTableId: number
    isActive: boolean
    isRepeated: boolean
    slotId: number
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
    timeEntries: TimeEntryProps[] // Add this line to include timeEntries
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

// const calculateDaysDifference = (
//     startDate: string | number | Date,
//     endDate: string | number | Date
// ): number => {
//     const start = new Date(startDate)
//     const end = new Date(endDate)
//     if (endDate != null) {
//         const differenceInTime = end.getTime() - start.getTime() + 1
//         const differenceInDays = Math.ceil(
//             differenceInTime / (1000 * 3600 * 24)
//         )
//         return differenceInDays
//     } else {
//         return 1
//     }
// }

const RenderTableTitle = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('createTImeTable')
    return (
        <>
            <h3 className="tableHeading">
                {getLabelByKey('sessionTimingsByDay')}
            </h3>
        </>
    )
}
const EditTimeTableSheet: React.FC = () => {
    const { timeTableId } = useParams()
    const { getTimetableSlot, EditSlots, setIsShowModal, createSlots } =
        useTimetable()
    const { getLabelByKey } = useScreenTranslation('createTImeTable')
    const [allSlotDetail, setAllSlotDetail] = useState<any>()
    console.log('id', timeTableId)

    useEffect(() => {
        async function fetchTimeTableSlots(): Promise<void> {
            try {
                const data = await getTimetableSlot(Number(timeTableId))

                if (data) {
                    console.log(data, ' results')

                    const Slots = Object.values(data || {}).flatMap(
                        (dayArray: any) =>
                            dayArray.map((item: any, index: number) => ({
                                ...item,
                                dayOfWeek: item.dayOfWeek.toUpperCase(),
                                showDayOfWeek:
                                    dayArray.findIndex(
                                        (d: any) =>
                                            d.dayOfWeek === item.dayOfWeek
                                    ) === index,
                            }))
                    )
                    console.log('slots', Slots)
                    setAllSlotDetail(Slots)
                }
            } catch (error) {
                console.error('Error fetching timetable slots:', error)
            }
        }
        fetchTimeTableSlots()
    }, [])

    const { getTimetableById, SuccessModal, WarningModal } = useTimetable()
    const [allTimeTableDetail, setAllTimeTableDetail] =
        useState<TableDetailProps>()
    const [tableDataSource, setTableDataSource] = useState<
        TableDateSourceProps[]
    >([])

    const handleDuplicateDay = (_recordIndex: any): void => {
        if (!allTimeTableDetail) return
        console.log('_recordIndex', _recordIndex.length)

        const currentDate = new Date(allTimeTableDetail.startDate)
        currentDate.setDate(currentDate.getDate() + _recordIndex)
        // const dayOfWeek = daysOfWeek[currentDate.getDay()]
        console.log(
            'alllll',
            allTimeTableDetail,
            { _recordIndex },
            { tableDataSource }
        )
        const updatedTableDateSource: TableDateSourceProps[] =
            cloneDeep(tableDataSource)
        updatedTableDateSource[_recordIndex].timeEntries.push({
            startTime:
                updatedTableDateSource[_recordIndex].timeEntries[0].startTime,
            endTime:
                updatedTableDateSource[_recordIndex].timeEntries[0].endTime,
            startBreak:
                updatedTableDateSource[_recordIndex].timeEntries[0].startBreak,
            endBreak:
                updatedTableDateSource[_recordIndex].timeEntries[0].endBreak,
            dayOfWeek:
                updatedTableDateSource[_recordIndex].timeEntries[0].dayOfWeek,
            timeTableId:
                updatedTableDateSource[_recordIndex].timeEntries[0].timeTableId,
            isActive: allTimeTableDetail.isActive,
            isRepeated: allTimeTableDetail.isRepeated,
            slotId: allSlotDetail.slotId,
        })

        // Find the correct index based on activeTab

        // Add the new time entry to the correct day

        // Set the updated state
        setTableDataSource(updatedTableDateSource)

        // Call createSlots with the updated data
        // createSlots({
        //     timeTableId: allTimeTableDetail.timeTableId,
        //     startTime: newTimeEntry.startTime || '',
        //     endTime: newTimeEntry.endTime || '',
        //     startBreak: newTimeEntry.startBreak || '',
        //     endBreak: newTimeEntry.endBreak || '',
        //     dayOfWeek: newTimeEntry.dayOfWeek || '',
        // })
    }

    // const { loading } = useSelector((state: RootState) => state.timeTableData)

    const handleUpdateTableDataSource = (
        _recordIndex: number,
        _key: string,
        _value: undefined | string | boolean | number,
        _timeEntryIndex?: number
    ): void => {
        console.log('checking tableDataSource: ', tableDataSource)

        if (_timeEntryIndex === undefined) {
            console.log('checking i am into if')

            const updatedTableDateSource = JSON.parse(
                JSON.stringify(tableDataSource)
            )
            updatedTableDateSource[_recordIndex][_key] = _value
            setTableDataSource(updatedTableDateSource)
            return
        }
        ///////////////////////////////////////////////////////////////////
        const updatedTableDateSource: TableDateSourceProps[] =
            cloneDeep(tableDataSource)
        console.log(
            'checking before updatedTableDateSource: ',
            updatedTableDateSource
        )

        updatedTableDateSource[_recordIndex].timeEntries[_timeEntryIndex] = {
            ...updatedTableDateSource[_recordIndex].timeEntries[
                _timeEntryIndex
            ],
            [_key]: _value,
        }
        console.log('checking updatedTableDateSource: ', updatedTableDateSource)

        setTableDataSource(updatedTableDateSource)
    }

    const addNewSlot = (_recordIndex: number): void => {
        if (!allTimeTableDetail) return

        const currentDate = new Date(allTimeTableDetail.startDate)
        currentDate.setDate(currentDate.getDate() + _recordIndex)
        // const dayOfWeek = daysOfWeek[currentDate.getDay()]
        console.log(
            'alllll',
            allTimeTableDetail,
            { _recordIndex },
            { tableDataSource }
        )
        const updatedTableDateSource: TableDateSourceProps[] =
            cloneDeep(tableDataSource)
        updatedTableDateSource[_recordIndex].timeEntries.push({
            startTime: undefined,
            endTime: undefined,
            startBreak: undefined,
            endBreak: undefined,
            dayOfWeek:
                updatedTableDateSource[_recordIndex].timeEntries[0].dayOfWeek,
            timeTableId:
                updatedTableDateSource[_recordIndex].timeEntries[0].timeTableId,
            isActive: allTimeTableDetail.isActive,
            isRepeated: allTimeTableDetail.isRepeated,
            slotId: allSlotDetail.slotId,
        })
        setTableDataSource(updatedTableDateSource)
    }
    console.log({ allTimeTableDetail })
    const columns: ColumnsType<any> = [
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
                console.log({ record })
                return record?.timeEntries?.map(
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
            render: (_, record, recordIndex) => {
                return record?.timeEntries?.map(
                    (timeEntry: TimeEntryProps, rowIndex: number) => (
                        <EndTime
                            key={`${recordIndex}-${rowIndex}`}
                            recordIndex={recordIndex}
                            rowIndex={rowIndex}
                            endTime={timeEntry.endTime}
                            setStartTime={handleUpdateTableDataSource}
                        />
                    )
                )
            },
        },
        {
            title: 'Start Break',
            dataIndex: 'createTimeTableStartBreak',
            key: 'createTimeTableStartBreak',
            render: (_, record, recordIndex) => {
                return record?.timeEntries?.map(
                    (timeEntry: TimeEntryProps, rowIndex: number) => (
                        <StartBreak
                            key={`${recordIndex}-${rowIndex}`}
                            recordIndex={recordIndex}
                            rowIndex={rowIndex}
                            startBreak={timeEntry.startBreak}
                            setStartTime={handleUpdateTableDataSource}
                            minTime={record.timeEntries[rowIndex].startTime}
                            maxTime={record.timeEntries[rowIndex].endTime}
                        />
                    )
                )
            },
        },
        {
            title: 'End Break',
            dataIndex: 'createTimeTableEndBreak',
            key: 'createTimeTableEndBreak',
            render: (_, record, recordIndex) => {
                return record?.timeEntries?.map(
                    (timeEntry: TimeEntryProps, rowIndex: number) => (
                        <EndBreak
                            key={`${recordIndex}-${rowIndex}`}
                            recordIndex={recordIndex}
                            rowIndex={rowIndex}
                            endBreak={timeEntry.endBreak}
                            setStartTime={handleUpdateTableDataSource}
                            minTime={record.timeEntries[rowIndex].startTime}
                            maxTime={record.timeEntries[rowIndex].endTime}
                        />
                    )
                )
            },
        },
        {
            title: getLabelByKey('status'),
            dataIndex: 'createTimeTableSlot',
            key: 'createTimeTableSlot',
            render: (_, record, recordIndex) => {
                return record.timeEntries.map(
                    (timeEntry: TimeEntryProps, rowIndex: number) => (
                        <>
                            <div
                                key={`${recordIndex}-${rowIndex}`}
                                className={
                                    timeEntry.isActive ? 'Active' : 'De-Active'
                                }
                            >
                                <button>
                                    {timeEntry.isActive ? 'ON' : 'OFF'}
                                </button>
                                <img src={StatusActiveError} alt="image" />
                            </div>
                        </>
                    )
                )
            },
        },
        {
            title: 'Slot',
            dataIndex: 'createTimeTableSlot',
            key: 'createTimeTableSlot',
            //improving-screens
            render: (_, record, recordIndex) => {
                console.log('ayzelll', record, recordIndex)
                return record?.timeEntries?.map(
                    (timeEntry: TimeEntryProps, rowIndex: number) => (
                        <div key={`${recordIndex}-${rowIndex}`}>
                            <button
                                type="submit"
                                onClick={() => {
                                    if (
                                        timeEntry.slotId === undefined &&
                                        timeEntry.timeTableId &&
                                        timeEntry.startTime &&
                                        timeEntry.endTime &&
                                        timeEntry.startBreak &&
                                        timeEntry.endBreak &&
                                        timeEntry.dayOfWeek
                                    ) {
                                        createSlots({
                                            timeTableId: timeEntry.timeTableId,
                                            startTime:
                                                moment(
                                                    timeEntry.startTime,
                                                    'hh:mm A'
                                                ).format('HH:mm:ss') || '',
                                            endTime:
                                                moment(
                                                    timeEntry.endTime,
                                                    'hh:mm A'
                                                ).format('HH:mm:ss') || '',
                                            startBreak:
                                                moment(
                                                    timeEntry.startBreak,
                                                    'hh:mm A'
                                                ).format('HH:mm:ss') || '',
                                            endBreak:
                                                moment(
                                                    timeEntry.endBreak,
                                                    'hh:mm A'
                                                ).format('HH:mm:ss') || '',
                                            dayOfWeek:
                                                timeEntry.dayOfWeek || '',
                                        })
                                        setIsShowModal(true)
                                    } else if (
                                        timeEntry.timeTableId &&
                                        timeEntry.startTime &&
                                        timeEntry.endTime &&
                                        timeEntry.startBreak &&
                                        timeEntry.endBreak &&
                                        timeEntry.dayOfWeek &&
                                        timeEntry.slotId
                                    ) {
                                        EditSlots({
                                            slotId: timeEntry.slotId,
                                            startTime:
                                                moment(
                                                    timeEntry.startTime,
                                                    'hh:mm A'
                                                ).format('HH:mm:ss') || '',
                                            endTime:
                                                moment(
                                                    timeEntry.endTime,
                                                    'hh:mm A'
                                                ).format('HH:mm:ss') || '',
                                            startBreak:
                                                moment(
                                                    timeEntry.startBreak,
                                                    'hh:mm A'
                                                ).format('HH:mm:ss') || '',
                                            endBreak:
                                                moment(
                                                    timeEntry.endBreak,
                                                    'hh:mm A'
                                                ).format('HH:mm:ss') || '',
                                            dayOfWeek:
                                                timeEntry.dayOfWeek || '',
                                            isActive: timeEntry.isActive,
                                        })
                                        setIsShowModal(true)
                                    } else {
                                        {
                                            toast('Please Fill the form', {
                                                type: 'error',
                                                autoClose: 2000,
                                            })
                                            return
                                        }
                                    }
                                }}
                            >
                                {timeEntry.slotId === undefined
                                    ? 'Add'
                                    : 'Edit'}
                            </button>
                        </div>
                    )
                )
            },
        },
        {
            title: 'Actions',
            key: 'timeTableAction',
            render: (_, record, recordIndex) => {
                const items = [
                    {
                        key: '1',
                        label: 'Duplicate',
                        onClick: () => {
                            handleDuplicateDay(recordIndex)
                        },
                    },
                    {
                        key: '2',
                        label: 'Add new Slot',
                        // improving-screens
                        onClick: () => {
                            addNewSlot(recordIndex)
                        },
                    },
                ]
                return record?.timeEntries?.map(
                    (timeEntry: TimeEntryProps, rowIndex: number) => (
                        <Space key={`${recordIndex}-${rowIndex}`} size="middle">
                            <Dropdown menu={{ items }}>
                                <img
                                    src={actionMenuTogglerIcon as string}
                                    alt="action menu"
                                    style={{ cursor: 'pointer' }}
                                />
                            </Dropdown>
                        </Space>
                    )
                )
            },
        },
    ]

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
        // const numberOfDays = calculateDaysDifference(
        //     allTimeTableDetail.startDate,
        //     allTimeTableDetail.endDate
        // )
        const _tableDataSource: TableDateSourceProps[] = allSlotDetail?.map(
            (slot: any, index: number) => {
                const currentDate = new Date(allTimeTableDetail.startDate)
                currentDate.setDate(currentDate.getDate() + index)

                return {
                    key: index.toString(),
                    date: currentDate.toISOString().split('T')[0],
                    dayOfWeek: slot.dayOfWeek,

                    timeEntries: [
                        {
                            ...slot,
                            timeTableId: allTimeTableDetail.timeTableId,
                            isActive: allTimeTableDetail.isActive,
                            isRepeated: allTimeTableDetail.isRepeated,
                        },
                    ],
                }
            }
        )

        setTableDataSource(_tableDataSource)
        console.log(
            'checking tableDataSource: ',
            _tableDataSource,
            tableDataSource
        )
    }, [allTimeTableDetail])
    // Modify the useEffect block where you initialize _tableDataSource

    console.log(allSlotDetail, tableDataSource, ' allSlotDetail')

    return (
        <>
            {/* {loading && <LoadingOverlay message="" />} */}
            <CreateTimeTableStyled>
                {SuccessModal().modalComponent}
                {WarningModal().modalComponent}
                <Table
                    columns={columns}
                    dataSource={tableDataSource}
                    pagination={false}
                    title={() => <RenderTableTitle />}
                    scroll={{ x: true }}
                />
            </CreateTimeTableStyled>
        </>
    )
}

export default EditTimeTableSheet
