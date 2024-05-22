import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Col, Dropdown, List, Menu, Row } from 'antd'

import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import { CardViewStyled } from './styles'
import placeHolderImage from '../../../assets/images/custom_card_placeholder.png'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    pureDark,
    tertiaryBlue2,
} from '../../../components/GlobalStyle'
import RightArrow from '../../../assets/images/rightArrow.svg'
import LeftArrow from '../../../assets/images/leftArrow.svg'
import { Form, Formik } from 'formik'
import FormControl from '../../../components/FormControl'
import { CustomDiv } from '../ListSchool/CustomDiv'
import Head from '../../../components/Head/Head'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import { useEffect, useState } from 'react'
import useCreateSchool from '../../../hooks/useCreateSchool'
import CustomModal from '../../../components/Modal/CustomModal'
import AcademiesDetails from './AcedmicDetails'
import Map from './GoogleMap'
import CustomButton from '../../../components/CustomButton/CustomButton'
import list from '../../../assets/images/documents-minimalistic-svgrepo-com 1.png'
import { setUserRole } from '../../../redux/features/User/UserSlice'

const LiveSchoolUserList = (): JSX.Element => {
    const {
        getAllSchool,
        getAllSchoolPagination,
        AllSchools,
        deleteConfirmation,
        setIsShowModal,
    } = useCreateSchool()

    const [currentPage, setCurrentPage] = useState(0)
    const [error, setError] = useState<string | undefined>(undefined)
    const [modalVisible, setIsModalVisible] = useState(false)
    const [viewPageVisible, setViewPageVisible] = useState(false)
    const [viewPageId, setViewPageId] = useState<string>()
    const [imgId, setImgId] = useState<string>()
    const [Id, setId] = useState(0)

    const pageSize = 2
    const imagesPerPage = 4
    const indexOfLastImage = currentPage * imagesPerPage
    const indexOfFirstImage = indexOfLastImage - imagesPerPage
    const currentImages = AllSchools?.data.slice(
        indexOfFirstImage,
        indexOfLastImage
    )

    const paginate = (pageNumber: number): void => {
        setCurrentPage(pageNumber)
    }

    const [loading, setLoading] = useState(true)

    // const { schoolData } = useSelector(
    //     (state: RootState) => state.dashboardData
    // )
    const lengths: number = 0
    const { loginData } = useSelector((state: RootState) => state)
    const { UserData } = useSelector((state: RootState) => state.UserData)
    const [selectedRecord, setSelectedRecord] = useState()
    // const handlePaginationChange = async (page: number): Promise<void> => {
    //     try {
    //         setLoading(true)
    //         // page = page - 1

    //         const response: any = await getAllSchoolPagination(
    //             String(loginData.data?.userDetails.countryName),
    //             page
    //         )
    //         setAllUSer(response)
    //     } catch (errors: unknown) {
    //         setError('Error fetching data')
    //     } finally {
    //         setLoading(false)
    //     }
    //     setCurrentPage(page)
    // }
    const navigate = useNavigate()

    // useEffect(() => {
    //     store.dispatch(getAllUsers())
    // }, [])
    const fetchData1 = async (page: number): Promise<void> => {
        try {
            setLoading(true)
            const response = await getAllSchoolPagination(
                String(loginData.data?.userDetails.countryName),
                page // Use page directly without adjustments
            )
        } catch {
            console.log('erre')
        } finally {
            setLoading(false)
        }
    }

    const handlePaginationChange = (page: number): void => {
        setCurrentPage(page) // Update current page
        fetchData1(page) // Fetch data for the new page
    }

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                await getAllSchool(
                    String(loginData.data?.userDetails.countryName)
                )

                // eslint-disable-next-line @typescript-eslint/no-shadow
            } catch (error) {
                setError('Error fetching data')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])
    const navigation = (record: any, redirectTo: string): void => {
        switch (redirectTo) {
            case 'edit':
                navigate(`/school/edit/${record.schoolId}`)
                break

            case 'view':
                navigate(`/school/view/${record.schoolId}`)
                break

            case 'delete':
                navigate(`/school/delete/${record.schoolId}`)
                break
        }
    }
    const itemss = [
        {
            key: '1',
            label: 'View',
            onClick: (record: any) => {
                console.log('record in itemsssssssss', record)
                store.dispatch(setUserRole('school')),
                    navigation(record, 'view')
            },
        },
        {
            key: '2',
            label: 'Edit',
            onClick: (record: any) => navigation(record, 'edit'),
        },
        {
            key: '3',
            label: 'Update Status',
            onClick: (record: any) => {
                navigation(record, 'activity')
            },
        },
        {
            key: '5',
            label: 'Delete',
            onClick: (record: any) => {
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

    const initialValues = (): void => {}
    const handleCreateSubmit = (): void => {}
    const handleModal = (id: string): void => {
        setImgId(id)
        setIsModalVisible(true)
    }
    const handleViewPage = (id: string): void => {
        console.log('in view Page')
        setViewPageId(id)
        setViewPageVisible(true)
        console.log({ viewPageId, viewPageVisible })
    }

    console.log('All School', AllSchools)
    const RenderTableTitle = (): JSX.Element => {
        return (
            <CustomDiv>
                {deleteConfirmation(Number(Id)).modalComponent}
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
                                                    src={list}
                                                    alt="edit icon"
                                                    width={20}
                                                    height={20}
                                                />
                                            }
                                            clicked={() => {
                                                store.dispatch(
                                                    setUserRole('school')
                                                )
                                                navigate(`/school/list`)
                                            }}
                                        />
                                        <h3
                                            style={{
                                                margin: 'auto auto auto 5px',
                                            }}
                                            className="table-heading"
                                        >
                                            Live School
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
    const renderMenu = (record: any): any => (
        <Menu>
            {itemss.map((item) => {
                if (item.type === 'divider') {
                    return <Menu.Divider key={item.key} />
                } else if (record !== 'undefined') {
                    return (
                        <Menu.Item
                            key={item.key}
                            onClick={() => item.onClick && item.onClick(record)}
                        >
                            {item.label}
                        </Menu.Item>
                    )
                }
            })}
        </Menu>
    )
    return (
        <div>
            <CardViewStyled>
                <Head title="User List" />
                <RenderTableTitle />

                <Row className="custom_card_list">
                    <Col sm={24} md={16}>
                        <Row>
                            {AllSchools?.data?.map(
                                (item: any, index: number) => {
                                    return (
                                        <Col
                                            md={12}
                                            sm={24}
                                            key={index}
                                            style={{ marginBottom: '5px' }}
                                        >
                                            <div className="custom_card">
                                                <div
                                                    className="custom_card_placeholder_img"
                                                    id="bannerImg"
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            item.bannerImg
                                                                ? `https://fistastore.com:444/${item.bannerImg}`
                                                                : placeHolderImage
                                                        }
                                                        alt="bannerImg"
                                                        id={item.schoolId}
                                                        onClick={() =>
                                                            handleModal(
                                                                item.schoolId
                                                            )
                                                        }
                                                    />

                                                    {item.schoolId === imgId &&
                                                        modalVisible && (
                                                            <CustomModal
                                                                isModalVisible={
                                                                    modalVisible
                                                                }
                                                                setIsModalVisible={
                                                                    setIsModalVisible
                                                                }
                                                                onCancel={() => {
                                                                    setIsModalVisible(
                                                                        false
                                                                    )
                                                                }}
                                                                width="2000px"
                                                            >
                                                                {' '}
                                                                <img
                                                                    style={{
                                                                        margin: 'auto',
                                                                        display:
                                                                            ' block',
                                                                        width: '1170PX',
                                                                        maxWidth:
                                                                            '3000px',
                                                                    }}
                                                                    src={
                                                                        item.bannerImg
                                                                            ? `https://fistastore.com:444/${item.bannerImg}`
                                                                            : placeHolderImage
                                                                    }
                                                                    alt="bannerImg"
                                                                    id={
                                                                        item.SchoolId
                                                                    }
                                                                />
                                                            </CustomModal>
                                                        )}
                                                </div>
                                                <div>
                                                    <div
                                                        onClick={() =>
                                                            handleViewPage(
                                                                item.schoolId
                                                            )
                                                        }
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <List.Item>
                                                            <List.Item.Meta
                                                                style={{
                                                                    overflow:
                                                                        ' hidden',
                                                                    whiteSpace:
                                                                        'nowrap',
                                                                    textOverflow:
                                                                        'ellipsis',
                                                                    // display: 'inline-block',
                                                                    maxWidth:
                                                                        'calc(10ch + 10em)',
                                                                    fontSize:
                                                                        '14px',
                                                                }}
                                                                avatar={
                                                                    item
                                                                        .ownerData
                                                                        ?.profilePicture ? (
                                                                        <img
                                                                            src={`https://fistastore.com:444${item.ownerData?.profilePicture}`}
                                                                            width={
                                                                                44
                                                                            }
                                                                            height={
                                                                                44
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <Avatar />
                                                                    )
                                                                }
                                                                title={
                                                                    item.businessName
                                                                }
                                                                description={
                                                                    item.address
                                                                }
                                                            />
                                                            {'       '}
                                                            <Dropdown
                                                                overlayStyle={{
                                                                    justifyItems:
                                                                        'flex-end',
                                                                    alignItems:
                                                                        'end',
                                                                }}
                                                                overlay={renderMenu(
                                                                    item
                                                                )}
                                                            >
                                                                <img
                                                                    src={
                                                                        actionMenuTogglerIcon as string
                                                                    }
                                                                    alt="action menu"
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                    }}
                                                                />
                                                            </Dropdown>
                                                        </List.Item>
                                                    </div>
                                                </div>

                                                {/* {item.schoolId === viewPageId &&
                                                    viewPageVisible &&
                                                          setSelectedRecord(
                                                        item
                                                    
                                                    }
                                                  
                                                    // <CustomModal
                                                    //     isModalVisible={
                                                    //         viewPageVisible
                                                    //     }
                                                    //     setIsModalVisible={
                                                    //         setViewPageVisible
                                                    //     }
                                                    //     onCancel={() => {
                                                    //         setIsModalVisible(
                                                    //             false
                                                    //         )
                                                    //     }}
                                                    // >
                                                    //     <AcademiesDetails
                                                    //         item={item}
                                                    //     />
                                                    // </CustomModal>
                                                } */}
                                            </div>
                                        </Col>
                                    )
                                }
                            )}
                        </Row>
                    </Col>
                    <Col md={8}>
                        <div style={{ width: '100%' }}>
                            <Map AllSchool={AllSchools} />
                        </div>
                    </Col>
                </Row>
            </CardViewStyled>
        </div>
    )
}

export default LiveSchoolUserList
