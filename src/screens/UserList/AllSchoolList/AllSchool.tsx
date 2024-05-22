import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Col, Dropdown, List, Pagination, Rate, Row, Table } from 'antd'
import CustomButton from '../../../components/CustomButton/CustomButton'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import { CardViewStyled, ImageModal } from './styles'
import placeHolderImage from '../../../assets/images/custom_card_placeholder.png'
import {
    GrayX11,
    fontFamilyMedium,
    fontFamilyRegular,
    greenishColor,
    lightBlue3,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
import RightArrow from '../../../assets/images/rightArrow.svg'
import LeftArrow from '../../../assets/images/leftArrow.svg'
import { Form, Formik } from 'formik'
import FormControl from '../../../components/FormControl'
import { AllUserSchoolList } from '../../../redux/features/dashboard/dashboardDataSlice'
import { CustomDiv } from '../../CreateSchool/ListSchool/CustomDiv'
import Head from '../../../components/Head/Head'
import useUser from '../../../hooks/useUser'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { SetStateAction, useEffect, useState } from 'react'
import useCreateSchool from '../../../hooks/useCreateSchool'
import CustomModal from '../../../components/Modal/CustomModal'
import AcademiesDetails from './AcedmicDetails'
import useScreenTranslation from '../../../hooks/useScreenTranslation'

const AllSchoolUserList = (): JSX.Element => {
    const { getAllAppSchool, getAllSchoolPagination } = useCreateSchool()
    const [AllUSer, setAllUSer] = useState<
        | {
              currentPage: number
              totalItems: number | undefined
              data: AllUserSchoolList[]
          }
        | undefined
    >(undefined)
    const [currentPage, setCurrentPage] = useState(0)
    const [error, setError] = useState<string | undefined>(undefined)

    const pageSize = 2
    const imagesPerPage = 4
    const indexOfLastImage = currentPage * imagesPerPage
    const indexOfFirstImage = indexOfLastImage - imagesPerPage
    const currentImages = AllUSer?.data.slice(
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
            setAllUSer(response)
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
        const fetchData = async (): Promise<any> => {
            try {
                const res = await getAllAppSchool(Number(currentPage))

                setAllUSer(res)
            } catch (errors) {
                /// setError('Error fetching data')
            } finally {
                //  setLoading(false)
            }
        }

        fetchData()
    }, [])

    const items = [
        {
            key: '1',
            label: 'Report',
            onClick: () => navigate('/user/list'),
        },
        {
            key: '2',
            label: 'Share',
            // onClick: () => navigation(record, "edit"),
        },
    ]
    const [modalVisible, setIsModalVisible] = useState(false)
    const [viewPageVisible, setViewPageVisible] = useState(false)
    const [viewPageId, setViewPageId] = useState<string>()
    const [imgId, setImgId] = useState<string>()

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
                                    <h3 className="table-heading">Users</h3>
                                    {/* <div className="FilterMainContainer">
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
                                    </div> */}
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
            <CardViewStyled>
                <Head title="User List" />
                <RenderTableTitle />
                <div className="custom_card_list d-flex flex-wrap">
                    {AllUSer?.data?.map((item, index) => {
                        return (
                            <div className="custom_card" key={index}>
                                <div
                                    className="custom_card_placeholder_img"
                                    id="bannerImg"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img
                                        src={
                                            item.bannerImg
                                                ? `https://fistastore.com:444/${item.bannerImg}`
                                                : placeHolderImage
                                        }
                                        alt="bannerImg"
                                        id={item.id}
                                        onClick={() => handleModal(item.id)}
                                    />

                                    {item.id === imgId && modalVisible && (
                                        <CustomModal
                                            isModalVisible={modalVisible}
                                            setIsModalVisible={
                                                setIsModalVisible
                                            }
                                            onCancel={() => {
                                                setIsModalVisible(false)
                                            }}
                                            width="2000px"
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
                                                    item.bannerImg
                                                        ? `https://fistastore.com:444/${item.bannerImg}`
                                                        : placeHolderImage
                                                }
                                                alt="bannerImg"
                                                id={item.id}
                                            />
                                        </CustomModal>
                                    )}
                                </div>
                                <div
                                    onClick={() => handleViewPage(item.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <List.Item>
                                        <List.Item.Meta
                                            style={{
                                                overflow: ' hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                // display: 'inline-block',
                                                maxWidth: 'calc(10ch + 10em)',
                                                fontSize: '14px',
                                            }}
                                            avatar={
                                                item.profileImg ? (
                                                    <img
                                                        src={`https://fistastore.com:444${item.profileImg}`}
                                                        width={44}
                                                        height={44}
                                                    />
                                                ) : (
                                                    <Avatar />
                                                )
                                            }
                                            title={item.name}
                                            description={item.address}
                                        />
                                        {'       '}
                                        <Dropdown
                                            overlayStyle={{
                                                justifyItems: 'flex-end',
                                                alignItems: 'end',
                                            }}
                                            menu={{ items }}
                                        >
                                            <img
                                                src={
                                                    actionMenuTogglerIcon as string
                                                }
                                                alt="action menu"
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Dropdown>
                                    </List.Item>
                                </div>

                                {item.id === viewPageId && viewPageVisible && (
                                    <CustomModal
                                        isModalVisible={viewPageVisible}
                                        setIsModalVisible={setViewPageVisible}
                                        onCancel={() => {
                                            setIsModalVisible(false)
                                        }}
                                    >
                                        <AcademiesDetails item={item} />
                                    </CustomModal>
                                )}
                                <div>
                                    <Row>
                                        <Col
                                            md="1"
                                            className=" ml-10px mr-2px d-flex justify-content-end"
                                        >
                                            <CustomButton
                                                bgcolor={
                                                    item.membership
                                                        ? lightBlue3
                                                        : GrayX11
                                                }
                                                textTransform="Captilize"
                                                color={maastrichtBlue}
                                                padding="5px 20px"
                                                fontFamily={`${fontFamilyMedium}`}
                                                width="fit-content"
                                                type="button"
                                                title="MEMBERSHIP"
                                                disabled={!item.membership}
                                                fontSize="16px"
                                                loading={false}
                                                margin="5px"
                                                clicked={() =>
                                                    navigate(
                                                        `/user/membership/list/`
                                                    )
                                                }
                                            />
                                        </Col>
                                        <Col
                                            md="2"
                                            className="  d-flex justify-content-end"
                                        >
                                            <CustomButton
                                                bgcolor={
                                                    item.hasClass
                                                        ? lightBlue3
                                                        : GrayX11
                                                }
                                                textTransform="Captilize"
                                                color={maastrichtBlue}
                                                padding="5px 25px"
                                                fontFamily={`${fontFamilyMedium}`}
                                                width="fit-content"
                                                type="button"
                                                title="CLASSES"
                                                fontSize="16px"
                                                loading={false}
                                                margin="5px"
                                                clicked={() =>
                                                    navigate(
                                                        `/user/class/list/${item.id}`
                                                    )
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardViewStyled>
        </>
    )
}

export default AllSchoolUserList
