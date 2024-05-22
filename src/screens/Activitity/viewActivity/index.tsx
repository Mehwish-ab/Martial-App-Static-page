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

import {
    ActivityDataType,
    getActivityBySchoolId,
} from '../../../redux/features/activity/activitySlice'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import Head from '../../../components/Head/Head'
import { Form, Formik } from 'formik'
import useActivity from '../../../hooks/useActivity'
import CustomModal from '../../../components/Modal/CustomModal'
import { setUserRole } from '../../../redux/features/User/UserSlice'
import useCreateSchool from '../../../hooks/useCreateSchool'

const ActivityList = (): JSX.Element => {
    const navigate = useNavigate()
    const { schoolId, branchId, franchiseId, instructorId } = useParams()
    const [Id, setId] = useState(0)
    const { loginData } = useSelector((state: RootState) => state)
    //const [AllActivities, setAllActivities] = useState([] as any)

    const [error, setError] = useState<string | undefined>(undefined)
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    const {
        getClassPegination,
        deletemodal,
        deleteConfirmation,
        getActivitybySchoolId,
        getActivitybyInstructorId,
        AllActivities,
        setIsShowModal,
        handleUpdate,
        Createmodal,
        WarningModal,
    } = useActivity()
    const handlePaginationChange = async (page: number): Promise<any> => {
        try {
            //setLoading(true)
            // page = page - 1
            const response = await getClassPegination(
                Number(schoolId || loginData.data?.schoolId),
                page - 1
            )
            //setAllActivities(response)
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
        const index = Belts.findIndex((act) => +act.id === beltId)

        if (index !== -1) {
            // return options
            // const beltImg = Belts[index].imageUrl
            return Belts[index].imageUrl
        }

        return '--'
    }

    const showActivities = (activityId: any): any => {
        console.log(activityId)
        let activitiesName = ''
        const index = activities.findIndex(
            (act: any) => act.id === String(activityId)
        )
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
        const fetchData = async (): Promise<void> => {
            if (schoolId) {
                try {
                    await getActivitybySchoolId(
                        Number(schoolId || loginData.data?.schoolId)
                    )
                    // console.log('activities Dataaa', response)
                    // setAllActivities(response)
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                } catch (error) {
                    setError('Error fetching data')
                } finally {
                }
            } else if (instructorId) {
                try {
                    await getActivitybyInstructorId(Number(instructorId))

                    //setAllActivities(response)
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                } catch (error) {
                    setError('Error fetching data')
                } finally {
                }
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
            <CustomDiv className="mt-20 ms-4 ">
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
                                        Activity List
                                        {/* {getLabelByKey('title')} */}
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
    const [createData, setCreateData] = useState(null as any)
    const [certificateModal, setCertificateModal] = useState(false)
    const [certificateId, setCertificationId] = useState()
    const handleShowCertificate = (): void => {
        // setCertificationId(id)
        setCertificateModal(true)
    }

    const handleClick = (id: any): void => {
        store.dispatch(setUserRole('school'))
        // setCreateData(record.activityId)
        navigate(`/activity/create/${schoolId}?actId=${id}`)
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
                    if (beltId !== null) {
                        return (
                            <img
                                className="list-item mb-0"
                                src={
                                    showBelt(beltId)
                                        ? `https://fistastore.com:444${showBelt(beltId)}`
                                        : ' '
                                }
                            />
                        )
                    } else {
                        return '--'
                    }
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
                        {certificateURL !== null ? (
                            <a
                                style={{ color: 'blue' }}
                                rel="noreferrer"
                                onClick={handleShowCertificate}
                            >
                                Certificate.png
                            </a>
                        ) : (
                            '--'
                        )}
                        {certificateModal && (
                            <CustomModal
                                isModalVisible={certificateModal}
                                setIsModalVisible={setCertificateModal}
                                onCancel={() => {
                                    setCertificateModal(false)
                                }}
                                width="700px"
                            >
                                {' '}
                                <img
                                    style={{
                                        margin: 'auto',
                                        display: ' block',
                                        width: '1170PX',
                                        maxWidth: '3000px',
                                    }}
                                    src={
                                        certificateURL
                                            ? `https://fistastore.com:444/${certificateURL}`
                                            : '--'
                                    }
                                    alt="bannerImg"
                                />
                            </CustomModal>
                        )}
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
                            // onClick={() => {
                            //     {
                            //         ClassStatus(index.id, 2)
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
                            //     ClassStatus(index.id, 1)
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
        {
            title: getLabelByKey('action'),
            key: 'action',
            render: (_, record, index) => {
                let items
                if (record.id) {
                    items = [
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
                } else {
                    return (
                        <div>
                            <button
                                style={{
                                    fontWeight: '400',
                                    padding: ' 7px 10px',
                                    borderRadius: '4px',
                                    background: ' rgb(0, 97, 151)',
                                    //width: '90px',
                                    // height: ' 30px',
                                    color: 'rgb(255, 255, 255)',
                                    fontSize: '14px',

                                    textAlign: 'center',
                                }}
                                onClick={() => handleClick(record.activityId)}
                            >
                                Create
                            </button>
                        </div>
                    )
                }

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
    console.log({ AllActivities })
    return (
        <>
            <Head title="Activity List" />
            {deletemodal().modalComponent}
            {deleteConfirmation(Id).modalComponent}
            {loading && <LoadingOverlay message="" />}
            {Createmodal().modalComponent}
            {WarningModal().modalComponent}
            <RenderTableTitle />
            <ListActivityStyle>
                <Table
                    columns={columns}
                    dataSource={AllActivities || []}
                    scroll={{ x: true }}
                    pagination={
                        AllActivities &&
                        AllActivities.totalItems &&
                        AllActivities.totalItems > 10
                            ? {
                                  current: currentPage,
                                  total: AllActivities
                                      ? AllActivities.totalItems
                                      : 0,
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
            </ListActivityStyle>
            {/* {createData && <CreateActivity activityID={createData} />} */}
            {updateActivity && editData && (
                <Activity
                    closeModal={handleModalClosed}
                    activityData={editData}
                    handleUpdate={handleUpdate}
                    Createmodal={Createmodal}
                    WarningModal={WarningModal}
                />
            )}
            {/* </div> */}
        </>
    )
}

export default ActivityList
