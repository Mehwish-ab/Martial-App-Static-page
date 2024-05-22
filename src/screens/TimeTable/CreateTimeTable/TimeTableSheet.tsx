import React, { useState, useEffect } from 'react'
import { Dropdown, Space, Table, Tabs } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import { CreateTimeTableStyled, HeaderStyling } from './styles'
// import { TimeTableDataType } from '../../../redux/features/TimeTable/TimeTableSlice'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
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
import {
    fontFamilyMedium,
    lightBlue3,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { toast } from 'react-toastify'
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
    timeEntries: any[]
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

const TimeTable = ({
    recordIndex,
    day,
    getLabelByKey,
    handleUpdateTableDataSource,
    slots,
    handleDuplicateDay,
    addNewSlot,
    setIsShowModal,
    timeTableId,
    EditSlots,
}: any): JSX.Element => {
    console.log({ day })

    const columns: ColumnsType<any> = [
        // {
        //     title: getLabelByKey('weekDay'),
        //     dataIndex: 'createTimeTableWeekDay',
        //     key: 'createTimeTableWeekDay',
        //     render: (value, record) => {
        //         return <div>{record.dayOfWeek}</div>
        //     },
        // },
        {
            title: getLabelByKey('startTime'),
            dataIndex: 'createTimeTableStartDate',
            key: 'createTimeTableStartDate',
            render: (_, record) => {
                return record.timeEntries.map(
                    (timeEntry: TimeEntryProps, rowIndex: number) => (
                        <StartTime
                            key={`${recordIndex}-${rowIndex}`}
                            recordIndex={recordIndex}
                            rowIndex={rowIndex}
                            startTime={timeEntry.startTime}
                            setStartTime={handleUpdateTableDataSource}
                            minTime={record.timeEntries[rowIndex].startTime}
                            maxTime={record.timeEntries[rowIndex].endTime}
                        />
                    )
                )
            },
        },
        {
            title: getLabelByKey('endTime'),
            dataIndex: 'createTimeTableEndDate',
            key: 'createTimeTableEndDate',
            render: (_, record) => {
                return record.timeEntries.map(
                    (timeEntry: TimeEntryProps, rowIndex: number) => (
                        <EndTime
                            key={`${recordIndex}-${rowIndex}`}
                            recordIndex={recordIndex}
                            rowIndex={rowIndex}
                            endTime={timeEntry.endTime}
                            setStartTime={handleUpdateTableDataSource}
                            minTime={record.timeEntries[rowIndex].startTime}
                            maxTime={record.timeEntries[rowIndex].endTime}
                        />
                    )
                )
            },
        },
        {
            title: getLabelByKey('startBreak'),
            dataIndex: 'createTimeTableStartBreak',
            key: 'createTimeTableStartBreak',
            render: (_, record) => {
                return record.timeEntries.map(
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
            title: getLabelByKey('endBreak'),
            dataIndex: 'createTimeTableEndBreak',
            key: 'createTimeTableEndBreak',
            render: (_, record) => {
                return record.timeEntries.map(
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
            render: (_, record) => {
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
            title: getLabelByKey('slot'),
            dataIndex: 'createTimeTableSlot',
            key: 'createTimeTableSlot',
            //improving-screens
            render: (v, record) => {
                return record.timeEntries.map(
                    (timeEntry: any, rowIndex: number) => (
                        <div key={`${recordIndex}-${rowIndex}`}>
                            <button
                                onClick={() => {
                                    // console.log(
                                    //     'timeEntry',
                                    //     timeEntry,
                                    //     'recordIndex',
                                    //     recordIndex,
                                    //     'record',
                                    //     record
                                    // )
                                    if (timeEntry.slotId) {
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
                                        //  setIsShowModal(true)
                                    } else if (
                                        !timeEntry.timeTableId ||
                                        !timeEntry.startTime ||
                                        !timeEntry.endTime ||
                                        !timeEntry.startBreak ||
                                        !timeEntry.endBreak ||
                                        !timeEntry.dayOfWeek
                                    ) {
                                        toast('Please Fill the form', {
                                            type: 'error',
                                            autoClose: 2000,
                                        })
                                        return
                                    } else {
                                        slots({
                                            rowIndex: rowIndex,
                                            timeTableId: timeTableId,
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
                                    }

                                    // addNewSlot()
                                }}
                            >
                                {timeEntry.slotId ? 'Edit' : 'Add'}
                            </button>
                        </div>
                    )
                )
            },
        },
        {
            title: getLabelByKey('actions'),
            key: 'timeTableAction',
            render: (s, record) => {
                // console.log('o', record, recordIndex, s)

                const items = [
                    // {
                    //     key: '1',
                    //     label: 'Duplicate',
                    //     onClick: () => handleDuplicateDay(record.timeEntries),
                    // },
                    {
                        key: '2',
                        label: 'Add new Slot',
                        // improving-screens
                        onClick: () => {
                            addNewSlot()
                        },
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

    // console.log({ day })

    return (
        <Table
            columns={columns}
            dataSource={[day]}
            pagination={false}
            scroll={{ x: true }}
        />
    )
}

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
        SuccessModal,
        WarningModal,
        setIsShowModal,
        getTimetableSlot,
        EditSlots,
    } = useTimetable()

    const [allTimeTableDetail, setAllTimeTableDetail] = useState<any>()

    const [tableDataSource, setTableDataSource] = useState<
        TableDateSourceProps[]
    >([])

    // const { loading } = useSelector((state: RootState) => state.timeTableData)
    const [activeTab, setActiveTab] = useState<string>('0') // Default to the first day

    const handleTabChange = (key: string): void => {
        console.log('handleTabChange', key)
        setActiveTab(key)
    }

    const handleUpdateTableDataSource = (
        _recordIndex: number,
        _key: string,
        _value: undefined | string | boolean | number,
        _timeEntryIndex?: number
    ): void => {
        console.log({ _recordIndex, _key, _value, _timeEntryIndex })
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

    const addNewSlot = async (): Promise<void> => {
        if (!allTimeTableDetail) return

        const currentDate = new Date(allTimeTableDetail.startDate)
        currentDate.setDate(currentDate.getDate() + parseInt(activeTab, 10))
        const dayOfWeek = daysOfWeek[currentDate.getDay()]

        const updatedTableDateSource: TableDateSourceProps[] =
            cloneDeep(tableDataSource)
        const newTimeEntry: TimeEntryProps = {
            startTime: undefined,
            endTime: undefined,
            startBreak: undefined,
            timeTableId: Number(timeTableId),
            endBreak: undefined,
            isActive: allTimeTableDetail.isActive,
            dayOfWeek: dayOfWeek,
        }

        // Find the correct index based on activeTab
        const tabIdx = parseInt(activeTab, 10)

        // Add the new time entry to the correct day
        updatedTableDateSource[tabIdx].timeEntries.push(newTimeEntry)

        // Set the updated state
        setTableDataSource(updatedTableDateSource)
    }

    const slots = async (slotData: any): Promise<void> => {
        try {
            console.log('Slot data to be sent:', slotData) // Log the data

            // Assuming your API call to create slots here
            const response = await createSlots({
                ...slotData,
                // Format date as needed by your API
                startTime:
                    moment(slotData.startTime, 'hh:mm A').format('HH:mm:ss') ||
                    '',
                endTime:
                    moment(slotData.endTime, 'hh:mm A').format('HH:mm:ss') ||
                    '',
                startBreak:
                    moment(slotData.startBreak, 'hh:mm A').format('HH:mm:ss') ||
                    '',
                endBreak:
                    moment(slotData.endBreak, 'hh:mm A').format('HH:mm:ss') ||
                    '',
            })
            console.log('response', response)
            //setTableDataSource(response.results)
            if (allTimeTableDetail && response && response.results) {
                console.log('i am in new entry', response.results)
                const currentDate = new Date(allTimeTableDetail?.startDate)
                currentDate.setDate(
                    currentDate.getDate() + parseInt(activeTab, 10)
                )
                const updatedTableDateSource: TableDateSourceProps[] =
                    tableDataSource
                //cloneDeep(tableDataSource)

                const newTimeEntry: any = {
                    startTime: response.results.startTime,
                    endTime: response.results.endTime,
                    startBreak: response.results.startBreak,
                    slotId: response.results.slotId,
                    endBreak: response.results.endBreak,
                    isActive: allTimeTableDetail?.isActive,
                    timeTableId: allTimeTableDetail?.timeTableId,
                    dayOfWeek: response.results.dayOfWeek,
                }

                // Find the correct index based on activeTab
                const tabIdx = parseInt(activeTab, 10)

                //reset old slot

                updatedTableDateSource[tabIdx].timeEntries[slotData.rowIndex] =
                    {
                        startTime: undefined,
                        endTime: undefined,
                        startBreak: undefined,
                        timeTableId: Number(timeTableId),
                        endBreak: undefined,
                        isActive: allTimeTableDetail.isActive,
                        dayOfWeek: response.results.dayOfWeek,
                    }

                // Add the new time entry to the correct day
                updatedTableDateSource[tabIdx].timeEntries.push(newTimeEntry)

                console.log('ujalaa', updatedTableDateSource)
                // Set the updated state
                setTableDataSource(updatedTableDateSource)
            }
            // Handle the response as needed
            console.log('createSlots response:', response)
        } catch (error) {
            // Handle errors
            console.error('Error creating slots:', error)
        }
    }

    const { getLabelByKey } = useScreenTranslation('createTImeTable')

    // const handleDuplicateDay = (_recordIndex: any): void => {
    //     if (!allTimeTableDetail) return
    //     console.log('_recordIndex', _recordIndex.length)

    //     const currentDate = new Date(allTimeTableDetail.startDate)
    //     currentDate.setDate(currentDate.getDate() + parseInt(activeTab, 10))
    //     const dayOfWeek = daysOfWeek[currentDate.getDay()]

    //     const updatedTableDateSource: TableDateSourceProps[] =
    //         cloneDeep(tableDataSource)
    //     const newTimeEntry: TimeEntryProps = {
    //         startTime: _recordIndex.startTime,
    //         endTime: _recordIndex.endTime,
    //         startBreak: _recordIndex.startBreak,
    //         timeTableId: Number(timeTableId),
    //         endBreak: _recordIndex.endBreak,
    //         isActive: allTimeTableDetail.isActive,
    //         dayOfWeek: dayOfWeek,
    //     }
    //     console.log('newTimeEntry', newTimeEntry)

    //     // Find the correct index based on activeTab
    //     const tabIdx = parseInt(activeTab, 10)

    //     // Add the new time entry to the correct day
    //     updatedTableDateSource[tabIdx].timeEntries.push(newTimeEntry)

    //     // Set the updated state
    //     setTableDataSource(updatedTableDateSource)
    // }

    const navigate = useNavigate()
    const onSubmit = (): void => {
        navigate(`/timetable/list/${allTimeTableDetail?.classId}`)
    }
    const isSubmitDisabled = tableDataSource.some(
        (entry) => !entry.timeEntries.find((timeEntry) => timeEntry.slotId)
    )

    console.log({ tableDataSource, isSubmitDisabled })

    useEffect(() => {
        async function fetchTimeTableById(): Promise<void> {
            const timeTableRes = await getTimetableById(Number(timeTableId))
            console.log('checking response: ', timeTableRes)
            const _timeTableDetail: TableDetailProps = timeTableRes.results
            setAllTimeTableDetail({ ..._timeTableDetail, timeEntries: [] })
        }
        if (timeTableId) {
            fetchTimeTableById()
        }
    }, [timeTableId])

    useEffect(() => {
        if (!allTimeTableDetail) {
            return
        }

        const AddDefaultSlots = (): void => {
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

                    // Ensure that timeEntries is initialized properly
                    const _timeEntries = allTimeTableDetail.timeEntries?.length
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
        }
        async function fetchTimeTableById(): Promise<void> {
            const timeTableSlotsRes = await getTimetableSlot(
                allTimeTableDetail.timeTableId
            )

            if (Object.keys(timeTableSlotsRes).length) {
                console.log('timeTableSlotsRes', timeTableSlotsRes)
                // Define an array for mapping day of the week index to actual day names

                // Use the provided code to calculate the day of the week and active tab index
                const currentDate = new Date(allTimeTableDetail.startDate)

                // Clone the existing table data source
                const updatedTableDataSource = cloneDeep(tableDataSource)

                console.log({ updatedTableDataSource, tableDataSource })

                // Iterate over the time table slots response and update the tableDataSource based on day of the week
                Object.keys(timeTableSlotsRes).forEach(
                    (key: any, index: number) => {
                        // Create a new time entry based on the slot data
                        const daySlots = timeTableSlotsRes[key]
                        currentDate.setDate(currentDate.getDate() + index)

                        console.log({ key, daySlots })

                        const dayIndex = updatedTableDataSource.findIndex(
                            (day) => day.dayOfWeek === key
                        )

                        if (dayIndex !== -1) {
                            updatedTableDataSource[dayIndex].timeEntries.push(
                                ...daySlots
                            )
                        } else {
                            const newTimeEntry = {
                                date: `${currentDate.getDay()}`,
                                dayOfWeek: key,
                                isRepeated: allTimeTableDetail.isRepeat,
                                timeEntries: daySlots,
                                key: index.toString(),
                            }

                            updatedTableDataSource.push(newTimeEntry)
                        }
                    }
                )

                console.log('updatedTableSource', updatedTableDataSource)
                setTableDataSource(updatedTableDataSource)
            } else {
                const numberOfDays = calculateDaysDifference(
                    allTimeTableDetail.startDate,
                    allTimeTableDetail.endDate
                )
                console.log('i am in elseeee')

                const _tableDataSource: TableDateSourceProps[] = Array.from(
                    { length: numberOfDays },
                    (_, index) => {
                        const currentDate = new Date(
                            allTimeTableDetail.startDate
                        )
                        currentDate.setDate(currentDate.getDate() + index)
                        const dayOfWeek = daysOfWeek[currentDate.getDay()]

                        // Ensure that timeEntries is initialized properly
                        const _timeEntries = allTimeTableDetail.timeEntries
                            ?.length
                            ? [...allTimeTableDetail.timeEntries]
                            : [
                                  {
                                      startTime: undefined,
                                      endTime: undefined,
                                      startBreak: undefined,
                                      endBreak: undefined,
                                      dayOfWeek: dayOfWeek,
                                      timeTableId:
                                          allTimeTableDetail.timeTableId,
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

                setTableDataSource(_tableDataSource)
            }
        }

        if (allTimeTableDetail) {
            AddDefaultSlots()
            fetchTimeTableById()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allTimeTableDetail])

    // console.log(
    //     'checking tableDataSource: ',
    //     tableDataSource
    //         .map((entry) => entry.timeEntries)
    //         .flat()
    //         .some((entry) => !entry.slotId)
    // )

    return (
        <>
            <Head title="TimeTable Slots" />
            {SuccessModal().modalComponent}
            {WarningModal().modalComponent}
            {/* {loading && <LoadingOverlay message="" />} */}
            <RenderTableTitle />
            <CreateTimeTableStyled>
                <Tabs
                    activeKey={activeTab}
                    onChange={handleTabChange}
                    type="card"
                >
                    {tableDataSource.map((day, index) => (
                        <Tabs.TabPane
                            tab={day.dayOfWeek}
                            key={index.toString()}
                        >
                            <TimeTable
                                recordIndex={index}
                                day={day}
                                getLabelByKey={getLabelByKey}
                                handleUpdateTableDataSource={
                                    handleUpdateTableDataSource
                                }
                                slots={slots}
                                EditSlots={EditSlots}
                                // handleDuplicateDay={handleDuplicateDay}
                                addNewSlot={addNewSlot}
                                setIsShowModal={setIsShowModal}
                                timeTableId={timeTableId}
                            />
                        </Tabs.TabPane>
                    ))}
                </Tabs>
                <div className="mt-20 d-flex justify-content-end">
                    <CustomButton
                        bgcolor={lightBlue3}
                        textTransform="capitalize"
                        color={maastrichtBlue}
                        padding="11px 40.50px"
                        fontFamily={`${fontFamilyMedium}`}
                        width="fit-content"
                        type="submit"
                        disabled={isSubmitDisabled}
                        title="Submit"
                        fontSize="18px"
                        clicked={onSubmit}
                    />
                </div>
            </CreateTimeTableStyled>
        </>
    )
}

export default TimeTableSheet
