import React, { useEffect, useState } from 'react'

import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ListFranchiseStyled } from './styles'
import DefaultBannerImage from '../../../assets/images/defaultProfileImage.svg'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import defaltimg from '../../../assets/images/create_school_user_profile.svg'
import {
    FranchiseDataType,
    getfranchiseBySchoolId,
} from '../../../redux/features/franchise/franchiseSlice'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import useFranchise from '../hooks/useFranchise'
import { useParams } from 'react-router-dom'

const PreviewFranchise = (): JSX.Element => {
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const { schoolId } = useParams()
    const [franchiseData, setfranchiseData] = useState<
        FranchiseDataType[] | undefined | null
    >(undefined)
    const {
        deletemodal,
        deleteConfirmation,
        viewFranchisebySchoolid,
        FranchiseStatus,
        loading,
    } = useFranchise()
    const [Id] = useState(0)
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response: any = await viewFranchisebySchoolid(
                    Number(schoolId)
                )
                setfranchiseData(response.results.data)
                length = response.results.data.length
                console.log(' api Nada', response.results)

                // eslint-disable-next-line @typescript-eslint/no-shadow
            } catch (error) {
            } finally {
            }
        }

        fetchData()
    }, [schoolId])
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
                if (Dummydatas.profilePicture === null) {
                    return (
                        <img
                            src={DefaultBannerImage}
                            width={44}
                            height={44}
                            alt={defaltimg}
                        />
                    )
                } else {
                    return (
                        <img
                            src={`https://fistastore.com:444${Dummydatas.profilePicture}`}
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
                const item = businessTypes.find(
                    (b: { id: string | number }) => b.id === franchiseType
                )
                return <p>{item?.en}</p>
            },
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
            dataIndex: 'franchiseStatusId',
            key: 'franchiseStatusId',
            render: (isActive, index) => {
                if (index?.franchiseStatusId === 1) {
                    return (
                        <div className={'Active'}>
                            <button
                            // onClick={() => {
                            //     {
                            //         FranchiseStatus(index.franchiseId, 2)
                            //         store.dispatch(getBranchBySchoolId())
                            //     }
                            // }}
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
                            // onClick={() => {
                            //     FranchiseStatus(index.franchiseId, 1)
                            //     store.dispatch(getBranchBySchoolId())
                            // }}
                            >
                                De-Active
                            </button>
                            <img src={StatusActiveError} alt="image" />
                        </div>
                    )
                }
            },
        },
    ]
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
                    dataSource={franchiseData ? franchiseData : []}
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

            {/* <CardView /> */}
        </>
    )
}

export default PreviewFranchise
