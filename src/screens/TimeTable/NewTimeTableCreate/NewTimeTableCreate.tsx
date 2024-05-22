// Import statements...
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import FormControl from '../../../components/FormControl'
import { Dropdown, Space, Form, Tabs } from 'antd'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import { Formik } from 'formik'
import { TimeTableCreate } from './styles'
import CustomButton from '../../../components/CustomButton/CustomButton'
import Head from '../../../components/Head/Head'
import { useParams } from 'react-router-dom'
import useTimetable from '../../../hooks/useTimetable'
import moment from 'moment'
import { cloneDeep } from 'lodash'

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

const dayOfWeeks = [
    {
        key: '1',
        label: 'Monday',
    },
    {
        key: '2',
        label: 'Tuesday',
    },
    {
        key: '3',
        label: 'Wednesday',
    },
    {
        key: '4',
        label: 'Thursday',
    },
    {
        key: '5',
        label: 'Friday',
    },
    {
        key: '6',
        label: 'Saturday',
    },
    {
        key: '7',
        label: 'Sunday',
    },
]

const items = [
    {
        key: '1',
        label: 'Add Slot',
    },
    {
        key: '2',
        label: 'Edit',
    },
    {
        key: '3',
        label: 'Duplicate',
    },
    {
        key: '4',
        label: 'Update',
    },
]
interface FormValues {
    startTime: string
    endTime: string
    startBreak: string
    endBreak: string
}
const NewTimeTable = (): JSX.Element => {
    const { timeTableId } = useParams()
    const [TimetableValue, setTimetableValue] = useState<any>()
    const [allTimeTableDetail, setAllTimeTableDetail] =
        useState<TableDetailProps>()
    const [tableDataSource, setTableDataSource] = useState<
        TableDateSourceProps[]
    >([])
    const {
        getTimetableById,
        createSlots,
        SuccessModal,
        setIsShowModal,
        getTimetableSlot,
    } = useTimetable()
    useEffect(() => {
        const fetchrecord = async (): Promise<void> => {
            const data = await getTimetableById(Number(timeTableId))
            setTimetableValue(data)
        }
        fetchrecord()
    }, [timeTableId])

    console.log('getTimetableById', TimetableValue)

    useEffect(() => {
        async function fetchTimeTableById(): Promise<void> {
            const timeTableRes = await getTimetableById(Number(timeTableId))
            if (timeTableRes.results) {
                const _timeTableDetail: TableDetailProps = timeTableRes.results
                const timeTableSlotsRes: TimeEntryProps[] =
                    await getTimetableSlot(_timeTableDetail.timeTableId)
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
    }, [timeTableId])

    useEffect(() => {
        if (!allTimeTableDetail) {
            return
        }

        const startDateMoment = moment(
            allTimeTableDetail.startDate,
            'YYYY-MM-DD'
        )
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const numberOfDays = calculateDaysDifference(
            allTimeTableDetail.startDate,
            allTimeTableDetail.endDate
        )

        const _tableDataSource: TableDateSourceProps[] = Array.from(
            { length: numberOfDays },
            (_, index) => {
                const currentDate = startDateMoment.clone().add(index, 'days')
                const dayOfWeek = dayOfWeeks[currentDate.day()].label
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
                    date: currentDate.format('DD-MM-YYYY'),
                    dayOfWeek: dayOfWeek,
                    isRepeated: allTimeTableDetail.isRepeated,
                    timeEntries: _timeEntries,
                }
            }
        )

        setTableDataSource(_tableDataSource)
    }, [allTimeTableDetail])

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

    // Function to add a new slot for a specific day
    const addNewSlot = (_recordIndex: number): void => {
        if (!allTimeTableDetail) return

        const currentDate = moment(allTimeTableDetail.startDate).add(
            _recordIndex,
            'days'
        )
        const dayOfWeek = dayOfWeeks[currentDate.day()].label

        setTableDataSource((prevDataSource) => {
            const updatedDataSource = [...prevDataSource]
            const newSlot: TimeEntryProps = {
                startTime: undefined,
                endTime: undefined,
                startBreak: undefined,
                endBreak: undefined,
                dayOfWeek: String(dayOfWeek),
                timeTableId: allTimeTableDetail.timeTableId,
                isActive: allTimeTableDetail.isActive,
            }
            updatedDataSource[_recordIndex] = {
                ...updatedDataSource[_recordIndex],
                timeEntries: [
                    ...updatedDataSource[_recordIndex].timeEntries,
                    newSlot,
                ],
            }
            console.log('k', updatedDataSource)

            return updatedDataSource
        })
    }

    const dayOfWeekss = tableDataSource.map((item, index) => {
        console.log('nada,', index, item)

        return {
            key: item.key,
            label: item.dayOfWeek,
            component: (
                <Formik initialValues={{}} onSubmit={(e) => {}}>
                    {(formik) => {
                        console.log('formik.values', formik.values)
                        const timeEntry = formik.values
                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <Row>
                                    <Col md="1"></Col>
                                    <Col md="2">
                                        <FormControl
                                            control="timePicker"
                                            type="timePicker"
                                            name="startTime"
                                            label="Start Time"
                                            fontSize="16px"
                                            max={6}
                                            placeholder="00:00:00"
                                        />
                                    </Col>
                                    <Col md="2">
                                        <FormControl
                                            control="timePicker"
                                            type="text"
                                            name="endTime"
                                            label="End Time"
                                            fontSize="16px"
                                            max={6}
                                            placeholder="00:00:00"
                                        />
                                    </Col>
                                    <Col md="2">
                                        <FormControl
                                            control="timePicker"
                                            type="text"
                                            name="startBreak"
                                            label="Start Break"
                                            fontSize="16px"
                                            max={6}
                                            placeholder="00:00:00"
                                        />
                                    </Col>
                                    <Col md="2">
                                        <FormControl
                                            control="timePicker"
                                            type="text"
                                            name="endBreak"
                                            label="End Break"
                                            fontSize="16px"
                                            max={6}
                                            placeholder="00:00:00"
                                        />
                                    </Col>
                                    <Col md="2" className="AddButton">
                                        <label>Slots</label>
                                        <span
                                            // onClick={() => {
                                            //     if (
                                            //         !timeTableId ||
                                            //         !formik.values.startTime ||
                                            //         !timeEntry.endTime ||
                                            //         !timeEntry.startBreak ||
                                            //         !timeEntry.endBreak ||
                                            //         !timeEntry.dayOfWeek
                                            //     ) {
                                            //         alert(
                                            //             'Please fill out the time slot'
                                            //         )
                                            //         return
                                            //     }
                                            //     createSlots({
                                            //         timeTableId:
                                            //             Number(timeTableId),
                                            //         startTime:
                                            //             moment(
                                            //                 formik.values
                                            //                     .startTime,
                                            //                 'hh:mm A'
                                            //             ).format('HH:mm:ss') ||
                                            //             '',
                                            //         endTime:
                                            //             moment(
                                            //                 formik.values
                                            //                     .endTime,
                                            //                 'hh:mm A'
                                            //             ).format('HH:mm:ss') ||
                                            //             '',
                                            //         startBreak:
                                            //             moment(
                                            //                 formik.values
                                            //                     .startBreak,
                                            //                 'hh:mm A'
                                            //             ).format('HH:mm:ss') ||
                                            //             '',
                                            //         endBreak:
                                            //             moment(
                                            //                 formik.values
                                            //                     .endBreak,
                                            //                 'hh:mm A'
                                            //             ).format('HH:mm:ss') ||
                                            //             '',
                                            //         dayOfWeek:
                                            //             timeEntry.dayOfWeek ||
                                            //             '',
                                            //     })
                                            //     setIsShowModal(true)
                                            // }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {'Add'}
                                        </span>
                                    </Col>
                                    <Col md="1" className="actionContainer">
                                        <label>Actions</label>
                                        <div>
                                            <Space>
                                                <Dropdown
                                                    menu={{
                                                        items: items.map(
                                                            (menuItem) => {
                                                                return {
                                                                    ...menuItem,
                                                                    onClick:
                                                                        () =>
                                                                            addNewSlot(
                                                                                index
                                                                            ),
                                                                }
                                                            }
                                                        ),
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            actionMenuTogglerIcon as string
                                                        }
                                                        alt="action menu"
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                    />
                                                </Dropdown>
                                            </Space>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        )
                    }}
                </Formik>
            ),
        }
    })

    const onSubmit = (values: any): void => {
        console.log('values', values)
    }

    return (
        <>
            <Head title="TimeTable Create" />
            <TimeTableCreate>
                <Formik initialValues={{}} onSubmit={onSubmit}>
                    {(formik) => (
                        <Form
                            name="basic"
                            onFinish={formik.handleSubmit}
                            autoComplete="off"
                        >
                            <div className="bg-white form">
                                <div>
                                    <h3 className="timetable-heading">
                                        Session Timings by Day
                                    </h3>
                                    <Tabs
                                        defaultActiveKey="1"
                                        type="card"
                                        items={dayOfWeekss.map((days) => ({
                                            label: `${days?.label}`,
                                            key: `${days?.key}`,
                                            children: days.component,
                                        }))}
                                    />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </TimeTableCreate>
        </>
    )
}

export default NewTimeTable
