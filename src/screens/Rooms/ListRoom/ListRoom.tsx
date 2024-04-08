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
import UpdateStatus from '../UpdateModal'
import { ConsoleSqlOutlined } from '@ant-design/icons'
import useScreenTranslation from '../../../hooks/useScreenTranslation'

const ListRoom = (): JSX.Element => {
    // const { schoolData } = useSelector(
    //     (state: RootState) => state.dashboardData
    // )
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)

    const pageSize = 10

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | undefined>(undefined)
    const [Room, setRoom] = useState<
        | {
              currentPage: number
              totalItems: number | undefined
              data: RoomDataType[]
          }
        | undefined
    >(undefined)
    const { RoomData } = useSelector((state: RootState) => state.RoomData)
    const { loginData } = useSelector((state: RootState) => state)
    const { pathname } = useLocation()
    const [, extractedSchool] = pathname.split('/')
    console.log('RoomData', RoomData)
    const schoolInUpperCase = extractedSchool.toUpperCase()
    const schoolid = loginData.data?.schoolId
    const { schoolId, branchId, franchiseId } = useParams()
    const { getLabelByKey } = useScreenTranslation('roomList')
    let Id: string
    if (schoolId) {
        Id = schoolId
    } else if (branchId) {
        Id = branchId
    } else if (franchiseId) {
        Id = franchiseId
    }

    const {
        getallRoombyUC,
        RoomStatus,
        getallRoombyUCPagination,
        deleteConfirmation,
        deletemodal,
    } = useRoom()

    // const { schoolData, loading } = useSelector(';oiuy tre
    //     (state: RootState) => state.schoolData
    // )
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                if (schoolid) {
                    const response: any = await getallRoombyUC(
                        Number(schoolid),
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
    const handlePaginationChange = async (page: number): Promise<void> => {
        try {
            setLoading(true)
            if (schoolId) {
                const response: any = await getallRoombyUCPagination(
                    Number(schoolId),
                    'SCHOOL',
                    page - 1
                )
                setRoom(response)
            } else if (branchId) {
                const response: any = await getallRoombyUCPagination(
                    Number(branchId),
                    'BRANCH',
                    page - 1
                )
                setRoom(response)
            } else if (franchiseId) {
                const response: any = await getallRoombyUCPagination(
                    Number(franchiseId),
                    'FRANCHISE',
                    page - 1
                )
                setRoom(response)
            }

            // eslint-disable-next-line @typescript-eslint/no-shadow
        } catch (error: unknown) {
            setError('Error fetching data')
        } finally {
            setLoading(false)
        }
        setCurrentPage(page)
    }
    // const {
    //     dropdowns: { businessTypes },
    // } = useSelector((state: RootState) => state.appData.data)
    const navigation = (record: RoomDataType, redirectTo: string): void => {
        switch (redirectTo) {
            case 'edit': {
                if (schoolInUpperCase === 'SCHOOL') {
                    navigate(`/school/room/edit/${schoolId}/${record.roomId}`, {
                        state: {
                            branchToEdit: record as RoomDataType,
                        },
                    })
                }
                if (schoolInUpperCase === 'BRANCH') {
                    navigate(`/branch/room/edit/${branchId}/${record.roomId}`, {
                        state: {
                            branchToEdit: record as RoomDataType,
                        },
                    })
                }
                if (schoolInUpperCase === 'FRANCHISE') {
                    navigate(
                        `/franchise/room/edit/${franchiseId}/${record.roomId}`,
                        {
                            state: {
                                branchToEdit: record as RoomDataType,
                            },
                        }
                    )
                }

                break
            }
            case 'view':
                navigate(`/room/view/${record.roomId}`, {
                    state: {
                        branch: record as RoomDataType,
                    },
                })
                break
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
    const [UpdateStatusModal, setUpdateStatus] = useState(false)
    const [editStatusData, setEditData] = useState() as any
    const closeModal = (): void => {
        setUpdateStatus(false)
    }
    console.log({ Room })
    const [deleteId, setDeleteId] = useState() as any
    const [deleteStatus, setDeleteStatus] = useState(false)
    const columns: ColumnsType<RoomDataType> = [
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
            title: 'Size',
            dataIndex: '',
            key: 'size',
            render: (_, record) => {
                return (
                    <p>
                        H{record.height}XW{record.width}
                    </p>
                )
            },
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'status',
            render: (isActive, index) => {
                if (isActive === true) {
                    return (
                        <div className={'Active'}>
                            Active
                            <img src={StatusActiveError} alt="image" />
                        </div>
                    )
                } else {
                    return (
                        <div className={'De-Active'}>
                            De-Active
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
                        onClick: () => {
                            setDeleteStatus(true)
                            setDeleteId(record.roomId)
                        },
                    },
                    {
                        key: '4',
                        label: 'Update Status',
                        onClick: () => {
                            setUpdateStatus(true)
                            setEditData(record.roomId)
                        },
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
    console.log('delset id', deleteId)

    const initialValues = (): void => {}
    const handleCreateSubmit = (): void => {}

    const RenderTableTitle = (): JSX.Element => {
        return (
            <CustomDiv>
                {deletemodal().modalComponent}
                {deleteStatus &&
                    deleteId &&
                    deleteConfirmation(deleteId).modalComponent}
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
                                                    if (
                                                        schoolInUpperCase ===
                                                        'SCHOOL'
                                                    ) {
                                                        navigate(
                                                            `/school/room/create/${schoolId}`
                                                        )
                                                    }
                                                    if (
                                                        schoolInUpperCase ===
                                                        'BRANCH'
                                                    ) {
                                                        navigate(
                                                            `/branch/room/create/${branchId}`
                                                        )
                                                    }
                                                    if (
                                                        schoolInUpperCase ===
                                                        'FRANCHISE'
                                                    ) {
                                                        navigate(
                                                            `/franchise/room/create/${franchiseId}`
                                                        )
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
                {UpdateStatusModal && (
                    <UpdateStatus
                        closeModal={closeModal}
                        roomId={editStatusData}
                    />
                )}
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
                    pagination={
                        Room && Room.totalItems && Room.totalItems > 10
                            ? {
                                  current: currentPage,
                                  total: Room ? Room.totalItems : 0,
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
                                  onChange: (page) =>
                                      handlePaginationChange(page),
                              }
                            : false
                    }
                />
            </ListRoomsStyle>
        </>
    )
}

export default ListRoom
