import React, { ReactNode, useEffect, useState } from 'react'

import { Dropdown, Form, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ListFranchiseStyled } from './styles'
import CustomButton from '../../../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    pureDark,
    tertiaryBlue2,
} from '../../../components/GlobalStyle'
import { useNavigate, useParams } from 'react-router-dom'
import plusIcon from '../../../assets/icons/ic_plus.svg'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import DefaultBannerImage from '../../../assets/images/defaultProfileImage.svg'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
// import { getBranchBySchoolId } from '../../../redux/features/branch/branchSlice'
import defaltimg from '../../../assets/images/create_school_user_profile.svg'
import {
    FranchiseDataType,
    getfranchiseBySchoolIds,
    getfranchiseBySchoolId,
} from '../../../redux/features/franchise/franchiseSlice'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import RightArrow from '../../../assets/images/rightArrow.svg'
import LeftArrow from '../../../assets/images/leftArrow.svg'
import DateCalander from '../../../assets/images/dateCalander.svg'
import useFranchise from '../hooks/useFranchise'
import { Formik } from 'formik'
import FormControl from '../../../components/FormControl'
import { CustomDiv } from '../../CreateSchool/ListSchool/CustomDiv'
import Head from '../../../components/Head/Head'
const ListFranchise = (): JSX.Element => {
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const {
        deletemodal,
        setIsShowModal,
        deleteConfirmation,
        FranchiseStatus,
        viewFranchisebySchoolid,
    } = useFranchise()
    const [Id, setId] = useState(0)
    const navigate = useNavigate()
    const { schoolId } = useParams()
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )

    useEffect(() => {
        store.dispatch(getfranchiseBySchoolIds(schoolId))

        // const fetchData = async (): Promise<void> => {
        //     try {
        //         store.dispatch(viewFranchisebySchoolids(schoolId))
        //     } catch (error) {
        //         console.error('Error fetching branch data:', error)
        //     }
        // }

        // fetchData()
    }, [schoolId])
    console.log('location.pathname', location.pathname)
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
    const navigation = (
        record: FranchiseDataType,
        redirectTo: string
    ): void => {
        switch (redirectTo) {
            case 'edit':
                navigate(`/franchise/edit/${record.franchiseId}`, {
                    state: {
                        branchToEdit: record as FranchiseDataType,
                    },
                })
                break

            case 'view':
                navigate(`/franchise/view/${record.franchiseId}`, {
                    state: {
                        branch: record as FranchiseDataType,
                    },
                })
                break
            case 'payment':
                navigate(
                    `/franchise/add-payment-information/${record.franchiseId}`,
                    {
                        state: {
                            branchToEdit: record as FranchiseDataType,
                        },
                    }
                )
                break

            case 'delete':
                navigate(`/franchise/delete/${record.franchiseId}`, {
                    state: {
                        branch: record as FranchiseDataType,
                    },
                })
                break

            case 'Transaction':
                navigate(`/Transaction/list/${record.franchiseId}`)
                break
            case 'Subscription':
                navigate(`/franchise/list/${record.franchiseId}`)
                break
            case 'Classes':
                navigate(`/class/list/${record.franchiseId}`)
                break
            case 'timeTable':
                navigate(`/timeTable/list/${record.franchiseId}`)
                break
            case 'membership':
                navigate(`/membership/list/${record.franchiseId}`)
                break
            case 'activity':
                navigate(`/activity`)
                break
            case 'room':
                navigate(`/franchise/room/list/${record.franchiseId}`)
        }
    }
    const { franchiseData, loading } = useSelector(
        (state: RootState) => state.franchiseData
    )
    // useEffect(() => {
    //     store.dispatch(getfranchiseBySchoolId())
    // }, [])

    const {
        dropdowns: { businessTypes },
    } = useSelector((state: RootState) => state.appData.data)

    console.log('franchiseData', franchiseData)

    // const { selectedLanguage } = useSelector(
    //     (state: RootState) => state.selectedLanguage
    // )
    // const handleDelete = (record: number): void => {
    //     deleteFranchise(record)
    //     store.dispatch(getBranchBySchoolId())
    // }
    const columns: ColumnsType<FranchiseDataType> = [
        // {
        //     title: 'Id',
        //     dataIndex: 'franchiseId',
        //     key: 'franchiseId',
        // },
        {
            title: 'Image',
            // dataIndex: 'profilePicture',
            // key: 'profilePicture',
            // render: (text) => (
            //   <div style={{ width: 50, height: 50 }}>
            //     <img
            //       src={ipForImages + text}
            //       alt="branch img"
            //       style={{ objectFit: "contain", width: "100%" }}
            //     />
            //   </div>
            // ),
            render: (Dummydatas) => {
                console.log('>>images', Dummydatas?.profilePicture)
                if (Dummydatas?.profilePicture === null) {
                    return (
                        <img src={DefaultBannerImage} width={44} height={44} />
                    )
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
            dataIndex: 'franchiseName',
            key: 'franchiseName',
        },
        {
            title: 'Type',
            dataIndex: 'franchiseType',
            key: 'franchiseType',
            render: (_, { franchiseType }) => {
                const item = businessTypes.find((b) => b.id === franchiseType)
                return <p>{item?.en}</p>
            },
        },

        {
            title: 'Activity',
            dataIndex: 'activities',
            key: 'activities',
            render: (DummyData) => {
                console.log(DummyData)

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
            dataIndex: 'franchiseStatusId',
            key: 'franchiseStatusId',
            render: (isActive, index) => {
                console.log('Status', isActive, index)

                if (index?.franchiseStatusId === 1) {
                    return (
                        <div className={'Active'}>
                            <button
                                onClick={() => {
                                    {
                                        FranchiseStatus(index.franchiseId, 2)
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
                                    FranchiseStatus(index.franchiseId, 1)
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
            render: (value: unknown, record: FranchiseDataType): ReactNode => {
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
                        label: 'Transaction',
                        onClick: () => navigation(record, 'branch'),
                    },
                    {
                        key: '7',
                        label: 'Subscription',
                        onClick: () => navigation(record, 'franchise'),
                    },
                    {
                        key: '8',
                        label: 'Classes',
                        onClick: () => navigation(record, 'class'),
                    },
                    {
                        key: '9',
                        label: 'TimeTable',
                        onClick: () => navigation(record, 'timeTable'),
                    },
                    {
                        key: '10',
                        label: 'Memberships',
                        onClick: () => navigation(record, 'membership'),
                    },
                    {
                        key: '11',
                        label: 'room',
                        onClick: () => navigation(record, 'room'),
                    },
                    {
                        key: 'divider1',
                        type: 'divider',
                    },
                    {
                        key: '12',
                        label: 'Reports',
                        onClick: () => navigation(record, 'Reports'),
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
                                // onFinish={formik.}
                                autoComplete="off"
                            >
                                <div className="mainWrapper">
                                    <h3 className="table-heading">Franchise</h3>
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
                                                        `/franchise/create`
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

    useEffect(() => {
        store.dispatch(getfranchiseBySchoolId())
    }, [])

    return (
        <>
            {deletemodal().modalComponent}
            {deleteConfirmation(Id).modalComponent}
            {loading && <LoadingOverlay message="" />}
            <Head title="Franchise List" />
            <RenderTableTitle />
            <ListFranchiseStyled>
                <Table
                    columns={columns}
                    dataSource={
                        franchiseData?.data[0]?.franchiseId !== 0
                            ? franchiseData?.data
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
            </ListFranchiseStyled>
        </>
    )
}

export default ListFranchise
