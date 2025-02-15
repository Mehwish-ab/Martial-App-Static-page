import React, { useEffect, useState } from 'react'
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
import { useNavigate, useParams } from 'react-router-dom'
import plusIcon from '../../../assets/icons/ic_plus.svg'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
// import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { TimeTableDataType } from '../../../redux/features/TimeTable/TimeTableSlice'
// import DummyData from './dummyData.json'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import RightArrow from '../../../assets/images/rightArrow.svg'
import LeftArrow from '../../../assets/images/leftArrow.svg'
import DateCalander from '../../../assets/images/dateCalander.svg'
import moment from 'moment'
import useTimetable from '../../../hooks/useTimetable'
import Head from '../../../components/Head/Head'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
const RenderTableTitle = (): JSX.Element => {
    const navigate = useNavigate()
    const { getLabelByKey } = useScreenTranslation('timeTableList')
    const { classId } = useParams()

    return (
        <>
            <Head title="TimeTable List" />
            <CustomDiv>
                <div className="mainWrapper">
                    <h3 className="table-heading">
                        {getLabelByKey('screenTitle')}
                    </h3>
                    <div className="FilterMainContainer">
                        <div className="arrowsMain">
                            <div className="arrowRight">
                                <img
                                    src={LeftArrow}
                                    alt="Date"
                                    width={18}
                                    height={12}
                                />
                            </div>
                            <div className="arrowLeft">
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
                                {' '}
                                <span>Mon,</span> Sep 11, 2023 -{' '}
                                <span>Thu,</span> Sep 21, 2023
                            </p>
                            <img
                                src={DateCalander}
                                alt="calander"
                                width={21}
                                height={21}
                            />
                        </div>
                        <div className="todayPlusContainer">
                            <div className="dateToday">
                                <p>Today</p>
                            </div>
                            {/* <CustomButton
                                bgcolor={tertiaryBlue2}
                                textTransform="Captilize"
                                color={pureDark}
                                padding="6.5px 0px"
                                fontFamily={`${fontFamilyMedium}`}
                                width="40px"
                                type="submit"
                                title=""
                                fontSize="17px"
                                // loading={loading}
                                icon={
                                    <img
                                        src={plusIcon}
                                        alt="edit icon"
                                        width={17}
                                        height={17}
                                    />
                                }
                                clicked={() => {
                                    navigate(`/timetable/create/${classId}`)
                                }}
                            /> */}
                        </div>
                    </div>
                </div>
            </CustomDiv>
        </>
    )
}
const ListTimeTable: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10
    const { getLabelByKey } = useScreenTranslation('timeTableList')

    // const { timeTableData } = useSelector(
    //     (state: RootState) => state.timeTableData
    // )
    const { classId } = useParams()
    const [Id, setId] = useState(0)

    const {
        deletemodal,
        deleteConfirmation,
        setIsShowModal,
        WarningModal,
        TimeTableStatus,
        AllTimetable,
        getAllTimetable,
        getAllUserPagination,
        loading,
    } = useTimetable()
    console.log('timeTableData', AllTimetable)
    const { loginData } = useSelector((state: RootState) => state)
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )

    // useEffect(() => {
    //     console.log('hi use effect')
    //     store.dispatch(getTimetableByUserId(classId))
    // }, [])
    // const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | undefined>(undefined)
    console.log('timetable', AllTimetable)
    const handlePaginationChange = async (page: number): Promise<any> => {
        try {
            //setLoading(true)
            // page = page - 1
            const response = await getAllUserPagination(
                Number(loginData.data?.userDetails.id),
                page - 1
            )
            // setAllTimetable(response)
            // eslint-disable-next-line @typescript-eslint/no-shadow
        } catch (error: unknown) {
            setError('Error fetching data')
        } finally {
            //  setLoading(false)
        }
        setCurrentPage(page)
    }
    const navigate = useNavigate()

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
    // const { loading } = useSelector((state: RootState) => state.timeTableData)
    useEffect(() => {
        const fetchData = async (): Promise<any> => {
            try {
                await getAllTimetable(
                    Number(loginData.data?.userDetails.id),
                    Number(classId)
                )

                //  setAllTimetable(res)
            } catch (errors) {
                /// setError('Error fetching data')
            } finally {
                //  setLoading(false)
            }
        }

        fetchData()
    }, [])
    const showActivities = (_activities: string[]): string => {
        console.log('activities', _activities)
        let activitiesName = ''
        _activities.forEach((activity) => {
            const index = activities.findIndex((act) => act.id === activity)
            if (index !== -1) {
                const activityLabel = (activities[index] as any)[
                    selectedLanguage
                ]
                activitiesName =
                    activitiesName === ''
                        ? activityLabel
                        : `${activitiesName}, ${activityLabel}`
            }
        })
        if (activitiesName.length > 35) {
            return `${activitiesName.slice(0, 35)}...`
        }
        return activitiesName || getLabelByKey('activitiesPlaceholder')
    }
    const columns: ColumnsType<TimeTableDataType> = [
        // {
        //     title: getLabelByKey('id'),
        //     dataIndex: 'timeTableId',
        //     key: 'timeTableId',
        //     defaultSortOrder: 'descend',
        //     sorter: (a, b) => a.timeTableId - b.timeTableId,
        // },
        // {
        //     title: getLabelByKey('title'),
        //     dataIndex: 'title',
        //     key: 'title',
        // },
        {
            title: getLabelByKey('roomName'),
            dataIndex: 'roomIds',
            key: 'roomName',
        },
        {
            title: getLabelByKey('instructorName'),
            dataIndex: 'instructorIds',
            key: 'instructorName',
        },
        {
            title: getLabelByKey('activities'),
            dataIndex: 'activities',
            key: 'Activities',
            render: (record) => {
                const selectedAct = record?.split(',').map(String)
                return (
                    <div className="list-item mb-0">
                        <div className="list-item-value ">
                            {showActivities(selectedAct)}
                        </div>
                    </div>
                )
            },
        },
        {
            title: getLabelByKey('startDate'),
            dataIndex: 'startDate',
            key: 'startDate',
            render: (startDate) => {
                return (
                    <div className="list-item mb-0">
                        <div className="list-item-value ">
                            {moment(moment(startDate, 'YYYY-MM-DD')).format(
                                'dddd, MMM DD, YYYY'
                            )}
                        </div>
                    </div>
                )
            },
        },
        {
            title: getLabelByKey('endDate'),
            dataIndex: 'endDate',
            key: 'endDate',
            render: (endDate) => {
                if (endDate !== null) {
                    return (
                        <div className="list-item mb-0">
                            <div className="list-item-value ">
                                {moment(moment(endDate, 'YYYY-MM-DD')).format(
                                    'dddd, MMM DD, YYYY'
                                )}
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="list-item mb-0">
                            <div className="list-item-value ms-2">{'--'}</div>
                        </div>
                    )
                }
            },
        },
        // {
        //     title: getLabelByKey('type'),
        //     dataIndex: 'isRepeated',
        //     key: 'isRepeated',
        //     render: (isRepeated) => {
        //         if (isRepeated === true) {
        //             return (
        //                 <div>
        //                     <text>{'Repeat'}</text>
        //                 </div>
        //             )
        //         } else {
        //             return (
        //                 <div>
        //                     <text>{'No Repeat'}</text>
        //                 </div>
        //             )
        //         }
        //     },
        // },
        {
            title: getLabelByKey('status'),
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive, index) => {
                console.log('dummy', isActive, index)

                if (isActive === true) {
                    return (
                        <div className={'Active'}>
                            <button
                                onClick={() => {
                                    {
                                        TimeTableStatus(
                                            index.timeTableId,
                                            false
                                        )
                                    }
                                }}
                            >
                                Active
                            </button>
                            <img src={StatusActiveError} alt="image" />
                        </div>
                    )
                } else {
                    return (
                        <div className={'De-Active'}>
                            <button
                                onClick={() => {
                                    TimeTableStatus(index.timeTableId, true)
                                }}
                            >
                                De-Active
                            </button>
                            <img src={StatusActiveError} alt="image" />
                        </div>
                    )
                }
            },
        },
        {
            title: getLabelByKey('actions'),
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
                        label: 'Delete',
                        onClick: () => {
                            setId(record.timeTableId)
                            setIsShowModal(true)
                        },
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
            {deletemodal().modalComponent}
            {WarningModal().modalComponent}
            {deleteConfirmation(Id).modalComponent}
            {loading && <LoadingOverlay message="" />}
            <RenderTableTitle />
            <ListTimeTableStyled>
                <Table
                    columns={columns}
                    // dataSource={timeTableData.data.map((data) => {
                    //     return data
                    // })}
                    dataSource={
                        AllTimetable ? AllTimetable?.data : []
                        // timeTableData?.data.length > 0 ? timeTableData.data : []
                    }
                    // scroll={{ x: true }}
                    pagination={{
                        current: currentPage,
                        total: AllTimetable ? AllTimetable.totalItems : 0,
                        pageSize: pageSize,
                        showTotal: (total, range) => (
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: `Page <span className='paginationVal'>${currentPage}</span> of ${Math.ceil(
                                        total / pageSize
                                    )}`,
                                }}
                            />
                        ),
                        onChange: (page) => handlePaginationChange(page),
                        // itemRender: customItemRender,
                    }}
                />
            </ListTimeTableStyled>
        </>
    )
}

export default ListTimeTable
