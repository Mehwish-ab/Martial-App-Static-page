import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import {
    BranchDataType,
    getBranchBySchoolId,
} from '../../../redux/features/branch/branchSlice'

import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'

import { ListBranchStyled } from './styles'

import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import defaltimg from '../../../assets/images/create_school_user_profile.svg'
import useBranch from '../hooks/useBranch'

const PreviewBranch = (): JSX.Element => {
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    // const { getLabelByKey } = useScreenTranslation("BranchList");
    const { deletemodal, deleteConfirmation, BranchStatus } = useBranch()
    const [Id] = useState(0)

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
            // render: (text) => <a>{text}</a>,
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
    ]

    useEffect(() => {
        store.dispatch(getBranchBySchoolId())
    }, [])

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

export default PreviewBranch
