import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'

import { Dropdown, Menu, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import CustomButton from '../../../components/CustomButton/CustomButton'
import dummyData from './dummyData.json'
import { ListRoomsStyle } from './styles'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    pureDark,
    tertiaryBlue2,
} from '../../../components/GlobalStyle'
import plusIcon from '../../../assets/icons/ic_plus.svg'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import RightArrow from '../../../assets/images/rightArrow.svg'
import LeftArrow from '../../../assets/images/leftArrow.svg'
import { Form, Formik } from 'formik'
import FormControl from '../../../components/FormControl'
import { CustomDiv } from '../../CreateSchool/ListSchool/CustomDiv'
import useRoom from '../../../hooks/useRoom'
import { useEffect, useState } from 'react'
import {
    RoomDataType,
    getRoomDataByUseCase,
} from '../../../redux/features/Room/RoomSlice'
import { log } from 'console'
import Head from '../../../components/Head/Head'
const ListRoom = (): JSX.Element => {
    // const { schoolData } = useSelector(
    //     (state: RootState) => state.dashboardData
    // )
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const navigate = useNavigate()
    const [Room, setRoom] = useState<{ data: RoomDataType[] } | undefined>(
        undefined
    )
    const { RoomData } = useSelector((state: RootState) => state.RoomData)
    console.log('Nada', RoomData)

    const { pathname } = useLocation()
    const [, extractedSchool] = pathname.split('/')

    // Converting to uppercase
    const schoolInUpperCase = extractedSchool.toUpperCase()
    console.log('Extracted School:', schoolInUpperCase)

    const { schoolId, branchId, franchiseId } = useParams()

    console.log('ids', schoolId, branchId, franchiseId)
    let Id: string
    if (schoolId) {
        Id = schoolId
    } else if (branchId) {
        Id = branchId
    } else if (franchiseId) {
        Id = franchiseId
    }

    const { getallRoombyUC, RoomStatus } = useRoom()

    // const { schoolData, loading } = useSelector(
    //     (state: RootState) => state.schoolData
    // )
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                if (schoolId) {
                    const response: any = await getallRoombyUC(
                        Number(schoolId),
                        'SCHOOL'
                    )
                    setRoom(response)
                } else if (branchId) {
                    const response: any = await getallRoombyUC(
                        Number(branchId),
                        'BRANCH'
                    )
                    setRoom(response)
                } else if (franchiseId) {
                    const response: any = await getallRoombyUC(
                        Number(franchiseId),
                        'FRANCHISE'
                    )
                    setRoom(response)
                }
                // eslint-disable-next-line @typescript-eslint/no-shadow
            } catch (error) {
                /// setError('Error fetching data')
            } finally {
                //  setLoading(false)
            }
        }

        fetchData()
    }, [])
    console.log('room', Room)

    // const {
    //     dropdowns: { businessTypes },
    // } = useSelector((state: RootState) => state.appData.data)
    const navigation = (record: RoomDataType, redirectTo: string): void => {
        switch (redirectTo) {
            case 'edit':
                navigate(`/room/edit/${record.roomId}`, {
                    state: {
                        branchToEdit: record as RoomDataType,
                    },
                })
                break

            case 'view':
                navigate(`/room/view/${record.roomId}`, {
                    state: {
                        branch: record as RoomDataType,
                    },
                })
                break
            case 'delete':
                navigate(`/room/delete/${record.roomId}`, {
                    state: {
                        branch: record as RoomDataType,
                    },
                })
        }
    }
    useEffect(() => {
        store.dispatch(
            getRoomDataByUseCase({
                id: Number(Id),
                usecase: schoolInUpperCase,
            })
        )
    }, [schoolInUpperCase])
    const showActivities = (_activities: string): string => {
        const activitiesArr = _activities.split(',')

        let activitiesName = ''
        activitiesArr.map((activity) => {
            const index = activities.findIndex((act) => act.id === activity)
            if (index !== -1) {
                activitiesName =
                    activitiesName === ''
                        ? (activities[index] as any)[selectedLanguage]
                        : `${activitiesName}, ${
                              (activities[index] as any)[selectedLanguage]
                          }`
            }
        })
        if (activitiesName.length > 35) {
            return `${activitiesName.slice(0, 35)}...`
        }
        return activitiesName
    }
    const columns: ColumnsType<RoomDataType> = [
        {
            title: 'Id',
            dataIndex: 'roomId',
            key: 'roomId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // render: (text) => (
            //     <p>{text.length > 10 ? `${text.slice(0, 10)}...` : text}</p>
            // ),
        },
        {
            title: 'Room Number',
            dataIndex: 'roomNumber',
            key: 'roomNumber',
            // render: (_, { schoolType }) => {
            //     const item = businessTypes.find((b) => b.id === schoolType)
            //     return <p>{item?.en}</p>
            // },
        },
        {
            title: 'Floor Number',
            dataIndex: 'floorNumber',
            key: 'floorNumber',
            // render: (_, { schoolType }) => {
            //     const item = businessTypes.find((b) => b.id === schoolType)
            //     return <p>{item?.en}</p>
            // },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (isActive, index) => {
                if (index?.isActive === true) {
                    return (
                        <div className={'Active'}>
                            <button
                                onClick={() => {
                                    {
                                        RoomStatus(
                                            Number(index.roomId),
                                            false,
                                            Number(Id),
                                            schoolInUpperCase
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
                                    RoomStatus(
                                        Number(index.roomId),
                                        true,
                                        Number(Id),
                                        schoolInUpperCase
                                    )
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
            title: 'Action',
            key: 'action',
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
                        label: 'Delete',
                        // onClick: () => {
                        //     setId(record.schoolId)
                        //     setIsShowModal(true)
                        // },
                    },
                ]
                const menu = (
                    <Menu>
                        {items.map((item) => {
                            return (
                                <Menu.Item
                                    key={item.key}
                                    onClick={item.onClick}
                                >
                                    {item.label}
                                </Menu.Item>
                            )
                        })}
                    </Menu>
                )

                return (
                    <Space size="middle">
                        <Dropdown overlay={menu}>
                            <img
                                src={actionMenuTogglerIcon}
                                alt="action menu"
                                style={{ cursor: 'pointer' }}
                            />
                        </Dropdown>
                    </Space>
                )
            },
        },
    ]

    const initialValues = (): void => {}
    const handleCreateSubmit = (): void => {}

    const RenderTableTitle = (): JSX.Element => {
        return (
            <CustomDiv>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={handleCreateSubmit}
                >
                    {(formik) => {
                        return (
                            <Form
                                name="basic"
                                // onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <div className="mainWrapper">
                                    <h3 className="table-heading">Rooms</h3>
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
                                        <FormControl
                                            control="startEndDate"
                                            type="startEndDate"
                                            name="startDate"
                                            fontFamily={fontFamilyRegular}
                                            padding="8px 10px"
                                        />
                                        <div className="todayPlusContainer">
                                            <div className="dateToday">
                                                <p>Today</p>
                                            </div>
                                            <CustomButton
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
                                                    navigate(
                                                        `/room/create/${schoolId}`
                                                    )
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </CustomDiv>
        )
    }

    // useEffect(() => {
    //     store.dispatch(getBranchBySchoolId())
    // }, [])

    // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    // const [current, setCurrent] = useState(1)

    // const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    //     setSelectedRowKeys(newSelectedRowKeys)
    // }

    // const rowSelection = { selectedRowKeys, onChange: onSelectChange }

    return (
        <>
            {/* {deletemodal().modalComponent}
            {deleteConfirmation(Id).modalComponent} */}

            {/* {loading && <LoadingOverlay message="" />} */}
            <Head title="Room List" />
            <RenderTableTitle />
            <ListRoomsStyle>
                <Table
                    columns={columns}
                    // dataSource={
                    //     schoolData?.data[0].schoolId !== 0
                    //         ? schoolData.data
                    //         : []
                    // }
                    // dataSource={
                    //     dummyData.map((item) => ({
                    //         ...item,
                    //         key: item.schoolId,
                    //     })) as any
                    // }
                    dataSource={Room ? Room?.data : []}
                    // dataSource={
                    //     RoomData?.data[0].roomId !== 0 ? RoomData.data : []
                    // }
                    scroll={{ x: true }}
                    pagination={{
                        showTotal: (totalItems, totalPages) => (
                            <>
                                {console.log(totalItems, totalPages, 'hi')}{' '}
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: `Page <span className='paginationVal'>${totalPages[0]}</span> of ${totalPages[1]}`,
                                    }}
                                />
                            </>
                        ),
                    }}
                />
            </ListRoomsStyle>
        </>
    )
}

export default ListRoom
