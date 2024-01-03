import React, { useEffect } from 'react'
import { Dropdown, Space, Table } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import CustomButton from '../../../components/CustomButton/CustomButton'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import Clock from '../../../assets/icons/ic_clock.svg'
import { useSelector } from 'react-redux'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
// import DummyData from './dummyData.json'
import {
    fontFamilyMedium,
    lightBlue3,
    pureDark,
} from '../../../components/GlobalStyle'
import { CreateTimeTableStyled } from './styles'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { TimeTableDataType } from '../../../redux/features/TimeTable/TimeTableSlice'
import { RootState } from '../../../redux/store'
import { ColumnsType } from 'antd/lib/table'
import { string } from 'yup'

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
const TimeTableSheet: React.FC<TimeTableFormProps> = ({
    setNewTimetable,
}: any) => {
    const { timeTableId } = useParams()
    console.log('timetable id', timeTableId)
    const navigate = useNavigate()
    console.log('flower', setNewTimetable)

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
    const calculateDaysDifference = (
        startDate: string | number | Date,
        endDate: string | number | Date
    ): any => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const differenceInTime = end.getTime() - start.getTime()
        const differenceInDays = Math.ceil(
            differenceInTime / (1000 * 3600 * 24)
        )
        console.log(differenceInDays, 'hatommmmmmm')

        return differenceInDays
    }
    const numberOfDays = calculateDaysDifference(
        setNewTimetable?.startDate,
        setNewTimetable?.endDate
    )
    const dummyRows = Array.from({ length: numberOfDays }, (_, index) => ({
        key: index.toString(),
        // Add other properties as needed for each row
    }))
    // const daysOfWeek = [
    //     'Sunday',
    //     'Monday',
    //     'Tuesday',
    //     'Wednesday',
    //     'Thursday',
    //     'Friday',
    //     'Saturday',
    // ]

    // const dummyRows = Array.from({ length: numberOfDays }, (_, index) => {
    //     const currentDate = new Date()
    //     currentDate.setDate(currentDate.getDate() + index);
    //     const dayOfWeek = daysOfWeek[currentDate.getDay()];

    //     return {
    //         key: index.toString(),
    //         dayOfWeek: dayOfWeek,
    //     // Add other properties as needed for each row
    // };
    // })
    const getDaysBetweenDates = (startDate: any, endDate: any): string[] => {
        const days = []
        const currentDate = new Date(startDate)

        while (currentDate <= endDate) {
            days.push(currentDate.toISOString().split('T')[0])
            currentDate.setDate(currentDate.getDate() + 1)
        }

        return days
    }
    useEffect(() => {
        const dates = getDaysBetweenDates(
            setNewTimetable?.endDate,
            setNewTimetable?.startDate
        )
        console.log('dates', dates)
        // GetUserid()
    }, [setNewTimetable?.endDate, setNewTimetable?.startDate])
    // const dataSource = DummyData as unknown as TimeTableDataType[]
    const updatedDataSource = [...dummyRows]
    const { loading } = useSelector((state: RootState) => state.timeTableData)

    const columns: ColumnsType<TimeTableDataType> = [
        {
            title: 'Week Day',
            dataIndex: 'createTimeTableWeekDay',
            key: 'createTimeTableWeekDay',
            render: (startDate) => {
                const dayName = new Date(startDate).toLocaleDateString(
                    'en-US',
                    {
                        weekday: 'long',
                    }
                )
                console.log(startDate, dayName, 'j')

                return <span>{dayName}</span>
            },
        },
        {
            title: 'Start Time',
            dataIndex: 'createTimeTableStartDate',
            key: 'createTimeTableStartDate',
            render: (DummyDataa) => {
                return (
                    <div className="timeTableBox border rounded-2 p-2 d-flex justify-content-between align-items-center">
                        <div>{DummyDataa}</div>
                        <img src={Clock as string} alt="clock" />
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
                    <div className="timeTableBox border rounded-2 p-2 d-flex justify-content-between align-items-center">
                        <div>{DummyDatas}</div>
                        <img src={Clock as string} alt="clock" />
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
                    <div className="timeTableBox border rounded-2 p-2 d-flex justify-content-between align-items-center">
                        <div>{DummyDataas}</div>
                        <img src={Clock as string} alt="clock" />
                    </div>
                )
            },
        },
        {
            title: 'End Break',
            dataIndex: 'createTimeTableEndBreak',
            key: 'createTimeTableEndBreak',
            render: (DummyDataass) => {
                return (
                    <div className="timeTableBox border rounded-2 p-2 d-flex justify-content-between align-items-center">
                        <div>{DummyDataass}</div>
                        <img src={Clock as string} alt="clock" />
                    </div>
                )
            },
        },
        {
            title: 'Status',
            dataIndex: 'createTimeTableStatus',
            key: 'createTimeTableStatus',
            render: (DummyDatass) => {
                return (
                    <div>
                        <button>{DummyDatass}</button>
                        <img src={StatusActiveError as string} alt="images" />
                    </div>
                )
            },
        },
        {
            title: 'Slot',
            dataIndex: 'createTimeTableSlot',
            key: 'createTimeTableSlot',
            render: (Dummydata) => {
                return (
                    <div>
                        <button>{Dummydata}</button>
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

    return (
        <>
            {loading && <LoadingOverlay message="" />}
            <CreateTimeTableStyled>
                <Table
                    columns={columns}
                    dataSource={updatedDataSource}
                    pagination={false}
                    title={() => <RenderTableTitle />}
                />
                <div className="mt-20 d-flex justify-content-end">
                    <CustomButton
                        bgcolor={lightBlue3}
                        textTransform="Captilize"
                        color={pureDark}
                        padding="11px 40.50px"
                        fontFamily={`${fontFamilyMedium}`}
                        width="fit-content"
                        type="submit"
                        title="Submit"
                        fontSize="18px"
                        loading={loading}
                    />
                </div>
            </CreateTimeTableStyled>
        </>
    )
}

export default TimeTableSheet
