import { useNavigate, useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'

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
import DefaultBannerImage from '../../../assets/images/defaultProfileImage.svg'
import plusIcon from '../../../assets/icons/ic_plus.svg'
import map from '../../../assets/images/Frame 427321208.png'
import share from '../../../assets/images/square-share-line-svgrepo-com 1.png'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import RightArrow from '../../../assets/images/rightArrow.svg'
import LeftArrow from '../../../assets/images/leftArrow.svg'
import { Form, Formik } from 'formik'
import FormControl from '../../../components/FormControl'
import { SchoolDataType } from '../../../redux/features/dashboard/dashboardDataSlice'
import useCreateSchool from '../../../hooks/useCreateSchool'
import { useEffect, useState } from 'react'
import Head from '../../../components/Head/Head'
import { useAppSelector } from '../../../app/hooks'
import ReportCreate from '../../Reports/ReportCreate/ReportCreate'
import ReportSubmit from '../../Reports/ReportCreate/ReportSubmit'
import { RegisterUser } from '../../pages'
import { setUserRole } from '../../../redux/features/User/UserSlice'

const ListSchool = (): JSX.Element => {
    // const { schoolData } = useSelector(
    //     (state: RootState) => state.dashboardData
    // )
    const {
        deleteConfirmation,
        setIsShowModal,
        SuccessModal,
        WarningModal,
        AllSchools,
        getAllSchool,
        getAllSchoolPagination,
    } = useCreateSchool()

    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const { schoolId } = useParams()
    const [Id, setId] = useState(0)

    console.log('activites fro state', activities)
    const navigate = useNavigate()
    const { loginData } = useSelector((state: RootState) => state)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | undefined>(undefined)
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    const customItemRender = (
        current: any,
        type: any,
        originalElement: any
    ): any => {
        if (type === 'prev') {
            return <a className="custom-pagination-link">{originalElement}</a>
        }
        if (type === 'next') {
            return <a className="custom-pagination-link">{originalElement}</a>
        }
        return originalElement
    }

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                await getAllSchool(
                    String(loginData.data?.userDetails.countryName)
                )
                // console.log({ response })

                // setAllSchools(response)
                // eslint-disable-next-line @typescript-eslint/no-shadow
            } catch (error) {
                setError('Error fetching data')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handlePaginationChange = async (page: number): Promise<void> => {
        try {
            setLoading(true)
            // page = page - 1
            const response = await getAllSchoolPagination(
                String(loginData.data?.userDetails.countryName),
                page - 1
            )
            // setAllSchools(response)
            // eslint-disable-next-line @typescript-eslint/no-shadow
        } catch (error: unknown) {
            setError('Error fetching data')
        } finally {
            setLoading(false)
        }
        setCurrentPage(page)
    }
    const { data: logindata } = useAppSelector((state) => state.loginData)

    useEffect(() => {
        const fetchData = async (page: number): Promise<void> => {
            try {
                page = page - 1
                const response: any = await getAllSchoolPagination(
                    String(loginData.data?.userDetails.countryName),
                    page
                )

                //setAllSchools(response)
                // eslint-disable-next-line @typescript-eslint/no-shadow
            } catch (error) {
                setError('Error fetching data')
            } finally {
                setLoading(false)
            }
        }
        fetchData(currentPage)
        // if (logindata?.userDetails.roleName === 'USER' && logindata.schoolId) {
        //     navigate(`/school/view/${logindata.schoolId}`)
        // } else {
        //     navigate(`/school/create/`)
        // }
    }, [])

    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    // const {
    //     dropdowns: { businessTypes },
    // } = useSelector((state: RootState) => state.appData.data)

    const [isReportCreateModalVisible, setIsReportCreateModalVisible] =
        useState(false)
    const [isReportSubmitModalVisible, setIsReportSubmitModalVisible] =
        useState(false)
    const handleReportModalVisible = (): void => {
        setIsReportCreateModalVisible(true)
    }

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
                navigate(`/branch/list/${record.schoolId}`)
                break
            case 'franchise':
                navigate(`/franchise/list/${record.schoolId}`)
                break
            case 'class':
                navigate(`/class/list/${record.schoolId}`)
                break
            case 'timeTable':
                navigate(`/timeTable/list/`)
                break
            case 'membership':
                navigate(`/membership/list/${record.schoolId}`)
                break
            case 'rooms':
                navigate(`/school/room/list/${record.schoolId}`)
                break
            case 'activity':
                navigate(`/school/activity/${record.schoolId}`)
                break
            case 'report':
                handleReportModalVisible()
                break
        }
    }

    const { businessTypes } = useSelector(
        (state: RootState) => state.appData.data.dropdowns
    )

    const showActivities = (_activities: string): string => {
        const activitiesArr = _activities.split(',')

        let activitiesName = ''
        activitiesArr.map((activity) => {
            const index = activities.findIndex(
                (act: any) => act.id === activity
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
        if (activitiesName?.length > 35) {
            return `${activitiesName.slice(0, 35)}...`
        }
        return activitiesName
    }

    const showBusinessType = (_businessType: number): string => {
        const index = businessTypes.findIndex((business: any) => {
            return business.id === _businessType
        })

        if (index !== -1) {
            return (businessTypes[index] as any)[selectedLanguage]
        }

        return '--'
    }
    // Function to get activity name by index and language

    const [schoolExist, setSchoolExist] = useState(false)
    const initialValues = (): void => {}
    const handleCreateSubmit = (): void => {}
    console.log('school exist', schoolExist)

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
                                    <div className="d-flex">
                                        {' '}
                                        <CustomButton
                                            bgcolor={tertiaryBlue2}
                                            textTransform="Captilize"
                                            color={pureDark}
                                            padding="6.5px 10px"
                                            fontFamily={`${fontFamilyMedium}`}
                                            width="40px"
                                            type="submit"
                                            title=""
                                            fontSize="17px"
                                            // loading={loading}
                                            icon={
                                                <img
                                                    src={map}
                                                    alt="edit icon"
                                                    width={35}
                                                    height={25}
                                                />
                                            }
                                            clicked={() => {
                                                store.dispatch(
                                                    setUserRole('school')
                                                )
                                                navigate(`/liveSchool/list`)
                                            }}
                                        />
                                        <h3
                                            style={{
                                                margin: 'auto auto auto 5px',
                                            }}
                                            className="table-heading"
                                        >
                                            School List
                                        </h3>
                                    </div>

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
                                                    store.dispatch(
                                                        setUserRole('school')
                                                    )
                                                    navigate(`/user/list`)
                                                }}
                                            />
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
                                                        src={share}
                                                        alt="edit icon"
                                                        width={17}
                                                        height={17}
                                                    />
                                                }
                                                clicked={() => {
                                                    store.dispatch(
                                                        setUserRole('invite')
                                                    )
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

    const columns: ColumnsType<SchoolDataType> = [
        {
            title: 'Image',
            dataIndex: 'profilePicture',
            key: 'profilePicture',
            render: (Dummydatas) => {
                if (!Dummydatas) {
                    return (
                        <img src={DefaultBannerImage} width={44} height={44} />
                    )
                } else {
                    return (
                        <img
                            src={`https://fistastore.com:444${Dummydatas}`}
                            width={44}
                            height={44}
                        />
                    )
                }
            },
        },
        {
            title: 'Name',
            dataIndex: 'businessName',
            key: 'businessName',
            render: (text) => (
                <p>{text.length > 10 ? `${text.slice(0, 10)}...` : text}</p>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'businessType',
            key: 'businessType',
            render: (businessType) => {
                return <p> {showBusinessType(businessType)}</p>
            },
        },
        {
            title: 'Activity',
            dataIndex: 'activities',
            key: 'activities',
            render: (activityData) => {
                return (
                    <p className="sub-title">{showActivities(activityData)}</p>
                )
            },
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
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
                        onClick: () => {
                            store.dispatch(setUserRole('school')),
                                navigation(record, 'view')
                        },
                    },
                    {
                        key: '2',
                        label: 'Edit',
                        onClick: () => navigation(record, 'edit'),
                    },
                    {
                        key: '3',
                        label: 'Update Status',
                        // onClick: () => {
                        //     navigation(record, 'activity')
                        // },
                    },
                    {
                        key: '5',
                        label: 'Delete',
                        onClick: () => {
                            setId(record.schoolId)
                            setIsShowModal(true)
                        },
                    },
                    {
                        key: 'divider1',
                        type: 'divider',
                    },
                    {
                        key: '6',
                        label: 'Explore More',
                        // onClick: () => navigation(record, 'branch'),
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

    // useEffect(() => {
    //     store.dispatch(getBranchBySchoolId())
    // }, [])

    // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    // const [current, setCurrent] = useState(1)

    // const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    //     setSelectedRowKeys(newSelectedRowKeys)
    // }

    // const rowSelection = { selectedRowKeys, onChange: onSelectChange }
    console.log('AllSchools', AllSchools)
    return (
        <>
            <Head title="School List" />
            {WarningModal().modalComponent}
            {SuccessModal().modalComponent}
            {deleteConfirmation(Number(Id)).modalComponent}
            {/* {loading && <LoadingOverlay message="" />} */}
            <RenderTableTitle />
            <ListSchoolStyle>
                <Table
                    columns={columns}
                    dataSource={AllSchools ? AllSchools?.data : []}
                    scroll={{ x: true }}
                    pagination={
                        AllSchools &&
                        AllSchools?.totalItems &&
                        AllSchools?.totalItems > 10
                            ? {
                                  current: currentPage,
                                  total: AllSchools ? AllSchools.totalItems : 0,
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
                                  // itemRender: customItemRender,
                              }
                            : false
                    }
                />
                {isReportCreateModalVisible && (
                    <ReportCreate
                        isReportCreateModalVisible={isReportCreateModalVisible}
                        setIsReportCreateModalVisible={
                            setIsReportCreateModalVisible
                        }
                        setIsReportSubmitModalVisible={
                            setIsReportSubmitModalVisible
                        }
                    />
                )}
                {isReportSubmitModalVisible && (
                    <ReportSubmit
                        isReportSubmitModalVisible={isReportSubmitModalVisible}
                        setIsReportSubmitModalVisible={
                            setIsReportSubmitModalVisible
                        }
                    />
                )}
            </ListSchoolStyle>
            {schoolExist && <RegisterUser />}
        </>
    )
}

export default ListSchool
