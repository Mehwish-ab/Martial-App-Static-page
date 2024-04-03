import { useEffect, useState } from 'react'
import { Dropdown, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ListActivityStyle } from './style'
import { CustomDiv } from './CustmDiv'
import Activity from '../EditActivity/activityUpdateModal'
import { useNavigate, useParams } from 'react-router-dom'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import useSchool from '../../../hooks/useCreateSchool'
import {
    ActivityDataType,
    getActivityBySchoolId,
} from '../../../redux/features/activity/activitySlice'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import Head from '../../../components/Head/Head'
import useClass from '../../../hooks/useClass'
import moment from 'moment'
import FormControl from '../../../components/FormControl'
import { Form, Formik } from 'formik'
import useActivity from '../../../hooks/useActivity'
import { SchoolDataType } from '../../../redux/features/dashboard/dashboardDataSlice'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'
import { SelectOptionsDataTypes } from '../../Home/constants'

const ActivityList = (): JSX.Element => {
    const { ClassData } = useSelector((state: RootState) => state.ClassData)
    const navigate = useNavigate()
    const { schoolId, branchId, franchiseId } = useParams()
    const { ClassStatus, deletemodal, deleteConfirmation, setIsShowModal } =
        useClass()
    const [Id, setId] = useState(0)
    const { loginData } = useSelector((state: RootState) => state)
    const [AllActivities, setAllActivities] = useState([] as any)

    const [error, setError] = useState<string | undefined>(undefined)
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    const { getAllActivities, getClassPegination } = useActivity()
    const handlePaginationChange = async (page: number): Promise<any> => {
        try {
            //setLoading(true)
            // page = page - 1
            const response = await getClassPegination(
                Number(schoolId || loginData.data?.schoolId),
                page - 1
            )
            setAllActivities(response)
            // eslint-disable-next-line @typescript-eslint/no-shadow
        } catch (error: unknown) {
            setError('Error fetching data')
        } finally {
            //  setLoading(false)
        }
        setCurrentPage(page)
    }
    // const { g}=useCreateSchool()
    const [updateActivity, setUpdateActivity] = useState(false)
    const handleModalClosed = (): void => {
        setUpdateActivity(false)
    }
    const { activities, experienceLevel } = useSelector(
        (state: RootState) => state.appData.data.statusData
    )
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    const { adult, kids } = useSelector(
        (state: RootState) => state.appData.data.belts
    )

    const { getSchoolbyId } = useSchool()
    const [schoolData, setschoolData] = useState<SchoolDataType>()
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response: any = await getSchoolbyId(Number(schoolId))
                setschoolData(response)

                console.log('response of school ', response)

                // eslint-disable-next-line @typescript-eslint/no-shadow
            } catch (error) {
                // setError('Error fetching data')
            } finally {
                // setLoading(false)
            }
        }

        fetchData()
    }, [])

    const [isBelt, setIsBelt] = useState(false)
    const [experiencelevel, setExperienceLevel] = useState(0)
    const showExperience = (exp: number): string => {
        const index = experienceLevel.findIndex((act) => +act.id === exp)

        if (index !== -1) {
            return (experienceLevel[index] as any)[selectedLanguage]
        }
        return '--'
    }
    const Adults = adult.map((a) => {
        const data = { ...a, isAdult: true }
        return data
    })
    const Kids = kids.map((k) => ({ ...k, isKid: true }))

    const Belts = [...Adults, ...Kids]

    const showBelt = (beltId: number): string => {
        console.log('Belts Id', beltId)

        const index = Belts.findIndex((act) => +act.id === beltId)
        console.log('belts  index', index, Belts)

        if (index !== -1) {
            // return options
            return (Belts[index] as any)[selectedLanguage]
        }

        return '--'
    }

    const showActivities = (activityId: any): any => {
        console.log(activityId)
        let activitiesName = ''
        const index = activities.findIndex(
            (act: any) => act.id === String(activityId)
        )
        const activity = activities[index]
        if (index !== -1) {
            activitiesName =
                activitiesName === ''
                    ? (activities[index] as any)[selectedLanguage]
                    : `${activitiesName}, ${
                          (activities[index] as any)[selectedLanguage]
                      }`
        }
        if (activitiesName !== '') return activitiesName
        return '--'
    }
    const { getLabelByKey } = useScreenTranslation('activityList')
    useEffect(() => {
        store.dispatch(getActivityBySchoolId(schoolId as string))
    }, [schoolId])

    console.log(AllActivities)

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response: any = await getAllActivities(
                    'SCHOOL',
                    Number(schoolId || loginData.data?.schoolId)
                )

                setAllActivities(response)
                // eslint-disable-next-line @typescript-eslint/no-shadow
            } catch (error) {
                setError('Error fetching data')
            } finally {
            }
        }
        handleModalClosed()
        fetchData()
    }, [])

    const { loading } = useSelector((state: RootState) => state.ClassData)
    const [editData, setEditData] = useState({} as any)
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
                                    <h3 className="table-heading">
                                        {getLabelByKey('title')}
                                    </h3>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </CustomDiv>
        )
    }
    const handleEditData = (record: any): void => {
        const data = { ...record, schoolId }
        console.log('data', data)
        setEditData(data)
    }

    const columns: ColumnsType<ActivityDataType> = [
        {
            title: getLabelByKey('activityName'),
            dataIndex: 'activityId',
            key: 'activityName',
            render: (activityId) => {
                return (
                    <div className="list-item mb-0">
                        {showActivities(activityId)}
                    </div>
                )
            },
        },
        {
            ...(experienceLevel?.length > 0 && {
                title: getLabelByKey('experience'),
                dataIndex: 'experienceLevelId',
                key: 'experience',
                render: (experienceLevelId) => {
                    return (
                        <div className="list-item mb-0">
                            {showExperience(experienceLevelId)}
                        </div>
                    )
                },
            }),
        },
        {
            ...(Belts?.length > 0 && {
                title: getLabelByKey('belts'),
                dataIndex: 'beltId',
                key: 'belts',
                render: (beltId) => {
                    return (
                        <div className="list-item mb-0">{showBelt(beltId)}</div>
                    )
                },
            }),
        },
        // {
        //     title: getLabelByKey('exp.StartDate'),
        //     dataIndex: 'startDate',
        //     key: 'exp.StartDate',
        //     // eslint-disable-next-line @typescript-eslint/no-shadow
        //     render: (startDate) => {
        //         return (
        //             <div className="list-item mb-0">
        //                 {moment(moment(startDate, 'YYYY-MM-DD')).format(
        //                     'dddd, MMM DD, YYYY'
        //                 )}
        //             </div>
        //         )
        //     },
        // },
        // {
        //     title: getLabelByKey('exp.EndDate'),
        //     dataIndex: 'endDate',
        //     key: 'exp.EndDate',
        //     // eslint-disable-next-line @typescript-eslint/no-shadow
        //     render: (endDate) => {
        //         return (
        //             <div>
        //                 {moment(moment(endDate, 'YYYY-MM-DD')).format(
        //                     'dddd, MMM DD, YYYY'
        //                 )}
        //             </div>
        //         )
        //     },
        // },
        {
            title: getLabelByKey('latestCertifications'),
            dataIndex: 'certificateURL',
            key: 'latestCertifications',
            render: (certificateURL) => {
                return (
                    <div>
                        <a
                            href={certificateURL}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Certificate.png
                        </a>
                    </div>
                )
            },
        },

        {
            title: getLabelByKey('status'),
            dataIndex: 'status',
            key: 'classStatusId',
            render: (isActive, index) => {
                if (index?.activityStatusId === 1) {
                    return (
                        <div className={'Active'}>
                            <button
                                onClick={() => {
                                    {
                                        ClassStatus(index.id, 2)
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
                                    ClassStatus(index.id, 1)
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
            title: getLabelByKey('action'),
            key: 'action',
            render: (_, record, index) => {
                const items = [
                    {
                        key: '1',
                        label: 'Edit',
                        onClick: () => {
                            setUpdateActivity(true)
                            setEditData(() => handleEditData(record))
                        },
                    },
                    {
                        key: '2',
                        label: 'Delete',
                        onClick: () => {
                            setId(record.id)
                            setIsShowModal(true)
                        },
                    },
                ]
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
    return (
        <>
            <Head title="Activity List" />
            {deletemodal().modalComponent}
            {deleteConfirmation(Id).modalComponent}
            {loading && <LoadingOverlay message="" />}
            <RenderTableTitle />
            <ListActivityStyle>
                <Table
                    columns={columns}
                    dataSource={AllActivities ? AllActivities : []}
                    scroll={{ x: true }}
                    pagination={{
                        current: currentPage,
                        total: AllActivities ? AllActivities : 0,
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
                        onChange: (page) => handlePaginationChange(page),
                        // itemRender: customItemRender,
                    }}
                />
            </ListActivityStyle>
            {updateActivity && editData && (
                <Activity
                    closeModal={handleModalClosed}
                    activityData={editData}
                />
            )}
            {/* </div> */}
        </>
    )
}

export default ActivityList
