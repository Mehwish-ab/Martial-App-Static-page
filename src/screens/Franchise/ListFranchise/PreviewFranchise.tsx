import React, { useEffect, useState } from 'react'

import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ListFranchiseStyled } from './styles'

import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { getBranchBySchoolId } from '../../../redux/features/branch/branchSlice'
import defaltimg from '../../../assets/images/create_school_user_profile.svg'
import {
    FranchiseDataType,
    getfranchiseBySchoolId,
} from '../../../redux/features/franchise/franchiseSlice'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import useFranchise from '../hooks/useFranchise'

const PreviewFranchise = (): JSX.Element => {
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const { deletemodal, deleteConfirmation } = useFranchise()
    const [Id] = useState(0)
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
    ]
    useEffect(() => {
        store.dispatch(getBranchBySchoolId())
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

export default PreviewFranchise
