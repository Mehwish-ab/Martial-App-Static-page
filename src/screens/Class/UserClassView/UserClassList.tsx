import { Link, useNavigate, useParams } from 'react-router-dom'
import {
    Avatar,
    Col,
    Divider,
    Dropdown,
    List,
    Pagination,
    Rate,
    Row,
    Table,
} from 'antd'
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
import useClass from '../../../hooks/useClass'
import MenuDivider from 'antd/lib/menu/MenuDivider'

const ClassList = (): JSX.Element => {
    const [currentPage, setCurrentPage] = useState(0)
    // const pageSize = 2
    // const imagesPerPage = 4
    // const indexOfLastImage = currentPage * imagesPerPage
    // const indexOfFirstImage = indexOfLastImage - imagesPerPage
    // const currentImages = AllUSer?.data.slice(
    //     indexOfFirstImage,
    //     indexOfLastImage
    // )
    const { getClassesbyschoolId, classData } = useClass()

    const paginate = (pageNumber: number): void => {
        setCurrentPage(pageNumber)
    }

    const [loading, setLoading] = useState(true)

    // const { schoolData } = useSelector(
    //     (state: RootState) => state.dashboardData
    // )
    const lengths: number = 0
    const { schoolID } = useParams()
    const { loginData } = useSelector((state: RootState) => state)
    const { UserData } = useSelector((state: RootState) => state.UserData)
    useEffect(() => {
        const fetchData = async (): Promise<any> => {
            try {
                const res = await getClassesbyschoolId(
                    Number(schoolID || loginData.data?.schoolId)
                )

                //setAllClass(res)
                console.log({ res }, classData)
            } catch (errors) {
                /// setError('Error fetching data')
            } finally {
                //  setLoading(false)
            }
        }

        fetchData()
    }, [schoolID])
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
                                    <h3 className="table-heading">Courses</h3>
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
                    {classData?.data?.map((item: any, index: any) => {
                        {
                            console.log('Itemmm', item)
                        }
                        return (
                            <div className="custom_card" key={index}>
                                <div
                                    className="custom_card_placeholder_img"
                                    id="bannerImg"
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    <img
                                        src={
                                            item.bannerPicture
                                                ? `https://fistastore.com:444/${item.bannerPicture}`
                                                : placeHolderImage
                                        }
                                        alt="bannerImg"
                                        id={item.classId}
                                        onClick={() =>
                                            handleModal(item.classId)
                                        }
                                    />
                                </div>

                                {item.classId === imgId && modalVisible && (
                                    <CustomModal
                                        isModalVisible={modalVisible}
                                        setIsModalVisible={setIsModalVisible}
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
                                                item.bannerPicture
                                                    ? `https://fistastore.com:444/${item.bannerPicture}`
                                                    : placeHolderImage
                                            }
                                            alt="bannerImg"
                                            id={item.id}
                                        />
                                    </CustomModal>
                                )}
                                <div>
                                    <div className="d-flex justify-content-between">
                                        <Col
                                            style={{
                                                marginLeft: '5px',
                                                marginTop: '5px',
                                                fontFamily: fontFamilyMedium,
                                                fontSize: ' 14.88px',
                                                fontWeight: ' 500',
                                                lineHeight: '17.76px',
                                            }}
                                        >
                                            {item.title}
                                        </Col>
                                        <Col
                                            style={{
                                                marginRight: '5px',
                                                marginTop: '5px',
                                                fontFamily: fontFamilyMedium,
                                                fontSize: ' 13.88px',
                                                fontWeight: ' 500',
                                                lineHeight: '17.76px',
                                            }}
                                        >
                                            12/30
                                        </Col>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Col
                                            style={{
                                                marginLeft: '5px',
                                                marginTop: '10px',
                                                fontFamily: fontFamilyRegular,
                                                fontSize: ' 13.88px',
                                                fontWeight: '400',
                                                lineHeight: '17.76px',
                                            }}
                                        >
                                            {item.description.length > 60
                                                ? item.description.substring(
                                                      0,
                                                      60
                                                  ) + '...'
                                                : item.description}
                                        </Col>

                                        <Col>
                                            <Dropdown menu={{ items }}>
                                                <img
                                                    src={
                                                        actionMenuTogglerIcon as string
                                                    }
                                                    alt="action menu"
                                                    style={{
                                                        cursor: 'pointer',
                                                        marginRight: '10px',
                                                        marginTop: '10px',
                                                        fontFamily:
                                                            fontFamilyMedium,
                                                        fontSize: ' 13.88px',
                                                        fontWeight: ' 500',
                                                        lineHeight: '17.76px',
                                                    }}
                                                />
                                            </Dropdown>
                                        </Col>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Col
                                            style={{
                                                marginLeft: '5px',
                                                marginTop: '18px',
                                                marginBottom: '10px',
                                                fontFamily: fontFamilyRegular,
                                                fontSize: ' 13.88px',
                                            }}
                                        >
                                            Karate
                                        </Col>
                                        <Col
                                            style={{
                                                marginRight: '5px',
                                                marginTop: '20px',
                                                marginBottom: '10px',
                                                fontFamily: fontFamilyRegular,
                                                fontSize: ' 12.88px',
                                            }}
                                        >
                                            Mon 21 Aug 2023
                                        </Col>
                                        <Col
                                            style={{
                                                marginRight: '5px',
                                                marginTop: '20px',
                                                marginBottom: '10px',
                                                fontFamily: fontFamilyRegular,
                                                fontSize: ' 12.88px',
                                            }}
                                        >
                                            07:00 PM - 08:30 PM
                                        </Col>
                                    </div>
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
                                    <hr className="solid" />
                                    <Row className="mr-5">
                                        <Col
                                            md="1"
                                            className=" ml-10px mr-2px d-flex justify-content-end"
                                        >
                                            <CustomButton
                                                bgcolor="#ECEAEA"
                                                color={maastrichtBlue}
                                                padding="5px 25px"
                                                fontFamily={`${fontFamilyMedium}`}
                                                width="137px"
                                                type="button"
                                                title="DETAILS"
                                                // disabled={item.membership}
                                                fontSize="14px"
                                                loading={false}
                                                margin="5px"
                                                clicked={() =>
                                                    handleViewPage(item.id)
                                                }
                                            />
                                        </Col>
                                        <Col
                                            md="2"
                                            className="  d-flex justify-content-end"
                                        >
                                            <CustomButton
                                                bgcolor={lightBlue3}
                                                textTransform="Captilize"
                                                color={maastrichtBlue}
                                                padding="5px 27px"
                                                fontFamily={`${fontFamilyMedium}`}
                                                width="135 px"
                                                type="button"
                                                title="BOOK NOW"
                                                fontSize="14px"
                                                loading={false}
                                                margin="5px"
                                                // clicked={() => {
                                                //     navigate('/class/list')
                                                // }}
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

export default ClassList
