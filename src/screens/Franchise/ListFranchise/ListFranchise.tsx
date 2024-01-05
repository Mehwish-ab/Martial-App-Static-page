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
    const { deletemodal, setIsShowModal, deleteConfirmation } = useFranchise()
    const [Id, setId] = useState(0)
    const navigate = useNavigate()
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
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
    const navigation = (
        record: FranchiseDataType,
        redirectTo: string
    ): void => {
        switch (redirectTo) {
            case 'edit':
                navigate(`/franchise/edit/${record.franchiseId}`, {
                    state: {
                        franchiseToEdit: record as FranchiseDataType,
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
                            branch: record as FranchiseDataType,
                        },
                    }
                )
                break

            case 'subscribe':
                navigate(`/franchise/subscribe/${record.franchiseId}`, {
                    state: {
                        branch: record as FranchiseDataType,
                    },
                })
                break

            case 'delete':
                navigate(`/franchise/delete/${9}`, {
                    state: {
                        branch: record as FranchiseDataType,
                    },
                })
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
            render: (DummyData) => {
                console.log('d', DummyData)

                return (
                    <div>
                        <button>{'Active'}</button>
                        <img src={StatusActiveError as string} alt="image" />
                    </div>
                )
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
                        label: 'Subscribe',
                        onClick: () => navigation(record, 'subscribe'),
                    },
                    {
                        key: '5',
                        label: 'Delete',
                        // onClick: () =>
                        //     //navigation(record, "delete"),
                        //     {
                        //         handleDelete(record.franchiseId)
                        //     },
                        onClick: () => {
                            setId(record.franchiseId)
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
                            navigate(`/franchise/create`)
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

            {/* <CardView /> */}
        </>
    )
}

export default ListFranchise
