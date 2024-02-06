import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import {
    BranchDataType,
    getBranchBySchoolId,
} from '../../../redux/features/branch/branchSlice'

import { Dropdown, Form, Menu, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import CustomButton from '../../../components/CustomButton/CustomButton'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'

import { ListBranchStyled } from './styles'
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
import DateCalander from '../../../assets/images/dateCalander.svg'
import defaltimg from '../../../assets/images/create_school_user_profile.svg'
import useBranch from '../hooks/useBranch'
import { Formik } from 'formik'
import FormControl from '../../../components/FormControl'
import { CustomDiv } from '../../CreateSchool/ListSchool/CustomDiv'
import Head from '../../../components/Head/Head'
const localStorageData = localStorage.getItem('ennvision-admin:token')
const loginData = JSON.parse(localStorageData as any)
const ListBranch = (): JSX.Element => {
    const dispatch = useDispatch()
    const { schoolData } = useSelector(
        (state: RootState) => state.dashboardData
    )
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    // const { getLabelByKey } = useScreenTranslation("BranchList");
    const navigate = useNavigate()
    const { deletemodal, deleteConfirmation, setIsShowModal, BranchStatus } =
        useBranch()
    const [Id, setId] = useState(0)

    // const [branch, setbranch] = useState()
    const { branchData, loading } = useSelector(
        (state: RootState) => state.branchData
    )
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    const {
        dropdowns: { businessTypes },
    } = useSelector((state: RootState) => state.appData.data)
    // const location = useLocation()

    // const handleDelete = (record: any): void => {
    //     setIsShowModal(true)
    //     {
    //         deletemodal().modalComponent
    //     }
    //     {
    //         deleteConfirmation(record.branchId).modalComponent
    //     }
    //     store.dispatch(getBranchBySchoolId())
    // }
    console.log('Branch Data:', branchData)

    const navigation = (record: BranchDataType, redirectTo: string): void => {
        switch (redirectTo) {
            case 'edit':
                navigate(`/branch/edit/${record.branchId}`, {
                    state: {
                        branchToEdit: record as BranchDataType,
                    },
                })
                break

            case 'view':
                navigate(`/branch/view/${record.branchId}`, {
                    state: {
                        branch: record as BranchDataType,
                    },
                })
                break
            case 'payment':
                navigate(`/branch/add-payment-information/${record.branchId}`, {
                    state: {
                        branchToEdit: record as BranchDataType,
                    },
                })
                break

            case 'delete':
                navigate(`/branch/delete/${record.branchId}`, {
                    state: {
                        branch: record as BranchDataType,
                    },
                })
                break
            case 'rooms':
                navigate(`/branch/room/list/${record.branchId}`)
                break
            case 'activity':
                navigate(`/activity`)
                break
        }
    }
    const showActivities = (_activities: string): string => {
        const activitiesArr = _activities.split(',')

        let activitiesName = ''
        activitiesArr.map((activity) => {
            const index = activities.findIndex(
                (act: { id: string }) => act.id === activity
            )
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
    const columns: ColumnsType<BranchDataType> = [
        {
            title: 'Id',
            dataIndex: 'branchId',
            key: 'branchId',
        },
        {
            title: 'Image',
            render: (Dummydatas) => {
                console.log('>>images', Dummydatas?.profilePicture)
                if (Dummydatas.profilePicture === null) {
                    return <img src={defaltimg} width={44} height={44} />
                } else {
                    return (
                        <img
                            src={`https://fistastore.com:444${Dummydatas?.profilePicture}`}
                            width={44}
                            height={44}
                        />
                    )
                }
            },
        },
        {
            title: 'Name',
            dataIndex: 'branchName',
            key: 'branchName',
            render: (text) => (
                <p>{text.length > 10 ? `${text.slice(0, 10)}...` : text}</p>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'branchType',
            key: 'branchType',
            render: (_, { branchType }) => {
                const item = businessTypes.find((b) => b.id === branchType)
                return <p>{item?.en}</p>
            },
        },
        {
            title: 'Activity',
            dataIndex: 'activities',
            key: 'activities',
            render: (DummyData) => {
                console.log(DummyData, 'DummyData')

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
            key: 'Status',
            render: (isActive, index) => {
                console.log('Status', isActive, index)

                if (index?.branchStatusId === 1) {
                    return (
                        <div className={'Active'}>
                            <button
                                onClick={() => {
                                    {
                                        BranchStatus(index.branchId, 2)
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
                                    BranchStatus(index.branchId, 1)
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
                        label: 'Activity',
                        onClick: () => {
                            navigation(record, 'activity')
                        },
                    },
                    {
                        key: '4',
                        label: 'Payment',
                        onClick: () => navigation(record, 'payment'),
                    },
                    {
                        key: '5',
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
                        key: '6',
                        label: 'Classes',
                        onClick: () => navigation(record, 'class'),
                    },
                    {
                        key: '7',
                        label: 'TimeTable',
                        onClick: () => navigation(record, 'timeTable'),
                    },
                    {
                        key: '8',
                        label: 'Memberships',
                        onClick: () => navigation(record, 'membership'),
                    },
                    {
                        key: '9',
                        label: 'Rooms',
                        onClick: () => navigation(record, 'rooms'),
                    },
                    {
                        key: 'divider1',
                        type: 'divider',
                    },
                    {
                        key: '10',
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
                        <Dropdown menu={{ items }}>
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
                                    <h3 className="table-heading">Branches</h3>
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
                                                    navigate(`/branch/create`)
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

    useEffect(() => {
        store.dispatch(getBranchBySchoolId())
        // setTimeout(() => {
        //  dispatch(getBranchBySchoolId())
        // }, 2000)
        const fetchData = async (): Promise<void> => {
            try {
                // Dispatch the thunk action using the useDispatch hook
                store.dispatch(getBranchBySchoolId())
                // The data is now updated in the Redux store
            } catch (error) {
                console.error('Error fetching branch data:', error)
            }
        }

        // Call the fetchData function when the component mounts or the route changes
        fetchData()
    }, [dispatch])
    console.log('location.pathname', location.pathname)

    // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    // const [current, setCurrent] = useState(1)

    // const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    //     setSelectedRowKeys(newSelectedRowKeys)
    // }

    // const rowSelection = { selectedRowKeys, onChange: onSelectChange }

    return (
        <>
            {deletemodal().modalComponent}
            {deleteConfirmation(Id).modalComponent}

            {/* {deleteConfirmation(record.branchId).modalComponent}  */}

            {loading && <LoadingOverlay message="" />}
            <Head title="Branch List" />
            <RenderTableTitle />
            <ListBranchStyled>
                <Table
                    columns={columns}
                    dataSource={
                        branchData?.data[0].branchId !== 0
                            ? branchData.data
                            : []
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
            </ListBranchStyled>
        </>
    )
}

export default ListBranch
