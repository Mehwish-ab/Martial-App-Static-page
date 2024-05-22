import { useNavigate } from 'react-router-dom'
import { Col, Input, InputRef, Row } from 'antd'
import { CardViewStyled, VideoCardStyled } from './style'
import { fontFamilyRegular } from '../../components/GlobalStyle'
import searchIcon from '../../assets/icons/ic_search(1).svg'
import PointOnMap from '../../assets/images/point-on-map-perspective-svgrepo-com 1.png'
import filter from '../../assets/images/Vector.png'
import RightArrow from '../../assets/images/rightArrow.svg'
import img from '../../assets/images/welcomeCardImg.png'
import LeftArrow from '../../assets/images/leftArrow.svg'
import { Form, Formik } from 'formik'
import FormControl from '../../components/FormControl'
import { CustomDiv } from '../CreateSchool/ListSchool/CustomDiv'
import Head from '../../components/Head/Head'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useEffect, useRef, useState } from 'react'
import useCreateSchool from '../../hooks/useCreateSchool'
import Map from '../CreateSchool/LiveSchoolList/GoogleMap'
import PublicNavbar from '../../components/Navbar/PublicNavbar'
import { useGlobalContext } from '../../context/context'

const Explore = (): JSX.Element => {
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
    const { searchText, setSearchText } = useGlobalContext()
    const searchRef = useRef<InputRef>(null)
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

    const initialValues = (): void => {}
    const handleCreateSubmit = (): void => {}

    const handleSearch = (): void => {
        // Handle search action here, e.g., navigate to search results page
        console.log('Searching for:', searchText)
    }

    const handleInputChange = (event: any): void => {
        setSearchText(event.target.value)
    }

    console.log('All School', AllSchools)
    const RenderTableTitle = (): JSX.Element => {
        return (
            <CustomDiv>
                <PublicNavbar />
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
                                    <div className="d-flex justify-content-end">
                                        <div className="left-bar d-flex align-items-center justify-content-end">
                                            <Input
                                                ref={searchRef}
                                                value={searchText}
                                                placeholder="Search..."
                                                onChange={handleInputChange}
                                                suffix={
                                                    <img
                                                        src={searchIcon}
                                                        alt="search-icon"
                                                        width={21}
                                                        height={21}
                                                    />
                                                }
                                                className="arrowRight"
                                            />
                                        </div>
                                        <div
                                            style={{
                                                marginLeft: '5px',
                                            }}
                                            className="left-bar d-flex  justify-content-start"
                                        >
                                            <Input
                                                ref={searchRef}
                                                value={searchText}
                                                placeholder="Location"
                                                onChange={handleInputChange}
                                                suffix={
                                                    <img
                                                        src={PointOnMap}
                                                        alt="search-icon"
                                                        width={21}
                                                        height={21}
                                                    />
                                                }
                                                className="arrowRight"
                                            />
                                        </div>
                                        <div
                                            className="arrowRight"
                                            style={{
                                                marginLeft: '5px',
                                            }}
                                        >
                                            <img
                                                src={filter}
                                                alt="Date"
                                                width={18}
                                                height={12}
                                            />
                                        </div>
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

    return (
        <div>
            <div style={{ margin: '110px  20px 0px 20px' }}>
                {' '}
                <RenderTableTitle />
            </div>
            <CardViewStyled>
                <Head title="User List" />

                <Row>
                    <Col sm={24} md={12}>
                        <div className="d-flex flex-column gap-3">
                            {AllSchools?.data?.map((item: any) => (
                                <VideoCardStyled key={item.schoolId}>
                                    <Row>
                                        <Col
                                            md={14}
                                            className="video-card d-flex align-items-center justify-content-start"
                                            onClick={() =>
                                                navigate(
                                                    `/details/${item.schoolId}`
                                                )
                                            }
                                        >
                                            <div className="image">
                                                <img
                                                    style={{
                                                        height: '95px',
                                                        width: '200px',
                                                        // marginTop: '3px',
                                                    }}
                                                    src={
                                                        item.profileImg
                                                            ? `https://fistastore.com:444${img}`
                                                            : img
                                                    }
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    padding: '8px 10px',
                                                }}
                                            >
                                                <p className="heading">
                                                    Fitness, Crossfit, Capoeira
                                                    <br></br>
                                                    <span className="title">
                                                        Sacaba Beach Box
                                                    </span>
                                                    <br></br>
                                                    <span className="description">
                                                        Calle Polifemo 3
                                                        España29004, Málaga,
                                                        Spain
                                                    </span>
                                                </p>
                                            </div>
                                        </Col>

                                        <Col
                                            md={10}
                                            className=" d-flex
                                            
                                            justify-content-start"
                                        >
                                            <div
                                                className="separator"
                                                style={{ marginRight: '10px' }}
                                            ></div>{' '}
                                            <div className="heading1">
                                                CrossFit classes in Malaga, We
                                                offer classes from Monday to
                                                Saturday for all levels.
                                            </div>
                                        </Col>
                                    </Row>
                                </VideoCardStyled>
                            ))}
                        </div>
                    </Col>
                    <Col md={12}>
                        <div style={{ width: '100%' }}>
                            <Map AllSchool={AllSchools} />
                        </div>
                    </Col>
                </Row>
            </CardViewStyled>
        </div>
    )
}

export default Explore
