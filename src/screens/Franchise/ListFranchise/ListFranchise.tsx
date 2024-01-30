import React, { ReactNode, useEffect, useState } from 'react'

import { Dropdown, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ListFranchiseStyled } from './styles'
import CustomButton from '../../../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    pureDark,
    tertiaryBlue2,
} from '../../../components/GlobalStyle'
import { useNavigate } from 'react-router-dom'
import plusIcon from '../../../assets/icons/ic_plus.svg'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'

import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
// import { getBranchBySchoolId } from '../../../redux/features/branch/branchSlice'
import defaltimg from '../../../assets/images/create_school_user_profile.svg'
import {
    FranchiseDataType,
    getfranchiseBySchoolId,
} from '../../../redux/features/franchise/franchiseSlice'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import RightArrow from '../../../assets/images/rightArrow.svg'
import LeftArrow from '../../../assets/images/leftArrow.svg'
import DateCalander from '../../../assets/images/dateCalander.svg'
import { CustomDiv } from './CustomDiv'
import useFranchise from '../hooks/useFranchise'

const ListFranchise = (): JSX.Element => {
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const { deletemodal, setIsShowModal, deleteConfirmation, FranchiseStatus } =
        useFranchise()
    const [Id, setId] = useState(0)
    const navigate = useNavigate()
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
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
                navigate(`/school/edit/${record.schoolId}`, {
                    state: {
                        branchToEdit: record as FranchiseDataType,
                    },
                })
                break

            case 'view':
                navigate(`/school/view/${record.schoolId}`, {
                    state: {
                        branch: record as FranchiseDataType,
                    },
                })
                break
            case 'payment':
                navigate(`/school/add-payment-information/${record.schoolId}`, {
                    state: {
                        branchToEdit: record as FranchiseDataType,
                    },
                })
                break

            case 'delete':
                navigate(`/school/delete/${record.schoolId}`, {
                    state: {
                        branch: record as FranchiseDataType,
                    },
                })
                break

            case 'Transaction':
                navigate(`/Transaction/list/${record.schoolId}`)
                break
            case 'Subscription':
                navigate(`/franchise/list/${record.schoolId}`)
                break
            case 'Classes':
                navigate(`/class/list/${record.schoolId}`)
                break
            case 'timeTable':
                navigate(`/timeTable/list/${record.schoolId}`)
                break
            case 'membership':
                navigate(`/membership/list/${record.schoolId}`)
                break
            case 'Report':
                navigate(`/Report/list/${record.schoolId}`)
        }
    }
    const { franchiseData, loading } = useSelector(
        (state: RootState) => state.franchiseData
    )
    useEffect(() => {
        store.dispatch(getfranchiseBySchoolId())
    }, [])

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
        {
            title: 'Id',
            dataIndex: 'franchiseId',
            key: 'franchiseId',
        },
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
                console.log(record, 'keyyyyss')
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
                        label: 'Transaction',
                        onClick: () => navigation(record, 'branch'),
                    },
                    {
                        key: '6',
                        label: 'Subscription',
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
                        onClick: () => navigation(record, 'Rooms'),
                    },
                    {
                        key: 'divider1',
                        type: 'divider',
                    },
                    {
                        key: '11',
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

    const RenderTableTitle = (): JSX.Element => {
        return (
            <div className="d-flex justify-content-between align-center">
                {/* <h3 className="table-heading">{getLabelByKey("title")}</h3> */}
                <h3 className="table-heading">Franchise</h3>
                <CustomDiv>
                    <div className="instructorDateSection">
                        <div className="mainarrow">
                            <div className="arrowright">
                                <img
                                    src={LeftArrow as string}
                                    alt="Date"
                                    width={18}
                                    height={12}
                                />
                            </div>
                            <div className="arrowleft">
                                <img
                                    src={RightArrow as string}
                                    alt="Date"
                                    width={18}
                                    height={12}
                                />
                            </div>
                        </div>
                        <div className="dateRange">
                            <p>
                                <span>Mon,</span> Sep 11, 2023 -{' '}
                                <span>Thu,</span> Sep 21, 2023
                            </p>
                            <img
                                src={DateCalander as string}
                                alt="Calander"
                                width={21}
                                height={21}
                            />
                        </div>
                        <div className="dateToday">Today</div>
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
                        icon={
                            <img
                                src={plusIcon as string}
                                alt="edit icon"
                                width={17}
                                height={17}
                            />
                        }
                        clicked={() => {
                            navigate(`/user/list`)
                        }}
                    />
                </CustomDiv>
            </div>
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
            <ListFranchiseStyled>
                <Table
                    columns={columns}
                    dataSource={
                        franchiseData?.data[0]?.franchiseId !== 0
                            ? franchiseData?.data
                            : []
                    }
                    title={() => <RenderTableTitle />}
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
