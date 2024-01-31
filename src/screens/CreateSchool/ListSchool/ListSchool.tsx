import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

import { Dropdown, Menu, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import CustomButton from '../../../components/CustomButton/CustomButton'

import { ListSchoolStyle } from './styles'
import { CustomDiv } from './CustomDiv'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    pureDark,
    tertiaryBlue2,
} from '../../../components/GlobalStyle'
import plusIcon from '../../../assets/icons/ic_plus.svg'
import dummyData from './dummyData.json'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import RightArrow from '../../../assets/images/rightArrow.svg'
import LeftArrow from '../../../assets/images/leftArrow.svg'
import defaultPic from '../../../assets/images/create_school_user_profile.svg'
import { Form, Formik } from 'formik'
import FormControl from '../../../components/FormControl'
import { SchoolDataType } from '../../../redux/features/dashboard/dashboardDataSlice'
const ListSchool = (): JSX.Element => {
    // const { schoolData } = useSelector(
    //     (state: RootState) => state.dashboardData
    // )
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const navigate = useNavigate()

    // const { schoolData, loading } = useSelector(
    //     (state: RootState) => state.schoolData
    // )
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    // const {
    //     dropdowns: { businessTypes },
    // } = useSelector((state: RootState) => state.appData.data)
    const navigation = (record: SchoolDataType, redirectTo: string): void => {
        switch (redirectTo) {
            case 'edit':
                navigate(`/school/edit/${record.schoolId}`, {
                    state: {
                        branchToEdit: record as SchoolDataType,
                    },
                })
                break

            case 'view':
                navigate(`/school/view/${record.schoolId}`, {
                    state: {
                        branch: record as SchoolDataType,
                    },
                })
                break
            case 'payment':
                navigate(`/school/add-payment-information/${record.schoolId}`, {
                    state: {
                        branchToEdit: record as SchoolDataType,
                    },
                })
                break

            case 'delete':
                navigate(`/school/delete/${record.schoolId}`, {
                    state: {
                        branch: record as SchoolDataType,
                    },
                })
                break

            case 'branch':
                navigate(`/branch/list/`)
                break
            case 'franchise':
                navigate(`/franchise/list/`)
                break
            case 'class':
                navigate(`/class/list/`)
                break
            case 'timeTable':
                navigate(`/timeTable/list/`)
                break
            case 'membership':
                navigate(`/membership/list/`)
                break
            case 'rooms':
                navigate(`/room/list/`)
                break
        }
    }
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
    const columns: ColumnsType<SchoolDataType> = [
        {
            title: 'Id',
            dataIndex: 'schoolId',
            key: 'schoolId',
        },
        {
            title: 'Image',
            dataIndex: 'profilePicture',
            key: 'profilePicture',
            render: (Dummydatas) => {
                // if (Dummydatas.profilePicture === null) {
                return <img src={defaultPic} width={44} height={44} />
                // }
                // else {
                //     return (
                //         <img
                //             src={`https://fistastore.com:444${Dummydatas?.profilePicture}`}
                //             width={44}
                //             height={44}
                //         />
                //     )
                // }
            },
        },
        {
            title: 'Name',
            dataIndex: 'schoolName',
            key: 'schoolName',
            render: (text) => (
                <p>{text.length > 10 ? `${text.slice(0, 10)}...` : text}</p>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'schoolType',
            key: 'schoolType',
            // render: (_, { schoolType }) => {
            //     const item = businessTypes.find((b) => b.id === schoolType)
            //     return <p>{item?.en}</p>
            // },
        },
        {
            title: 'Activity',
            dataIndex: 'activities',
            key: 'activities',
            render: (DummyData) => {
                return <p className="sub-title">{showActivities(DummyData)}</p>
            },
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (isActive, index) => {
                // if (index?.schoolStatusId === 1) {
                return (
                    <div className={'Active'}>
                        <button
                        // onClick={() => {
                        //     {
                        //         BranchStatus(index.schoolId, 2)
                        //     }
                        // }}
                        >
                            Active
                        </button>
                        <img src={StatusActiveError} alt="image" />
                    </div>
                )
                // } else {
                return (
                    <div className={'De-Active'}>
                        <button
                        // onClick={() => {
                        //     BranchStatus(index.schoolId, 1)
                        // }}
                        >
                            De-Active
                        </button>
                        <img src={StatusActiveError} alt="image" />
                    </div>
                )
                // }
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
                        label: 'Payment',
                        onClick: () => navigation(record, 'payment'),
                    },
                    {
                        key: '4',
                        label: 'Delete',
                        // onClick: () => {
                        //     setId(record.schoolId)
                        //     setIsShowModal(true)
                        // },
                    },
                    {
                        key: 'divider1',
                        type: 'divider',
                    },
                    {
                        key: '5',
                        label: 'Branches',
                        onClick: () => navigation(record, 'branch'),
                    },
                    {
                        key: '6',
                        label: 'Franchise',
                        onClick: () => navigation(record, 'franchise'),
                    },
                    {
                        key: '7',
                        label: 'Classes',
                        onClick: () => navigation(record, 'class'),
                    },
                    {
                        key: '8',
                        label: 'TimeTable',
                        onClick: () => navigation(record, 'timeTable'),
                    },
                    {
                        key: '9',
                        label: 'Memberships',
                        onClick: () => navigation(record, 'membership'),
                    },
                    {
                        key: '10',
                        label: 'Rooms',
                        onClick: () => navigation(record, 'rooms'),
                    },
                    {
                        key: 'divider1',
                        type: 'divider',
                    },
                    {
                        key: '11',
                        label: 'Reports',
                    },
                ]
                const menu = (
                    <Menu>
                        {items.map((item) => {
                            if (item.type === 'divider') {
                                return <Menu.Divider key={item.key} />
                            }

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
                                    <h3 className="table-heading">Schools</h3>
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
                                                    navigate(`/user/list`)
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
            <RenderTableTitle />
            <ListSchoolStyle>
                <Table
                    columns={columns}
                    // dataSource={
                    //     schoolData?.data[0].schoolId !== 0
                    //         ? schoolData.data
                    //         : []
                    // }
                    dataSource={
                        dummyData.map((item) => ({
                            ...item,
                            key: item.schoolId,
                        })) as any
                    }
                    scroll={{ x: true }}
                    pagination={{
                        showTotal: (total, range) => (
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: `Page <span className='paginationVal'>${range[0]}</span> of ${range[1]}`,
                                }}
                            />
                        ),
                    }}
                />
            </ListSchoolStyle>
        </>
    )
}

export default ListSchool
