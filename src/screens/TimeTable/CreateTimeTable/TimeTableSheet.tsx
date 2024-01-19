import React, { useState, useEffect } from 'react'

import { Dropdown, Space, Table } from 'antd'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import { CreateTimeTableStyled, HeaderStyling } from './styles'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
// import { TimeTableDataType } from '../../../redux/features/TimeTable/TimeTableSlice'
import { RootState } from '../../../redux/store'
import { ColumnsType } from 'antd/lib/table'
import StartTime from './StartTime'
import StartBreak from './StartBreak'
import EndTime from './Endtime'
import EndBreak from './EndBreak'
import useTimetable from '../../../hooks/useTimetable'
import { cloneDeep, values } from 'lodash'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import moment from 'moment'
import Head from '../../../components/Head/Head'
interface TimeEntryProps {
    startTime: string | undefined
    endTime: string | undefined
    startBreak: string | undefined
    endBreak: string | undefined
    dayOfWeek: string
    timeTableId: number
    isActive: boolean
}

interface TableDateSourceProps {
    key: string
    date: string
    dayOfWeek: string
    isRepeated: boolean
    timeEntries: TimeEntryProps[]
}

interface TableDetailProps {
    endDate: string
    isActive: boolean
    isRepeated: boolean
    startDate: string
    timeTableId: number
    title: string
    timeEntries: TimeEntryProps[]
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
    const { getLabelByKey } = useScreenTranslation('createTImeTable')
    return (
        <HeaderStyling>
            <h3 className="tableHeading">
                {getLabelByKey('sessionTimingsByDay')}
            </h3>
        </HeaderStyling>
    )
}
const TimeTableSheet: React.FC = () => {
    const { timeTableId } = useParams()
    const {
        getTimetableById,
        createSlots,
        Createmodal,
        setIsShowModal,
        getTimetableSlot,
    } = useTimetable()
    const [allTimeTableDetail, setAllTimeTableDetail] =
        useState<TableDetailProps>()
    const [tableDataSource, setTableDataSource] = useState<
        TableDateSourceProps[]
    >([])
    const { loading } = useSelector((state: RootState) => state.timeTableData)

    const handleUpdateTableDataSource = (
        _recordIndex: number,
        _key: string,
        _value: undefined | string | boolean | number,
        _timeEntryIndex?: number
    ): void => {
        if (_timeEntryIndex === undefined) {
            console.log('checking i am into if')

            const updatedTableDateSource = JSON.parse(
                JSON.stringify(tableDataSource)
            )
            updatedTableDateSource[_recordIndex][_key] = _value
            setTableDataSource(updatedTableDateSource)
            return
        }
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
        const dayOfWeek = daysOfWeek[currentDate.getDay()]
        const updatedTableDateSource: TableDateSourceProps[] =
            cloneDeep(tableDataSource)
        updatedTableDateSource[_recordIndex].timeEntries.push({
            startTime: undefined,
            endTime: undefined,
            startBreak: undefined,
            endBreak: undefined,
            dayOfWeek: dayOfWeek,
            timeTableId:
                updatedTableDateSource[_recordIndex].timeEntries[0].timeTableId,
            isActive: allTimeTableDetail.isActive,
        })
        setTableDataSource(updatedTableDateSource)
    }

    const createTImeSlotHandler = (): void => {}

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
                console.log('checking record.timeEntries: ', record.timeEntries)

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
            render: (_, record, recordIndex) => {
                return record.timeEntries.map(
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
                return record.timeEntries.map(
                    (timeEntry: TimeEntryProps, rowIndex: number) => (
                        <StartBreak
                            key={`${recordIndex}-${rowIndex}`}
                            recordIndex={recordIndex}
                            rowIndex={rowIndex}
                            startBreak={timeEntry.startBreak}
                            setStartTime={handleUpdateTableDataSource}
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
                return record.timeEntries.map(
                    (timeEntry: TimeEntryProps, rowIndex: number) => (
                        <EndBreak
                            key={`${recordIndex}-${rowIndex}`}
                            recordIndex={recordIndex}
                            rowIndex={rowIndex}
                            endBreak={timeEntry.endBreak}
                            setStartTime={handleUpdateTableDataSource}
                        />
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
                return record.timeEntries.map(
                    (timeEntry: TimeEntryProps, rowIndex: number) => (
                        <div key={`${recordIndex}-${rowIndex}`}>
                            <button
                                onClick={() => {
                                    if (
                                        !timeEntry.timeTableId ||
                                        !timeEntry.startTime ||
                                        !timeEntry.endTime ||
                                        !timeEntry.startBreak ||
                                        !timeEntry.endBreak ||
                                        !timeEntry.dayOfWeek
                                    ) {
                                        alert('Please fill out the time slot')
                                        return
                                    }
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
                                        dayOfWeek: timeEntry.dayOfWeek || '',
                                    })
                                    setIsShowModal(true)
                                }}
                            >
                                {'Add'}
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
                        onClick: () => {},
                    },
                    {
                        key: '2',
                        label: 'Add new Slot',
                        // improving-screens
                        onClick: () => addNewSlot(recordIndex),
                    },
                ]
                return record.timeEntries.map(
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
        console.log('checking i am here')

        async function fetchTimeTableById(): Promise<void> {
            const timeTableRes = await getTimetableById(Number(timeTableId))
            console.log('checking response: ', timeTableRes)

            if (timeTableRes.results) {
                const _timeTableDetail: TableDetailProps = timeTableRes.results
                const timeTableSlotsRes: TimeEntryProps[] =
                    await getTimetableSlot(_timeTableDetail.timeTableId)
                console.log('checking timeTableSlotsRes: ', timeTableSlotsRes)
                if (Object.keys(timeTableSlotsRes).length) {
                    const _timeEntries: TimeEntryProps[] = []
                    Object.entries(timeTableSlotsRes).forEach(
                        (_entryArr: any) => {
                            const _values: TimeEntryProps[] =
                                _entryArr[1] as TimeEntryProps[]
                            _values.forEach((_timeEntryObj) => {
                                const updatedTimeSheetEntry: TimeEntryProps = {
                                    ..._timeEntryObj,
                                    startTime: moment(
                                        _timeEntryObj.startTime,
                                        'HH:mm:ss'
                                    ).format('hh:mm A'),
                                }
                                _timeEntries.push(updatedTimeSheetEntry)
                            })
                        }
                    )
                    console.log('checking _timeEntries: ', _timeEntries)

                    setAllTimeTableDetail({
                        ..._timeTableDetail,
                        timeEntries: _timeEntries,
                    })
                } else {
                    setAllTimeTableDetail({
                        ..._timeTableDetail,
                        timeEntries: [],
                    })
                }
            }
        }
        if (timeTableId && !allTimeTableDetail?.timeTableId) {
            fetchTimeTableById()
        }
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
                const _timeEntries = allTimeTableDetail.timeEntries.length
                    ? [...allTimeTableDetail.timeEntries]
                    : [
                          {
                              startTime: undefined,
                              endTime: undefined,
                              startBreak: undefined,
                              endBreak: undefined,
                              dayOfWeek: dayOfWeek,
                              timeTableId: allTimeTableDetail.timeTableId,
                              isActive: allTimeTableDetail.isActive,
                          },
                      ]
                return {
                    key: index.toString(),
                    date: currentDate.toISOString().split('T')[0],
                    dayOfWeek: dayOfWeek,
                    isRepeated: allTimeTableDetail.isRepeated,
                    timeEntries: _timeEntries,
                }
            }
        )

        console.log('checking tableDataSource: ', _tableDataSource)
        setTableDataSource(_tableDataSource)
    }, [allTimeTableDetail])

    console.log('checking tableDataSource: ', tableDataSource)

    return (
        <>
            <Head title="TimeTable Slots" />
            {Createmodal().modalComponent}
            {loading && <LoadingOverlay message="" />}
            <RenderTableTitle />
            <CreateTimeTableStyled>
                <Table
                    columns={columns}
                    dataSource={tableDataSource}
                    pagination={false}
                    scroll={{ x: true }}
                />
            </CreateTimeTableStyled>
        </>
    )
}

export default TimeTableSheet
