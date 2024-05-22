import { useNavigate } from 'react-router-dom'
import { Dropdown, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import { ListVideoStyle } from './styles'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import { Form, Formik } from 'formik'
import { CustomDiv } from '../../CreateSchool/ListSchool/CustomDiv'
import Head from '../../../components/Head/Head'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useEffect, useState } from 'react'
import defaltimg from '../../../assets/images/create_school_user_profile.svg'
import useVideo from '../../../hooks/useVideo'

const VideoList = (): JSX.Element => {
    const [currentPage, setCurrentPage] = useState(1)

    const pageSize = 10

    const {
        getAllVideos,
        AllVideos,
        deleteConfirmation,
        deletemodal,
        setIsShowModal,
    } = useVideo()

    const navigate = useNavigate()

    const { loginData } = useSelector((state: RootState) => state)
    const [deletedId, setDeletedId] = useState() as any
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    console.log('deletedId', deletedId)
    useEffect(() => {
        const fetchData = async (): Promise<any> => {
            try {
                await getAllVideos()
            } catch (errors) {
                /// setError('Error fetching data')
            } finally {
                //  setLoading(false)
            }
        }

        fetchData()
    }, [loginData.data?.schoolId])
    const navigation = (record: any, redirectTo: string): void => {
        switch (redirectTo) {
            case 'edit':
                navigate(`/video/edit/${record.videoId}`)
                break
            case 'view':
                navigate(`/video-detail/${record.videoId}`)
                break
        }
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

    const columns: ColumnsType<any> = [
        {
            title: 'Image',
            dataIndex: 'thumbImageURL',
            key: 'thumbImageURL',
            render: (thumbImageURL) => {
                if (thumbImageURL === null || thumbImageURL === null) {
                    return <img src={defaltimg} width={44} height={44} />
                } else {
                    return (
                        <img
                            className="mx-3"
                            src={`https://fistastore.com:444${thumbImageURL}`}
                            // src={thumbImageURL}
                            width={44}
                            height={44}
                        />
                    )
                }
            },
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => (
                <p>{text > 10 ? `${text.slice(0, 10)}...` : text}</p>
            ),
        },
        {
            title: 'Video Category',
            dataIndex: 'videoCategoryId',
            key: 'videoCategoryId',
            render: (videoCategoryId) => {
                return (
                    <div className="list-item mb-0">
                        {showActivities(videoCategoryId)}
                    </div>
                )
            },
        },
        {
            title: 'Video Duration',
            dataIndex: 'videoDuration',
            key: 'videoDuration',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (isActive, index) => {
                // if (index?.schoolStatusId === 1) {
                return (
                    <div className={'Active'}>
                        <button
                        // onClick={() => {
                        //     {
                        //         BranchStatus(index.studentId, 2)
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
                        //     BranchStatus(index.studentId, 1)
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
            key: 'timeTableAction',
            render: (_, record) => {
                console.log('recordddddds', record)
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
                        label: 'Delete',
                        onClick: () => {
                            setDeletedId(record.videoId)
                            record.videoId && setIsShowModal(true)
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
                                    <h3 className="table-heading mx-4">
                                        Video List
                                    </h3>
                                    <div className="FilterMainContainer">
                                        {/* <div className="arrowsMain">
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
                                        </div> */}
                                        {/* <FormControl
                                            control="startEndDate"
                                            type="startEndDate"
                                            name="startDate"
                                            fontFamily={fontFamilyRegular}
                                            padding="8px 10px"
                                        /> */}
                                        {/* <div className="todayPlusContainer">
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
                                                    navigate(`/user/create`)
                                                }}
                                            />
                                        </div> */}
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </CustomDiv>
        )
    }

    return (
        <>
            <Head title="Video List" />
            {deletemodal().modalComponent}
            {deletedId && deleteConfirmation(deletedId).modalComponent}
            <RenderTableTitle />
            <ListVideoStyle>
                <Table
                    columns={columns}
                    // dataSource={
                    //     UserData?.data[0]?.userId !== 0 ? UserData?.data : []
                    // }
                    dataSource={AllVideos ? AllVideos : []}
                    scroll={{ x: true }}
                    pagination={{
                        current: currentPage,
                        total: AllVideos ? AllVideos : 0,
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
                        // onChange: (page) => handlePaginationChange(page),
                        // itemRender: customItemRender,
                    }}
                />
            </ListVideoStyle>
        </>
    )
}

export default VideoList
